import { pgTable, text, timestamp, uuid, jsonb } from "drizzle-orm/pg-core";
import { usersTable } from "./users";

export const bookshelvesTable = pgTable("bookshelves", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: text("user_id").references(() => usersTable.id),
  name: text("name"), // e.g. "Currently Reading"
  description: text("description"),
  visibility: text("visibility").default("private"), // or 'public', 'shared'
  book_entries: jsonb("book_entries"), // see structure in comments
  created_at: timestamp("created_at").defaultNow(),
});

/*
JSONB book_entries format:
[
  {
    "book_id": "uuid",
    "edition_id": "uuid", 
    "status": "read",                // or "to-read", "skipped", etc.
    "notes": "Loved the ending!",
    "added_at": "2025-07-20T14:21:00Z"
  }
]
*/ 