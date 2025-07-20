import { NextRequest, NextResponse } from 'next/server';
import { createBookshelf } from '@shelfie/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Create a new bookshelf
    const newBookshelf = await createBookshelf(body);
    
    return NextResponse.json(newBookshelf[0], { status: 201 });
  } catch (error) {
    console.error('Error creating bookshelf:', error);
    return NextResponse.json(
      { error: 'Failed to create bookshelf' },
      { status: 500 }
    );
  }
} 