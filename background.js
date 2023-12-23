chrome.action.onClicked.addListener(async () => {
   const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
   if (tab) {
      chrome.scripting.executeScript({
         target: {tabId: tab.id, allFrames: true},
         files: ['content_scripts/cscript.js'],
      });
   }
 });

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'storageCleaner',
    title: 'Storage Cleaner',
    contexts: ['page']
  });
});
 
 chrome.contextMenus.onClicked.addListener((info, tab) => {
   if (info.menuItemId === 'storageCleaner') {
     chrome.storage.local.get(['local', 'session', 'cookies'], (result) => {
       if (result.local) {
         chrome.scripting.executeScript({
           target: { tabId: tab.id },
           func: () => { localStorage.clear(); }
         });
       }
       if (result.session) {
         chrome.scripting.executeScript({
           target: { tabId: tab.id },
           func: () => { sessionStorage.clear(); }
         });
       }
       if (result.cookies) {
         chrome.cookies.getAll({ domain: tab.url }, (cookies) => {
           cookies.forEach((cookie) => {
             chrome.cookies.remove({
               url: `${cookie.secure ? 'https://' : 'http://'}${cookie.domain}${cookie.path}`,
               name: cookie.name
             });
           });
         });
       }
       chrome.tabs.reload(tab.id);
     });
   }
 });
 
 