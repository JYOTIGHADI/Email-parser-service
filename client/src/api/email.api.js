const BASE_URL = import.meta.env.VITE_BACKEND_URL;


const handleResponse = async (res) => {
  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data; 
};


export const getEmails = async (page = 1, limit = 5) => {
  const res = await fetch(
    `${BASE_URL}/api/emails?page=${page}&limit=${limit}`
  );

  return handleResponse(res);
};


export const getEmailById = async (id) => {
  const res = await fetch(`${BASE_URL}/api/emails/${id}`);
  const response = await handleResponse(res);
  return response.data; 
};


export const createEmail = async (emailData) => {
  const res = await fetch(`${BASE_URL}/api/emails`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      subject: emailData.subject,
      body: emailData.body,
      sender: emailData.sender,
      received_at: emailData.received_at
        ? new Date(emailData.received_at).toISOString()
        : new Date().toISOString(),
    }),
  });

  return handleResponse(res);
};