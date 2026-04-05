# System Overview

## Purpose
This document describes the complete Speech Form System architecture, module responsibilities, and internal flow from basic usage to advanced integration.

## Project Structure
```
speech-form-system/
├── ai-module/      # Python NLP service for text extraction
├── backend/        # Node.js / Express API + MongoDB persistence
├── frontend/       # React UI and speech capture
├── README.md       # project overview
```

## Overall Technology Stack
- Frontend: React, Vite, Tailwind CSS, Web Speech API, Axios
- Backend: Node.js, Express, Mongoose, MongoDB, Axios
- AI Module: Python, FastAPI, Pydantic, regex-based NLP

## High-Level Flow
1. User speaks into the browser or enters text manually.
2. The frontend captures the speech text and displays it.
3. The user clicks `Extract Data`.
4. The frontend sends text to the backend.
5. The backend forwards the text to the AI module.
6. The AI module extracts structured form fields and returns JSON.
7. The backend returns that response to the frontend.
8. The frontend renders the extracted values in the form.
9. The user can correct fields manually.
10. The user clicks `Submit Form`.
11. The backend validates and saves the form to MongoDB.

## Module Responsibilities

### `ai-module`
- Handles NLP extraction only.
- Exposes `POST /extract`.
- Uses regex patterns to extract student form fields.
- Returns a normalized JSON object.

### `backend`
- Exposes REST endpoints for frontend consumption.
- Coordinates with the AI module and database.
- Validates payloads, normalizes nested requests, and saves results.
- Uses `Form` Mongoose schema for persistence.

### `frontend`
- Captures speech using browser APIs.
- Provides the user interface for extraction and submission.
- Consumes backend APIs and presents results.

## Integration Points
- `frontend` → `backend` at `http://localhost:5000/api`.
- `backend` → `ai-module` at `http://localhost:8000/extract`.
- `backend` → MongoDB using `MONGO_URI` configured in `.env`.

## Running Order
For local development, start services in this order:
1. `ai-module` service on port `8000`
2. `backend` service on port `5000`
3. `frontend` app on port `5173`

## Deployment Considerations
- In production, use environment variables instead of hardcoded localhost URLs.
- Secure API endpoints and optionally add authentication.
- Use a managed MongoDB service or cluster.
- Add logging, monitoring, and retry logic for the AI module.

## Where to Learn More
- `ai-module/AI_MODULE_DOCS.md`
- `backend/BACKEND_DOCS.md`
- `frontend/FRONTEND_DOCS.md`

## Summary
This system is a split-architecture application:
- `frontend` handles user interaction and speech capture,
- `backend` handles API orchestration and data storage,
- `ai-module` handles the NLP extraction logic.

Together they form a complete speech-to-form pipeline, from voice input to saved structured records.
