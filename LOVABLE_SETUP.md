# Lovable セットアップガイド

このドキュメントは、Lovableプラットフォームでこのプロジェクトをデプロイするための詳細な手順を説明します。

## プロジェクト概要

- **プロジェクト名**: Digital Twin App Generator
- **タイプ**: フルスタックアプリケーション（React + Express）
- **データベース**: SQLite（開発環境）

## Lovableでの設定手順

### ステップ1: GitHubリポジトリの準備

1. このプロジェクトをGitHubリポジトリにプッシュします：

```bash
git init
git add .
git commit -m "Initial commit: Digital Twin App Generator"
git branch -M main
git remote add origin <your-github-repo-url>
git push -u origin main
```

### ステップ2: Lovableプロジェクトの作成

1. [Lovable](https://lovable.dev/) にアクセスしてログイン
2. 「New Project」または「Create Project」をクリック
3. 「Import from GitHub」を選択
4. GitHubアカウントを連携（初回のみ）
5. リポジトリ一覧からこのプロジェクトを選択

### ステップ3: プロジェクト設定の確認

Lovableは `lovable.json` ファイルを自動的に読み込みます。以下の設定が適用されます：

- **フロントエンド**: `client` ディレクトリ
- **バックエンド**: `server` ディレクトリ
- **ビルドコマンド**: 自動検出

### ステップ4: 環境変数の設定

Lovableダッシュボードの「Environment Variables」セクションで、以下の環境変数を設定してください：

| 変数名 | 値 | 説明 |
|--------|-----|------|
| `PORT` | `3001` | バックエンドサーバーのポート |
| `JWT_SECRET` | `<強力なランダム文字列>` | JWT認証用の秘密鍵（**必ず変更してください**） |
| `DATABASE_PATH` | `./database.sqlite` | SQLiteデータベースのパス |
| `NODE_ENV` | `production` | 実行環境 |
| `FRONTEND_URL` | （自動設定） | フロントエンドのURL（通常は自動設定） |

**JWT_SECRETの生成方法**:
```bash
# Node.jsで生成
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# またはオンラインツールを使用
```

### ステップ5: ビルドとデプロイ

1. Lovableダッシュボードで「Build」または「Deploy」をクリック
2. ビルドプロセスが完了するまで待機（5-10分程度）
3. ビルドが成功すると、公開URLが生成されます

## アーキテクチャ

### フロントエンド（client/）

- **フレームワーク**: React 18 + TypeScript
- **ビルドツール**: Vite
- **スタイリング**: Tailwind CSS
- **ルーティング**: React Router

### バックエンド（server/）

- **ランタイム**: Node.js
- **フレームワーク**: Express
- **言語**: TypeScript
- **データベース**: SQLite
- **認証**: JWT

### データベース構造

- `users` - ユーザー情報
- `digital_twins` - デジタルツイン情報
- `twin_attributes` - デジタルツインの属性
- `twin_history` - 操作履歴
- `generated_apps` - 生成されたアプリ情報

## トラブルシューティング

### ビルドエラー

**問題**: 依存関係のインストールに失敗する

**解決策**:
1. `package.json` の依存関係を確認
2. Lovableのログを確認してエラー詳細を確認
3. 必要に応じて `package-lock.json` を削除して再ビルド

### データベースエラー

**問題**: データベースファイルが見つからない

**解決策**:
1. `DATABASE_PATH` 環境変数が正しく設定されているか確認
2. Lovableのファイルシステムでデータベースファイルが作成されることを確認

### CORSエラー

**問題**: フロントエンドからAPIにアクセスできない

**解決策**:
1. Lovableでは通常、同じドメインでホストされるためCORSエラーは発生しません
2. カスタムドメインを使用する場合は、`FRONTEND_URL` 環境変数を設定

### ポートエラー

**問題**: ポートが既に使用されている

**解決策**:
1. Lovableは自動的にポートを割り当てます
2. カスタムポートが必要な場合は、環境変数 `PORT` を設定

## 本番環境の推奨事項

### セキュリティ

1. **JWT_SECRET**: 強力なランダム文字列を使用（32文字以上推奨）
2. **HTTPS**: Lovableは自動的にHTTPSを提供
3. **環境変数**: 機密情報は環境変数で管理

### パフォーマンス

1. **データベース**: 本番環境ではPostgreSQLやMySQLへの移行を検討
2. **キャッシング**: 頻繁にアクセスされるデータのキャッシングを検討
3. **CDN**: 静的アセットのCDN配信を検討

### モニタリング

1. **ログ**: エラーログの監視を設定
2. **メトリクス**: パフォーマンスメトリクスの収集
3. **アラート**: エラー発生時の通知設定

## サポート

問題が発生した場合：

1. [Lovable公式ドキュメント](https://docs.lovable.dev/) を確認
2. Lovableのサポートチームに連絡
3. GitHubのIssuesで問題を報告

## 参考リンク

- [Lovable公式サイト](https://lovable.dev/)
- [Lovableドキュメント](https://docs.lovable.dev/)
- [GitHub連携ガイド](https://docs.lovable.dev/github-integration)

