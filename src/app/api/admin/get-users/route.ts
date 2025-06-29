import { NextResponse } from 'next/server';
import { clerkClient } from '@clerk/clerk-sdk-node';

export async function GET(req: Request) {
    try {
      const users = await clerkClient.users.getUserList({
        limit: 100,
        offset: 0,
      });
  
      return NextResponse.json(users);
    } catch (error) {
      console.error(error);
      return NextResponse.json({ error: 'Failed to fetch users' }, { status: 500 });
    }
  }