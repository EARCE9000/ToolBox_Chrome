# プライバシーポリシー / Privacy Policy

**ScreenAnnotation - 矢印注釈** (Chrome拡張機能)

最終更新日: 2026-07-29

## 日本語

本拡張機能は、いかなるユーザーデータも収集・保存・送信しません。

- 個人を特定できる情報、健康情報、財務情報、認証情報、個人的コミュニケーション、位置情報、ウェブ履歴、ユーザーアクティビティ、ウェブサイトのコンテンツ — いずれも収集しません。
- 外部サーバーとの通信は一切行いません。
- 矢印の位置・番号などの状態は、閲覧中のタブの表示上にのみ一時的に保持され、ページの再読み込みや拡張機能の再起動で消去されます。永続的な保存(ローカル・リモート問わず)は行いません。

### 使用している権限

- `activeTab`: ユーザーが拡張機能アイコンをクリック、または右クリックメニューを操作した瞬間のみ、その対象タブに矢印描画用のスクリプトを注入するために使用します。ユーザー操作を伴わないページへのアクセスは一切ありません。
- `scripting`: `activeTab` で許可された対象タブに、矢印の追加・削除を行うコンテンツスクリプトを注入するために使用します。
- `contextMenus`: 拡張機能アイコンの右クリックメニューに「矢印をすべてクリア」の項目を追加するために使用します。

本拡張機能はリモートコードを使用しません。すべてのスクリプトは拡張機能パッケージに同梱されています。

## English

This extension does not collect, store, or transmit any user data.

- No personally identifiable information, health information, financial information, authentication information, personal communications, location, web history, user activity, or website content is collected.
- No communication with any external server occurs.
- Arrow positions and numbering exist only as temporary in-page overlay state within the current browser tab, and are cleared on page reload or extension restart. No data is persisted locally or remotely.

### Permissions used

- `activeTab`: Used to inject the arrow-drawing script into the current tab only at the moment the user clicks the extension icon or its context menu item. No page access occurs without explicit user action.
- `scripting`: Used to inject the content script (add/remove arrows) into the tab granted by `activeTab`.
- `contextMenus`: Used to add a "Clear all arrows" item to the extension icon's right-click menu.

This extension does not use remote code. All scripts are bundled within the extension package.

## お問い合わせ / Contact

このリポジトリの Issue にてご連絡ください。
Please contact via Issues on this repository.
