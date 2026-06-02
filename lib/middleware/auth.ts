import { NextRequest } from 'next/server';
import { verifyToken, JWTPayload } from '../auth/jwt';

export async function authenticateRequest(
  request: NextRequest
): Promise<{ user: JWTPayload | null; error?: string }> {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      // Try to get from cookies
      const token = request.cookies.get('authToken')?.value;
      if (!token) {
        return { user: null, error: 'No authentication token found' };
      }

      const user = verifyToken(token);
      if (!user) {
        return { user: null, error: 'Invalid or expired token' };
      }

      return { user };
    }

    const token = authHeader.replace('Bearer ', '');
    const user = verifyToken(token);

    if (!user) {
      return { user: null, error: 'Invalid or expired token' };
    }

    return { user };
  } catch (error) {
    return { user: null, error: 'Authentication failed' };
  }
}

export function createAuthResponse(statusCode: number, message: string, data?: any) {
  return Response.json(
    {
      success: statusCode >= 200 && statusCode < 300,
      message,
      ...(data && { data }),
    },
    { status: statusCode }
  );
}
