import { Router, Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { dbGet, dbRun, dbAll } from '../database';

const router = Router();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware to verify JWT token
function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err: any, user: any) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid or expired token' });
    }
    (req as any).user = user;
    next();
  });
}

// Generate app for a twin
router.post('/generate/:twinId', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { twinId } = req.params;
    const userId = (req as any).user.userId;

    // Verify ownership
    const twin = await dbGet<any>(
      'SELECT * FROM digital_twins WHERE id = ? AND user_id = ?',
      [twinId, userId]
    );

    if (!twin) {
      return res.status(404).json({ error: 'Digital twin not found' });
    }

    // Get twin attributes
    const attributes = await dbAll<any>(
      'SELECT * FROM twin_attributes WHERE twin_id = ?',
      [twinId]
    );

    // Simulate AI generation (in production, this would call an AI service)
    const schema = {
      tables: [
        {
          name: 'twin_data',
          columns: attributes.map((attr: any) => ({
            name: attr.attribute_name,
            type: attr.data_type,
            nullable: true
          }))
        }
      ]
    };

    const features = [
      'データ表示',
      '履歴管理',
      '状態更新'
    ];

    const appCode = `// Generated app code for ${twin.name}
// This is a placeholder - in production, AI would generate actual React components
export const TwinDashboard = () => {
  return <div>Dashboard for ${twin.name}</div>;
};`;

    // Check if app already exists
    const existingApp = await dbGet<any>(
      'SELECT * FROM generated_apps WHERE twin_id = ?',
      [twinId]
    );

    if (existingApp) {
      // Update existing app
      await dbRun(
        'UPDATE generated_apps SET app_code = ?, schema = ?, features = ?, status = ?, updated_at = CURRENT_TIMESTAMP WHERE twin_id = ?',
        [appCode, JSON.stringify(schema), JSON.stringify(features), 'generated', twinId]
      );
    } else {
      // Create new app
      await dbRun(
        'INSERT INTO generated_apps (twin_id, app_code, schema, features, status) VALUES (?, ?, ?, ?, ?)',
        [twinId, appCode, JSON.stringify(schema), JSON.stringify(features), 'generated']
      );
    }

    res.json({
      message: 'App generated successfully',
      schema,
      features,
      status: 'generated'
    });
  } catch (error) {
    console.error('Generate app error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get generated app
router.get('/:twinId', authenticateToken, async (req: Request, res: Response) => {
  try {
    const { twinId } = req.params;
    const userId = (req as any).user.userId;

    // Verify ownership
    const twin = await dbGet<any>(
      'SELECT * FROM digital_twins WHERE id = ? AND user_id = ?',
      [twinId, userId]
    );

    if (!twin) {
      return res.status(404).json({ error: 'Digital twin not found' });
    }

    const app = await dbGet<any>(
      'SELECT * FROM generated_apps WHERE twin_id = ?',
      [twinId]
    );

    if (!app) {
      return res.status(404).json({ error: 'App not generated yet' });
    }

    res.json({
      ...app,
      schema: JSON.parse(app.schema),
      features: JSON.parse(app.features)
    });
  } catch (error) {
    console.error('Get app error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export { router as appRoutes };

