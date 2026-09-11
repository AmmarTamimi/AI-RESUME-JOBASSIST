// // extension/background.js
// chrome.runtime.onMessageExternal.addListener((message, sender, sendResponse) => {
//   if (message.type === "PING") {
//     sendResponse({ ok: true });
//     return;
//   }
//   if (message.type === "SET_PROFILE") {
//     chrome.storage.local.set({ profile: message.profile }, () => sendResponse({ ok: true }));
//     return true; // async response
//   }
// });