# ScreenAnnotation (Chrome拡張版)

Webページ上に番号付きの矢印を重ねて表示できる、シンプルな画面注釈用Chrome拡張機能です。
[EARCE9000/ToolBox の ScreenAnnotation](https://github.com/EARCE9000/ToolBox/tree/main/ScreenAnnotation)(Windows Forms版)の矢印アイコン資材を流用しています。

## 機能

- 拡張機能アイコンをクリック: ページ中央付近に48x48の矢印を追加(番号は自動採番)
- 追加した矢印をドラッグ: 好きな位置に移動
- 追加した矢印をクリック(ドラッグせず): その矢印を削除(残りの矢印は番号を詰め直し)
- 拡張機能アイコンを右クリック → 「矢印をすべてクリア」: ページ上の矢印を全て削除

矢印はタブ内のオーバーレイとして表示されるため、ページを再読み込みするとリセットされます。

`activeTab` 権限を使用しており、アイコンクリック/右クリックメニュー操作の瞬間だけそのタブに注入されます。常時全サイトを読み取る権限(`<all_urls>` の content_scripts)は使用していません。

ユーザーデータの収集は一切行いません。詳細は [PRIVACY.md](PRIVACY.md) を参照してください。

## インストール方法(開発者モードで読み込み)

1. Chromeで `chrome://extensions` を開く
2. 右上の「デベロッパーモード」をオンにする
3. 「パッケージ化されていない拡張機能を読み込む」をクリック
4. この `ScreenAnnotation` フォルダを選択する

## ファイル構成

- `manifest.json` - 拡張機能定義(Manifest V3)
- `background.js` - アイコンクリック/右クリックメニューの処理(Service Worker)
- `content.js` - 矢印の追加・削除・ドラッグ移動を行うコンテンツスクリプト
- `content.css` - 矢印・番号バッジのスタイル
- `icons/` - 拡張機能アイコンおよびページ内矢印画像(元プロジェクトの `ArrowIcon.png` をリサイズして流用)
