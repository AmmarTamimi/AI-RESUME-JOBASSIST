// // app/lib/extensionBridge.ts
// const EXTENSION_ID = "your-published-extension-id"; // from Chrome Web Store / unpacked dev ID

// export interface AutofillProfile {
//   fullName: string;
//   firstName: string;
//   lastName: string;
//   email: string;
//   phone?: string;
//   location?: string;
//   website?: string;
//   linkedin?: string;
//   resumeFileName: string;
//   resumeBase64: string; // data: URL, fetched from your existing PDF export route
// }

// export async function isExtensionInstalled(): Promise<boolean> {
//   if (typeof chrome === "undefined" || !chrome.runtime?.sendMessage) return false;
//   return new Promise((resolve) => {
//     chrome.runtime.sendMessage(EXTENSION_ID, { type: "PING" }, (res) => {
//       resolve(!chrome.runtime.lastError && res?.ok === true);
//     });
//   });
// }

// export async function pushProfileToExtension(profile: AutofillProfile): Promise<void> {
//   if (typeof chrome === "undefined" || !chrome.runtime?.sendMessage) return;
//   chrome.runtime.sendMessage(EXTENSION_ID, { type: "SET_PROFILE", profile });
// }