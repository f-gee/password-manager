// SVG Icons Dictionary (Lucide counterparts)
const ICONS = {
  plus: `<svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>`,
  trash: `<svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>`,
  chevronDown: `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"/></svg>`,
  chevronUp: `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"/></svg>`,
  eye: `<svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0z"/><circle cx="12" cy="12" r="3"/></svg>`,
  eyeOff: `<svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/></svg>`,
  copy: `<svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>`,
  check: `<svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  key: `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="7.5" cy="15.5" r="5.5"/><path d="m21 2-9.6 9.6"/><path d="m15.5 7.5 3 3M17 10l3-3"/></svg>`,
  globe: `<svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"/><path d="M2 12h20"/></svg>`,
  info: `<svg xmlns="http://www.w3.org/2000/svg" class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`,
  exclamation: `<svg xmlns="http://www.w3.org/2000/svg" class="w-4 h-4 text-amber-500 animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>`
};

// Global App States
let accounts = [];
let searchQuery = "";
const expandedAccountIds = {}; 
const expandedSubEntryIds = {}; // defaults to true unless toggled
const visibleFieldIds = {};
const visiblePrimaryIds = {};
const showCreateSubFormIds = {};
let copiedId = null; // tracking for copy UI feedback

// DOM Elements cache
const accountsVaultEl = document.getElementById("accounts-vault");
const searchInputEl = document.getElementById("search-input");
const btnCreateEl = document.getElementById("btn-create-account");
const btnExportEl = document.getElementById("btn-export");
const btnImportTriggerEl = document.getElementById("btn-import-trigger");
const fileUploaderEl = document.getElementById("file-uploader");
const dragDropZoneEl = document.getElementById("drag-drop-zone");

const modalCreateEl = document.getElementById("modal-create-account");
const modalCloseEl = document.getElementById("modal-create-close");
const modalFormEl = document.getElementById("modal-create-form");
const modalCancelEl = document.getElementById("modal-create-cancel");
const btnGeneratePwdEl = document.getElementById("form-create-generate-pwd");

const statMailboxesEl = document.getElementById("stat-total-mailboxes");
const statSitesEl = document.getElementById("stat-total-sites");
const statFieldsEl = document.getElementById("stat-total-fields");
const toastContainerEl = document.getElementById("toast-container");

const generatorTokenDisplayEl = document.getElementById("generator-token-display");
const btnCopyGeneratorTokenEl = document.getElementById("btn-copy-generator-token");
const btnTriggerGenerationEl = document.getElementById("btn-trigger-generation");
const iconGeneratorCopyStateEl = document.getElementById("icon-generator-copy-state");

const tokenLengthSliderEl = document.getElementById("token-length-slider");
const tokenLengthDisplayEl = document.getElementById("token-length-display");
const btnCharsetAlphanumericEl = document.getElementById("btn-charset-alphanumeric");
const btnCharsetAllEl = document.getElementById("btn-charset-all");

// Custom Confirmation Modal cache
const modalConfirmEl = document.getElementById("modal-confirm");
const modalConfirmTitleEl = document.getElementById("modal-confirm-title");
const modalConfirmMessageEl = document.getElementById("modal-confirm-message");
const modalConfirmCancelEl = document.getElementById("modal-confirm-cancel");
const modalConfirmAlternativeEl = document.getElementById("modal-confirm-alternative");
const modalConfirmSubmitEl = document.getElementById("modal-confirm-submit");
const modalConfirmIconDangerEl = document.getElementById("modal-confirm-icon-danger");
const modalConfirmIconInfoEl = document.getElementById("modal-confirm-icon-info");

let generatorCharsetMode = "all"; // "all" or "alphanumeric"
let currentConfirmSubmitCallback = null;
let currentConfirmAlternativeCallback = null;
let currentConfirmCancelCallback = null;

// Initialize application
document.addEventListener("DOMContentLoaded", async () => {
  try {
    accounts = await window.loadCredentialsFromIndexedDB();
    showToast("Credentials loaded successfully from secure IndexedDB store", "info");
  } catch (err) {
    console.error("IndexedDB load failed:", err);
    showToast("Error loading credentials from secure IndexedDB store", "error");
  }
  
  calculateStats();
  renderVault();

  // Setup Core Event Handlers
  setupListeners();
});

// Custom confirmation dialog controller
function showCustomConfirm({ title, message, confirmText = "Confirm", alternativeText = "", isDanger = true }, onSubmit, onAlternative = null, onCancel = null) {
  modalConfirmTitleEl.textContent = title;
  modalConfirmMessageEl.textContent = message;
  modalConfirmSubmitEl.textContent = confirmText;

  if (isDanger) {
    modalConfirmIconDangerEl.classList.remove("hidden");
    modalConfirmIconInfoEl.classList.add("hidden");
    modalConfirmSubmitEl.className = "cursor-pointer bg-gradient-to-r from-rose-600 to-rose-700 hover:from-rose-500 hover:to-rose-600 text-white text-xs font-semibold px-4.5 py-2.5 rounded-xl border border-rose-500/20 active:translate-y-[1px] transition-all";
  } else {
    modalConfirmIconDangerEl.classList.add("hidden");
    modalConfirmIconInfoEl.classList.remove("hidden");
    modalConfirmSubmitEl.className = "cursor-pointer bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-500 hover:to-indigo-600 text-white text-xs font-semibold px-4.5 py-2.5 rounded-xl border border-indigo-500/20 active:translate-y-[1px] transition-all";
  }

  if (alternativeText) {
    modalConfirmAlternativeEl.textContent = alternativeText;
    modalConfirmAlternativeEl.classList.remove("hidden");
  } else {
    modalConfirmAlternativeEl.classList.add("hidden");
  }

  currentConfirmSubmitCallback = onSubmit;
  currentConfirmAlternativeCallback = onAlternative;
  currentConfirmCancelCallback = onCancel;

  modalConfirmEl.classList.remove("hidden");
}

