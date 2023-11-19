
import { Request, Response } from "express";
import mongoose from 'mongoose';
import signup from "../../models/user/signup.model";
import bcrypt from 'bcrypt';

export default class SignupController {
  async create(req: Request, res: Response) {
    const { username, email,password, number } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "Validation error" });
    }

    // Check if email is already in use
    const existingUser = await signup.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "Email is already in use" });
    }

    try {
      const saltRounds = 10;
     const hashedPassword = await bcrypt.hash(password, saltRounds);
      const createuser = await signup.create({ username, email,  password: hashedPassword,number });
      console.log(createuser);

      return res.status(201).json({
        message: "Contact created successfully",
        signup: createuser
      });
    } catch (err) {
      console.error('Error creating Contact:', err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  async fetchEmails(req: Request, res: Response) {
    try {
      const users = await signup.find({}, { username: 1, email: 1, _id: 0 });
      return res.status(200).json({ users });
    } catch (err) {
      console.error('Error fetching user details:', err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }

  
  async fetchSignupDetails(req: Request, res: Response) {
    try {
      const users = await signup.find({}, { username: 1, email: 1, password: 1, _id: 0 });
  
      return res.status(200).json({ users });
    } catch (err) {
      console.error('Error fetching user data:', err);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
  


}
