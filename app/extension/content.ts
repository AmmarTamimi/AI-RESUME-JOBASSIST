// // extension/content.js
// (async function () {
//   const { profile } = await chrome.storage.local.get("profile");
//   if (!profile) return;

//   // Ashby renders its form client-side after load — wait for real inputs to exist.
//   const form = await waitFor(() => document.querySelector("form"), 8000);
//   if (!form) return;

//   const FIELD_RULES = [
//     { keys: ["first name"], value: profile.firstName },
//     { keys: ["last name"], value: profile.lastName },
//     { keys: ["full name", "name"], value: profile.fullName },
//     { keys: ["email"], value: profile.email },
//     { keys: ["phone"], value: profile.phone },
//     { keys: ["location", "city"], value: profile.location },
//     { keys: ["linkedin"], value: profile.linkedin },
//     { keys: ["website", "portfolio"], value: profile.website },
//   ];

//   const inputs = form.querySelectorAll("input, textarea, select");
//   inputs.forEach((el) => {
//     if (el.type === "file") {
//       highlightFileInput(el, profile);
//       return;
//     }
//     const label = getFieldLabel(el).toLowerCase();
//     if (!label) return;

//     const rule = FIELD_RULES.find((r) => r.keys.some((k) => label.includes(k)));
//     if (rule?.value) fillField(el, rule.value);
//   });
// })();

// function waitFor(fn, timeoutMs) {
//   return new Promise((resolve) => {
//     const start = Date.now();
//     const tick = () => {
//       const result = fn();
//       if (result) return resolve(result);
//       if (Date.now() - start > timeoutMs) return resolve(null);
//       requestAnimationFrame(tick);
//     };
//     tick();
//   });
// }

// function getFieldLabel(el) {
//   if (el.getAttribute("aria-label")) return el.getAttribute("aria-label");
//   if (el.placeholder) return el.placeholder;
//   if (el.id) {
//     const lbl = document.querySelector(`label[for="${el.id}"]`);
//     if (lbl) return lbl.textContent || "";
//   }
//   const parentLabel = el.closest("label");
//   if (parentLabel) return parentLabel.textContent || "";
//   return "";
// }

// function fillField(el, value) {
//   const nativeSetter = Object.getOwnPropertyDescriptor(
//     el.tagName === "TEXTAREA" ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype,
//     "value"
//   )?.set;
//   nativeSetter?.call(el, value); // React/controlled inputs need the native setter, not `.value =`
//   el.dispatchEvent(new Event("input", { bubbles: true }));
//   el.dispatchEvent(new Event("change", { bubbles: true }));
// }

// // File inputs: can't be set by JS. Visually flag it so the user knows exactly
// // where to click, and pre-copy the filename to the clipboard as a nicety.
// function highlightFileInput(el, profile) {
//   el.style.outline = "3px solid #F59E0B";
//   el.style.outlineOffset = "2px";
//   const hint = document.createElement("div");
//   hint.textContent = `⬆ Upload your resume here (${profile.resumeFileName})`;
//   hint.style.cssText =
//     "color:#F59E0B;font-size:12px;font-weight:600;margin-top:4px;font-family:sans-serif;";
//   el.insertAdjacentElement("afterend", hint);
// }