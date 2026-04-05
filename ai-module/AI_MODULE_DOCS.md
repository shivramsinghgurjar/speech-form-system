# AI Module Documentation

## Purpose
The `ai-module` folder provides the Natural Language Processing (NLP) service for the Speech Form System. It converts raw spoken or typed text into structured student form fields.

## Technology Stack
- Python 3
- FastAPI
- Pydantic
- Uvicorn
- Regular expressions (`re`)
- CORS middleware

## Key Files
- `main.py`: FastAPI application, routing, validation, and response handling.
- `extractor.py`: Rule-based extraction logic using regular expressions.
- `requirements.txt`: Python dependencies for the AI module.

## What This Folder Does
This folder runs an HTTP API service that receives plain text and returns extracted structured data. It does not render UI or save data to MongoDB; it only performs text extraction and returns the results.

## Internal Flow
1. Client sends a POST request to `/extract` with JSON body `{ "text": "..." }`.
2. `main.py` validates the payload using the `Input` Pydantic model.
3. The text is cleaned and forwarded to the `extract()` function in `extractor.py`.
4. `extractor.py` runs a sequence of regex-based patterns to identify fields such as:
   - `name`
   - `systemid`
   - `rollnumber`
   - `year`
   - `program`
   - `branch`
   - `passingyear`
5. The extraction logic returns a normalized dictionary of found values.
6. FastAPI responds with JSON containing the extracted fields.

## Extraction Method
The module uses a rule-based NLP approach rather than a machine learning model.

### `extractor.py` details
- Uses `re.search()` to match text patterns.
- Includes helper function `clean_number()` to normalize IDs and roll numbers by removing dashes, spaces, and dots.
- Supports multiple text patterns for each field, such as:
  - `name is John`
  - `system id is 2023-340-021`
  - `roll number is 2301-010-822`
  - `3rd year` or `year 3`
  - `B.Tech`, `M.Tech`, `BCA`, `MCA`
  - `CSE`, `ECE`, `ME`, `CE`, `EE`, `IT`
  - `passing year 2027`
- Uses fallback patterns when the first strict match fails.

## API Endpoints
- `GET /` - health check and service metadata.
- `GET /health` - detailed health response listing available endpoints.
- `POST /extract` - main extraction endpoint.

## Error Handling
- Validates that `text` is non-empty.
- Raises `HTTPException` with status 400 for invalid input.
- Raises 500 on extraction failure with debug logging.

## Integration
- The backend service calls this module at `http://localhost:8000/extract`.
- Frontend does not call this folder directly; it goes through the backend.

## Advanced Notes
- This module is intentionally lightweight and deterministic.
- It is ideal for quick form extraction and can be extended later with true NLP models or named entity recognition.
- The current architecture supports replacing `extractor.py` with a model-based implementation without changing the public API.

## Running Locally
```bash
cd ai-module
pip install -r requirements.txt
uvicorn main:app --reload
```

The service runs on `http://127.0.0.1:8000`.
