const fs = require('fs')
const path = require('path')
const { Client } = require('pg')

const url = process.env.DATABASE_URL
if (!url) {
  console.error('DATABASE_URL is not set. Add it to .env.local first.')
  process.exit(1)
}

const schema = fs.readFileSync(path.join(__dirname, '..', 'db', 'schema.sql'), 'utf8')

;(async () => {
  const client = new Client({
    connectionString: url,
    ssl: /\.railway\.internal|localhost|127\.0\.0\.1/.test(url) ? false : { rejectUnauthorized: false },
  })
  await client.connect()
  try {
    await client.query('BEGIN')
    await client.query(schema)
    await client.query('COMMIT')
    const { rows } = await client.query(
      `SELECT table_name, count(*)::int AS columns FROM information_schema.columns
       WHERE table_name IN ('taaranjain_leads', 'taaranjain_analytics') GROUP BY table_name ORDER BY table_name`
    )
    for (const row of rows) console.log(`✓ ${row.table_name} (${row.columns} columns)`)
  } catch (err) {
    await client.query('ROLLBACK').catch(() => {})
    throw err
  } finally {
    await client.end()
  }
})().catch((err) => {
  console.error(err.message)
  process.exit(1)
})
