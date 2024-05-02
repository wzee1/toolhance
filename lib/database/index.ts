import { Pool } from "pg"
import { drizzle } from "drizzle-orm/node-postgres"
import * as schema from "./schema"

const pool = new Pool({
  connectionString: process.env.DB_URL!,
  ssl: true
})  

const db = drizzle(pool, { schema })

export default db