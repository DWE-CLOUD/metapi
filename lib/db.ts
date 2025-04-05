import { Pool } from "pg"
import { drizzle } from "drizzle-orm/node-postgres"

// Create a connection pool to your PostgreSQL database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === "production" ? { rejectUnauthorized: false } : false,
})

// Export the drizzle db instance
export const db = drizzle(pool)

// Close the pool when the application shuts down
process.on("SIGTERM", () => {
  pool.end()
})

