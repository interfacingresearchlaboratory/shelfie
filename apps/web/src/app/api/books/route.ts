import { NextRequest, NextResponse } from 'next/server';
import { createBook, getBookById, searchBooks, createEdition, getEditionsByBookId } from '@shelfie/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const id = searchParams.get('id');

    if (id) {
      // Get book by ID
      const book = await getBookById(id);
      if (!book) {
        return NextResponse.json({ error: 'Book not found' }, { status: 404 });
      }
      return NextResponse.json(book);
    }

    if (query) {
      // Search books
      const books = await searchBooks(query);
      return NextResponse.json(books);
    }

    // Return empty array if no query
    return NextResponse.json([]);
  } catch (error) {
    console.error('Error fetching books:', error);
    return NextResponse.json(
      { error: 'Failed to fetch books' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Create a new book
    const newBook = await createBook(body);
    
    return NextResponse.json(newBook[0], { status: 201 });
  } catch (error) {
    console.error('Error creating book:', error);
    return NextResponse.json(
      { error: 'Failed to create book' },
      { status: 500 }
    );
  }
} 