
import { Router } from 'express';
 
import adminAuthenticateMiddleware from '../../Middleware/adminAuthenticateMiddleware';
import Userlogin from '../../controllers/user/loginuser.controller';
import userAuthenticateMiddleware from '../../Middleware/userAuthenticateMiddleware';
import UserSignIn from '../../controllers/user/loginuser.controller';
 
class loginuserRoutes {
  router = Router();
  userloginController = new Userlogin();
   
  constructor() {
    this.intializeRoutes();
  }
 
  intializeRoutes() {
   
    this.router.post('/', this.userloginController.login);
  
  }
}
 
export default new loginuserRoutes().router;