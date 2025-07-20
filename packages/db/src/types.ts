import { InferModel } from "drizzle-orm";
import { usersTable, booksTable, editionsTable, bookshelvesTable } from "./index";

// Infer types from schema
export type User = InferModel<typeof usersTable>;
export type NewUser = InferModel<typeof usersTable, "insert">;

export type Book = InferModel<typeof booksTable>;
export type NewBook = InferModel<typeof booksTable, "insert">;

export type Edition = InferModel<typeof editionsTable>;
export type NewEdition = InferModel<typeof editionsTable, "insert">;

export type Bookshelf = InferModel<typeof bookshelvesTable>;
export type NewBookshelf = InferModel<typeof bookshelvesTable, "insert">;

// Book entry type for JSONB in bookshelves
export interface BookEntry {
  book_id: string;
  edition_id: string;
  status: "read" | "to-read" | "skipped" | "currently-reading" | "abandoned";
  notes?: string;
  added_at: string; // ISO date string
}

// Purchase links type for JSONB in editions
export interface PurchaseLinks {
  [key: string]: string; // e.g., { "Amazon": "https://...", "Bookshop": "https://..." }
} 