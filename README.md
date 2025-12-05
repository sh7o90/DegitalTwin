# AI駆動型デジタルツインWebアプリジェネレーター

AIとの協働を通じて、現実世界のモノのデジタルツインを作成し、専用のWebアプリケーションを自動生成するプロトタイプです。

## 機能

- **ユーザー認証**: ログイン・新規登録機能
- **デジタルツイン登録**: 対象物の情報を入力してデジタルツインを作成
- **AI生成プロセス**: データモデルとアプリケーションの自動生成（シミュレーション）
- **ダッシュボード**: 作成したデジタルツインの一覧表示
- **詳細表示**: デジタルツインの属性と履歴の表示

## 技術スタック

### フロントエンド
- React 18 + TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios

### バックエンド
- Node.js + Express
- TypeScript
- SQLite
- JWT認証
- bcryptjs

## セットアップ

### 1. 依存関係のインストール

```bash
npm run install:all
```

### 2. 環境変数の設定

`server/.env`ファイルを作成し、以下の内容を設定してください：

```env
PORT=3001
JWT_SECRET=your-secret-key-change-in-production
DATABASE_PATH=./database.sqlite
NODE_ENV=development
```

### 3. 開発サーバーの起動

```bash
npm run dev
```

これにより、以下のサーバーが起動します：
- フロントエンド: http://localhost:3000
- バックエンド: http://localhost:3001

## プロジェクト構造

```
.
├── client/                 # フロントエンド（React）
│   ├── src/
│   │   ├── components/     # 再利用可能なコンポーネント
│   │   ├── contexts/       # React Context（認証など）
│   │   ├── pages/          # ページコンポーネント
│   │   └── ...
│   └── ...
├── server/                 # バックエンド（Express）
│   ├── src/
│   │   ├── routes/         # APIルート
│   │   ├── database.ts     # データベース設定
│   │   └── index.ts        # エントリーポイント
│   └── ...
└── ...
```

## API エンドポイント

### 認証
- `POST /api/auth/register` - ユーザー登録
- `POST /api/auth/login` - ログイン

### デジタルツイン
- `GET /api/twins` - ユーザーのデジタルツイン一覧取得
- `GET /api/twins/:id` - デジタルツイン詳細取得
- `POST /api/twins` - デジタルツイン作成
- `PUT /api/twins/:id` - デジタルツイン更新
- `DELETE /api/twins/:id` - デジタルツイン削除

### アプリ生成
- `POST /api/apps/generate/:twinId` - アプリ生成
- `GET /api/apps/:twinId` - 生成されたアプリ情報取得

## 開発フェーズ

このプロトタイプは **Phase 1: MVP** の実装です：

- ✅ ホームページ
- ✅ 対象物登録フォーム
- ✅ AI生成プロセス表示画面（シミュレーション）
- ✅ 基本的なダッシュボード
- ✅ ユーザー認証

## デプロイ

このプロジェクトは複数のプラットフォームにデプロイできます。

### 🎯 おすすめデプロイ先（Lovableがうまくいかない場合）

#### 1. **Render**（最もおすすめ）⭐
- ✅ 無料プランあり
- ✅ フルスタック対応
- ✅ 簡単な設定（`render.yaml`で自動設定）
- 📖 [クイックスタート](./QUICK_DEPLOY.md) | [詳細ガイド](./DEPLOY_RENDER.md)

#### 2. **Railway**
- ✅ 無料クレジットあり（月$5分）
- ✅ シンプルなUI
- 📖 [Railwayデプロイガイド](./DEPLOY_RAILWAY.md)

#### 3. **Vercel（フロント）+ Railway/Render（バック）**
- ✅ Vercelはフロントエンドに最適化
- ✅ 高速CDN
- 📖 [Vercelデプロイガイド](./DEPLOY_VERCEL.md)

**🚀 5分でデプロイ**: [QUICK_DEPLOY.md](./QUICK_DEPLOY.md) を参照

### 必要な環境変数

**バックエンド:**
- `PORT`: `3001`
- `JWT_SECRET`: 強力なランダム文字列（**必ず変更してください**）
- `DATABASE_PATH`: `./database.sqlite`
- `NODE_ENV`: `production`
- `FRONTEND_URL`: フロントエンドのURL

**フロントエンド:**
- `VITE_API_URL`: バックエンドのURL

### その他のデプロイオプション

- **Lovable**: [LOVABLE_SETUP.md](./LOVABLE_SETUP.md)
- **Fly.io**: 無料プランあり、Docker対応
- **DigitalOcean App Platform**: 有料だが安定

## 今後の拡張

- Phase 2: コア機能の拡張
- Phase 3: 3Dビューアー、共有機能
- Phase 4: パフォーマンス最適化、デプロイ

## ライセンス

MIT

