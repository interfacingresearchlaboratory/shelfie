import { NextRequest, NextResponse } from 'next/server';
import { getEditionsByBookId, createEdition } from '@shelfie/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const editions = await getEditionsByBookId(id);
    return NextResponse.json(editions);
  } catch (error) {
    console.error('Error fetching editions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch editions' },
      { status: 500 }
    );
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const editionData = { ...body, book_id: id };
    
    const newEdition = await createEdition(editionData);
    return NextResponse.json(newEdition[0], { status: 201 });
  } catch (error) {
    console.error('Error creating edition:', error);
    return NextResponse.json(
      { error: 'Failed to create edition' },
      { status: 500 }
    );
  }
} 