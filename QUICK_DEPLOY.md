# クイックデプロイガイド

Lovableがうまくいかない場合、以下のプラットフォームがおすすめです。

## 🥇 1位: Render（最もおすすめ）

### 理由
- ✅ **無料プランあり** - 個人プロジェクトに最適
- ✅ **フルスタック対応** - フロントエンドとバックエンドを同時にデプロイ
- ✅ **簡単設定** - `render.yaml`で自動設定
- ✅ **自動デプロイ** - GitHub連携で自動デプロイ

### 5分でデプロイ

1. **Renderアカウント作成**
   - https://render.com/ にアクセス
   - GitHubアカウントでサインアップ

2. **Blueprintで一括デプロイ**
   - Renderダッシュボードで「New +」→「Blueprint」を選択
   - GitHubリポジトリ `sh7o90/DegitalTwin` を選択
   - Renderが自動的に`render.yaml`を読み込んでサービスを作成

3. **環境変数の設定**
   - バックエンドサービスの「Environment」タブで以下を設定：
     ```
     JWT_SECRET=<強力なランダム文字列>
     ```
   - JWT_SECRETの生成：
     ```bash
     node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
     ```

4. **完了！**
   - 数分でデプロイが完了
   - フロントエンドとバックエンドのURLが表示されます

📖 **詳細ガイド**: [DEPLOY_RENDER.md](./DEPLOY_RENDER.md)

---

## 🥈 2位: Railway

### 理由
- ✅ **無料クレジット** - 月$5分の無料クレジット
- ✅ **シンプルなUI** - 直感的な操作
- ✅ **高速デプロイ** - 迅速なデプロイ

### デプロイ手順

1. https://railway.app/ にアクセス
2. 「Start a New Project」→「Deploy from GitHub repo」
3. `sh7o90/DegitalTwin` を選択
4. バックエンドとフロントエンドを別々のサービスとして追加

📖 **詳細ガイド**: [DEPLOY_RAILWAY.md](./DEPLOY_RAILWAY.md)

---

## 🥉 3位: Vercel（フロント）+ Railway/Render（バック）

### 理由
- ✅ **Vercel**: フロントエンドに最適化、高速CDN
- ✅ **分離型**: フロントエンドとバックエンドを分離

### デプロイ手順

1. **バックエンド**: RailwayまたはRenderにデプロイ（上記参照）
2. **フロントエンド**: https://vercel.com/ でデプロイ
   - GitHubリポジトリを接続
   - Root Directory: `client`
   - Build Command: `npm run build`
   - 環境変数: `VITE_API_URL=<バックエンドURL>`

📖 **詳細ガイド**: [DEPLOY_VERCEL.md](./DEPLOY_VERCEL.md)

---

## 比較表

| プラットフォーム | 無料プラン | 難易度 | フルスタック | おすすめ度 |
|----------------|----------|--------|------------|----------|
| **Render** | ✅ あり | ⭐ 簡単 | ✅ 対応 | ⭐⭐⭐⭐⭐ |
| **Railway** | ✅ クレジット | ⭐⭐ 普通 | ✅ 対応 | ⭐⭐⭐⭐ |
| **Vercel+** | ✅ あり | ⭐⭐⭐ やや難 | ⚠️ 分離型 | ⭐⭐⭐ |

---

## トラブルシューティング

### ビルドエラーが発生する場合

1. **Node.jsのバージョンを指定**
   `server/package.json`に追加：
   ```json
   "engines": {
     "node": "18.x"
   }
   ```

2. **ログを確認**
   - 各プラットフォームのログを確認
   - エラーメッセージを確認

### CORSエラーが発生する場合

1. **環境変数を確認**
   - `FRONTEND_URL`にフロントエンドのURLを設定
   - 複数のURLはカンマ区切りで指定可能

2. **バックエンドのCORS設定を確認**
   - `server/src/index.ts`のCORS設定を確認

### データベースエラーが発生する場合

- Renderの無料プランでは、再起動時にSQLiteデータが失われる可能性があります
- 本番環境ではPostgreSQLなどの永続的なデータベースを推奨

---

## 次のステップ

デプロイが完了したら：

1. ✅ 環境変数の確認
2. ✅ 動作確認
3. ✅ カスタムドメインの設定（オプション）
4. ✅ データベースの移行（PostgreSQL推奨）

---

**質問や問題がある場合**: 各プラットフォームのドキュメントを参照するか、GitHubのIssuesで報告してください。

