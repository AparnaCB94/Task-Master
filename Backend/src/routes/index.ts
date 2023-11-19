import { Application } from "express";

import signInRoutes from "../routes/admin/signin.routes";
import signupRoutes from "../routes/user/signup.routes";
import loginuserRoutes from "../routes/user/loginuser.routes";

//import userSignInRoutes from "./admin/usersignin.routes";
//import userViewingHimselfInRoutes from "./user/viewinghimself.routes";
import contactRoutes from "./user/contact.routes";
//import viewusermsgRoutes from "./admin/viewusermsg.routes";
import taskRoutes from "./user/task.routes";



export default class Routes {
  constructor(app: Application) {
   
    
    app.use("/api/admin/signin",signInRoutes);//admin signin route
    app.use("/api/user/signup",signupRoutes); //user signup route


   // app.use("/api/adminview/signin", userSignInRoutes); // admin viewing users route

  

    app.use("/api/user/login", loginuserRoutes);//user login route
    
     //app.use("/api/todo", todoRoutes);

     app.use("/api/task", taskRoutes);// user adding/getting/updating/deleting tasks route

     //app.use("/api/todo/search",todoRoutes); //user searching tasks
     app.use("/api/contact", contactRoutes );// user contacting admin
    // app.use("/api/admin/viewmsg",viewusermsgRoutes)//admin viewing user msg
    
    }
}