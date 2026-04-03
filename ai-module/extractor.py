import re

def extract(text):
    """
    Extract structured form data from natural language text.
    Supports: email, phone, name, date
    """
    data = {}

    # EMAIL - Multiple patterns for robustness
    email_patterns = [
        r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b',  # Standard email
        r'\S+@\S+\.\S+',  # Basic email-like pattern
    ]
    for pattern in email_patterns:
        email = re.findall(pattern, text)
        if email:
            data["email"] = email[0]
            break

    # PHONE - Multiple patterns for different formats
    phone_patterns = [
        r'(?:\+91|0)?[\s.-]?[6-9]\d{2}[\s.-]?\d{4}[\s.-]?\d{4}',  # Indian format: +91 XXXXX XXXXX or 10 digits
        r'\+\d{1,3}\s?\d{1,14}',  # International format
        r'\d{3}[-.\s]?\d{3}[-.\s]?\d{4}',  # 3-3-4 format (US/Canada)
        r'\d{10}',  # Simple 10 digits
    ]
    for pattern in phone_patterns:
        phone = re.findall(pattern, text)
        if phone:
            # Clean phone number (remove spaces, dashes, dots)
            cleaned = re.sub(r'[\s.-]', '', phone[0])
            data["phone"] = cleaned
            break

    # NAME - Multiple patterns for robustness
    name_patterns = [
        (r'(?:my\s+)?name\s+(?:is\s+)?([A-Z][a-z]+)', 1),  # "name is John" or "my name is John"
        (r'(?:i\s+)?(?:am|\'m)\s+([A-Z][a-z]+)', 1),  # "I am John" or "I'm John"
        (r'(?:this\s+is\s+)?([A-Z][a-z]+\s+[A-Z][a-z]+)', 0),  # "This is John Doe" or "John Doe"
        (r'call me\s+([A-Z][a-z]+)', 1),  # "Call me John"
    ]
    for pattern, group_index in name_patterns:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            name_value = match.group(group_index + 1) if group_index + 1 <= match.lastindex or match.lastindex is None else match.group(1)
            if name_value:
                data["name"] = name_value.strip().title()
                break

    # DATE - Multiple formats
    date_patterns = [
        r'\d{4}-\d{2}-\d{2}',  # YYYY-MM-DD
        r'\d{2}/\d{2}/\d{4}',  # DD/MM/YYYY or MM/DD/YYYY
        r'\d{2}-\d{2}-\d{4}',  # DD-MM-YYYY
        r'(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)[a-z]*\s+\d{1,2},?\s+\d{4}',  # Month DD, YYYY
    ]
    for pattern in date_patterns:
        date = re.findall(pattern, text, re.IGNORECASE)
        if date:
            data["date"] = date[0]
            break

    return data
