import mongoose, { Document, Model, Schema } from 'mongoose'; 
export interface AdminDoc extends Document {
  username: string;
  email:string;
  password: string;
  isAdmin: boolean;
}
const adminSchema = new Schema<AdminDoc>({
  username: {
    type: String,
    required: true, 
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});
const AdminModel: Model<AdminDoc> = mongoose.model('Admin', adminSchema);
export default AdminModel;