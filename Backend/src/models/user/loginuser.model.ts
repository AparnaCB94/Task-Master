import mongoose, { Document, Model, Schema } from 'mongoose';
 
export interface userDoc extends Document {
  username: string;
  email:string;
  password: string;
  isuser: boolean;
}
 
const userSchema = new Schema<userDoc>({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  email:{
type:String,
required:true,
  },
  isuser: {
    type: Boolean,
    default: false,
  },
});
 
const userloginModel: Model<userDoc> = mongoose.model('userLOGIN', userSchema);
 
export default userloginModel;