function hideCustomConfirm() {
  modalConfirmEl.classList.add("hidden");
  currentConfirmSubmitCallback = null;
  currentConfirmAlternativeCallback = null;
  currentConfirmCancelCallback = null;
}

// Calculate metrics beautifully
function calculateStats() {
  if (statMailboxesEl) {
    statMailboxesEl.textContent = accounts.length;
  }
  
  let totalSites = 0;
  let totalFields = 0;
  accounts.forEach(acc => {
    totalSites += (acc.subEntries || []).length;
    (acc.subEntries || []).forEach(sub => {
      totalFields += (sub.val || []).length;
    });
  });

  if (statSitesEl) {
    statSitesEl.textContent = totalSites;
  }
  if (statFieldsEl) {
    statFieldsEl.textContent = totalFields;
  }
}

// Show micro-toasts feedback
function showToast(message, type = "success") {
  const toastId = `toast-${Math.random().toString(36).substring(2, 9)}`;
  const toast = document.createElement("div");
  toast.id = toastId;
  toast.className = "flex items-center gap-3 bg-slate-900 border border-slate-800 text-slate-150 text-xs py-3 px-4.5 rounded-xl shadow-xl pointer-events-auto animate-slide-in relative overflow-hidden shrink-0 max-w-sm";
  
  // Left border alert indicator
  let leftColor = "bg-indigo-500";
  let iconHtml = ICONS.info;
  if (type === "success") {
    leftColor = "bg-emerald-500";
    iconHtml = ICONS.check;
  } else if (type === "error") {
    leftColor = "bg-rose-500";
    iconHtml = ICONS.exclamation;
  }

  toast.innerHTML = `
    <div class="absolute left-0 top-0 bottom-0 w-1 ${leftColor}"></div>
    <div class="text-slate-400 font-mono shrink-0">${iconHtml}</div>
    <div class="flex-1 font-sans text-slate-300 font-medium">${message}</div>
    <button onclick="this.parentElement.remove()" class="text-slate-500 hover:text-slate-300 ml-2 cursor-pointer transition-colors">
      <svg class="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
  `;

  toastContainerEl.appendChild(toast);

  // Auto clean up
  setTimeout(() => {
    toast.classList.add("opacity-0", "translate-x-4", "transition-all", "duration-500");
    setTimeout(() => {
      toast.remove();
    }, 500);
  }, 4500);
}

// Global Core Sync helpers
function syncToIndexedDB(newAccounts) {
  accounts = newAccounts;
  window.saveCredentialsToIndexedDB(newAccounts).catch(err => {
    console.error("IndexedDB write failed", err);
  });
  calculateStats();
  renderVault();
}

function generateRandomToken(length = 16, includeSymbols = true) {
  const alphaNum = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const symbols = "!@#$%^&*()_+~|";
  const chars = includeSymbols ? alphaNum + symbols : alphaNum;
  let token = "";
  for (let i = 0; i < length; i++) {
    token += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return token;
}

// Copy to clipboard helper
function copyTextToClipboard(text, successMsg) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(successMsg, "success");
    copiedId = text;
    renderVault(); // briefly show copied tick icon
    setTimeout(() => {
      if (copiedId === text) {
        copiedId = null;
        renderVault();
      }
    }, 2000);
  }).catch(err => {
    showToast("Failed copying value to clipboard", "error");
  });
}

