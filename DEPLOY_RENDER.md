# Render デプロイガイド

Renderは、フルスタックアプリケーションを簡単にデプロイできるプラットフォームです。無料プランも利用可能で、このプロジェクトに最適です。

## なぜRenderがおすすめ？

✅ **無料プランあり** - 個人プロジェクトに最適  
✅ **フルスタック対応** - フロントエンドとバックエンドを同時にデプロイ可能  
✅ **自動デプロイ** - GitHub連携で自動デプロイ  
✅ **簡単設定** - `render.yaml`で設定を管理  
✅ **SQLite対応** - ファイルベースのデータベースも使用可能

## デプロイ手順

### ステップ1: Renderアカウントの作成

1. [Render](https://render.com/) にアクセス
2. 「Get Started for Free」をクリック
3. GitHubアカウントでサインアップ（推奨）

### ステップ2: バックエンドサービスの作成

1. Renderダッシュボードで「New +」→「Web Service」を選択
2. GitHubリポジトリ `sh7o90/DegitalTwin` を接続
3. 以下の設定を入力：

   **基本設定:**
   - **Name**: `digital-twin-api`
   - **Region**: `Tokyo`（または最寄りのリージョン）
   - **Branch**: `main`
   - **Root Directory**: `server`
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm run start`

   **環境変数:**
   ```
   NODE_ENV=production
   PORT=3001
   JWT_SECRET=<強力なランダム文字列>
   DATABASE_PATH=./database.sqlite
   ```

   **JWT_SECRETの生成:**
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```

4. 「Create Web Service」をクリック

### ステップ3: フロントエンドサービスの作成

1. 再度「New +」→「Static Site」を選択
2. 同じGitHubリポジトリを選択
3. 以下の設定を入力：

   **基本設定:**
   - **Name**: `digital-twin-frontend`
   - **Branch**: `main`
   - **Root Directory**: `client`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`

4. **環境変数**（オプション）:
   ```
   VITE_API_URL=https://digital-twin-api.onrender.com
   ```

5. 「Create Static Site」をクリック

### ステップ4: バックエンドURLの更新

フロントエンドがバックエンドに接続できるように、環境変数を更新：

1. フロントエンドサービスの「Environment」タブを開く
2. 以下の環境変数を追加：
   ```
   VITE_API_URL=https://digital-twin-api.onrender.com
   ```
3. 保存して再デプロイ

### ステップ5: CORS設定の確認

バックエンドのCORS設定がフロントエンドURLを許可しているか確認します。

## 自動デプロイ（render.yaml使用）

`render.yaml`ファイルを使用すると、設定をコードで管理できます：

1. Renderダッシュボードで「New +」→「Blueprint」を選択
2. GitHubリポジトリを選択
3. Renderが自動的に`render.yaml`を読み込み、サービスを作成

## トラブルシューティング

### ビルドエラー

**問題**: 依存関係のインストールに失敗

**解決策**:
- `package.json`の依存関係を確認
- Renderのログを確認してエラー詳細を確認
- Node.jsのバージョンを指定（`server/package.json`に`"engines": { "node": "18.x" }`を追加）

### CORSエラー

**問題**: フロントエンドからAPIにアクセスできない

**解決策**:
1. バックエンドの`server/src/index.ts`でCORS設定を確認
2. `FRONTEND_URL`環境変数にフロントエンドのURLを設定

### データベースエラー

**問題**: SQLiteファイルが保存されない

**解決策**:
- Renderの無料プランでは、再起動時にデータが失われる可能性があります
- 本番環境ではPostgreSQLなどの永続的なデータベースを使用することを推奨

## 本番環境の推奨事項

### データベースの移行

SQLiteからPostgreSQLへの移行を推奨：

1. RenderでPostgreSQLデータベースを作成
2. 環境変数に`DATABASE_URL`を追加
3. コードをPostgreSQL対応に変更

### カスタムドメイン

1. Renderダッシュボードで「Custom Domains」を設定
2. DNS設定を更新
3. SSL証明書は自動的に発行されます

## 料金

- **無料プラン**: 
  - Webサービス: スリープモードあり（15分の無活動でスリープ）
  - 静的サイト: 完全無料
- **有料プラン**: $7/月から（常時起動）

## 参考リンク

- [Render公式ドキュメント](https://render.com/docs)
- [Render無料プラン](https://render.com/docs/free)
- [Node.jsデプロイガイド](https://render.com/docs/deploy-node)

