# Vercel + Railway/Render デプロイガイド

Vercelはフロントエンドに最適化されており、バックエンドはRailwayやRenderでホストする構成です。

## なぜこの構成がおすすめ？

✅ **Vercel**: フロントエンドに最適化、無料プラン充実  
✅ **高速CDN**: グローバルCDNで高速配信  
✅ **自動デプロイ**: GitHub連携で自動デプロイ  
✅ **分離型**: フロントエンドとバックエンドを分離

## デプロイ手順

### ステップ1: バックエンドをRailway/Renderにデプロイ

まず、バックエンドをRailwayまたはRenderにデプロイします（上記のガイドを参照）。

バックエンドURLを取得: `https://your-api.railway.app` または `https://your-api.onrender.com`

### ステップ2: Vercelでフロントエンドをデプロイ

1. [Vercel](https://vercel.com/) にアクセス
2. GitHubアカウントでサインアップ
3. 「Add New Project」をクリック
4. `sh7o90/DegitalTwin` リポジトリを選択

**プロジェクト設定:**
- **Framework Preset**: `Vite`
- **Root Directory**: `client`
- **Build Command**: `npm run build`
- **Output Directory**: `dist`

**環境変数:**
```
VITE_API_URL=https://your-api.railway.app
```

5. 「Deploy」をクリック

### ステップ3: 設定の確認

デプロイ後、Vercelのダッシュボードで：
1. 「Settings」→「Environment Variables」で環境変数を確認
2. バックエンドURLが正しく設定されているか確認

## トラブルシューティング

### CORSエラー

バックエンドのCORS設定で、Vercelのドメインを許可する必要があります。

`server/src/index.ts`:
```typescript
app.use(cors({
  origin: [
    'https://your-app.vercel.app',
    process.env.FRONTEND_URL || '*'
  ],
  credentials: true
}));
```

## 料金

- **Vercel**: 無料プランあり（個人プロジェクトに十分）
- **Railway/Render**: 無料プランまたは低価格プラン

## 参考リンク

- [Vercel公式ドキュメント](https://vercel.com/docs)
- [Viteデプロイガイド](https://vercel.com/docs/frameworks/vite)

