import { Router } from "express";
import SignupController from "../../controllers/user/signup.controller";
 
class signupRoutes {
  router = Router();
  controller = new SignupController();
 
  constructor() {
    this.intializeRoutes();
  }
 
  intializeRoutes() {
   
    this.router.post("/", this.controller.create);
     this.router.get('/fetch-emails', this.controller.fetchEmails);
    this.router.get('/fetchsignupdetails', this.controller.fetchSignupDetails);

 
  }
}
 
export default new signupRoutes().router;
 