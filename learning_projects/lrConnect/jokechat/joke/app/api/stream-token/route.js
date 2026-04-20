import { StreamChat } from 'stream-chat';
import { auth } from '@clerk/nextjs/server';

export async function POST(req) {
  try {
    // Get authenticated user from Clerk
    const { userId, sessionId } = await auth();
    
    if (!userId) {
      return Response.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Initialize Stream Chat server client
    const client = StreamChat.getInstance(
      process.env.NEXT_PUBLIC_STREAM_API_KEY,
      process.env.STREAM_SECRET_KEY
    );

    // Create a token for the user
    const token = client.createToken(userId);

    return Response.json({
      token,
      userId,
      apiKey: process.env.NEXT_PUBLIC_STREAM_API_KEY,
    });
  } catch (error) {
    console.error('Error generating token:', error);
    return Response.json({ error: 'Failed to generate token' }, { status: 500 });
  }
}
