import Imap from "imap";
import { simpleParser } from "mailparser";
import { Email } from "../models/email.model.js";

export const startGmailIngestion = () => {
  const imap = new Imap({
    user: process.env.EMAIL_USER,
    password: process.env.EMAIL_PASS,
    host: "imap.gmail.com",
    port: 993,
    tls: true,
    tlsOptions: { rejectUnauthorized: false },
  });

  function openInbox(cb) {
    imap.openBox("INBOX", false, cb);
  }

  imap.once("ready", () => {
    openInbox((err, box) => {
      if (err) throw err;

      console.log("IMAP connected and listening for new emails...");

      imap.on("mail", (numNewMsgs) => {
        console.log("New email arrived:", numNewMsgs);
        fetchNewEmails();
      });

      fetchNewEmails();
    });
  });

  const fetchNewEmails = () => {
    imap.search(["UNSEEN"], (err, results) => {
      if (err) {
        console.error("Search error:", err);
        return;
      }

      if (!results || results.length === 0) {
        return;
      }

      const fetcher = imap.fetch(results, { bodies: "" });

      fetcher.on("message", (msg) => {
        let buffer = "";

        msg.on("body", (stream) => {
          stream.on("data", (chunk) => {
            buffer += chunk.toString("utf8");
          });
        });

        msg.once("end", async () => {
          try {
            const parsed = await simpleParser(buffer);

            const emailData = {
              subject: parsed.subject?.trim() || "(No Subject)",
              body:
                parsed.text ||
                parsed.textAsHtml ||
                parsed.html ||
                "(No readable content)",
              sender: parsed.from?.value?.[0]?.address || "unknown",
              receivedAt: parsed.date || new Date(),
            };

            await Email.create(emailData);
            console.log("Email saved:", emailData.subject);
          } catch (error) {
            console.error("Email parsing error:", error.message);
          }
        });

        msg.once("attributes", (attrs) => {
          imap.addFlags(attrs.uid, ["\\Seen"], () => {});
        });
      });

      fetcher.once("end", () => {
        console.log("Fetch completed");
      });
    });
  };

  imap.once("error", (err) => {
    console.error("IMAP Error:", err);
  });

  imap.once("end", () => {
    console.log("IMAP connection ended");
  });

  imap.connect();
};