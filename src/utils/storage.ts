import { Account, SubEntry, FieldAttribute } from '../types';

export const SAMPLE_ACCOUNTS: Account[] = [
  {
    id: "sample-1",
    email: "adam.morrison@corpmail.com",
    emailPassword: "corp_secured_8891#",
    note: "Corporate active directory account, updated quarterly",
    subEntries: [
      {
        key: "github.com",
        note: "GitHub Developer Credentials",
        val: [
          {
            key: "username",
            val: "adam_dev_2026",
            note: "Primary dev handle"
          },
          {
            key: "password",
            val: "ghp_secureTokenForDeveloperWork2026",
            note: "Personal Access Token with full repository access"
          },
          {
            key: "real name",
            val: "Adam J. Morrison"
          },
          {
            key: "birthday",
            val: "1988-11-21"
          }
        ]
      },
      {
        key: "amazon-web-services",
        note: "AWS Console Admin Access",
        val: [
          {
            key: "access key ID",
            val: "AKIAIOSFODNN7EXAMPLE",
            note: "Global administrator"
          },
          {
            key: "secret key",
            val: "aws_admin_secret_key_prod_auth"
          },
          {
            key: "target region",
            val: "us-east-1"
          }
        ]
      }
    ]
  },
  {
    id: "sample-2",
    email: "adam_private@gmail.com",
    emailPassword: "privateSkyBlue992!",
    note: "Personal daily usage mailbox",
    subEntries: [
      {
        key: "netflix.com",
        note: "Family Streaming Membership",
        val: [
          {
            key: "profile pin",
            val: "4491",
            note: "Household supervisor PIN"
          },
          {
            key: "family password",
            val: "netflixFamilyMaxPremiumUltra"
          },
          {
            key: "billing birthday",
            val: "1994-08-24"
          }
        ]
      },
      {
        key: "bank_portal",
        note: "Online Brokerage Account",
        val: [
          {
            key: "login identifier",
            val: "morrison_invest_99",
            note: "Do not share"
          },
          {
            key: "password",
            val: "chase_retail_investing_alpha_92"
          }
        ]
      }
    ]
  }
];

const DB_NAME = "offline_password_manager_db";
const STORE_NAME = "vault_store";
const DB_VERSION = 1;
const RECORD_KEY = "accounts_data";

function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onerror = (event) => reject((event.target as IDBOpenDBRequest).error || new Error("Failed to open IndexedDB"));
    request.onsuccess = (event) => resolve((event.target as IDBOpenDBRequest).result);
    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    };
  });
}

export async function loadCredentialsFromIndexedDB(): Promise<Account[]> {
  try {
    const db = await openDatabase();
    const data = await new Promise<Account[] | null>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readonly");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.get(RECORD_KEY);
      request.onsuccess = () => resolve(request.result || null);
      request.onerror = (e) => reject((e.target as IDBRequest).error);
    });

    if (data && Array.isArray(data)) {
      return data;
    }

    // No data found in IndexedDB, seed with default SAMPLE_ACCOUNTS
    await saveCredentialsToIndexedDB(SAMPLE_ACCOUNTS);
    return SAMPLE_ACCOUNTS;
  } catch (err) {
    console.warn("IndexedDB load failed, falling back to local memory seed:", err);
    return SAMPLE_ACCOUNTS;
  }
}

export async function saveCredentialsToIndexedDB(accounts: Account[]): Promise<void> {
  try {
    const db = await openDatabase();
    await new Promise<void>((resolve, reject) => {
      const transaction = db.transaction(STORE_NAME, "readwrite");
      const store = transaction.objectStore(STORE_NAME);
      const request = store.put(accounts, RECORD_KEY);
      request.onsuccess = () => resolve();
      request.onerror = (e) => reject((e.target as IDBRequest).error);
    });
  } catch (err) {
    console.error("Failed writing to IndexedDB:", err);
  }
}

