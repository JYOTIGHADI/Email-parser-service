import mongoose from "mongoose";
import { Email } from "../models/email.model.js";

export const createEmail = async (req, res, next) => {
  try {
    const { subject, body, sender, received_at } = req.body;

    if (!subject || !body || !sender || !received_at) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const email = await Email.create({
      subject,
      body,
      sender,
      receivedAt: new Date(received_at),
    });

    return res.status(200).json({
      success: true,
      message: "Email created Successfully",
      data: email,
    });
  } catch (error) {
    next(error);
  }
};

export const getEmails = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    const emails = await Email.find()
      .sort({ receivedAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Email.countDocuments();

    return res.status(200).json({
      success: true,
      page,
      limit,
      total,
      emails,
    });
  } catch (error) {
    next(error);
  }
};

export const getEmailById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid Request",
      });
    }

    const email = await Email.findById(id);

    if (!email) {
      return res.status(404).json({
        success: false,
        message: "Email not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "email fetched successfully",
      data: email,
    });
  } catch (error) {
    next(error);
  }
};