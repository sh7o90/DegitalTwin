# Railway デプロイガイド

Railwayは、モダンで使いやすいデプロイプラットフォームです。無料クレジットが提供され、このプロジェクトにも適しています。

## なぜRailwayがおすすめ？

✅ **無料クレジット** - 月$5分の無料クレジット  
✅ **シンプルなUI** - 直感的な操作  
✅ **自動デプロイ** - GitHub連携で自動デプロイ  
✅ **環境変数管理** - 簡単な環境変数設定  
✅ **ログ確認** - リアルタイムログ表示

## デプロイ手順

### ステップ1: Railwayアカウントの作成

1. [Railway](https://railway.app/) にアクセス
2. 「Start a New Project」をクリック
3. GitHubアカウントでサインアップ

### ステップ2: プロジェクトの作成

1. 「New Project」をクリック
2. 「Deploy from GitHub repo」を選択
3. `sh7o90/DegitalTwin` リポジトリを選択

### ステップ3: バックエンドサービスの設定

1. 「+ New」→「Service」を選択
2. 「GitHub Repo」を選択して同じリポジトリを選択
3. サービス設定：

   **Settings → Source:**
   - **Root Directory**: `server`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`

   **Variables:**
   ```
   NODE_ENV=production
   PORT=3001
   JWT_SECRET=<強力なランダム文字列>
   DATABASE_PATH=./database.sqlite
   ```

### ステップ4: フロントエンドサービスの追加

1. 再度「+ New」→「Service」を選択
2. 同じリポジトリを選択
3. サービス設定：

   **Settings → Source:**
   - **Root Directory**: `client`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npx serve -s dist -l 3000`

   **Variables:**
   ```
   VITE_API_URL=<バックエンドのURL>
   ```

### ステップ5: 公開URLの取得

1. 各サービスの「Settings」→「Generate Domain」をクリック
2. 公開URLが生成されます
3. フロントエンドの環境変数`VITE_API_URL`をバックエンドのURLに更新

## トラブルシューティング

### ビルドエラー

- Railwayのログを確認
- Node.jsのバージョンを指定（`package.json`に`"engines"`を追加）

### 環境変数の設定

- 各サービスの「Variables」タブで設定
- バックエンドのURLをフロントエンドの環境変数に設定

## 料金

- **無料クレジット**: 月$5分
- **有料プラン**: $5/月から

## 参考リンク

- [Railway公式ドキュメント](https://docs.railway.app/)
- [Node.jsデプロイガイド](https://docs.railway.app/deploy/nodejs)

