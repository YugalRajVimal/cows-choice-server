const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");
// const Form = require("../models/Form"); // :small_orange_diamond: Commented - DB model import
// POST /api/form/send
router.post("/send", async (req, res, next) => {
  try {
    const {
      fullName,
      company,
      email,
      phone,
      city,
      businessType,
      products,
      volume,
      message,
    } = req.body;
    // Validate required fields
    if (!fullName || !company || !email || !phone) {
      return res
        .status(400)
        .json({ success: false, message: "Full Name, Company, Email and Phone are required!" });
    }
    // ===========================
    // :small_orange_diamond: DATABASE SAVE SECTION (Commented)
    // ===========================
    /*
    const newForm = new Form({
      fullName,
      company,
      email,
      phone,
      city,
      businessType,
      products,
      volume,
      message,
    });
    await newForm.save();
    console.log(":white_check_mark: Data saved to MongoDB");
    */
    // ===========================
    // EMAIL SETUP SECTION
    // ===========================
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.ADMIN_PASS,
      },
      tls: { rejectUnauthorized: false },
    });
    // --- Admin Email (Owner gets details)
    const adminMail = {
      from: `"Website Form" <${process.env.ADMIN_EMAIL}>`,
      to: process.env.RECIEVING_MAIL,
      subject: "New Enquiry Received",
      html: `
        <h2>New Form Submission</h2>
        <p><b>Name:</b> ${fullName}</p>
        <p><b>Company:</b> ${company}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Phone:</b> ${phone}</p>
        <p><b>City:</b> ${city || "N/A"}</p>
        <p><b>Business Type:</b> ${businessType || "N/A"}</p>
        <p><b>Products of Interest:</b> ${products?.length ? products.join(", ") : "N/A"}</p>
        <p><b>Expected Volume:</b> ${volume || "N/A"}</p>
        <p><b>Message:</b> ${message || "N/A"}</p>
      `,
    };
    // --- User Email (Thank you mail)
    const userMail = {
      from: `"Cows Choice" <${process.env.ADMIN_EMAIL}>`,
      to: email,
      subject: "Thank You for Contacting Us!",
      html: `
        <p style="font-weight: bold; font-size: 20px;">Thank you for contacting us.</p>
        <p style="font-weight: bold; font-size: 20px;">We are also reachable on the specified phone number in case it is more convenient or urgent.</p>
        <p style="font-weight: bold; font-size: 20px;">Our Team at "Cows Choice" shall evaluate your request and revert.</p>
        <p style="font-weight: bold; font-size: 20px;">Regards, Team - Cows Choice</p>
      `,
    };
    // Send Emails
    await transporter.sendMail(adminMail);
    console.log("Admin mail sent");
    await transporter.sendMail(userMail);
    console.log("User mail sent");
    res.status(200).json({
      success: true,
      message: "Emails sent successfully (DB save skipped)!",
    });
  } catch (err) {
    console.error("Error in /send route:", err);
    next(err);
  }
});
module.exports = router;
