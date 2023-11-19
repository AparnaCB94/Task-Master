import { Router } from 'express';
import adminSignIn from '../../controllers/admin/signin.controller';

import adminAuthenticateMiddleware  from '../../Middleware/adminAuthenticateMiddleware';


import AdminLogin from '../../controllers/admin/signin.controller';
import AdminSignIn from '../../controllers/admin/signin.controller';

 
class SignInRoutes {
  router = Router();
  signInController = new AdminSignIn();
 // viewAdminsController=new ViewAdmins();
 
  constructor() {
    this.intializeRoutes();
  }
 
  intializeRoutes() {
  
    this.router.post('/', this.signInController.Adminlogin);
   
   

  }
}
 
export default new SignInRoutes().router;