// Root visual elements binder
function setupListeners() {
  // Quick Token Generator Card Actions
  const updateCharsetButtons = () => {
    if (generatorCharsetMode === "alphanumeric") {
      btnCharsetAlphanumericEl.className = "px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide transition-all cursor-pointer bg-indigo-600 text-white";
      btnCharsetAllEl.className = "px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide transition-all cursor-pointer bg-slate-900 text-slate-400 hover:text-slate-350";
    } else {
      btnCharsetAlphanumericEl.className = "px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide transition-all cursor-pointer bg-slate-900 text-slate-400 hover:text-slate-350";
      btnCharsetAllEl.className = "px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wide transition-all cursor-pointer bg-indigo-600 text-white";
    }
  };

  const generateToken = () => {
    const length = parseInt(tokenLengthSliderEl.value, 10) || 18;
    const includeSymbols = generatorCharsetMode === "all";
    const generated = generateRandomToken(length, includeSymbols);
    generatorTokenDisplayEl.value = generated;
    
    // Reset copy icon state if it was copied
    iconGeneratorCopyStateEl.innerHTML = `
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
    `;
  };

  tokenLengthSliderEl.addEventListener("input", (e) => {
    tokenLengthDisplayEl.textContent = e.target.value;
  });

  btnCharsetAlphanumericEl.addEventListener("click", () => {
    generatorCharsetMode = "alphanumeric";
    updateCharsetButtons();
    if (generatorTokenDisplayEl.value && generatorTokenDisplayEl.value !== "Click button to generate...") {
      generateToken();
    }
  });

  btnCharsetAllEl.addEventListener("click", () => {
    generatorCharsetMode = "all";
    updateCharsetButtons();
    if (generatorTokenDisplayEl.value && generatorTokenDisplayEl.value !== "Click button to generate...") {
      generateToken();
    }
  });

  btnTriggerGenerationEl.addEventListener("click", () => {
    generateToken();
    showToast("Generated high-strength secure token!", "success");
  });

  btnCopyGeneratorTokenEl.addEventListener("click", () => {
    const val = generatorTokenDisplayEl.value;
    if (!val || val === "Click button to generate...") {
      showToast("Please generate a token first", "error");
      return;
    }
    
    navigator.clipboard.writeText(val).then(() => {
      showToast("Token copied to clipboard!", "success");
      iconGeneratorCopyStateEl.innerHTML = `
        <polyline points="20 6 9 17 4 12"/>
      `;
      setTimeout(() => {
        iconGeneratorCopyStateEl.innerHTML = `
          <rect width="14" height="14" x="8" y="8" rx="2" ry="2"/>
          <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/>
        `;
      }, 2000);
    }).catch(() => {
      showToast("Failed to copy token", "error");
    });
  });

  // Real-time keyword filter
  searchInputEl.addEventListener("input", (e) => {
    searchQuery = e.target.value.toLowerCase().trim();
    renderVault();
  });

  // Export JSON Click
  btnExportEl.addEventListener("click", () => {
    if (accounts.length === 0) {
      showToast("No credentials available to export", "error");
      return;
    }
    window.exportToJSONFile(accounts);
    showToast("Exported credentials template successfully!", "success");
  });

  // Import Action Trigger
  btnImportTriggerEl.addEventListener("click", () => {
    fileUploaderEl.click();
  });

  // Load imported backup
  fileUploaderEl.addEventListener("change", (e) => {
    handleImportFiles(e.target.files);
  });

  // Drag and Drop files upload event
  window.addEventListener("dragover", (e) => {
    e.preventDefault();
    dragDropZoneEl.classList.remove("hidden");
  });

  dragDropZoneEl.addEventListener("dragleave", (e) => {
    e.preventDefault();
    dragDropZoneEl.classList.add("hidden");
  });

  dragDropZoneEl.addEventListener("drop", (e) => {
    e.preventDefault();
    dragDropZoneEl.classList.add("hidden");
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleImportFiles(e.dataTransfer.files);
    }
  });

  // Modal open creation
  btnCreateEl.addEventListener("click", () => {
    modalCreateEl.classList.remove("hidden");
    document.getElementById("form-create-email").focus();
  });

  // Modal close trigger
  modalCloseEl.addEventListener("click", () => {
    modalCreateEl.classList.add("hidden");
  });
  modalCancelEl.addEventListener("click", () => {
    modalCreateEl.classList.add("hidden");
  });

  // Quick Random Token generation in Modal
  btnGeneratePwdEl.addEventListener("button", (e) => e.preventDefault());
  btnGeneratePwdEl.addEventListener("click", (e) => {
    e.preventDefault();
    const generated = generateRandomToken(18);
    document.getElementById("form-create-password").value = generated;
    showToast("Generated high-strength 18-character access password!", "info");
  });

  // Handle Parent Mailbox container creation entry
  modalFormEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("form-create-email").value.trim();
    const pwd = document.getElementById("form-create-password").value.trim();
    const note = document.getElementById("form-create-note").value.trim();

    if (!email || !pwd) {
      showToast("Please provide both email and main account password.", "error");
      return;
    }

    const isExist = accounts.some(acc => acc.email.toLowerCase() === email.toLowerCase());
    if (isExist) {
      showToast(`A mail card for "${email}" already exists.`, "error");
      return;
    }

    const newAccount = {
      id: Math.random().toString(36).substring(2, 11),
      email,
      emailPassword: pwd,
      note: note || undefined,
      subEntries: []
    };

    const updated = [newAccount, ...accounts];
    syncToIndexedDB(updated);
    showToast(`Created mailbox container for "${email}"!`, "success");

    // Clear and hidden
    modalFormEl.reset();
    modalCreateEl.classList.add("hidden");
  });

  // Custom Confirmation Modal Button Actions
  modalConfirmCancelEl.addEventListener("click", () => {
    if (typeof currentConfirmCancelCallback === "function") {
      currentConfirmCancelCallback();
    }
    hideCustomConfirm();
  });

  modalConfirmAlternativeEl.addEventListener("click", () => {
    if (typeof currentConfirmAlternativeCallback === "function") {
      currentConfirmAlternativeCallback();
    }
    hideCustomConfirm();
  });

  modalConfirmSubmitEl.addEventListener("click", () => {
    if (typeof currentConfirmSubmitCallback === "function") {
      currentConfirmSubmitCallback();
    }
    hideCustomConfirm();
  });

  // EVENT DELEGATION FOR ALL RENDERING CARDS
  accountsVaultEl.addEventListener("click", (e) => {
    const target = e.target.closest("[data-action]");
    if (!target) return;

    const action = target.getAttribute("data-action");
    const accountId = target.getAttribute("data-account-id");
    const subKey = target.getAttribute("data-sub-key");
    const fieldKey = target.getAttribute("data-field-key");

    // 1. Toggle primary card visibility
    if (action === "toggle-account") {
      expandedAccountIds[accountId] = !expandedAccountIds[accountId];
      renderVault();
    }

    // 2. Hide/Reveal primary password
    if (action === "toggle-primary-pwd") {
      visiblePrimaryIds[accountId] = !visiblePrimaryIds[accountId];
      renderVault();
    }

    // 3. Copy primary password
    if (action === "copy-primary-pwd") {
      const parent = accounts.find(a => a.id === accountId);
      if (parent) {
        copyTextToClipboard(parent.emailPassword, "Copied mailbox password to clipboard!");
      }
    }

    // 4. Delete entire primary email account
    if (action === "delete-account") {
      const parent = accounts.find(a => a.id === accountId);
      if (parent) {
        showCustomConfirm({
          title: "Delete Mailbox Container",
          message: `Are you sure you want to completely delete "${parent.email}" and all of its linked site credentials? This action is permanent and cannot be undone.`,
          confirmText: "Delete Account",
          isDanger: true
        }, () => {
          const filtered = accounts.filter(a => a.id !== accountId);
          syncToIndexedDB(filtered);
          showToast(`Mailbox "${parent.email}" removed.`, "info");
        });
      }
    }

    // 5. Toggle sub-entry collapse
    if (action === "toggle-subentry") {
      const subUnique = accountId + "::" + subKey;
      expandedSubEntryIds[subUnique] = !expandedSubEntryIds[subUnique];
      renderVault();
    }

    // 6. Delete sub-entry site
    if (action === "delete-subentry") {
      const parent = accounts.find(a => a.id === accountId);
      if (parent) {
        const sub = parent.subEntries.find(s => s.key === subKey);
        if (sub) {
          showCustomConfirm({
            title: "Delete Linked Site",
            message: `Are you sure you want to delete the site entry "${sub.key}" on mailbox ${parent.email}?`,
            confirmText: "Delete Entry",
            isDanger: true
          }, () => {
            parent.subEntries = parent.subEntries.filter(s => s.key !== subKey);
            syncToIndexedDB([...accounts]);
            showToast(`Removed site metadata link: "${sub.key}"`, "info");
          });
        }
      }
    }

    // 7. Toggle field value visibility representation
    if (action === "toggle-field-pwd") {
      const fieldUnique = accountId + "::" + subKey + "::" + fieldKey;
      visibleFieldIds[fieldUnique] = !visibleFieldIds[fieldUnique];
      renderVault();
    }

    // 8. Copy property field value
    if (action === "copy-field-val") {
      const val = target.getAttribute("data-val");
      const key = target.getAttribute("data-key");
      copyTextToClipboard(val, `Copied "${key}" to clipboard!`);
    }

    // 9. Delete custom field attribute key-value pair
    if (action === "delete-field") {
      const parent = accounts.find(a => a.id === accountId);
      if (parent) {
        const sub = parent.subEntries.find(s => s.key === subKey);
        if (sub) {
          const field = (sub.val || []).find(f => f.key === fieldKey);
          const fieldName = field ? field.key : "attribute";
          showCustomConfirm({
            title: "Delete Attribute Field",
            message: `Are you sure you want to delete the custom attribute "${fieldName}"?`,
            confirmText: "Delete Attribute",
            isDanger: true
          }, () => {
            sub.val = (sub.val || []).filter(f => f.key !== fieldKey);
            syncToIndexedDB([...accounts]);
            showToast(`Deleted attribute field`, "info");
          });
        }
      }
    }

    // 10. Toggle Create Subentry Form
    if (action === "toggle-new-sub-form") {
      showCreateSubFormIds[accountId] = !showCreateSubFormIds[accountId];
      renderVault();
    }
  });

  // SUBMIT EVENTS WITH CUSTOM BUTTON DELEGATIONS (due to dynamic forms)
  accountsVaultEl.addEventListener("submit", (e) => {
    e.preventDefault();
    const actionForm = e.target.getAttribute("data-form-type");
    const accountId = e.target.getAttribute("data-account-id");

    if (actionForm === "new-subentry") {
      const parent = accounts.find(a => a.id === accountId);
      if (!parent) return;

      const keyInput = e.target.querySelector(".field-sub-key");
      const noteInput = e.target.querySelector(".field-sub-note");

      const key = keyInput.value.trim().toLowerCase();
      const note = noteInput.value.trim();

      if (!key) {
        showToast("Site Address link/identifier is required", "error");
        return;
      }

      // Check duplicate key
      const isDuplicated = parent.subEntries.some(s => s.key.toLowerCase() === key);
      if (isDuplicated) {
        showToast(`Site link "${key}" is already mapped in this mailbox.`, "error");
        return;
      }

      const newSub = {
        key,
        note: note || undefined,
        values: []
      };

      parent.subEntries.push(newSub);
      showCreateSubFormIds[accountId] = false;
      syncToIndexedDB([...accounts]);
      showToast(`Linked portal metadata: "${key}"`, "success");
    }

    if (actionForm === "new-field") {
      const parent = accounts.find(a => a.id === accountId);
      if (!parent) return;

      const subKey = e.target.getAttribute("data-sub-key");
      const sub = parent.subEntries.find(s => s.key === subKey);
      if (!sub) return;

      const keyInput = e.target.querySelector(".attr-key-input");
      const valInput = e.target.querySelector(".attr-val-input");
      const noteInput = e.target.querySelector(".attr-note-input");

      const k = keyInput.value.trim().toLowerCase();
      const v = valInput.value.trim();
      const n = noteInput.value.trim();

      if (!k || !v) {
        showToast("Both Attribute Key and Password/Value are required.", "error");
        return;
      }

      // If value is multiline, store as array
      const finalVal = v.includes('\n') ? v.split('\n') : v;

      if (!sub.val) {
        sub.val = [];
      }

      sub.val.push({
        key: k,
        val: finalVal,
        note: n || undefined
      });

      syncToIndexedDB([...accounts]);
      showToast(`Encrypted attribute "${k}" added!`, "success");
    }
  });
}

