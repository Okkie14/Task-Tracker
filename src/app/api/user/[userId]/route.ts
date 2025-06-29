import { clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  context: { params: Promise<{ userId: string }> }
) {
  const params = await context.params;
  try {
    const clerk = await clerkClient();
    const user = await clerk.users.getUser(params.userId);
    
    const displayName = user.firstName && user.lastName 
      ? `${user.firstName} ${user.lastName}`
      : user.username || user.emailAddresses[0]?.emailAddress || 'Unknown User';
    
    return NextResponse.json({ 
      name: displayName,
      initials: displayName.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2)
    });
  } catch (error) {
    console.error('Error fetching user:', error);
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
}