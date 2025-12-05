import sqlite3 from 'sqlite3';
import { promisify } from 'util';
import path from 'path';
import fs from 'fs';

const DB_PATH = process.env.DATABASE_PATH || './database.sqlite';

let db: sqlite3.Database;

export function getDatabase(): sqlite3.Database {
  if (!db) {
    db = new sqlite3.Database(DB_PATH);
  }
  return db;
}

export function setupDatabase() {
  const db = getDatabase();
  
  // User table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      name TEXT NOT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  // DigitalTwin table
  db.run(`
    CREATE TABLE IF NOT EXISTS digital_twins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      category TEXT NOT NULL,
      description TEXT,
      image_url TEXT,
      is_public INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id)
    )
  `);

  // TwinAttribute table
  db.run(`
    CREATE TABLE IF NOT EXISTS twin_attributes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      twin_id INTEGER NOT NULL,
      attribute_name TEXT NOT NULL,
      attribute_value TEXT,
      data_type TEXT NOT NULL,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (twin_id) REFERENCES digital_twins(id)
    )
  `);

  // TwinHistory table
  db.run(`
    CREATE TABLE IF NOT EXISTS twin_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      twin_id INTEGER NOT NULL,
      action_type TEXT NOT NULL,
      action_details TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (twin_id) REFERENCES digital_twins(id)
    )
  `);

  // GeneratedApp table
  db.run(`
    CREATE TABLE IF NOT EXISTS generated_apps (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      twin_id INTEGER NOT NULL,
      app_code TEXT,
      schema TEXT,
      features TEXT,
      status TEXT DEFAULT 'draft',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (twin_id) REFERENCES digital_twins(id)
    )
  `);

  console.log('✅ Database initialized');
}

// Helper function to promisify database operations
export function dbRun(query: string, params: any[] = []): Promise<sqlite3.RunResult> {
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    db.run(query, params, function(err) {
      if (err) reject(err);
      else resolve(this);
    });
  });
}

export function dbGet<T>(query: string, params: any[] = []): Promise<T | undefined> {
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    db.get(query, params, (err, row) => {
      if (err) reject(err);
      else resolve(row as T);
    });
  });
}

export function dbAll<T>(query: string, params: any[] = []): Promise<T[]> {
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    db.all(query, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows as T[]);
    });
  });
}

