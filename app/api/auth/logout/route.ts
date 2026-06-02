import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const response = NextResponse.json(
    {
      success: true,
      message: 'Logout successful',
    },
    { status: 200 }
  );

  // Clear httpOnly cookie
  response.cookies.set('authToken', '', {
    httpOnly: true,
    maxAge: 0,
  });

  return response;
}
