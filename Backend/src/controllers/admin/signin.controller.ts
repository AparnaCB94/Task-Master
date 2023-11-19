
// import { Request, Response } from 'express';
// import AdminModel from '../../models/admin/login.model';
// import bcrypt from 'bcrypt';
// import jwt from 'jsonwebtoken';
// // import authenticate from './middleware';

// export default class AdminSignIn {
//   async Adminlogin(req: Request, res: Response) {
//     const { username, password,email } = req.body;

//     try {
//       // Check if a user with the provided username already exists in the database
//       const existingUser = await AdminModel.findOne({ username });

//       if (existingUser) {
//         return res.status(400).json({ message: 'Username already in use' });
//       }

//       // Hash the provided password
//       const hashedPassword = await bcrypt.hash(password, 10);

//       //Create a new user in the database
//       const newUser = await AdminModel.create({ username, password: hashedPassword,email });

//       // Generate a JWT token with user information
//       const token = jwt.sign({ username }, '#thdgdf9', { expiresIn: '1h' });
//       res.status(201).json({ token });
//     } catch (error) {
//       console.error('Error creating signin:', error);
//       res.status(500).json({ message: 'Internal Server Error' });
//     }
//   }


//  }


import { Request, Response } from 'express';
import AdminModel from '../../models/admin/login.model';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export default class AdminSignIn {

  async Adminlogin(req: Request, res: Response) {
    const { username, email, password } = req.body;
    try {
      // Find the user by username
      const user = await AdminModel.findOne({username});
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
      jwt.sign(payload,'#thdgdf9' , { expiresIn: '3000h' }, (err, token) => {
        if (err) throw err;
        // res.json({ token });
       res.json({ token, userData: { _id: user._id,username: user.username } });
      });   
    } catch (error) {
      // console.error(error.message);
      res.status(500).send('Server error');
    }
  }}