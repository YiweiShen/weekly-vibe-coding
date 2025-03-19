from fastapi import FastAPI

app = FastAPI()

# Variable to track the number of emails
email_count = 0


@app.post("/increase")
async def increase_emails():
    global email_count
    email_count += 1
    return {"message": "Email count increased", "total_emails": email_count}


@app.get("/count")
async def get_email_count():
    return {"total_emails": email_count}


@app.post("/reset")
async def reset_emails():
    global email_count
    email_count = 0
    return {"message": "Email count reset", "total_emails": email_count}


@app.get("/")
async def health_check():
    return {"status": "ok"}
