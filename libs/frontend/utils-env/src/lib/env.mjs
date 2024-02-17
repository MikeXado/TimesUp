import { z as zod } from 'zod';
import { createEnv } from '@t3-oss/';

export const isEnv = !!process.env.VERCEL_ENV;
export const env = createEnv({
  server: {
    CLERK_SECRET_KEY: zod.string(),
  },
  client: {
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: zod.string(),
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: zod.string(),
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: zod.string(),
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL: zod.string(),
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL: zod.string(),
  },
  /*
   * Due to how Next.js bundles environment variables on Edge and Client,
   * we need to manually destructure them to make sure all are included in bundle.
   *
   * 💡 You'll get type errors if not all variables from `server` & `client` are included here.
   */
  runtimeEnv: {
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    //  `client` vars only
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY:
      process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    NEXT_PUBLIC_CLERK_SIGN_IN_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_SIGN_UP_URL: process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL,
    NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL:
      process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL,
    NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL:
      process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL,
  },
  skipValidation: !isEnv,
  onValidationError: (error) => {
    console.error(error);
    isEnv && Sentry.captureException('Invalid Env config', { error });
    throw error;
  },
});
