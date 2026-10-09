import mysql, { type Pool, type PoolOptions } from "mysql2/promise";

/** True when a database is configured in the environment (.env.local). */
export const dbConfigured = Boolean(process.env.DB_HOST || process.env.DATABASE_URL);

const g = globalThis as unknown as { __cpPool?: Pool };

export function getPool(): Pool {
  if (!g.__cpPool) {
    const base: PoolOptions = {
      connectionLimit: 10,
      dateStrings: true, // DATE columns come back as "YYYY-MM-DD" strings
      charset: "utf8mb4",
      connectTimeout: 4000,
    };
    g.__cpPool = process.env.DATABASE_URL
      ? mysql.createPool({ ...base, uri: process.env.DATABASE_URL })
      : mysql.createPool({
          ...base,
          host: process.env.DB_HOST,
          port: Number(process.env.DB_PORT || 3306),
          user: process.env.DB_USER || "root",
          password: process.env.DB_PASSWORD || "",
          database: process.env.DB_NAME || "captain_pirrot",
        });
  }
  return g.__cpPool;
}

export async function query<T>(sql: string, params: unknown[] = []): Promise<T[]> {
  const [rows] = await getPool().query(sql, params);
  return rows as T[];
}
