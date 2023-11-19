import mongoose, { Schema, Document } from 'mongoose';

export interface Todo {
  User_id: mongoose.Types.ObjectId;
  task: string;
  completed: boolean;
}

export interface TodoDocument extends Todo, Document {}

const TodoSchema: Schema = new Schema({
  User_id: { type: Schema.Types.ObjectId, ref: 'signup', required: true },
  task: { type: String, required: true },
  completed: { type: Boolean, default: false },
});

const TodoModel = mongoose.model<TodoDocument>('Todo', TodoSchema);

export default TodoModel;