// Handle imported files
function handleImportFiles(files) {
  if (!files || files.length === 0) return;

  const file = files[0];
  const reader = new FileReader();
  reader.onload = (event) => {
    try {
      const text = event.target.result;
      const parsed = JSON.parse(text);
      const validated = window.validateImportedData(parsed);

      if (!validated) {
        showToast("Invalid JSON container layout. Check schema mapping rules.", "error");
        return;
      }

      showCustomConfirm({
        title: "Import Options",
        message: `Loaded ${validated.length} mailbox entries from file. Please choose how to apply them to your database:\n\n• Merge: Add new entries and custom site attributes into your current list.\n• Overwrite: Completely replace your existing credentials with the imported file.`,
        confirmText: "Merge with Current",
        alternativeText: "Overwrite Vault completely",
        isDanger: false
      }, () => {
        const merged = [...accounts];
        validated.forEach(newEntry => {
          const index = merged.findIndex(m => m.email.toLowerCase() === newEntry.email.toLowerCase());
          if (index !== -1) {
            // merge subentries
            const existingSubs = [...merged[index].subEntries];
            newEntry.subEntries.forEach(newSub => {
              const subIdx = existingSubs.findIndex(s => s.key.toLowerCase() === newSub.key.toLowerCase());
              if (subIdx !== -1) {
                // merge custom attributes
                const existingValues = [...(existingSubs[subIdx].val || [])];
                (newSub.val || []).forEach(f => {
                  const valDisplay1 = window.getDisplayValue(f.val).toLowerCase();
                  const hasField = existingValues.some(x => x.key.toLowerCase() === f.key.toLowerCase() && window.getDisplayValue(x.val).toLowerCase() === valDisplay1);
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
        syncToIndexedDB(merged);
        showToast(`Successfully merged ${validated.length} mailboxes!`, "success");
      }, () => {
        syncToIndexedDB(validated);
        showToast(`Successfully overwritten vault with ${validated.length} mailboxes!`, "success");
      });
    } catch (e) {
      showToast(`Error reading file: ${e.message}`, "error");
    }
  };
  reader.readAsText(file);
}

// Master Render loop
function renderVault() {
  const filtered = accounts.filter(acc => {
    if (!searchQuery) return true;

    // Filter to only match sub-entries (site names) containing the query
    return (acc.subEntries || []).some(sub => {
      return sub.key.toLowerCase().includes(searchQuery);
    });
  });

  if (filtered.length === 0) {
    accountsVaultEl.innerHTML = `
      <div class="text-center py-20 bg-slate-900/10 border border-slate-900/60 rounded-2xl">
        <div class="inline-flex w-12 h-12 rounded-xl bg-slate-900 items-center justify-center text-slate-500 mb-3 border border-slate-800">
          <svg class="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
        </div>
        <h4 class="text-xs uppercase tracking-wider font-bold text-slate-400">No active vault matches</h4>
        <p class="text-[11px] text-slate-600 mt-1 max-w-sm mx-auto">Try refining your filter search or restore the sample maps to preview credentials mapping.</p>
      </div>
    `;
    return;
  }

  accountsVaultEl.innerHTML = "";

  filtered.forEach(acc => {
    const isExpanded = searchQuery ? true : !!expandedAccountIds[acc.id];
    const isPrimaryVisible = !!visiblePrimaryIds[acc.id];
    const isShowNewSubForm = !!showCreateSubFormIds[acc.id];

    const card = document.createElement("div");
    card.id = `account-card-${acc.id}`;
    card.className = "bg-slate-900/50 border border-slate-800/60 rounded-2xl overflow-hidden transition-all hover:border-slate-800";

    // Build subentry lists cards - filter to only display those matching the text query
    let subentriesHtml = "";
    const displaySubEntries = (acc.subEntries || []).filter(sub => {
      if (!searchQuery) return true;
      return sub.key.toLowerCase().includes(searchQuery);
    });

    if (displaySubEntries.length === 0) {
      subentriesHtml = `
        <div class="text-center py-8 bg-slate-900/35 border border-dashed border-slate-800/60 rounded-xl">
          <p class="text-[11px] text-slate-500 font-mono italic">No matching site entries found in this mailbox.</p>
        </div>
      `;
    } else {
      subentriesHtml = `
        <div class="grid grid-cols-1 gap-4 pl-6 border-l border-slate-800/60" id="subentries-list-${acc.id}">
          ${displaySubEntries.map(sub => {
            const subUnique = acc.id + "::" + sub.key;
            const isSubExpanded = searchQuery ? true : !!expandedSubEntryIds[subUnique]; // defaults to false
            
            // Build key-value fields inside the site entry
            let fieldsHtml = "";
            const subValuesList = sub.val || [];
            if (subValuesList.length === 0) {
              fieldsHtml = `<p class="text-[10px] text-slate-500 font-mono italic p-3 text-center">No field-value pairings configured yet.</p>`;
            } else {
              fieldsHtml = `
                <div class="divide-y divide-slate-900/30 border border-slate-900/50 rounded-xl overflow-hidden bg-slate-850/20">
                  ${subValuesList.map(f => {
                    const fieldUnique = acc.id + "::" + sub.key + "::" + f.key;
                    const isFieldVisible = !!visibleFieldIds[fieldUnique];
                    const valStr = window.getDisplayValue(f.val);
                    const isCopied = copiedId === valStr;

                    return `
                      <div id="field-row-${escapeHtml(fieldUnique)}" class="p-2.5 px-4 flex items-center justify-between gap-4 hover:bg-slate-800/15 transition-colors">
                        
                        <!-- Horizontal key-value rows -->
                        <div class="min-w-0 flex-1 flex items-center gap-4">
                          
                          <!-- Attribute Key -->
                          <div class="w-24 md:w-32 shrink-0 truncate">
                            <span class="text-xs uppercase font-semibold tracking-wider text-slate-300 font-mono bg-slate-900 px-2 py-0.5 rounded border border-slate-800/80 inline-block max-w-full truncate" title="${escapeHtml(f.key)}">
                              ${escapeHtml(f.key)}
                            </span>
                          </div>

                          <!-- Hidden / Revealed value -->
                          <div class="flex-1 font-mono text-sm max-w-full truncate flex items-center">
                            ${isFieldVisible ? `<div class="whitespace-pre-line text-emerald-300 font-semibold tracking-wider bg-emerald-500/5 px-2.5 py-1 rounded border border-emerald-500/10 text-sm break-all leading-normal text-left">${escapeHtml(valStr)}</div>` : `
                              <span class="text-slate-500 tracking-widest bg-slate-900/60 px-2.5 py-1 rounded text-sm select-none">••••••••••••</span>
                            `}

                            ${f.note ? `
                              <span class="text-xs text-slate-550 italic ml-2 hidden sm:inline" title="${escapeHtml(f.note)}">
                                (${escapeHtml(f.note)})
                              </span>
                            ` : ''}
                          </div>

                        </div>

                        <!-- Same-row actions triggers -->
                        <div class="flex items-center gap-1.5 shrink-0">
                          
                          <!-- Reveal -->
                          <button 
                            data-action="toggle-field-pwd" 
                            data-account-id="${acc.id}"
                            data-sub-key="${escapeHtml(sub.key)}"
                            data-field-key="${escapeHtml(f.key)}"
                            class="p-1.5 text-slate-550 hover:text-slate-300 hover:bg-slate-900/60 rounded border border-transparent hover:border-slate-800/60 cursor-pointer transition-colors inline-flex items-center justify-center"
                            title="${isFieldVisible ? 'Hide Value' : 'Show Value'}"
                          >
                            ${isFieldVisible ? ICONS.eyeOff : ICONS.eye}
                          </button>

                          <!-- Clipboard -->
                          <button 
                            data-action="copy-field-val" 
                            data-account-id="${acc.id}"
                            data-sub-key="${escapeHtml(sub.key)}"
                            data-field-key="${escapeHtml(f.key)}"
                            data-val="${escapeHtml(valStr)}"
                            data-key="${escapeHtml(f.key)}"
                            class="p-1.5 text-slate-550 hover:text-slate-300 hover:bg-slate-900/60 rounded border border-transparent hover:border-slate-800/60 cursor-pointer transition-colors inline-flex items-center justify-center"
                            title="Copy Value"
                          >
                            ${isCopied ? ICONS.check : ICONS.copy}
                          </button>

                          <!-- Trash -->
                          <button 
                            data-action="delete-field" 
                            data-account-id="${acc.id}"
                            data-sub-key="${escapeHtml(sub.key)}"
                            data-field-key="${escapeHtml(f.key)}"
                            class="p-1.5 text-slate-600 hover:text-rose-450 hover:bg-rose-950/20 rounded border border-transparent hover:border-rose-900/15 cursor-pointer transition-colors inline-flex items-center justify-center"
                            title="Delete Attribute"
                          >
                            ${ICONS.trash}
                          </button>

                        </div>

                      </div>
                    `;
                  }).join('')}
                </div>
              `;
            }

            return `
              <div 
                key="${escapeHtml(sub.key)}" 
                id="sub-entry-${escapeHtml(subUnique)}"
                class="bg-slate-800/20 border border-slate-900/50 rounded-xl overflow-hidden transition-all duration-300 hover:border-slate-800"
              >
                <!-- Accordion title bar -->
                <div 
                  data-action="toggle-subentry" 
                  data-account-id="${acc.id}"
                  data-sub-key="${escapeHtml(sub.key)}"
                  class="flex items-center justify-between p-3.5 px-4 bg-slate-900/40 border-b border-slate-900/50 cursor-pointer hover:bg-slate-900/80 transition-colors select-none"
                >
                  <div class="flex items-center gap-2.5">
                    <span class="text-indigo-400 font-mono shrink-0">${ICONS.globe}</span>
                    <div class="truncate flex flex-col gap-0.5">
                      <div class="flex items-center gap-2 flex-wrap">
                        <span class="text-sm font-bold tracking-tight text-slate-200 font-mono">${escapeHtml(sub.key)}</span>
                        <a 
                          href="${sub.key.includes('://') ? sub.key : 'https://' + sub.key}" 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          onclick="event.stopPropagation()" 
                          class="inline-flex items-center gap-1 text-[10.5px] bg-slate-950/60 hover:bg-indigo-600/25 px-1.5 py-0.5 rounded-md border border-slate-800/80 hover:border-indigo-500/30 text-indigo-400 hover:text-indigo-300 font-mono font-medium transition-all"
                        >
                          Visit <svg xmlns="http://www.w3.org/2050/svg" class="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" x2="21" y1="14" y2="3"/></svg>
                        </a>
                      </div>
                      ${sub.note ? `<span class="block text-[11px] text-slate-400 font-sans italic truncate max-w-xs md:max-w-md">${escapeHtml(sub.note)}</span>` : ""}
                    </div>
                  </div>

                  <div class="flex items-center gap-2" onclick="event.stopPropagation()">
                    <!-- Delete site -->
                    <button 
                      data-action="delete-subentry" 
                      data-account-id="${acc.id}" 
                      data-sub-key="${escapeHtml(sub.key)}"
                      class="p-1.5 text-slate-550 hover:text-rose-450 hover:bg-rose-950/20 rounded border border-transparent hover:border-rose-900/15 cursor-pointer transition-colors inline-flex items-center justify-center"
                      title="Remove Site Link"
                    >
                      ${ICONS.trash}
                    </button>
                    <span class="text-slate-500 hover:text-slate-300">
                      ${isSubExpanded ? ICONS.chevronUp : ICONS.chevronDown}
                    </span>
                  </div>
                </div>

                <!-- Accordion details content -->
                <div class="${isSubExpanded ? '' : 'hidden'} overflow-hidden bg-slate-900/10">
                  <div class="p-4 space-y-4">
                    
                    <!-- Attributes mapping index -->
                    ${fieldsHtml}

                    <!-- Inline addition form -->
                    <form 
                      data-form-type="new-field"
                      data-account-id="${acc.id}"
                      data-sub-key="${escapeHtml(sub.key)}"
                      class="bg-slate-800/10 p-3.5 rounded-xl border border-slate-900/40 space-y-3"
                    >
                      <span class="block text-[10px] font-bold text-slate-400 uppercase tracking-wider">Insert custom credential attributes</span>
                      <div class="flex flex-col sm:flex-row items-stretch gap-2">
                        <input 
                          type="text" 
                          placeholder="Key name (e.g. username)" 
                          required 
                          class="attr-key-input w-full sm:w-1/3 bg-slate-950 border border-slate-800 focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/20 text-[11px] p-2 rounded-lg outline-none font-mono text-slate-200"
                        />
                        <textarea 
                          placeholder="Password / attribute value" 
                          required 
                          rows="1"
                          class="attr-val-input w-full sm:flex-1 bg-slate-950 border border-slate-800 focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/20 text-[11px] p-2 rounded-lg outline-none font-mono text-slate-200 resize-y min-h-[34px]"
                        ></textarea>
                        <input 
                          type="text" 
                          placeholder="Short note" 
                          class="attr-note-input w-full sm:w-1/4 bg-slate-950 border border-slate-800 focus:border-indigo-500/40 focus:ring-1 focus:ring-indigo-500/20 text-[11px] p-2 rounded-lg outline-none text-slate-200"
                        />
                        <button 
                          type="submit" 
                          class="cursor-pointer bg-indigo-650 hover:bg-indigo-600 text-white text-[11px] px-3.5 py-2 rounded-lg border border-indigo-500/10 w-full sm:w-auto font-bold inline-flex items-center justify-center gap-1.5 transition-all"
                        >
                          ${ICONS.plus}
                          <span class="align-middle">Add</span>
                        </button>
                      </div>
                    </form>

                  </div>
                </div>
              </div>
            `;
          }).join('')}
        </div>
      `;
    }

    // Compose container template
    card.innerHTML = `
      <!-- Container header -->
      <div 
        data-action="toggle-account" 
        data-account-id="${acc.id}"
        class="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer hover:bg-slate-900/20 transition-colors select-none"
      >
        <div class="flex items-start gap-4 min-w-0 flex-1">
          <div class="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 shrink-0">
            ${ICONS.key}
          </div>
          <div class="min-w-0 flex-1">
            <h2 class="text-sm font-bold tracking-wide text-slate-200 truncate font-mono">${acc.email}</h2>
            
            <div class="flex items-center gap-3 mt-1 flex-wrap">
              ${acc.note ? `
                <span class="text-[10px] text-indigo-300/80 font-sans italic max-w-xs md:max-w-md truncate" title="${escapeHtml(acc.note)}">
                  ${escapeHtml(acc.note)}
                </span>
              ` : ""}
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between md:justify-end gap-3" onclick="event.stopPropagation()">
          <span class="text-[10px] font-bold font-mono uppercase bg-slate-900 px-2 py-1 rounded border border-slate-800 text-slate-400">
            ${acc.subEntries.length} site${acc.subEntries.length === 1 ? '' : 's'}
          </span>

          <span class="text-slate-500 hover:text-slate-300">
            ${isExpanded ? ICONS.chevronUp : ICONS.chevronDown}
          </span>
        </div>
      </div>

      <!-- Collapsible Container Details -->
      <div class="${isExpanded ? '' : 'hidden'} border-t border-slate-900 bg-slate-950/40 p-6 space-y-6">
        
        <!-- Primary detail row -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          <div class="bg-slate-900/60 p-4 rounded-xl border border-slate-900/80 flex flex-col justify-between">
            <div>
              <span class="text-[9px] uppercase font-bold tracking-wider text-slate-500 font-mono">Mailbox identifier</span>
              <p class="text-xs font-bold font-mono text-slate-300 mt-1 select-all break-all">${acc.email}</p>
            </div>
          </div>

          <div class="bg-slate-900/60 p-4 rounded-xl border border-slate-900/80 flex flex-col justify-between">
            <span class="text-[9px] uppercase font-bold tracking-wider text-slate-500 font-mono">Primary access token</span>
            
            <div class="flex items-center gap-2 mt-2 font-mono text-xs w-full">
              ${isPrimaryVisible ? `
                <span class="text-indigo-300 tracking-wider font-semibold font-mono bg-indigo-950/30 border border-indigo-900/55 rounded-lg px-3 py-1.5 flex-1 min-w-0 truncate select-all">
                  ${escapeHtml(acc.emailPassword)}
                </span>
              ` : `
                <span class="text-slate-500 tracking-widest bg-slate-950/80 border border-slate-900 rounded-lg px-3 py-1.5 flex-1 select-none font-mono">••••••••••••••••••••••••</span>
              `}

              <!-- Visibility toggle -->
              <button 
                data-action="toggle-primary-pwd" 
                data-account-id="${acc.id}"
                class="p-2 border border-slate-800 hover:border-slate-700 hover:bg-slate-850 rounded-lg text-slate-400 cursor-pointer transition-colors inline-flex items-center justify-center"
                title="${isPrimaryVisible ? 'Hide Password' : 'Show Password'}"
              >
                ${isPrimaryVisible ? ICONS.eyeOff : ICONS.eye}
              </button>

              <!-- Copy to clipboard -->
              <button 
                data-action="copy-primary-pwd" 
                data-account-id="${acc.id}"
                class="p-2 border border-slate-800 hover:border-slate-700 hover:bg-slate-850 rounded-lg text-slate-400 cursor-pointer transition-colors inline-flex items-center justify-center"
                title="Copy Password"
              >
                ${copiedId === acc.emailPassword ? ICONS.check : ICONS.copy}
              </button>
            </div>
          </div>

        </div>

        <!-- Nested linked sites section -->
        <div class="space-y-4">
          <div class="flex items-center justify-between border-b border-slate-900 pb-2">
            <h4 class="text-[10px] font-bold text-slate-400 uppercase tracking-wider font-mono">Mapped Sites & Sub-credentials</h4>
            
            <button 
              data-action="toggle-new-sub-form" 
              data-account-id="${acc.id}"
              class="cursor-pointer text-[10px] font-bold tracking-tight text-indigo-400 hover:text-indigo-300 inline-flex items-center gap-1 uppercase"
            >
              ${isShowNewSubForm ? 'Close form' : `${ICONS.plus} <span class="align-middle">Link Custom Site Key</span>`}
            </button>
          </div>

          <!-- Add new site form -->
          <div class="${isShowNewSubForm ? '' : 'hidden'} bg-slate-900/60 p-4 border border-slate-850 rounded-xl max-w-lg mb-2">
            <form data-form-type="new-subentry" data-account-id="${acc.id}" class="space-y-3.5">
              <span class="block text-[10px] font-bold text-indigo-400 uppercase tracking-wider">Link Website or portal container</span>
              
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label class="block text-[9px] uppercase font-bold text-slate-500 mb-1.5 font-mono">Site address/key *</label>
                  <input 
                    type="text" 
                    placeholder="e.g. github.com, netflix, aws-console" 
                    required
                    class="field-sub-key w-full bg-slate-950 border border-slate-850 focus:border-indigo-500/40 text-xs p-2.5 rounded-lg outline-none font-mono text-slate-200"
                  />
                </div>
                <div>
                  <label class="block text-[9px] uppercase font-bold text-slate-500 mb-1.5 font-mono">Short note</label>
                  <input 
                    type="text" 
                    placeholder="Short description" 
                    class="field-sub-note w-full bg-slate-950 border border-slate-850 focus:border-indigo-500/40 text-xs p-2.5 rounded-lg outline-none text-slate-200"
                  />
                </div>
              </div>

              <div class="flex justify-end gap-2 pt-1.5">
                <button 
                  type="button" 
                  data-action="toggle-new-sub-form" 
                  data-account-id="${acc.id}"
                  class="cursor-pointer bg-slate-950 hover:bg-slate-900 border border-slate-850 text-slate-400 text-[10px] font-bold px-3 py-2 rounded-lg transition-colors"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  class="cursor-pointer bg-indigo-650 hover:bg-indigo-600 text-white text-[10px] font-bold px-4 py-2 rounded-lg border border-indigo-500/10 transition-all inline-flex items-center justify-center gap-1.5"
                >
                  ${ICONS.plus}
                  <span class="align-middle">Create Site Link</span>
                </button>
              </div>
            </form>
          </div>

          <!-- List output -->
          ${subentriesHtml}

        </div>

      </div>
    `;

    accountsVaultEl.appendChild(card);
  });
}

// Simple HTML Escaper
function escapeHtml(text) {
  if (typeof text !== 'string') return '';
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&text-rose-450;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
