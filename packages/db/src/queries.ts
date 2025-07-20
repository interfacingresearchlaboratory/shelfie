import { eq, and, desc } from "drizzle-orm";
import { db, usersTable, booksTable, editionsTable, bookshelvesTable } from "./index";
import type { NewUser, NewBook, NewEdition, NewBookshelf, BookEntry } from "./types";

// User operations
export async function createUser(user: NewUser) {
  return await db.insert(usersTable).values(user).returning();
}

export async function getUserById(id: string) {
  const result = await db.select().from(usersTable).where(eq(usersTable.id, id));
  return result[0];
}

export async function getUserByEmail(email: string) {
  const result = await db.select().from(usersTable).where(eq(usersTable.email, email));
  return result[0];
}

// Book operations
export async function createBook(book: NewBook) {
  return await db.insert(booksTable).values(book).returning();
}

export async function getBookById(id: string) {
  const result = await db.select().from(booksTable).where(eq(booksTable.id, id));
  return result[0];
}

export async function searchBooks(query: string) {
  return await db
    .select()
    .from(booksTable)
    .where(eq(booksTable.title, query))
    .orderBy(desc(booksTable.created_at));
}

// Edition operations
export async function createEdition(edition: NewEdition) {
  return await db.insert(editionsTable).values(edition).returning();
}

export async function getEditionById(id: string) {
  const result = await db.select().from(editionsTable).where(eq(editionsTable.id, id));
  return result[0];
}

export async function getEditionsByBookId(bookId: string) {
  return await db
    .select()
    .from(editionsTable)
    .where(eq(editionsTable.book_id, bookId))
    .orderBy(desc(editionsTable.created_at));
}

// Bookshelf operations
export async function createBookshelf(bookshelf: NewBookshelf) {
  return await db.insert(bookshelvesTable).values(bookshelf).returning();
}

export async function getBookshelfById(id: string) {
  const result = await db.select().from(bookshelvesTable).where(eq(bookshelvesTable.id, id));
  return result[0];
}

export async function getUserBookshelves(userId: string) {
  return await db
    .select()
    .from(bookshelvesTable)
    .where(eq(bookshelvesTable.user_id, userId))
    .orderBy(desc(bookshelvesTable.created_at));
}

export async function addBookToBookshelf(
  bookshelfId: string,
  bookEntry: BookEntry
) {
  const bookshelf = await getBookshelfById(bookshelfId);
  if (!bookshelf) throw new Error("Bookshelf not found");

  const currentEntries = (bookshelf.book_entries as BookEntry[]) || [];
  const updatedEntries = [...currentEntries, bookEntry];

  return await db
    .update(bookshelvesTable)
    .set({ book_entries: updatedEntries })
    .where(eq(bookshelvesTable.id, bookshelfId))
    .returning();
}

export async function removeBookFromBookshelf(
  bookshelfId: string,
  bookId: string,
  editionId: string
) {
  const bookshelf = await getBookshelfById(bookshelfId);
  if (!bookshelf) throw new Error("Bookshelf not found");

  const currentEntries = (bookshelf.book_entries as BookEntry[]) || [];
  const updatedEntries = currentEntries.filter(
    entry => !(entry.book_id === bookId && entry.edition_id === editionId)
  );

  return await db
    .update(bookshelvesTable)
    .set({ book_entries: updatedEntries })
    .where(eq(bookshelvesTable.id, bookshelfId))
    .returning();
} 