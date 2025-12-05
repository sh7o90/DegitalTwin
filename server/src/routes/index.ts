import { Express } from 'express';
import { authRoutes } from './auth';
import { twinRoutes } from './twins';
import { appRoutes } from './apps';

export function setupRoutes(app: Express) {
  app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Digital Twin API is running' });
  });

  app.use('/api/auth', authRoutes);
  app.use('/api/twins', twinRoutes);
  app.use('/api/apps', appRoutes);
}

