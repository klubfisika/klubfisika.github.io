import { createClient } from '@libsql/client/web';

export const turso = createClient({
  url: 'libsql://klubfisika-konxc.aws-ap-northeast-1.turso.io',
  authToken: 'eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3NjY2NDU3NjUsImlkIjoiMmM4NjU2MjgtZTBlOC00OTdkLTg0ZjAtZTgyNzU4MzgwYTljIiwicmlkIjoiMmE4YzZiZjctMWI1YS00ZDI4LWEyY2ItZDlmY2NhMTFiYTQzIn0.4ptdU_Muo9NwB5ffrZJO-oRc8ejpokH85Bc_ZoeCC-Eu817_5FL2LvAV5tpa8TCeLkJaj9aq7rBy_QkM4Ri0BA'
});

// Initialize database tables
export async function initDB() {
  await turso.execute(`
    CREATE TABLE IF NOT EXISTS members (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      email TEXT UNIQUE NOT NULL,
      phone TEXT,
      year TEXT,
      major TEXT,
      university TEXT,
      motivation TEXT,
      interests TEXT,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await turso.execute(`
    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      author TEXT NOT NULL,
      content TEXT NOT NULL,
      likes INTEGER DEFAULT 0,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `);
}
