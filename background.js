// let color = '#3aa757';

// chrome.runtime.onInstalled.addListener(() => {
//   chrome.storage.sync.set({ color });
//   console.log('Default background color set to %cgreen', `color: ${color}`);
// });

// chrome.tabs.executeScript(null, {file:"foreground.js"}, () => console.log("injected"))
// console.log("from background")

// chrome.tabs.onActivated.addListener(tab => {
//   console.log(tab)
// });

let active_tab_id = 0
chrome.tabs.onActivated.addListener(tab => {
  chrome.tabs.get(tab.tabId, current_tab_info => {
    active_tab_id = tab.tabId;
    console.log(current_tab_info)
    if (/^https:\/\/www\.instagram\.com/.test(current_tab_info.url))
    {
      chrome.tabs.executeScript(null, {file:'./foreground.js'}, () => console.log('injected'))
      
    }
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === "check the storage")
    {  
      chrome.storage.local.get("num_of_posts", num_of_posts =>{
        console.log(num_of_posts)})
      chrome.storage.local.get("num_of_following", num_of_following =>{
        console.log(num_of_following)})
      chrome.storage.local.get("num_of_followers", num_of_followers =>{
        console.log(num_of_followers)})
      chrome.storage.local.get("description", description =>{
        console.log(description)})
      console.log("I got data for analysis")  


      chrome.tabs.sendMessage(active_tab_id,{message:"I got yor message mate"})
    }
});

