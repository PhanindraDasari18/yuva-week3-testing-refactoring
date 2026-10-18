# Week 3 Refactoring and Testing Report

## Overview
This Task Manager API demonstrates modular Node.js code, request validation, consistent errors, and automated endpoint tests.

## Refactoring decisions
- Split app configuration (`src/app.js`) from server startup (`src/server.js`) so tests can import the app without opening a port.
- Moved task data operations into `src/services/taskStore.js`.
- Kept routes in `src/routes/tasks.js` and centralized error handling in middleware.
- Used descriptive function names, consistent JSON responses, and one set of valid task statuses.
- Added Jest and Supertest tests; reset in-memory data before each test for test isolation.

## Issues addressed
These issues are handled by the refactored implementation. Compare with an earlier version if you need to identify which were present in your original code.
1. **Missing or blank task titles:** validation now rejects them with HTTP 400.
2. **Invalid task statuses:** only `pending`, `in-progress`, and `completed` are accepted.
3. **Missing task IDs:** GET, PUT, and DELETE return a consistent JSON 404 response.
4. **Invalid status filter:** unsupported filter values return HTTP 400.
5. **Difficult test setup:** app configuration and server startup are separated so Supertest can test the app directly.

## Tests added
Jest is the test runner and Supertest sends requests to the Express app. Tests cover health check, creation/defaults, blank title, listing/filtering, invalid filter, retrieval and missing IDs, updates/timestamps, invalid status, deletion/repeated deletion, and unknown routes.

## Run commands
```bash
npm install
npm test
npm start
```

## Limitations
Data is stored in memory and resets when the process restarts. Do not report that tests passed until you run `npm test` and inspect the output.