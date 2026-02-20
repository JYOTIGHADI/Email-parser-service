const BASE_URL = import.meta.env.VITE_BACKEND_URL;

// GET ALL EMAILS
export const getEmails = async (page = 1, limit = 5) => {
  const res = await fetch(
    `${BASE_URL}/api/emails?page=${page}&limit=${limit}`
  );

  if (!res.ok) throw new Error("Failed to fetch emails");

  return res.json();
};

// GET SINGLE EMAIL
export const getEmailById = async (id) => {
  const res = await fetch(`${BASE_URL}/api/emails/${id}`);

  if (!res.ok) throw new Error("Failed to fetch email");

  return res.json();
};

// CREATE EMAIL
export const createEmail = async (emailData) => {
  const res = await fetch(`${BASE_URL}/api/emails`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(emailData),
  });

  if (!res.ok) throw new Error("Failed to create email");

  return res.json();
};

