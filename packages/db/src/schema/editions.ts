import { pgTable, text, integer, timestamp, uuid, jsonb } from "drizzle-orm/pg-core";
import { booksTable } from "./books";

export const editionsTable = pgTable("editions", {
  id: uuid("id").primaryKey().defaultRandom(),
  book_id: uuid("book_id").references(() => booksTable.id),
  isbn: text("isbn").unique(),
  edition_name: text("edition_name"), // e.g. "1st Ed", "Illustrated Ed"
  format: text("format"), // e.g. "Hardcover", "Ebook"
  page_count: integer("page_count"),
  language: text("language"),
  contributors: text("contributors").array(), // Illustrators, editors
  cover_url: text("cover_url"),
  purchase_links: jsonb("purchase_links"), // e.g. {"Amazon": "...", "Bookshop": "..."}
  created_at: timestamp("created_at").defaultNow(),
}); 