import { Router } from "express";
import ContactController from "../../controllers/user/contact.controller";
 
class ContactRoutes {
  router = Router();
  controller = new ContactController();
 
  constructor() {
    this.intializeRoutes();
  }
 
  intializeRoutes() {
   
    this.router.post("/", this.controller.create);
    this.router.get("/admin/messages",this.controller.getAllMessages);
 
  }
}
 
export default new ContactRoutes().router;
 