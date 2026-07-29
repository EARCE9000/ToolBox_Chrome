const CLEAR_MENU_ID = "sa-clear-arrows";

chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: CLEAR_MENU_ID,
    title: "矢印をすべてクリア",
    contexts: ["action"]
  });
});

// activeTab権限はユーザー操作(アイコンクリック/右クリックメニュー選択)時のみ
// 対象タブへのアクセスを許可するため、未注入なら都度 content スクリプトを差し込む。
async function ensureInjectedAndSend(tabId, message) {
  try {
    await chrome.tabs.sendMessage(tabId, message);
    return;
  } catch {
    // content script 未注入(初回クリック or ページ遷移後)
  }

  await chrome.scripting.insertCSS({ target: { tabId }, files: ["content.css"] });
  await chrome.scripting.executeScript({ target: { tabId }, files: ["content.js"] });
  await chrome.tabs.sendMessage(tabId, message);
}

chrome.action.onClicked.addListener(async (tab) => {
  if (!tab.id) return;
  try {
    await ensureInjectedAndSend(tab.id, { type: "sa-add-arrow" });
  } catch {
    // chrome:// や Web Store など注入不可なページでは何もしない
  }
});

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.menuItemId !== CLEAR_MENU_ID || !tab?.id) return;
  try {
    await ensureInjectedAndSend(tab.id, { type: "sa-clear-arrows" });
  } catch {
    // chrome:// や Web Store など注入不可なページでは何もしない
  }
});
