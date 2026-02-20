import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getEmailById } from "../api/email.api";

function EmailPage() {
  const { id } = useParams();
  const [email, setEmail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmail = async () => {
      try {
        const res = await getEmailById(id);
        setEmail(res.data);
      } catch (error) {
        console.error("Failed to fetch email", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEmail();
  }, [id]);

  if (loading) {
    return <p style={{ padding: "20px" }}>Loading email...</p>;
  }

  if (!email) {
    return <p style={{ padding: "20px" }}>Email not found.</p>;
  }

  return (
    <div style={{ padding: "20px" }}>
      <Link to="/" style={{ display: "block", marginBottom: "12px", color:"blue" }}>
        ← Back to Inbox
      </Link>

      <h2>{email.subject}</h2>
      <p>
        <strong>From:</strong> {email.sender}
      </p>
      <p>
        <strong>Received:</strong> {new Date(email.receivedAt).toLocaleString()}
      </p>

      <hr style={{ margin: "16px 0" }} />

      <div
        style={{ whiteSpace: "pre-wrap" }}
        dangerouslySetInnerHTML={
          email.body.includes("<") ? { __html: email.body } : undefined
        }
      >
        {!email.body.includes("<") && email.body}
      </div>
    </div>
  );
}

export default EmailPage;
