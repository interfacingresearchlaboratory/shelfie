import { NextRequest, NextResponse } from 'next/server';
import { createUser } from '@shelfie/db';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Create a new user
    const newUser = await createUser(body);
    
    return NextResponse.json(newUser[0], { status: 201 });
  } catch (error) {
    console.error('Error creating user:', error);
    return NextResponse.json(
      { error: 'Failed to create user' },
      { status: 500 }
    );
  }
} 