import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEmails } from "../api/emailApi";

function Inbox() {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const res = await getEmails();
        setEmails(res.emails || []);
      } catch (error) {
        console.error("Failed to fetch emails", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, []);

  if (loading) {
    return <p style={{ padding: "20px" }}>Loading emails...</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Inbox</h2>

      {emails.length === 0 && <p>No emails found.</p>}

      <ul style={{ listStyle: "none", padding: 0 , display: "block",
    padding: "15px",
    borderRadius: "8px",
    textDecoration: "none",
       
    }}>
        {emails.map((email) => (
          <li
            key={email._id}
            style={{
              padding: "12px",
              borderBottom: "1px solid #ddd",
            }}
          >
            <Link
              to={`/emails/${email._id}`}
              style={{ textDecoration: "none" }}
            >
              <strong>{email.subject}</strong>
              <br />
              <small>{email.sender}</small>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Inbox;

