# Multi-Tenant Task Management Backend

A production-grade backend system that supports multi-tenant organizations, role-based access control, relational task workflows, caching, and background job processing.

This project is designed to demonstrate real backend engineering skills: architecture, data isolation, performance strategy, and scalability.

---

## Core Features

### Authentication & Security

- JWT-based authentication
- Secure password hashing (bcrypt)
- Protected routes with middleware
- Org-scoped request context

---

### Multi-Tenancy

- Multiple organizations per user
- Strict org data isolation
- All major entities scoped to organizations
- Prevents cross-org data leaks

---

### Role-Based Access Control (RBAC)

- ADMIN and MEMBER roles
- Role validation middleware
- Privilege-based route protection

---

### Core Product

- Organizations
- Boards
- Lists
- Tasks
- Assignment and filtering
- Pagination and sorting

---

### Production Engineering

- Redis caching for heavy reads
- BullMQ background workers
- Audit logging pipeline
- Email and invite jobs
- Cache invalidation strategy

---

### Quality & Testing

- Jest and Supertest integration tests
- Auth and RBAC enforcement tests
- Org isolation tests
- Task lifecycle tests

---

## High-Level Architecture

Client
→ Express API
→ Auth middleware
→ Org context middleware
→ RBAC middleware
→ Controllers
→ Services (business logic)
→ Prisma ORM
→ PostgreSQL

Side systems:
Redis for caching and queues
BullMQ for background jobs
Workers for emails and audit logs

---

## Folder Structure

```
src/
  app.ts
  server.ts

  core/
    prisma.ts
    redis.ts
    queue.ts

  modules/
    auth/
    org/
    board/
    task/
    audit/

  middlewares/
    auth.middleware.ts
    org.middleware.ts
    rbac.middleware.ts

  workers/
    email.worker.ts
    audit.worker.ts
    summary.worker.ts

  tests/
```

---

## Database Design (Multi-Tenant)

Main entities:

- User
- Organization
- OrgMember
- Board
- List
- Task
- AuditLog
- Invite

Every major table contains an orgId to enforce tenant isolation.

---

## Auth and Org Flow

1. User logs in and receives JWT
2. JWT middleware validates identity
3. Org middleware validates membership
4. Role middleware enforces permission
5. Request continues to controller

Every protected request contains:

```
req.user
req.org
req.role
```

---

## Core API Surface

### Auth

```
POST /auth/register
POST /auth/login
```

---

### Organizations

```
POST /orgs
GET  /orgs
POST /orgs/:orgId/invite
POST /orgs/join/:token
```

---

### Boards

```
POST   /orgs/:orgId/boards
GET    /orgs/:orgId/boards
GET    /boards/:boardId
PATCH  /boards/:boardId
DELETE /boards/:boardId
```

---

### Lists

```
POST   /boards/:boardId/lists
PATCH  /lists/:id
DELETE /lists/:id
```

---

### Tasks

```
POST   /lists/:listId/tasks
GET    /tasks?status=&priority=&assignee=&page=
PATCH  /tasks/:id
DELETE /tasks/:id
```

---

### Audit Logs

```
GET /orgs/:orgId/audit-logs
```

---

## Redis Caching Strategy

Cached endpoints:

```
org:{orgId}:boards
board:{boardId}:full
```

Flow:

1. Check Redis
2. On miss, query PostgreSQL
3. Cache response with TTL
4. On mutation, invalidate keys

---

## Background Job System

BullMQ workers handle:

- Email invites
- Audit log persistence
- Daily task summaries

This decouples slow operations from API latency.

---

## Testing Strategy

- Jest and Supertest
- Isolated test database
- Coverage includes:
  - Auth flows
  - Org isolation
  - RBAC enforcement
  - Task lifecycle
  - Pagination correctness

---

## Tech Stack

- Node.js
- TypeScript
- Express
- Prisma ORM
- PostgreSQL
- Redis
- BullMQ
- Jest and Supertest

---

## Getting Started

```bash
git clone <repo>
cd project
npm install
```

Create `.env`:

```
DATABASE_URL=
REDIS_URL=
JWT_SECRET=
```

Run migrations:

```bash
npx prisma migrate dev
```

Start server:

```bash
npm run dev
```

---

## Project Goals

This backend focuses on:

- Multi-tenant system design
- Secure authentication flows
- Role enforcement
- Scalable architecture
- Production-grade data modeling
- Event-driven backend thinking

---

## Future Extensions

- Soft deletes
- Activity feed
- Webhooks
- Rate limiting
- API documentation
- Metrics and monitoring
