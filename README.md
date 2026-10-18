# Week 3: Code Testing, Debugging, and Refactoring

A refactored Task Manager REST API using Node.js, Express, Jest, and Supertest.

## Setup
Install Node.js (18+ recommended), extract this folder, and run:
```bash
npm install
npm test
npm start
```
The server runs at `http://localhost:3000`. Check `http://localhost:3000/health`.

## Features
- CRUD endpoints for tasks
- Validation for title, date, description, and status
- Consistent JSON error responses
- Modular application, routes, service/store, and error middleware
- Jest and Supertest automated API tests

## Endpoints
| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/health` | Health status |
| GET | `/api/tasks` | List tasks |
| GET | `/api/tasks?status=pending` | Filter tasks |
| GET | `/api/tasks/:id` | Get one task |
| POST | `/api/tasks` | Create task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |

Example POST JSON: `{"title":"Learn testing","description":"Write tests","status":"pending"}`.

## Refactoring and debugging
See `docs/REFACTORING_REPORT.md` for the design decisions, issues addressed, and test cases. The test suite covers health checks, create defaults, title validation, list/filter, invalid filters, get/missing task, update, invalid status, delete/repeated delete, and unknown routes.

## Limitations
The task store is in memory and resets on server restart. This is an educational project, not a production database-backed service. Run `npm test` locally before claiming tests passed.