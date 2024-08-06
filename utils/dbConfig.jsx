import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import * as schema from './schema';
console.log('Database URL:', process.env.NEXT_PUBLIC_DATABASE_URL);

const databaseUrl = process.env.NEXT_PUBLIC_DATABASE_URL;

// Parsing the URL to ensure it's valid
const parsedUrl = new URL(databaseUrl);

const sql = neon(parsedUrl.toString());
export const db = drizzle(sql, { schema });