export function exportToJSONFile(accounts: Account[]): void {
  const exportedAccounts = accounts.map(acc => {
    const cleanedSubEntries = (acc.subEntries || []).map(sub => {
      const rawFields = sub.val || sub.values || sub.fields || [];
      const cleanedValList = rawFields.map((f: any) => {
        let rawVal = f.val !== undefined ? f.val : (f.values !== undefined ? f.values : (f.fieldValue !== undefined ? f.fieldValue : ""));
        if (typeof rawVal === "string" && rawVal.includes("\n")) {
          rawVal = rawVal.split("\n");
        }
        return {
          key: f.key || f.fieldKey || "attribute",
          val: rawVal,
          note: f.note || undefined
        };
      });
      return {
        key: sub.key || "Unknown Site",
        note: sub.note || undefined,
        val: cleanedValList
      };
    });
    return {
      email: acc.email,
      emailPassword: acc.emailPassword,
      note: acc.note || undefined,
      subEntries: cleanedSubEntries
    };
  });
  const dataStr = JSON.stringify(exportedAccounts, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement("a");
  a.href = url;
  a.download = `password_manager_export_${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

export function getDisplayValue(val: string | string[] | undefined): string {
  if (Array.isArray(val)) {
    return val.join('\n');
  }
  return val || '';
}

export function migrateLegacyData(data: any): Account[] | null {
  if (!Array.isArray(data)) return null;
  const migrated: Account[] = [];

  for (const item of data) {
    const subEntries = Array.isArray(item.subEntries) ? item.subEntries : [];
    const validSubEntries: SubEntry[] = subEntries.map((sub: any) => {
      const valArray: FieldAttribute[] = [];
      const oldFields = Array.isArray(sub.val) ? sub.val : (Array.isArray(sub.values) ? sub.values : (Array.isArray(sub.fields) ? sub.fields : []));

      if (oldFields.length > 0) {
        oldFields.forEach((f: any) => {
          if (f) {
            const k = f.key || f.fieldKey || "attribute";
            let rawVal = f.val !== undefined ? f.val : (f.values !== undefined ? f.values : (f.fieldValue !== undefined ? f.fieldValue : ""));

            let finalVal = rawVal;
            if (typeof rawVal === "string" && rawVal.includes("\n")) {
              finalVal = rawVal.split("\n");
            }

            valArray.push({
              key: k,
              val: finalVal,
              note: typeof f.note === "string" ? f.note : undefined
            });
          }
        });
      } else {
        const singleVal = sub.val || sub.value || sub.values;
        if (typeof singleVal === 'string') {
          let finalVal: string | string[] = singleVal;
          if (singleVal.includes("\n")) {
            finalVal = singleVal.split("\n");
          }
          valArray.push({
            key: "password",
            val: finalVal,
            note: typeof sub.note === 'string' ? sub.note : undefined
          });
        }
      }

      return {
        key: typeof sub.key === 'string' ? sub.key : "Unknown Site",
        note: typeof sub.note === 'string' && !sub.value ? sub.note : undefined,
        val: valArray
      };
    });

    migrated.push({
      id: typeof item.id === 'string' ? item.id : Math.random().toString(36).substring(2, 11),
      email: typeof item.email === 'string' ? item.email : "unknown@mail.com",
      emailPassword: typeof item.emailPassword === 'string' ? item.emailPassword : "",
      note: typeof item.note === 'string' ? item.note : undefined,
      subEntries: validSubEntries
    });
  }
  return migrated;
}

export function validateImportedData(data: any): Account[] | null {
  if (!Array.isArray(data)) return null;
  return migrateLegacyData(data);
}

export function generateRandomToken(length = 16, includeSymbols = true): string {
  const alphaNum = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const symbols = "!@#$%^&*()_+~|";
  const chars = includeSymbols ? alphaNum + symbols : alphaNum;
  let token = "";
  for (let i = 0; i < length; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}
