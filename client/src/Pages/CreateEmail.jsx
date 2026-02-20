import { useState } from "react";
import { createEmail} from "../api/email.api";

function CreateEmail({ onEmailCreated }) {
  const [form, setForm] = useState({
    subject: "",
    body: "",
    sender: "",
    receivedAt: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createEmail(form);
      alert("Email added successfully");

      setForm({
        subject: "",
        body: "",
        sender: "",
        receivedAt: "",
      });

      onEmailCreated(); // refresh inbox
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="create-email">
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
          name="receivedAt"
          value={form.receivedAt}
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