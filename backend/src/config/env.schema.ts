import { z } from 'zod';

// Zod schema to validate required environment variables at startup
export const EnvSchema = z.object({
  SUPABASE_URL: z.string().url(),
  SUPABASE_ANON_KEY: z.string().min(20),
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(20),
  JWT_ACCESS_SECRET: z.string().min(32),
  JWT_REFRESH_SECRET: z.string().min(32),
  ACCESS_TOKEN_TTL: z.string().default('900s'),
  REFRESH_TOKEN_TTL: z.string().default('7d'),
  PORT: z.string().optional(),
  CORS_ORIGIN: z.string().optional(),
  CORS_ORIGINS: z.string().optional(),
  RATE_LIMIT_TTL: z.string().default('60'),
  RATE_LIMIT_LIMIT: z.string().default('100'),
  REFRESH_ROTATION_ENABLED: z.enum(['true','false']).default('false'),
  NODE_ENV: z.enum(['development','test','production']).optional(),
  E2E_REAL: z.enum(['true','false']).default('false'),
});

export type EnvVars = z.infer<typeof EnvSchema>;

export function validateEnv(raw: NodeJS.ProcessEnv): EnvVars {
  const parsed = EnvSchema.safeParse(raw);
  if (!parsed.success) {
    // Show concise flattened issues for faster debugging
    const issues = parsed.error.flatten().fieldErrors;
    throw new Error('Invalid environment variables: ' + JSON.stringify(issues));
  }
  return parsed.data;
}