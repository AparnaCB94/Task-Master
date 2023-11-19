// import mongoose, { Document, Model, Schema,Types } from 'mongoose';
 
// export interface TaskDoc extends Document {
//   userId: Types.ObjectId;
//   taskname: string;
//   deleted: boolean;
//   showdeleted: boolean;
// }
 
// const taskSchema = new Schema<TaskDoc>({
  
//     userId: {
//       type: Schema.Types.ObjectId,
//       ref:'signup', // Reference to the User model
//       required: true,
//     },
//     taskname: {
//     type: String,
//     required: true,
//   },

//   deleted: {
//     type: Boolean,
//     default: false, 
//   },
//   showdeleted: {
//     type: Boolean,
//     default: false, 
//   }
// },
// { timestamps: true });
 
// const TaskModel: Model<TaskDoc> = mongoose.model('Task', taskSchema);
 
// export default TaskModel;

