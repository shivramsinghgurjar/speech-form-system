from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from extractor import extract

app = FastAPI(title="Speech Form AI Module", version="1.0.0")

# Enable CORS for frontend requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Input(BaseModel):
    text: str

@app.get("/")
def home():
    """Health check endpoint"""
    return {
        "status": "running",
        "service": "Speech Form AI Module",
        "version": "1.0.0"
    }

@app.post("/extract")
def extract_data(input: Input):
    """
    Extract structured data from text.
    
    Returns a dictionary with extracted fields:
    - email: extracted email address
    - phone: extracted phone number
    - name: extracted name
    - date: extracted date
    """
    try:
        # Validate input
        if not input.text or not input.text.strip():
            raise HTTPException(
                status_code=400,
                detail="Text field is required and cannot be empty"
            )
        
        # Extract data
        result = extract(input.text.strip())
        
        return {
            "success": True,
            "data": result,
            "extracted_count": len(result)
        }
    except Exception as e:
        print(f"Extraction error: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Error during extraction: {str(e)}"
        )

@app.get("/health")
def health_check():
    """Detailed health check"""
    return {
        "status": "healthy",
        "service": "Speech Form AI Module",
        "endpoints": {
            "health": "/health",
            "home": "/",
            "extract": "/extract (POST)"
        }
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
