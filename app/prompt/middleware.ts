// app/prompt/middleware.ts or app/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  // Get the cookie jar
  const cookies = request.cookies;
  
  // Check if user is logged in
  const accessToken = cookies.get('access_token')?.value;
  
  // Check if the request is for the protected prompt page
  const isPromptPage = request.nextUrl.pathname === '/prompt';
  
  if (isPromptPage) {
    // If no access token, redirect to login
    if (!accessToken) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
    
    // Get premium status from cookie if available (can be set after payment)
    const premiumStatus = cookies.get('premium_status')?.value;
    
    // If not premium, redirect to pricing
    if (premiumStatus !== 'active') {
      return NextResponse.redirect(new URL('/pricing', request.url));
    }
  }
  
  // Continue to the protected prompt page if they have access
  return NextResponse.next();
}

// Specify which paths this middleware should run on
export const config = {
  matcher: ['/prompt'],
};