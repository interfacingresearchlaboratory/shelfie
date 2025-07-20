import { NextRequest, NextResponse } from 'next/server';
import { getBookshelfById } from '@shelfie/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const bookshelf = await getBookshelfById(id);
    
    if (!bookshelf) {
      return NextResponse.json(
        { error: 'Bookshelf not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json(bookshelf);
  } catch (error) {
    console.error('Error fetching bookshelf:', error);
    return NextResponse.json(
      { error: 'Failed to fetch bookshelf' },
      { status: 500 }
    );
  }
} 