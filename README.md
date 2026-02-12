# Email Parser & Ingestion Service

A **Node.js-based email parser service** that reads incoming emails from a Gmail inbox using IMAP, extracts key details (subject, body, sender, timestamps), stores them in MongoDB, and exposes APIs to fetch parsed emails. A minimal React UI is provided to view the parsed emails in real time.

---

## 📌 Objective

Build an email parser & ingestion service that:

- Automatically read email subjects and bodies from Gmail
- Extract and store email metadata in a database
- Expose APIs to fetch parsed emails
- Provide a minimal, easy-to-use UI to view emails

---

## 🧩 Functional Requirements

### 1️⃣ Email Ingestion (Mandatory)

This project uses **Option A: Direct Email Reading via IMAP**:

- Connects to Gmail inbox using IMAP
- Parses the following details from incoming emails:
  - **Subject**
  - **Body** (plain text preferred)
  - **Sender email**
  - **Received timestamp**
- Stores parsed data in MongoDB
- Keeps the connection alive to automatically parse **new emails** without server restart

---

### 2️⃣ Backend (Node.js)

APIs implemented:

#### POST `/api/emails`

Accepts email data (subject, body, sender, received_at)

**Request Body Example**

```json
{
  "subject": "Test Email",
  "body": "This is a test email.",
  "sender": "test@example.com",
  "received_at": "2026-02-13T10:00:00.000Z"
}
```

#### GET `/api/emails`

Returns list of parsed emails with pagination support

Query Parameters

page (default: 1)

limit (default: 10)

#### GET `/api/emails/:id`

Returns a single email record by ID

## 🚀 Setup Instructions

### 1️⃣ Clone repository

```bash
git clone <YOUR_REPO_LINK>
cd email-parser
```

### 2️⃣ Install dependencies

#### Backend Setup

```bash
cd server
npm install
```

### 3️⃣ Create .env file

```
PORT=8000
MONGO_URI=<YOUR_MONGODB_URI>

GMAIL_USER=<YOUR_EMAIL_ADDRESS>
GMAIL_APP_PASSWORD=<YOUR_GMAIL_APP_PASSWORD>
```

### 4️⃣ Start backend server

```bash
npm run dev
```

#### Frontend Setup

### 5️⃣ Install dependencies

```bash
cd client
npm install
```

### 6️⃣ Start React UI

```bash
npm run dev
```

## 🧪 How to Test the Setup

### ✅ Step 1: Send a test email

Send an email to the Gmail account configured in your `.env`.

Example email:

- **Subject:** Test Email
- **Body:** This is a demo email to check if the Gmail service is working.

---

### ✅ Step 2: Check Backend Logs

In your backend terminal you should see:
Email ingestion completed

and no validation errors like `body: Path 'body' is required`.

---

### ✅ Step 3: Verify Data in MongoDB

Open MongoDB Compass and check the `emails` collection.  
You should see the parsed email stored with fields like:

- `subject`
- `body`
- `sender`
- `receivedAt`
- `parsedAt`

---

### ✅ Step 4: Verify UI

Open the frontend UI: http://localhost:5173

You should see a list of parsed emails.  
Click on any email to view its **subject and body**.

---

### ✅ Step 5: Test API Endpoints

#### Fetch all emails

GET - http://localhost:8000/api/emails

#### Fetch email by ID

GET - http://localhost:8000/api/emails/:id

---

### 🔁 Important Notes

- The backend parses **only new unread emails**.
- Once parsed, emails are marked as **Seen** in Gmail.
- If you send a new email, it should appear after refreshing the frontend, without restarting the server.

## 📬 API Testing (Postman)

The Postman collection for all API endpoints is included in this repository.

📁 Location: email-parser/postman

### How to use

1. Open Postman
2. Click **Import**
3. Select the JSON file
4. Update the base URL if needed:
   - Local: `http://localhost:8000/api`
   - Deployed: `https://email-parser-service-1.onrender.com`
