import { config } from 'dotenv';
import { resolve } from 'path';
import { drizzle } from 'drizzle-orm/neon-http';
import { usersTable } from './schema/users';
import { booksTable } from './schema/books';
import { editionsTable } from './schema/editions';
import { bookshelvesTable } from './schema/bookshelves';

// Load environment variables from root directory
config({ path: resolve(__dirname, '../../../.env') });

const db = drizzle(process.env.DATABASE_URL!);

export { db };
export { usersTable, booksTable, editionsTable, bookshelvesTable };

// Export query functions
export * from './queries';

// Export types
export * from './types';