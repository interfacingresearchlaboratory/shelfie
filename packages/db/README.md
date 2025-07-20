# @shelfie/db

Database package for the Shelfie bookshelf application.

## Setup

### Environment Variables

Create a `.env` file in the `packages/db/` directory:

```env
# Database Configuration
DATABASE_URL="your_database_url_here"

# Example for Neon PostgreSQL:
# DATABASE_URL="postgresql://username:password@host:port/database"

# Example for local development:
# DATABASE_URL="postgresql://localhost:5432/shelfie"
```

### Installation

```bash
# Install dependencies
npm install

# Generate database migrations
npm run db:generate

# Push migrations to database
npm run db:push

# Open database studio
npm run db:studio
```

## Usage

### Import in your application:

```typescript
// Import database connection
import { db } from '@shelfie/db';

// Import schemas
import { usersTable, booksTable, editionsTable, bookshelvesTable } from '@shelfie/db';

// Import query functions
import { createUser, getUserById, createBook, searchBooks } from '@shelfie/db';

// Import types
import type { User, Book, Edition, Bookshelf } from '@shelfie/db';
```

## Database Schema

### Users
```sql
users (
  id TEXT PRIMARY KEY,              -- Clerk user ID
  email TEXT NOT NULL,
  name TEXT,
  created_at TIMESTAMP DEFAULT now()
)
```

### Books
```sql
books (
  id UUID PRIMARY KEY,
  title TEXT NOT NULL,
  authors TEXT[],
  description TEXT,
  subjects TEXT[],
  published_year INT,
  publisher TEXT,
  series TEXT,
  language TEXT,
  created_at TIMESTAMP DEFAULT now()
)
```

### Editions
```sql
editions (
  id UUID PRIMARY KEY,
  book_id UUID REFERENCES books(id),
  isbn TEXT UNIQUE,
  edition_name TEXT,
  format TEXT,
  page_count INT,
  language TEXT,
  contributors TEXT[],
  cover_url TEXT,
  purchase_links JSONB,
  created_at TIMESTAMP DEFAULT now()
)
```

### Bookshelves
```sql
bookshelves (
  id UUID PRIMARY KEY,
  user_id TEXT REFERENCES users(id),
  name TEXT,
  description TEXT,
  visibility TEXT DEFAULT 'private',
  book_entries JSONB,
  created_at TIMESTAMP DEFAULT now()
)
```

## Available Functions

### User Operations
- `createUser(user)` - Create a new user
- `getUserById(id)` - Get user by ID
- `getUserByEmail(email)` - Get user by email

### Book Operations
- `createBook(book)` - Create a new book
- `getBookById(id)` - Get book by ID
- `searchBooks(query)` - Search books by title

### Edition Operations
- `createEdition(edition)` - Create a new edition
- `getEditionById(id)` - Get edition by ID
- `getEditionsByBookId(bookId)` - Get editions for a book

### Bookshelf Operations
- `createBookshelf(bookshelf)` - Create a new bookshelf
- `getBookshelfById(id)` - Get bookshelf by ID
- `getUserBookshelves(userId)` - Get user's bookshelves
- `addBookToBookshelf(bookshelfId, bookEntry)` - Add book to shelf
- `removeBookFromBookshelf(bookshelfId, bookId, editionId)` - Remove book from shelf 