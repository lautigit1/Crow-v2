## Crow Backend API

### Environment Variables
Copy `.env.example` to `.env` inside `backend/` and fill:

Required:
SUPABASE_URL=https://<project>.supabase.co
SUPABASE_ANON_KEY=public-anon-key
SUPABASE_SERVICE_ROLE_KEY=service-role-key (keep secret)
JWT_ACCESS_SECRET=32+ random chars
JWT_REFRESH_SECRET=32+ random chars

Optional (have defaults):
ACCESS_TOKEN_TTL=900s
REFRESH_TOKEN_TTL=7d
PORT=4000
CORS_ORIGIN=http://localhost:3000

### Where to find values in Supabase
1. Dashboard -> Project Settings -> API: Project URL, anon public key, service role key.
2. Dashboard -> Authentication -> Policies (later for RLS review).
3. SQL Editor: create/inspect RPC function `perform_order`.

### Scripts
Build: `npm --prefix backend run build`
Dev: `npm --prefix backend run start:dev`
Tests unit/e2e (stubbed): `npm --prefix backend test`

### Modules
- Auth: register/login/refresh (JWT access + refresh).
- Users: profile + addresses (RLS via Supabase client per user token).
- Products: CRUD (admin only via RolesGuard).
- Orders: create/list using RPC (stubbed in tests).

### Validation
Zod schemas for DTOs + `ZodValidationPipe` + env validation via `validateEnv`.

### Next Steps
- Replace test stubs with real Supabase integration in e2e using actual .env.
- Add OpenAPI documentation.
- Add RLS policy SQL under `backend/supabase/sql/` and keep in sync.
