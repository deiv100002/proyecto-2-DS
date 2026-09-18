import * as SQLite from 'expo-sqlite';

let db: SQLite.SQLiteDatabase | null = null;

export type FavoriteCity = {
  id: number;
  city: string;
  country: string;
};

async function getDb() {
  if (!db) {
    db = await SQLite.openDatabaseAsync(
      'travelExplorer.db'
    );

    await db.execAsync(`
      CREATE TABLE IF NOT EXISTS favorites (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        city TEXT NOT NULL,
        country TEXT NOT NULL
      );
    `);
  }

  return db;
}

export async function getFavorites() {
  const database = await getDb();

  return database.getAllAsync<FavoriteCity>(
    'SELECT * FROM favorites ORDER BY id DESC'
  );
}

export async function addFavorite(
  city: string,
  country: string
) {
  const database = await getDb();

  await database.runAsync(
    'INSERT INTO favorites (city, country) VALUES (?, ?)',
    city,
    country
  );
}

export async function deleteFavorite(
  id: number
) {
  const database = await getDb();

  await database.runAsync(
    'DELETE FROM favorites WHERE id = ?',
    id
  );
}