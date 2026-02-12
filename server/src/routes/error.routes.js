import express from "express";

import {
  createEmail,
  getEmailById,
  getEmails,
} from "../controllers/emailController.js";


const router = express.Router();

router.post("/", createEmail);
router.get("/", getEmails);
router.get("/:id", getEmailById);

export default router;