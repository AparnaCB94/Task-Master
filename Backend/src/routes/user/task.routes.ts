import { Router } from "express";
// import SearchController from "../../controllers/user/search.controller";
import userAuthenticateMiddleware from "../../Middleware/userAuthenticateMiddleware";
import TaskController from "../../controllers/user/task.controller";
 
class TaskRoutes {
  router = Router();
  controller = new TaskController();
  // searchtask= new SearchController();

 
  constructor() {
    this.intializeRoutes();
  }
 
  intializeRoutes() {
  
    this.router.post("/",userAuthenticateMiddleware, this.controller.createTask); 
 
    this.router.get("/:User_id",userAuthenticateMiddleware, this.controller.findallTasks);
 
    this.router.put("/:id",userAuthenticateMiddleware, this.controller.updateTask);
 
    this.router.delete("/:id",userAuthenticateMiddleware, this.controller.deleteTask);

    

  }
}
 
export default new TaskRoutes().router;
 