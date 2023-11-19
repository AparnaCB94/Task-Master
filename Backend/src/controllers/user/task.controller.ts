import { Request, Response } from 'express';
import TodoModel, { TodoDocument } from '../../models/user/task.model';

export default class TaskController {
  async createTask(req: Request, res: Response) {
    try {
      const { User_id, task } = req.body;
      const todo = new TodoModel({
        User_id,
        task
      });

      const savedTodo = await todo.save();
      res.status(201).json(savedTodo);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Could not create the task.' });
    }
  }
  // Update a task
  async updateTask(req: Request, res: Response) {
    try {
      let taskId = req.params.id;
      console.log("Task ID", taskId);

      // Assuming you have a variable named updatedTask with the fields you want to update
      let updatedTask = { ...req.body };

      // Find and update the task
      let task = await TodoModel.findOneAndUpdate({ _id: taskId }, updatedTask, { new: true });

      if (!task) {
        return res.status(404).send('No task found');
      }

      res.send(task);
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }


 
  async findallTasks(req: Request, res: Response) {
    try {
      const { User_id } = req.params;
      // Validate if User_id is provided
      if (!User_id) {
        return res.status(400).json({ error: 'User ID is required' });
      }
      const tasks = await TodoModel.find({ User_id }).exec();
      if (!tasks || tasks.length === 0) {
        return res.status(404).json({ error: 'No tasks found for the user' });
      }
      res.json(tasks);
    } catch (error) {
      console.error('Error getting tasks:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

   

    // Update a task
   
   
    async deleteTask(req: Request, res: Response) {
      try {
        const taskId = req.params.id;
        console.log('Deleting task with MongoDB id:', taskId);
    
        const deletedTask = await TodoModel.findByIdAndRemove(taskId);
    
        if (!deletedTask) {
          return res.status(404).json({ error: 'Task not found.' });
        }
    
        res.json(deletedTask);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Could not delete the task.' });
      }
    }
    
    
    }
