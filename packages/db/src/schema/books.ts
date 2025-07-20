import { pgTable, text, integer, timestamp, uuid } from "drizzle-orm/pg-core";

export const booksTable = pgTable("books", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  authors: text("authors").array(), // Full names or "Last, First"
  description: text("description"),
  subjects: text("subjects").array(), // Tags, e.g. ['farms', 'picture books']
  published_year: integer("published_year"),
  publisher: text("publisher"),
  series: text("series"),
  language: text("language"), // Primary language of the book
  created_at: timestamp("created_at").defaultNow(),
}); 