const CLEAR_MENU_ID = "sa-clear-arrows";

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: CLEAR_MENU_ID,
    title: "矢印をすべてクリア",
    contexts: ["action"]
  });
});

chrome.action.onClicked.addListener((tab) => {
  if (!tab.id) return;
  chrome.tabs.sendMessage(tab.id, { type: "sa-add-arrow" }, () => {
    // content script が存在しないページ(chrome:// 等)では何もしない
    void chrome.runtime.lastError;
  });
});

chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId !== CLEAR_MENU_ID || !tab?.id) return;
  chrome.tabs.sendMessage(tab.id, { type: "sa-clear-arrows" }, () => {
    void chrome.runtime.lastError;
  });
});
