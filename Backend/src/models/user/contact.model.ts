
import mongoose, { Document, Model, Schema } from 'mongoose';

export interface ContactDoc extends Document {
  contactDate: any;
  name: string
  email: string;
  message: string;
 // contactDate: Date; 
}

const contactSchema = new Schema<ContactDoc>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
   contactDate: {
    type: Date,
     default: Date.now, // Default to the current date and time when a contact is created
  },
});

const contactModel: Model<ContactDoc> = mongoose.model('Contact', contactSchema);

export default contactModel;


