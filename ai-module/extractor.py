import re

def extract(text):
    data = {}

    # Email
    email = re.findall(r'\S+@\S+', text)
    if email:
        data["email"] = email[0]

    # Phone
    phone = re.findall(r'\d{10}', text)
    if phone:
        data["phone"] = phone[0]

    # Name
    if "name is" in text.lower():
        try:
            name = text.lower().split("name is")[1].split()[0]
            data["name"] = name.capitalize()
        except:
            pass

    # Date (simple)
    date = re.findall(r'\d{4}-\d{2}-\d{2}', text)
    if date:
        data["date"] = date[0]

    return data