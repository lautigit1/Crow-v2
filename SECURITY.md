# Security Overview

This document summarizes the current security posture of the Crow app (backend + frontend), and recommended operational guidelines.

## Backend (NestJS + Supabase)

- Headers: Helmet enabled globally; common protections active. CSP is currently disabled by default — enable a tailored policy in production if inline scripts/styles are removed.
- CORS: Strict allowlist via CORS_ORIGIN/CORS_ORIGINS. Credentials allowed only for listed origins.
- Validation & Sanitization: Global ZodValidationPipe and an input SanitizePipe (trims and removes control chars) to reduce injection payloads.
- Rate limiting: Global throttling (default 100 req / 60s). Tune via RATE_LIMIT_LIMIT/RATE_LIMIT_TTL.
- Auth: JWT access + refresh. Optional refresh rotation (in-memory token family via jti). Set REFRESH_ROTATION_ENABLED=true to enable.
- Logging: Global LoggingInterceptor logs method, URL, user and duration; errors recorded as warnings.
- Error tracking: ErrorTrackingService stub is wired into the HttpExceptionFilter for future Sentry/Winston integration.

### Refresh Token Rotation
- Current: In-memory jti set per user; on refresh, previous jti is invalidated. This protects against basic replay during a single instance lifetime.
- Limitation: Non-persistent and per-process — tokens won’t be shared across instances and won’t survive restarts.
- Next step (recommended): Persist rotation state (token family/jti) in a DB table and revoke on reuse. Consider TTL/background cleanup.

### Production Recommendations
- Enable CSP in Helmet with a curated policy; avoid unsafe-inline. Consider nonce/sha-based strategies for any dynamic scripts.
- Consider HSTS (strict-transport-security) for HTTPS-only production environments.
- Implement structured logs (JSON) and ship to an external sink (e.g., Loki, ELK, Datadog). Add request IDs/correlation.
- Integrate a real error tracker (Sentry or equivalent) in ErrorTrackingService.
- Regularly rotate secrets and keep .env files out of git. Use deployment-level secret stores.

## Frontend (Next.js)

- Current storage: Access/refresh tokens are used from the client. A migration path to httpOnly cookies is recommended for stronger protection.
- Cookie plan: Store access/refresh in secure, httpOnly, SameSite=strict cookies, with short-lived access tokens and rotating refresh tokens.
- CSRF: If cookies are adopted, add CSRF protection (double-submit token or SameSite=strict plus CSRF tokens for state-changing requests).

## Environment & Secrets
- Do not commit .env files. Use `.env.example` templates only.
- Ensure Supabase JWT secret matches backend JWT access secret when using RLS based on JWT.
- In CI/CD, use environment-level secrets (e.g., GitHub Actions secrets) and avoid writing real values to logs.

## Threat Model (High-Level)
- Token theft: Rotation helps mitigate refresh token replay; cookies reduce XSS-exfiltration risk.
- XSS: Enable CSP and avoid inline scripts; sanitize inputs server-side.
- CSRF: Required if adopting cookie-based auth. Use same-site cookies and CSRF tokens.
- DoS/Abuse: Rate limiting and logging are enabled; consider per-route stricter limits for auth endpoints.

## Operational Checklists
- [ ] Fill backend/.env from backend/.env.example. Do not commit.
- [ ] Set CORS_ORIGINS to production domains.
- [ ] Consider enabling REFRESH_ROTATION_ENABLED in production and persist rotation state.
- [ ] Enable CSP and HSTS in production.
- [ ] Connect ErrorTrackingService to Sentry and configure DSN.
- [ ] Configure structured logging + external log collector.
