import { Pool } from 'pg'

// One pool per server instance; kept on globalThis so dev hot reloads reuse it.
const globalForDb = globalThis as unknown as { pgPool?: Pool }

function createPool(): Pool {
  const connectionString = process.env.DATABASE_URL
  if (!connectionString) throw new Error('DATABASE_URL is not set')

  const pool = new Pool({
    connectionString,
    // Railway's public proxy presents a self-signed certificate; its private network has no TLS.
    ssl: /\.railway\.internal|localhost|127\.0\.0\.1/.test(connectionString) ? false : { rejectUnauthorized: false },
    max: 5,
    idleTimeoutMillis: 10_000,
  })
  pool.on('error', (err) => console.error('Postgres pool error:', err))
  return pool
}

export function db(): Pool {
  globalForDb.pgPool ??= createPool()
  return globalForDb.pgPool
}
