import React, { useState, useEffect, useCallback } from 'react';
import { Search } from 'lucide-react';
import { Account, ToastMessage, ConfirmModalOptions } from './types';
import {
  loadCredentialsFromIndexedDB,
  saveCredentialsToIndexedDB,
  exportToJSONFile,
  validateImportedData
} from './utils/storage';
import { Header } from './components/Header';
import { TokenGenerator } from './components/TokenGenerator';
import { DragDropOverlay } from './components/DragDropOverlay';
import { CreateMailboxModal } from './components/CreateMailboxModal';
import { ConfirmModal } from './components/ConfirmModal';
import { ToastContainer } from './components/ToastContainer';
import { AccountCard } from './components/AccountCard';

export const App: React.FC = () => {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState<boolean>(false);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);

  // Custom confirmation modal state
  const [confirmOptions, setConfirmOptions] = useState<ConfirmModalOptions | null>(null);
  const [confirmSubmitCallback, setConfirmSubmitCallback] = useState<(() => void) | null>(null);
  const [confirmAlternativeCallback, setConfirmAlternativeCallback] = useState<(() => void) | null>(null);

  // Toast Helper
  const showToast = useCallback((message: string, type: 'success' | 'error' | 'info' = 'success') => {
    const id = `toast-${Math.random().toString(36).substring(2, 9)}`;
    const newToast: ToastMessage = { id, message, type };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const dismissToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // Initial Data Load
  useEffect(() => {
    async function initData() {
      try {
        const loaded = await loadCredentialsFromIndexedDB();
        setAccounts(loaded);
        showToast("Credentials loaded successfully from secure IndexedDB store", "info");
      } catch (err) {
        console.error("IndexedDB initialization error:", err);
        showToast("Error loading credentials from secure IndexedDB store", "error");
      } finally {
        setLoading(false);
      }
    }
    initData();
  }, [showToast]);

  // Sync state to IndexedDB helper
  const syncAccounts = useCallback((newAccounts: Account[]) => {
    setAccounts(newAccounts);
    saveCredentialsToIndexedDB(newAccounts).catch((err) => {
      console.error("Failed saving to IndexedDB:", err);
    });
  }, []);

  // Global Drag & Drop handlers
  useEffect(() => {
    const handleDragOver = (e: DragEvent) => {
      e.preventDefault();
      setIsDragOver(true);
    };

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault();
      if (e.relatedTarget === null) {
        setIsDragOver(false);
      }
    };

    const handleDrop = (e: DragEvent) => {
      e.preventDefault();
      setIsDragOver(false);
      if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        processImportFiles(e.dataTransfer.files);
      }
    };

    window.addEventListener('dragover', handleDragOver);
    window.addEventListener('dragleave', handleDragLeave);
    window.addEventListener('drop', handleDrop);

    return () => {
      window.removeEventListener('dragover', handleDragOver);
      window.removeEventListener('dragleave', handleDragLeave);
      window.removeEventListener('drop', handleDrop);
    };
  }, [accounts]);

  // Copy text helper
  const handleCopyText = (text: string, successMsg: string) => {
    navigator.clipboard.writeText(text).then(() => {
      showToast(successMsg, "success");
    }).catch(() => {
      showToast("Failed copying value to clipboard", "error");
    });
  };

  // Create Parent Mailbox
  const handleCreateMailbox = (email: string, pwd: string, note?: string) => {
    const isExist = accounts.some((acc) => acc.email.toLowerCase() === email.toLowerCase());
    if (isExist) {
      showToast(`A mail card for "${email}" already exists.`, "error");
      return;
    }

    const newAccount: Account = {
      id: Math.random().toString(36).substring(2, 11),
      email,
      emailPassword: pwd,
      note,
      subEntries: []
    };

    const updated = [newAccount, ...accounts];
    syncAccounts(updated);
    showToast(`Created mailbox container for "${email}"!`, "success");
  };

  // Delete Parent Mailbox
  const handleDeleteAccount = (account: Account) => {
    setConfirmOptions({
      title: "Delete Mailbox Container",
      message: `Are you sure you want to completely delete "${account.email}" and all of its linked site credentials? This action is permanent and cannot be undone.`,
      confirmText: "Delete Account",
      isDanger: true
    });
    setConfirmSubmitCallback(() => () => {
      const filtered = accounts.filter((a) => a.id !== account.id);
      syncAccounts(filtered);
      showToast(`Mailbox "${account.email}" removed.`, "info");
      closeConfirmModal();
    });
    setConfirmAlternativeCallback(null);
  };

  // Add Site Link to Mailbox
  const handleAddSite = (accountId: string, siteKey: string, note?: string) => {
    const parent = accounts.find((a) => a.id === accountId);
    if (!parent) return;

    const isDuplicated = parent.subEntries.some((s) => s.key.toLowerCase() === siteKey.toLowerCase());
    if (isDuplicated) {
      showToast(`Site link "${siteKey}" is already mapped in this mailbox.`, "error");
      return;
    }

    const updatedAccounts = accounts.map((acc) => {
      if (acc.id === accountId) {
        return {
          ...acc,
          subEntries: [
            ...acc.subEntries,
            { key: siteKey, note, val: [] }
          ]
        };
      }
      return acc;
    });

    syncAccounts(updatedAccounts);
    showToast(`Linked portal metadata: "${siteKey}"`, "success");
  };

  // Delete Site Link from Mailbox
  const handleDeleteSite = (accountId: string, siteKey: string) => {
    const parent = accounts.find((a) => a.id === accountId);
    if (!parent) return;

    setConfirmOptions({
      title: "Delete Linked Site",
      message: `Are you sure you want to delete the site entry "${siteKey}" on mailbox ${parent.email}?`,
      confirmText: "Delete Entry",
      isDanger: true
    });
    setConfirmSubmitCallback(() => () => {
      const updatedAccounts = accounts.map((acc) => {
        if (acc.id === accountId) {
          return {
            ...acc,
            subEntries: acc.subEntries.filter((s) => s.key !== siteKey)
          };
        }
        return acc;
      });
      syncAccounts(updatedAccounts);
      showToast(`Removed site metadata link: "${siteKey}"`, "info");
      closeConfirmModal();
    });
    setConfirmAlternativeCallback(null);
  };

  // Add Attribute to Site
  const handleAddAttribute = (accountId: string, siteKey: string, key: string, val: string, note?: string) => {
    const finalVal = val.includes('\n') ? val.split('\n') : val;

    const updatedAccounts = accounts.map((acc) => {
      if (acc.id === accountId) {
        const newSubEntries = acc.subEntries.map((sub) => {
          if (sub.key === siteKey) {
            const currentValList = sub.val || sub.values || sub.fields || [];
            return {
              ...sub,
              val: [
                ...currentValList,
                { key, val: finalVal, note }
              ]
            };
          }
          return sub;
        });
        return { ...acc, subEntries: newSubEntries };
      }
      return acc;
    });

    syncAccounts(updatedAccounts);
    showToast(`Encrypted attribute "${key}" added!`, "success");
  };

  // Delete Attribute from Site
  const handleDeleteAttribute = (accountId: string, siteKey: string, fieldKey: string) => {
    setConfirmOptions({
      title: "Delete Attribute Field",
      message: `Are you sure you want to delete the custom attribute "${fieldKey}"?`,
      confirmText: "Delete Attribute",
      isDanger: true
    });
    setConfirmSubmitCallback(() => () => {
      const updatedAccounts = accounts.map((acc) => {
        if (acc.id === accountId) {
          const newSubEntries = acc.subEntries.map((sub) => {
            if (sub.key === siteKey) {
              const currentValList = sub.val || sub.values || sub.fields || [];
              return {
                ...sub,
                val: currentValList.filter((f) => f.key !== fieldKey)
              };
            }
            return sub;
          });
          return { ...acc, subEntries: newSubEntries };
        }
        return acc;
      });
      syncAccounts(updatedAccounts);
      showToast(`Deleted attribute field`, "info");
      closeConfirmModal();
    });
    setConfirmAlternativeCallback(null);
  };

  // Import JSON Logic
  const processImportFiles = (files: FileList | null) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);
        const validated = validateImportedData(parsed);

        if (!validated) {
          showToast("Invalid JSON container layout. Check schema mapping rules.", "error");
          return;
        }

        setConfirmOptions({
          title: "Import Options",
          message: `Loaded ${validated.length} mailbox entries from file. Please choose how to apply them to your database:\n\n• Merge: Add new entries and custom site attributes into your current list.\n• Overwrite: Completely replace your existing credentials with the imported file.`,
          confirmText: "Merge with Current",
          alternativeText: "Overwrite Vault completely",
          isDanger: false
        });

        // Merge action
        setConfirmSubmitCallback(() => () => {
          const merged = [...accounts];
          validated.forEach((newEntry) => {
            const index = merged.findIndex((m) => m.email.toLowerCase() === newEntry.email.toLowerCase());
            if (index !== -1) {
              const existingSubs = [...merged[index].subEntries];
              newEntry.subEntries.forEach((newSub) => {
                const subIdx = existingSubs.findIndex((s) => s.key.toLowerCase() === newSub.key.toLowerCase());
                if (subIdx !== -1) {
                  const existingValues = [...(existingSubs[subIdx].val || [])];
                  (newSub.val || []).forEach((f) => {
                    const valDisplay1 = (Array.isArray(f.val) ? f.val.join('\n') : f.val).toLowerCase();
                    const hasField = existingValues.some(
                      (x) => x.key.toLowerCase() === f.key.toLowerCase() && (Array.isArray(x.val) ? x.val.join('\n') : x.val).toLowerCase() === valDisplay1
                    );
                    if (!hasField) {
                      existingValues.push(f);
                    }
                  });
                  existingSubs[subIdx].val = existingValues;
                } else {
                  existingSubs.push(newSub);
                }
              });
              merged[index].subEntries = existingSubs;
            } else {
              merged.push(newEntry);
            }
          });
          syncAccounts(merged);
          showToast(`Successfully merged ${validated.length} mailboxes!`, "success");
          closeConfirmModal();
        });

        // Overwrite action
        setConfirmAlternativeCallback(() => () => {
          syncAccounts(validated);
          showToast(`Successfully overwritten vault with ${validated.length} mailboxes!`, "success");
          closeConfirmModal();
        });

      } catch (e: any) {
        showToast(`Error reading file: ${e.message}`, "error");
      }
    };
    reader.readAsText(file);
  };

  const closeConfirmModal = () => {
    setConfirmOptions(null);
    setConfirmSubmitCallback(null);
    setConfirmAlternativeCallback(null);
  };

  // Filter accounts by searchQuery across subentry keys
  const filteredAccounts = accounts.filter((acc) => {
    if (!searchQuery.trim()) return true;
    const query = searchQuery.toLowerCase().trim();
    return (acc.subEntries || []).some((sub) => sub.key.toLowerCase().includes(query));
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Top Header */}
      <Header
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenCreateModal={() => setIsCreateModalOpen(true)}
        onExportBackup={() => {
          if (accounts.length === 0) {
            showToast("No credentials available to export", "error");
            return;
          }
          exportToJSONFile(accounts);
          showToast("Exported credentials template successfully!", "success");
        }}
        onImportFiles={processImportFiles}
      />

      {/* Drag and drop overlay banner */}
      <DragDropOverlay isVisible={isDragOver} />

      {/* Quick Token Generator Card */}
      <TokenGenerator onShowToast={showToast} />

      {/* Main Accounts Container */}
      <main id="accounts-vault" className="grid grid-cols-1 gap-6">
        {loading ? (
          <div className="text-center py-16 bg-slate-900/20 border border-dashed border-slate-800/40 rounded-2xl">
            <div className="w-10 h-10 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-3" />
            <p className="text-xs font-mono text-slate-500">Decrypting securely...</p>
          </div>
        ) : filteredAccounts.length === 0 ? (
          <div className="text-center py-20 bg-slate-900/10 border border-slate-900/60 rounded-2xl">
            <div className="inline-flex w-12 h-12 rounded-xl bg-slate-900 items-center justify-center text-slate-500 mb-3 border border-slate-800">
              <Search className="w-5 h-5" />
            </div>
            <h4 className="text-xs uppercase tracking-wider font-bold text-slate-400">No active vault matches</h4>
            <p className="text-[11px] text-slate-600 mt-1 max-w-sm mx-auto">
              Try refining your filter search or restore the sample maps to preview credentials mapping.
            </p>
          </div>
        ) : (
          filteredAccounts.map((account) => (
            <AccountCard
              key={account.id}
              account={account}
              searchQuery={searchQuery}
              onCopyText={handleCopyText}
              onDeleteAccount={handleDeleteAccount}
              onDeleteSite={handleDeleteSite}
              onAddSite={handleAddSite}
              onDeleteAttribute={handleDeleteAttribute}
              onAddAttribute={handleAddAttribute}
            />
          ))
        )}
      </main>

      {/* Modals & Toasts */}
      <CreateMailboxModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreate={handleCreateMailbox}
        onShowToast={showToast}
      />

      <ConfirmModal
        options={confirmOptions}
        onConfirm={() => confirmSubmitCallback?.()}
        onAlternative={confirmAlternativeCallback ? () => confirmAlternativeCallback() : undefined}
        onCancel={closeConfirmModal}
      />

      <ToastContainer toasts={toasts} onDismiss={dismissToast} />
    </div>
  );
};
