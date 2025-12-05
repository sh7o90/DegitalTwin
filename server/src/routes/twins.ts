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

// Get all twins for user
router.get('/', authenticateToken, async (req, res) => {
  try {
    const userId = (req as any).user.userId;
    const twins = await dbAll<any>(
      'SELECT * FROM digital_twins WHERE user_id = ? ORDER BY created_at DESC',
      [userId]
    );
    res.json(twins);
  } catch (error) {
    console.error('Get twins error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single twin
router.get('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.userId;
    
    const twin = await dbGet<any>(
      'SELECT * FROM digital_twins WHERE id = ? AND user_id = ?',
      [id, userId]
    );

    if (!twin) {
      return res.status(404).json({ error: 'Digital twin not found' });
    }

    // Get attributes
    const attributes = await dbAll<any>(
      'SELECT * FROM twin_attributes WHERE twin_id = ?',
      [id]
    );

    // Get history
    const history = await dbAll<any>(
      'SELECT * FROM twin_history WHERE twin_id = ? ORDER BY created_at DESC LIMIT 50',
      [id]
    );

    res.json({ ...twin, attributes, history });
  } catch (error) {
    console.error('Get twin error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Create new twin
router.post('/', authenticateToken, async (req, res) => {
  try {
    const userId = (req as any).user.userId;
    const { name, category, description, image_url, attributes, tracked_data, features } = req.body;

    if (!name || !category) {
      return res.status(400).json({ error: 'Name and category are required' });
    }

    // Insert twin
    const result = await dbRun(
      'INSERT INTO digital_twins (user_id, name, category, description, image_url) VALUES (?, ?, ?, ?, ?)',
      [userId, name, category, description || null, image_url || null]
    );

    const twinId = (result as any).lastID;

    // Insert initial history
    await dbRun(
      'INSERT INTO twin_history (twin_id, action_type, action_details) VALUES (?, ?, ?)',
      [twinId, 'created', JSON.stringify({ name, category })]
    );

    // Insert attributes if provided
    if (attributes && Array.isArray(attributes)) {
      for (const attr of attributes) {
        await dbRun(
          'INSERT INTO twin_attributes (twin_id, attribute_name, attribute_value, data_type) VALUES (?, ?, ?, ?)',
          [twinId, attr.name, attr.value || '', attr.dataType || 'string']
        );
      }
    }

    res.status(201).json({ id: twinId, message: 'Digital twin created successfully' });
  } catch (error) {
    console.error('Create twin error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Update twin
router.put('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.userId;
    const { name, category, description, image_url } = req.body;

    // Verify ownership
    const twin = await dbGet<any>(
      'SELECT * FROM digital_twins WHERE id = ? AND user_id = ?',
      [id, userId]
    );

    if (!twin) {
      return res.status(404).json({ error: 'Digital twin not found' });
    }

    // Update twin
    await dbRun(
      'UPDATE digital_twins SET name = ?, category = ?, description = ?, image_url = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [name || twin.name, category || twin.category, description !== undefined ? description : twin.description, image_url !== undefined ? image_url : twin.image_url, id]
    );

    // Add history entry
    await dbRun(
      'INSERT INTO twin_history (twin_id, action_type, action_details) VALUES (?, ?, ?)',
      [id, 'updated', JSON.stringify({ name, category, description })]
    );

    res.json({ message: 'Digital twin updated successfully' });
  } catch (error) {
    console.error('Update twin error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete twin
router.delete('/:id', authenticateToken, async (req, res) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.userId;

    // Verify ownership
    const twin = await dbGet<any>(
      'SELECT * FROM digital_twins WHERE id = ? AND user_id = ?',
      [id, userId]
    );

    if (!twin) {
      return res.status(404).json({ error: 'Digital twin not found' });
    }

    // Delete related data
    await dbRun('DELETE FROM twin_attributes WHERE twin_id = ?', [id]);
    await dbRun('DELETE FROM twin_history WHERE twin_id = ?', [id]);
    await dbRun('DELETE FROM generated_apps WHERE twin_id = ?', [id]);
    await dbRun('DELETE FROM digital_twins WHERE id = ?', [id]);

    res.json({ message: 'Digital twin deleted successfully' });
  } catch (error) {
    console.error('Delete twin error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export { router as twinRoutes };

