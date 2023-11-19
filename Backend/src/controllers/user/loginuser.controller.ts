import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import userloginModel from '../../models/user/loginuser.model';
import jwt from 'jsonwebtoken';
import signup from '../../models/user/signup.model';
 
 
export default class Userlogin {

  async login(req: Request, res: Response) {
    const { username,email, password } = req.body;

    try {
      // Find the user by username
      const user = await signup.findOne({ email});

      if (!user) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }

      // Check if the provided password matches the stored hashed password
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return res.status(400).json({ message: 'Invalid username or password' });
      }

      // Create a JSON Web Token (JWT) for the user
      const payload = {
        username: user.email,
      };

      jwt.sign(payload, '#gdey78', { expiresIn: '3000h' }, (err, token) => {
        if (err) throw err;
        // res.json({ token });
       res.json({ token, userData: { _id: user._id, email: user.email } });
      });
      
    } catch (error) {
      // console.error(error.message);
      res.status(500).send('Server error');
    }
  }
 
}

 