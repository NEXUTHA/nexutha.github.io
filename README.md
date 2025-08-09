# NEXUTHA Improved - Modern Web Application

> **AI・音楽・テクノロジーの融合** - 完全にモダン化されたWebアプリケーション

![NEXUTHA](https://img.shields.io/badge/NEXUTHA-v2.0.0-6366f1)
![TypeScript](https://img.shields.io/badge/TypeScript-5.3+-3178c6)
![Vite](https://img.shields.io/badge/Vite-5.0+-646CFF)
![License](https://img.shields.io/badge/License-MIT-green)

## 🚀 概要

NEXUTHAの公式ウェブサイトを完全にモダン化したプロジェクトです。従来の単一HTMLファイルから、TypeScript + Vite + 最新のWebテクノロジーを活用したスケーラブルなアーキテクチャに移行しました。

### ✨ 主な改善点

- **🔧 完全分離**: HTML、CSS、TypeScriptファイルの適切な分離
- **📦 TypeScript化**: 型安全性とより良い開発体験
- **⚡ パフォーマンス**: Vite + Service Worker + 画像最適化
- **🔍 SEO強化**: 構造化データ + 多言語対応 + メタタグ最適化
- **📱 PWA対応**: オフライン機能 + インストール可能
- **🛠 開発体験**: Hot reload + ESLint + Prettier + 自動テスト

## 📋 技術スタック

### コア技術
- **Frontend**: TypeScript + Modern JavaScript (ES2020+)
- **Build Tool**: Vite 5.0+
- **CSS**: モダンCSS (Custom Properties + Grid + Flexbox)
- **PWA**: Service Worker + Web App Manifest

### 開発ツール
- **Type Checker**: TypeScript 5.3+
- **Linter**: ESLint + TypeScript ESLint
- **Formatter**: Prettier
- **Testing**: Vitest (予定)
- **Git Hooks**: Husky + lint-staged

### パフォーマンス最適化
- **Bundling**: 自動コード分割 + Tree-shaking
- **Compression**: Gzip + Brotli
- **Caching**: Service Worker + Cache API
- **Images**: 遅延読み込み + WebP対応

## 🏗 プロジェクト構造

```
nexutha-improved/
├── public/                 # 静的ファイル
│   ├── index.html         # メインHTMLファイル
│   └── sw.js              # Service Worker
├── src/                   # ソースファイル
│   ├── ts/               # TypeScript
│   │   ├── main.ts       # メインアプリケーション
│   │   ├── types.ts      # 型定義
│   │   ├── utils.ts      # ユーティリティ関数
│   │   └── translations.ts # 多言語対応
│   ├── css/              # スタイルシート
│   │   └── main.css      # メインCSS
│   └── assets/           # 画像・フォント
├── dist/                 # ビルド出力
├── scripts/              # ビルドスクリプト
└── configs/              # 設定ファイル
```

## 🛠 セットアップ

### 必要環境
- Node.js 18.0+ 
- npm 8.0+ または yarn 1.22+

### インストール

```bash
# リポジトリをクローン
git clone https://github.com/nexutha/nexutha-improved.git
cd nexutha-improved

# 依存関係をインストール
npm install

# 開発サーバー起動
npm run dev
```

## 📋 利用可能なスクリプト

### 開発
```bash
npm run dev          # 開発サーバー起動 (http://localhost:3000)
npm run preview      # プロダクションプレビュー (http://localhost:4173)
```

### ビルド
```bash
npm run build        # プロダクションビルド
npm run clean        # ビルドファイル削除
```

### 品質管理
```bash
npm run type-check   # TypeScript型チェック
npm run lint         # ESLint実行・修正
npm run lint:check   # ESLintチェックのみ
npm run format       # Prettier実行
npm run format:check # Prettierチェックのみ
```

### テスト（実装予定）
```bash
npm run test         # ユニットテスト
npm run test:ui      # テストUI起動
npm run test:coverage # カバレッジ計測
```

### パフォーマンス分析
```bash
npm run analyze      # バンドル分析
npm run lighthouse   # Lighthouseスコア計測
```

### デプロイ
```bash
npm run deploy:staging    # ステージング環境へデプロイ
npm run deploy:production # 本番環境へデプロイ
```

## 🎯 パフォーマンス指標

### Lighthouse スコア目標
- **Performance**: 95+
- **Accessibility**: 100
- **Best Practices**: 100
- **SEO**: 100
- **PWA**: ✅

### Core Web Vitals
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

## 🌐 多言語対応

### サポート言語
- 🇯🇵 日本語 (デフォルト)
- 🇺🇸 英語

### 新しい言語の追加方法
1. `src/ts/translations.ts` に翻訳を追加
2. `src/ts/types.ts` の `Language` 型を更新
3. HTMLの `lang` 属性とメタデータを更新

## 🔒 セキュリティ

### 実装済みセキュリティ対策
- CSP (Content Security Policy) 設定
- XSS対策 (innerHTML の安全な使用)
- HTTPS強制 (本番環境)
- Secure Headers設定

### セキュリティ監査
```bash
npm audit              # 脆弱性チェック
npm audit fix          # 自動修正
```

## 📊 モニタリング・分析

### 分析ツール
- Google Analytics 4
- Core Web Vitals監視
- エラー追跡 (console.error ログ)
- パフォーマンス計測

### ログ出力
```javascript
// パフォーマンス計測例
performance.mark('feature-start');
// 機能実行
performance.mark('feature-end');
performance.measure('feature-duration', 'feature-start', 'feature-end');
```

## 🤝 貢献方法

### 開発フロー
1. イシューを作成・確認
2. フィーチャーブランチを作成
3. 変更を実装
4. テスト・リント・フォーマット実行
5. プルリクエスト作成

### コミット規約
```
feat: 新機能追加
fix: バグ修正
docs: ドキュメント更新
style: コード整形
refactor: リファクタリング
test: テスト追加・修正
chore: その他の変更
```

## 📈 ロードマップ

### Phase 1 (完了)
- ✅ ファイル分離・TypeScript化
- ✅ Viteビルドシステム
- ✅ パフォーマンス最適化
- ✅ SEO強化

### Phase 2 (計画中)
- 🔄 ユニットテスト実装
- 🔄 E2Eテスト追加
- 🔄 CMS統合
- 🔄 API統合

### Phase 3 (検討中)
- ⏳ React/Vue.js移行検討
- ⏳ GraphQL API
- ⏳ マイクロフロントエンド化
- ⏳ WebAssembly活用

## 🐛 既知の問題

現在、既知の問題はありません。

## 📄 ライセンス

このプロジェクトは [MIT License](LICENSE) の下でライセンスされています。

## 📞 サポート・お問い合わせ

- **Website**: https://nexutha.com
- **Email**: support@nexutha.com
- **Issues**: [GitHub Issues](https://github.com/nexutha/nexutha-improved/issues)

---

**Created with ❤️ by NEXUTHA Team**