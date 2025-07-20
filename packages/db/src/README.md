# Database Schema Documentation

This directory contains the database schema for the Shelfie bookshelf application.

## Tables

### 1. Users
Stores user information from Clerk authentication.

```sql
users (
  id TEXT PRIMARY KEY,              -- Clerk `user.id`
  email TEXT NOT NULL,
  name TEXT,
  created_at TIMESTAMP DEFAULT now()
)
```

### 2. Books
General metadata about books across all editions.

```sql
books (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  authors TEXT[],                   -- Full names or "Last, First"
  description TEXT,
  subjects TEXT[],                  -- Tags, e.g. ['farms', 'picture books']
  published_year INT,
  publisher TEXT,
  series TEXT,
  language TEXT,                    -- Primary language of the book
  created_at TIMESTAMP DEFAULT now()
)
```

### 3. Editions
Specific format/version of a book — multiple per book_id.

```sql
editions (
  id UUID PRIMARY KEY,
  book_id UUID REFERENCES books(id),
  isbn TEXT UNIQUE,
  edition_name TEXT,                -- e.g. "1st Ed", "Illustrated Ed"
  format TEXT,                      -- e.g. "Hardcover", "Ebook"
  page_count INT,
  language TEXT,
  contributors TEXT[],              -- Illustrators, editors
  cover_url TEXT,
  purchase_links JSONB,            -- e.g. {"Amazon": "...", "Bookshop": "..."}
  created_at TIMESTAMP DEFAULT now()
)
```

### 4. Bookshelves
User-defined shelves like "To Read", "Favorites", etc.

```sql
bookshelves (
  id UUID PRIMARY KEY,
  user_id TEXT REFERENCES users(id),
  name TEXT,                        -- e.g. "Currently Reading"
  description TEXT,
  visibility TEXT DEFAULT 'private', -- or 'public', 'shared'
  book_entries JSONB,              -- see structure below
  created_at TIMESTAMP DEFAULT now()
)
```

## JSONB Structures

### Book Entries (in bookshelves.book_entries)
```json
[
  {
    "book_id": "uuid",
    "edition_id": "uuid",
    "status": "read",                // or "to-read", "skipped", etc.
    "notes": "Loved the ending!",
    "added_at": "2025-07-20T14:21:00Z"
  }
]
```

## Usage

### Import schemas
```typescript
import { usersTable, booksTable, editionsTable, bookshelvesTable } from '@/lib/db';
```

### Import types
```typescript
import type { User, Book, Edition, Bookshelf, BookEntry } from '@/lib/db/types';
```

### Use query functions
```typescript
import { createUser, getUserById, createBook, getUserBookshelves } from '@/lib/db/queries';
```

## Migration

To run migrations:

```bash
# Generate migration
npx drizzle-kit generate

# Push to database
npx drizzle-kit push
```

## Relationships

- `users` ← `bookshelves` (one-to-many)
- `books` ← `editions` (one-to-many)
- `bookshelves.book_entries` references `books.id` and `editions.id` (many-to-many via JSONB) 