import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEmails } from "../api/email.api";

function EmailList() {
  const [emails, setEmails] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await getEmails();

        console.log("API Response:", response);

        
        setEmails(response.emails || []);
      } catch (error) {
        console.error("Error fetching emails:", error);
        setEmails([]);
      } finally {
        setLoading(false);
      }
    };

    fetchEmails();
  }, []);

  if (loading) {
    return <div className="container">Loading emails...</div>;
  }

  return (
    <div className="container">
      <div className="header">
        <h2>Inbox</h2>
        <Link to="/create" className="btn">
          + New Email
        </Link>
      </div>

      {emails.length === 0 ? (
        <p>No emails found.</p>
      ) : (
        <ul className="email-list">
          {emails.map((email) => (
            <li key={email._id} className="email-item">
              <Link to={`/emails/${email._id}`}>
                <h4>{email.subject}</h4>
                <p>{email.sender}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default EmailList;