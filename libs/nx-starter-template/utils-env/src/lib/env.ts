import { createEnv } from '@t3-oss/env-core';
import { z as zod } from 'zod';

/**
 * Represents the environment configuration object.
 */

export const env = createEnv({
  server: {
    DB_HOST: zod.string(),
    DB_PORT: zod.string().transform(Number),
    DB_USERNAME: zod.string(),
    DB_PASSWORD: zod.string(),
    DB_DATABASE: zod.string(),
  },
  runtimeEnv: process.env,
});
