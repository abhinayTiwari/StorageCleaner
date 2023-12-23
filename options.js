document.addEventListener('DOMContentLoaded', () => {
   const localCheckbox = document.getElementById('local');
   const sessionCheckbox = document.getElementById('session');
   const cookiesCheckbox = document.getElementById('cookies');
   const saveButton = document.getElementById('save');
 
   saveButton.addEventListener('click', () => {
     chrome.storage.local.set({
       local: localCheckbox.checked,
       session: sessionCheckbox.checked,
       cookies: cookiesCheckbox.checked
     }, () => {
      //  console.log('Settings saved!');
       window.close(); 
     });
   });
 
   chrome.storage.local.get(['local', 'session', 'cookies'], (result) => {
     localCheckbox.checked = result.local ?? true;
     sessionCheckbox.checked = result.session ?? true;
     cookiesCheckbox.checked = result.cookies ?? true;
   });
 });
 