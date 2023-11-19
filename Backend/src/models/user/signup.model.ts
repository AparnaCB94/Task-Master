import mongoose, { Schema } from "mongoose";
 
const Signup = new Schema({
       username:{
            type:String,
            required:true
        },
       
        email:{
            type:String,
            required:true
        },
        password:{
            type:String,
            required:true
        },
        number:{
            type:String,
            required:true
        },
       
    });
 
const signup = mongoose.model('Signup',Signup);
export default signup;