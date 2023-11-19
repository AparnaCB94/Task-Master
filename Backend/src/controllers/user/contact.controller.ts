import { Request, Response } from "express";
import contact, { ContactDoc } from "../../models/user/contact.model";
import mongoose from 'mongoose';
export default class ContactController {

async create(req: Request, res: Response) {
  const { name, email, message } = req.body;

  if (!name || name.length <= 0 || !email || email.length <= 0 || !message || message.length <= 0) {
    return res.status(400).json("Validation error");
  }

  const currentDate = new Date();
  const formattedDate = currentDate.toISOString(); // You can format this date as needed

  const createContact = await contact.create({
    name,
    email,
    message,
    contactDate: formattedDate, // Add the date to the contact object
  });

  try {
    return res.status(201).json({
      message: "Contacted successfully",
      contact: createContact,
      contactDate: formattedDate, // Include the date in the response
    });
  } catch (err) {
    console.error('Error creating Contact:', err);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
}
async getAllMessages(req: Request, res: Response) {
  try {
    // Retrieve all messages from the database, including the contactDate field
    const allMessages = await contact.find({}, { name: 1, email: 1, message: 1, contactDate: 1 });

    res.status(200).json({
      messages: allMessages.map((message: ContactDoc) => ({
        name: message.name,
        email: message.email,
        message: message.message,
        contactDate: message.contactDate, // Include the contactDate field in the response
      })),
    });
  } catch (err) {
    console.error('Error retrieving messages:', err);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
}

}