import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getEmailById } from "../api/email.api";

function EmailDetails() {
  const { id } = useParams();
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEmail = async () => {
      setLoading(true);
      setError("");

      try {
        
        const emailData = await getEmailById(id);

        if (!emailData) {
          setError("Email not found.");
        } else {
          
          if (emailData.receivedAt) {
            emailData.receivedAt = new Date(emailData.receivedAt);
          }
          setEmail(emailData);
        }
      } catch (err) {
        console.error("Error loading email:", err);
        setError("Failed to load email.");
      } finally {
        setLoading(false);
      }
    };

    fetchEmail();
  }, [id]);

  if (loading) return <div className="container" style={{ padding: "20px" }}>Loading...</div>;
  if (error) return <div className="container" style={{ padding: "20px", color: "red" }}>{error}</div>;
  if (!email) return null;
return (
  <div className="container">
    <Link to="/" className="back-link">
      ← Back to Inbox
    </Link>

    <div className="email-card">
      <header className="email-header">
        <h1 className="email-subject">{email.subject}</h1>
        
        <div className="email-meta">
          <div className="meta-row">
            <span className="meta-label">From</span>
            <span className="meta-value">{email.sender}</span>
          </div>
          <div className="meta-row">
            <span className="meta-label">Date: </span>
            <span className="meta-value">
              {email.receivedAt?.toLocaleString(undefined, {
                dateStyle: 'long',
                timeStyle: 'short'
              })}
            </span>
          </div>
        </div>
      </header>

      <article className="email-body">
        {email.body}
      </article>
    </div>
  </div>
);
}

export default EmailDetails;