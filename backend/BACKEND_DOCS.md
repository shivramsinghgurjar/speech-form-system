# Backend Documentation

## Purpose
The `backend` folder hosts the Node.js API and database layer. It acts as middleware between the frontend UI and the AI module.

## Technology Stack
- Node.js
- Express.js
- Mongoose
- MongoDB
- Axios
- dotenv
- CORS

## Key Files and Folders
- `server.js`: main Express server and route registration.
- `config/db.js`: MongoDB connection setup.
- `routes/form.routes.js`: save-form endpoint routing.
- `routes/speech.routes.js`: speech extraction endpoint routing.
- `controllers/form.controller.js`: processes incoming form save requests.
- `controllers/speech.controller.js`: sends user text to the AI module.
- `models/Form.js`: Mongoose schema for form persistence.
- `.env`: environment variables for MongoDB connection.

## What This Folder Does
This module receives requests from the frontend, validates payloads, forwards text to the AI service, and saves structured form results in MongoDB.

## Internal Flow
1. `server.js` configures Express with:
   - CORS support
   - JSON body parsing
   - route mounting for `/api/form` and `/api/speech`
2. On startup, `config/db.js` connects to MongoDB using `MONGO_URI`.
3. Frontend requests reach:
   - `POST /api/speech/extract`
   - `POST /api/form`
4. `speech.controller.js` validates the text input, then posts to the AI module at `http://localhost:8000/extract` using Axios.
5. The backend returns the AI module response directly to the frontend.
6. `form.controller.js` validates and normalizes incoming form data before saving it to MongoDB.
7. The `Form` model persists this data with timestamps.

## Data Model
The `Form` schema stores:
- `source` (default `speech-form`)
- `transcription`
- `extractedData` (mixed object)
- `name`
- `systemid`
- `rollnumber`
- `year`
- `program`
- `branch`
- `passingyear`
- legacy fields: `email`, `phone`, `date`

Required fields ensure the saved record contains the expected student form values.

## Validation and Robustness
- `speech.controller.js` rejects empty or invalid text payloads.
- It detects AI service connectivity issues and returns a 503 error if the AI module is unreachable.
- `form.controller.js` checks the payload, supports nested `data` wrappers, and rejects requests with missing required fields.
- The backend logs debugging details for incoming payloads and extraction errors.

## Running Locally
```bash
cd backend
npm install
node server.js
```

The backend listens on `http://localhost:5000`.

## Notes for Extension
- Add authentication middleware in `middleware/auth.js` for secure API access.
- Use `express-validator` or Joi for stricter input validation.
- Add read routes and query endpoints for saved forms.
- Use centralized logging and request tracing for production readiness.
