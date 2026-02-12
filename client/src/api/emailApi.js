const BASE_URL = "http://localhost:8000/api";

export const getEmails = async (page = 1, limit = 10) => {
  const res = await fetch(`${BASE_URL}/emails?page=${page}&limit=${limit}`);
  return res.json();
};

export const getEmailById = async (id) => {
  const res = await fetch(`${BASE_URL}/emails/${id}`);
  return res.json();
};