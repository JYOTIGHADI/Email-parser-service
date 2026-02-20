import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createEmail } from "../api/email.api";

function CreateEmail() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    subject: "",
    body: "",
    sender: "",
    received_at: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createEmail({
        ...form,
        received_at: new Date(form.received_at).toISOString(),
      });

      alert("Email added successfully ");

      
      navigate("/");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="create-email" style={{ padding: "20px" }}>
      <Link to="/">← Back to Inbox</Link>

      <h2>Add New Email</h2>

      <form onSubmit={handleSubmit}>
        <input
          name="subject"
          placeholder="Subject"
          value={form.subject}
          onChange={handleChange}
          required
        />

        <input
          name="sender"
          placeholder="Sender Email"
          value={form.sender}
          onChange={handleChange}
          required
        />

        <input
          type="datetime-local"
          name="received_at"
          value={form.received_at}
          onChange={handleChange}
          required
        />

        <textarea
          name="body"
          placeholder="Email Body"
          value={form.body}
          onChange={handleChange}
          required
        />

        <button type="submit">Submit Email</button>
      </form>
    </div>
  );
}

export default CreateEmail;