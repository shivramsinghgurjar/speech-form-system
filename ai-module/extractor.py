import re

def extract(text):
    """
    Extract student form data from natural language text.
    Supports: name, systemid, rollnumber, year, program, branch, passingyear
    
    Handles numbers with dashes, spaces, and dots (e.g., 2023-340-021 or 2023 340 021)
    """
    data = {}

    # Helper function to clean numbers (remove dashes, spaces, dots)
    def clean_number(num_str):
        return re.sub(r'[\s\-\.]', '', num_str)

    # NAME - Multiple patterns (case-insensitive)
    name_patterns = [
        r'(?:my\s+)?name\s+(?:is\s+)?([A-Za-z]+)',  # "name is John" - captures first word only
        r'(?:i\s+)?(?:am|\'m)\s+([A-Za-z]+)',  # "I am John"
        r'call\s+me\s+([A-Za-z]+)',  # "Call me John"
        r'this\s+is\s+([A-Za-z]+)',  # "This is John"
    ]
    for pattern in name_patterns:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            name_value = match.group(1).strip()
            if name_value and len(name_value) > 1:
                data["name"] = name_value.title()
                break

    # SYSTEM ID - Multiple patterns (handles dashes/spaces/dots)
    systemid_patterns = [
        r'(?:system\s+)?id\s+(?:is\s+)?([0-9][\d\s\-\.]{8,}[0-9])',  # "system id is 2023-340-021"
        r'sys\s+id\s+(?:is\s+)?([0-9][\d\s\-\.]{8,}[0-9])',  # "sys id 2023-340-021"
        r'sid\s+(?:is\s+)?([0-9][\d\s\-\.]{8,}[0-9])',  # "sid 2023-340-021"
    ]
    for pattern in systemid_patterns:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            cleaned = clean_number(match.group(1))
            if cleaned.isdigit() and 3 <= len(cleaned) <= 15:
                data["systemid"] = cleaned
                break

    # Fallback short system ID if not found
    if "systemid" not in data:
        fallback = re.search(r'(?:system\s+)?id\s+(?:is\s+)?([0-9][\d\s\-\.]*)', text, re.IGNORECASE)
        if fallback:
            cleaned = clean_number(fallback.group(1))
            if cleaned.isdigit() and 3 <= len(cleaned) <= 15:
                data["systemid"] = cleaned

    # ROLL NUMBER - Multiple patterns (handles dashes/spaces/dots)
    rollnumber_patterns = [
        r'roll\s+(?:number|no)\s+(?:is\s+)?([0-9][\d\s\-\.]{8,}[0-9])',  # "roll number is 2301-010-822"
        r'roll\s+(?:is\s+)?([0-9][\d\s\-\.]{8,}[0-9])',  # "roll is 2301-010-822"
        r'enrollment\s+(?:is\s+)?([0-9][\d\s\-\.]{8,}[0-9])',  # "enrollment 2301-010-822"
    ]
    for pattern in rollnumber_patterns:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            cleaned = clean_number(match.group(1))
            if cleaned.isdigit() and 3 <= len(cleaned) <= 15:
                data["rollnumber"] = cleaned
                break

    # Fallback short roll number if not found
    if "rollnumber" not in data:
        fallback = re.search(r'roll\s+(?:number|no)?\s*(?:is\s+)?([0-9][\d\s\-\.]*)', text, re.IGNORECASE)
        if fallback:
            cleaned = clean_number(fallback.group(1))
            if cleaned.isdigit() and 3 <= len(cleaned) <= 15:
                data["rollnumber"] = cleaned

    # YEAR - Extract 1st/2nd/3rd/4th year
    year_patterns = [
        r'(?:currently\s+)?in\s+(\d+)(?:st|nd|rd|th)?\s+year',  # "in 3rd year" or "currently in 3 year"
        r'(?:year|yr)\s+(\d+)',  # "year 3"
        r'(\d)(?:st|nd|rd|th)\s+(?:year|yr)',  # "3rd year"
    ]
    for pattern in year_patterns:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            year_num = match.group(1)
            if year_num and int(year_num) in [1, 2, 3, 4]:
                suffix = ["st", "nd", "rd", "th"][int(year_num) - 1]
                data["year"] = f"{year_num}{suffix} Year"
                break

    # PROGRAM - B.Tech, M.Tech, B.Sc, M.Sc, BCA, MCA
    program_patterns = [
        r'(?:program|course|is)\s+[a-z\.]*\s*b\.?\s*tech',  # "B.Tech"
        r'(?:program|course|is)\s+[a-z\.]*\s*m\.?\s*tech',  # "M.Tech"
        r'(?:program|course|is)\s+[a-z\.]*\s*b\.?\s*sc',  # "B.Sc"
        r'(?:program|course|is)\s+[a-z\.]*\s*m\.?\s*sc',  # "M.Sc"
        r'(?:program|course|is)\s+[a-z\.]*\s*bca',  # "BCA"
        r'(?:program|course|is)\s+[a-z\.]*\s*mca',  # "MCA"
        r'\b(?:p|b)\.?\s*tech\b',  # "P tech" or "B tech"
        r'\bb\.?\s*tech\b',  # Standalone "B.Tech"
        r'\bm\.?\s*tech\b',  # Standalone "M.Tech"
        r'\bbca\b',  # Standalone "BCA"
        r'\bmca\b',  # Standalone "MCA"
        r'\bb\.?\s*sc\b',  # Standalone "B.Sc"
        r'\bm\.?\s*sc\b',  # Standalone "M.Sc"
    ]
    for pattern in program_patterns:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            matched_text = match.group(0).lower().replace('.', '').replace(' ', '')
            if 'ptech' in matched_text or 'btech' in matched_text or 'btech' in matched_text:
                data["program"] = "B.Tech"
                break
            elif 'mtech' in matched_text or 'mtech' in matched_text:
                data["program"] = "M.Tech"
                break
            elif 'bsc' in matched_text:
                data["program"] = "B.Sc"
                break
            elif 'msc' in matched_text:
                data["program"] = "M.Sc"
                break
            elif 'bca' in matched_text:
                data["program"] = "BCA"
                break
            elif 'mca' in matched_text:
                data["program"] = "MCA"
                break

    # BRANCH - CSE, ECE, ME, CE, EE, IT
    branch_patterns = [
        r'(?:branch|stream|in)\s+([a-z]*\s*)?cse',  # "CSE"
        r'(?:branch|stream|in)\s+([a-z]*\s*)?ece',  # "ECE"
        r'(?:branch|stream|in)\s+([a-z]*\s*)?me(?:\s|$)',  # "ME"
        r'(?:branch|stream|in)\s+([a-z]*\s*)?ce(?:\s|$)',  # "CE"
        r'(?:branch|stream|in)\s+([a-z]*\s*)?ee',  # "EE"
        r'(?:branch|stream|in)\s+([a-z]*\s*)?it',  # "IT"
        r'\bcse\b',  # Standalone
        r'\bece\b',
        r'\bme\b',
        r'\bce\b',
        r'\bee\b',
        r'\bit\b',
        r'computer\s+(?:science|engineering)',  # "Computer Science/Engineering"
        r'mechanical\s+engineering',  # "Mechanical Engineering"
        r'civil\s+engineering',  # "Civil Engineering"
        r'electrical\s+engineering',  # "Electrical Engineering"
        r'electronics\s+(?:and\s+communication|engineering)',  # "Electronics and Communication"
        r'information\s+technology',  # "Information Technology"
    ]
    for pattern in branch_patterns:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            matched_text = match.group(0).lower().replace(' ', '')
            if 'csc' in matched_text or 'cse' in matched_text or 'computer' in matched_text:
                data["branch"] = "CSE"
                break
            elif 'ece' in matched_text or 'electronics' in matched_text:
                data["branch"] = "ECE"
                break
            elif 'mechanical' in matched_text or matched_text == 'me':
                data["branch"] = "ME"
                break
            elif 'civil' in matched_text or matched_text == 'ce':
                data["branch"] = "CE"
                break
            elif 'electrical' in matched_text or matched_text == 'ee':
                data["branch"] = "EE"
                break
            elif 'information' in matched_text or 'it' in matched_text:
                data["branch"] = "IT"
                break

    # PASSING YEAR - 4-digit year
    passingyear_patterns = [
        r'passing\s+year\s+(?:is\s+)?([0-9]{4})',  # "passing year is 2027"
        r'(?:passing|will\s+pass)\s+(?:in\s+)?(?:year\s+)?([0-9]{4})',  # "passing in 2027" or "will pass 2027"
        r'(?:will|shall)\s+pass\s+(?:in\s+)?([0-9]{4})',  # "will pass in 2027"
        r'pass\s+(?:in\s+)?([0-9]{4})',  # "pass 2027"
        r'graduated\s+(?:in\s+)?([0-9]{4})',  # "graduated in 2027"
        r'graduate\s+(?:in\s+)?([0-9]{4})',  # "graduate in 2027"
        r'year\s+([0-9]{4})',  # "year 2027"
    ]
    for pattern in passingyear_patterns:
        match = re.search(pattern, text, re.IGNORECASE)
        if match:
            year_value = match.group(1)
            # Validate it's a reasonable year
            if year_value and 2020 <= int(year_value) <= 2035:
                data["passingyear"] = year_value
                break

    return data


