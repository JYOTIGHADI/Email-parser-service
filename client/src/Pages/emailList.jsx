import { useEffect, useState } from "react";
import { getEmailById } from "../api/email.api";

function EmailDetails({ emailId }) {
  const [email, setEmail] = useState(null);

  useEffect(() => {
    if (!emailId) return;

    const fetchEmail = async () => {
      try {
        const data = await getEmailById(emailId);
        setEmail(data);
      } catch (err) {
        console.error(err.message);
      }
    };

    fetchEmail();
  }, [emailId]);

  if (!emailId) {
    return <div className="content">Select an email to view</div>;
  }

  if (!email) {
    return <div className="content">Loading...</div>;
  }

  return (
    <div className="content">
      <h2>{email.subject}</h2>
      <p className="meta">From: {email.sender}</p>
      <p className="meta">
        Received: {new Date(email.receivedAt).toLocaleString()}
      </p>
      <hr />
      <p>{email.body}</p>
    </div>
  );
}

export default EmailDetails;