import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher([
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/', // Add home or more public routes
]);

export default clerkMiddleware(async (auth, req) => {
  const authResult = await auth(); // ✅ Await here

  if (!isPublicRoute(req) && !authResult.userId) {
    return authResult.redirectToSignIn(); // ✅ Now this exists
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};
