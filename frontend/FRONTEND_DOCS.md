# Frontend Documentation

## Purpose
The `frontend` folder provides the React user interface for capturing speech/text input, displaying the generated form, and sending data to the backend.

## Technology Stack
- React
- Vite
- JavaScript (ES6)
- Tailwind CSS classes
- Axios
- Web Speech API (browser built-in)

## Key Files and Folders
- `src/pages/Home.jsx`: main page, extraction workflow, state management, and submission logic.
- `src/components/VoiceInput.jsx`: speech capture UI and text capture controls.
- `src/components/FormRenderer.jsx`: dynamic form rendering and editing.
- `src/components/Loader.jsx`: loading indicator.
- `src/components/ErrorMessage.jsx`: error display.
- `src/hooks/useSpeech.js`: speech recognition hook.
- `src/services/api.js`: Axios API wrapper for backend integration.
- `index.html`: app shell for Vite.

## What This Folder Does
This module collects user input, displays an editable student form, and orchestrates the full frontend flow from voice capture to backend persistence.

## Internal Flow
1. The user opens the app and lands on `Home.jsx`.
2. `VoiceInput` uses `useSpeech` to access the browser's Speech Recognition API.
3. When the user starts speaking, the browser listens and streams interim results into a text buffer.
4. The user clicks `Use Text` to confirm the captured speech and populate the text editor.
5. Clicking `Extract Data` triggers `processText()` in `Home.jsx`.
6. `extractKeywords()` from `src/services/api.js` posts the text to the backend at `/api/speech/extract`.
7. The backend forwards text to the AI module and returns extracted fields.
8. `Home.jsx` normalizes the returned payload and stores fields in `formData`.
9. `FormRenderer` renders editable input fields for each student form value.
10. The user may correct or adjust fields manually.
11. Clicking `Submit Form` calls `saveForm()` to send the final payload to `/api/form`.
12. Success or error feedback appears in the UI.

## Speech Capture Logic
- `useSpeech.js` uses browser `window.SpeechRecognition || window.webkitSpeechRecognition`.
- It supports continuous listening and interim transcript updates.
- It resets text when recording starts and updates on every recognition result.
- `VoiceInput` shows live recording status and allows stopping/listening control.

## Form Rendering Logic
- `FormRenderer` uses a fixed form template with fields:
  - `name`
  - `systemid`
  - `rollnumber`
  - `year`
  - `program`
  - `branch`
  - `passingyear`
- It supports inputs and select dropdowns.
- It displays a completion progress indicator and field status.

## API Layer
- `src/services/api.js` defines a single Axios instance:
  - `POST /speech/extract`
  - `POST /form`
- The frontend expects the backend to be running locally on `http://localhost:5000`.

## Error Handling
- `Home.jsx` displays error messages when:
  - text is missing
  - extraction returns no fields
  - the AI module or backend fails
- It clears error and success notifications automatically after 4 seconds.

## Running Locally
```bash
cd frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173`.

## Notes for Extension
- Add a browser feature check to gracefully handle unsupported Web Speech API environments.
- Improve payload normalization for different backend/AI response shapes.
- Add field validation before submission.
- Add history or saved form view pages.
