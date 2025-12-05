# Lovable デプロイガイド

このプロジェクトをLovableプラットフォームにデプロイする手順です。

## 前提条件

- Lovableアカウント（https://lovable.dev/）
- GitHubアカウント（Lovableとの連携用）

## デプロイ手順

### 1. GitHubリポジトリへのプッシュ

まず、このプロジェクトをGitHubリポジトリにプッシュします：

```bash
git init
git add .
git commit -m "Initial commit: Digital Twin App Generator"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 2. Lovableでのプロジェクト作成

1. Lovable（https://lovable.dev/）にログイン
2. 「New Project」をクリック
3. 「Import from GitHub」を選択
4. 先ほどプッシュしたリポジトリを選択

### 3. 環境変数の設定

Lovableのダッシュボードで、以下の環境変数を設定します：

- `PORT`: `3001`
- `JWT_SECRET`: 本番環境用の秘密鍵（強力なランダム文字列を生成）
- `DATABASE_PATH`: `./database.sqlite`
- `NODE_ENV`: `production`

### 4. ビルド設定の確認

Lovableは `lovable.json` ファイルを参照して、以下の設定を自動的に検出します：

**フロントエンド:**
- ディレクトリ: `client`
- ビルドコマンド: `npm run build`
- 起動コマンド: `npm run dev`（開発時）

**バックエンド:**
- ディレクトリ: `server`
- ビルドコマンド: `npm run build`（`postinstall`スクリプトで自動実行）
- 起動コマンド: `npm run start`

**注意**: Lovableでは、フロントエンドとバックエンドが同じドメインでホストされるため、CORS設定は自動的に処理されます。

### 5. デプロイの実行

1. Lovableダッシュボードで「Deploy」または「Publish」をクリック
2. ビルドプロセスが完了するまで待機（数分かかる場合があります）
3. デプロイが完了すると、公開URLが生成されます

## トラブルシューティング

### ビルドエラーが発生する場合

1. **依存関係のインストール**: Lovableが自動的に `npm install` を実行しますが、エラーが発生する場合は、`package.json` の依存関係を確認してください。

2. **環境変数の確認**: すべての必要な環境変数が設定されているか確認してください。

3. **ポート設定**: Lovableは自動的にポートを割り当てますが、カスタムポートが必要な場合は環境変数で設定できます。

### データベースの永続化

SQLiteデータベースは、Lovableのファイルシステムに保存されます。本番環境では、より堅牢なデータベース（PostgreSQLなど）への移行を検討してください。

### CORS設定

Lovableでは、フロントエンドとバックエンドが同じドメインでホストされるため、CORS設定は通常不要です。ただし、カスタムドメインを使用する場合は、`server/src/index.ts` のCORS設定を調整してください。

## 本番環境の推奨事項

1. **データベース**: SQLiteからPostgreSQLやMySQLへの移行を検討
2. **セキュリティ**: JWT_SECRETを強力なランダム文字列に変更
3. **ログ**: 本番環境でのログ記録を設定
4. **モニタリング**: エラートラッキングとパフォーマンス監視を追加
5. **バックアップ**: データベースの定期的なバックアップを設定

## 参考リンク

- [Lovable公式ドキュメント](https://docs.lovable.dev/)
- [Lovable GitHub連携ガイド](https://docs.lovable.dev/github-integration)

