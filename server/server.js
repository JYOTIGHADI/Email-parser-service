import dotenv from "dotenv";
import app from "./src/app.js";

import { connectDB } from "./src/config/db.js";

import { startGmailIngestion } from "./src/services/gmail.services.js";

dotenv.config();

connectDB()
  .then(() => {
    const PORT = process.env.PORT || 8000;

    app.listen(PORT, () => {
      console.log(`Server is listening on port ${PORT}`);
    });

    startGmailIngestion();
  })
  .catch((error) => {
    console.log("MongoDB connection failed !!!", error);
    process.exit(1);
  });
