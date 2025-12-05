import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { setupDatabase } from './database';
import { setupRoutes } from './routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
// CORS設定: 複数のデプロイ環境に対応
const allowedOrigins = process.env.FRONTEND_URL 
  ? process.env.FRONTEND_URL.split(',')
  : ['http://localhost:3000', '*'];

app.use(cors({
  origin: (origin, callback) => {
    // 開発環境またはoriginが許可リストに含まれている場合
    if (!origin || allowedOrigins.includes('*') || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 本番環境で静的ファイルを配信（Lovable用）
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../client/dist')));
}

// Initialize database
setupDatabase();

// Setup routes
setupRoutes(app);

// 本番環境でSPAのルーティングをサポート
if (process.env.NODE_ENV === 'production') {
  app.get('*', (req: express.Request, res: express.Response) => {
    res.sendFile(path.join(__dirname, '../../client/dist/index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
});

