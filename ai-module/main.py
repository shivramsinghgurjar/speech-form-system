from fastapi import FastAPI
from pydantic import BaseModel
from extractor import extract

app = FastAPI()

class Input(BaseModel):
    text: str

@app.get("/")
def home():
    return {"message": "AI Module Running"}

@app.post("/extract")
def extract_data(input: Input):
    return extract(input.text)