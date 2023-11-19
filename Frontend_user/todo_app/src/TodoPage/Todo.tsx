import React, { useState, useRef, useEffect } from 'react';
import { AiOutlineEdit, AiOutlineCheck, AiOutlineClose } from 'react-icons/ai';
import { v4 as uuid } from 'uuid';
import { useNavigate } from 'react-router-dom';

import '../Assets/todo.css'; 
import axios from 'axios';

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  color: string;
  isEditing: boolean;
  editText: string; 
}

const getRandomColor = (): string => {
  return '#ffeeba'; 
};

const App: React.FC = () => {
  const navigate = useNavigate();
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputText, setInputText] = useState<string>('');

  // Move tID to local state so that each sticky note can have its own task ID
  const [tID, setTID] = useState<string>('');

  const textInputRefs = useRef<{ [key: string]: HTMLDivElement | HTMLTextAreaElement | null }>({});

  const addTodo = async () => {
    if (inputText.trim() !== '') {
      try {
        const User_id = localStorage.getItem('User_id');
        const token = localStorage.getItem('token');

        const newTodo: Todo = {
          id: uuid(),
          text: inputText,
          completed: false,
          color: getRandomColor(),
          isEditing: false,
          editText: inputText, // Initialize editText with inputText
        };

        const response = await axios.post(
          'http://localhost:4561/api/task',
          {
            User_id,
            task: newTodo.text,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );

        const savedTodo = response.data;
        setTID(savedTodo._id);

        setTodos((prevTodos) => [
          ...prevTodos,
          { ...savedTodo, text: savedTodo.task, id: savedTodo._id, editText: savedTodo.task },
        ]);

        setInputText('');
      } catch (error) {
        console.error('Error creating task:', error);
      }
    }
  };

  const startEditing = (id: string) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) =>
        todo.id === id ? { ...todo, isEditing: true } : { ...todo, isEditing: false }
      )
    );
  };

  const updateTodo = async (id: string) => {
    try {
      const User_id = localStorage.getItem('User_id');
      const token = localStorage.getItem('token');

      const TasktoUpdate = todos.find((todo) => todo.id === id);

      if (!TasktoUpdate) {
        console.error('Task not found for ID:', id);
        return;
      }

      await axios.put(
        `http://localhost:4561/api/task/${id}`,
        {
          User_id,
          task: TasktoUpdate.editText,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setTodos((prevTodos) =>
        prevTodos.map((todo) =>
          todo.id === id ? { ...todo, isEditing: false, text: todo.editText } : todo
        )
      );
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const deleteTodo = async (_id: string) => {
    try {
      const User_id = localStorage.getItem('User_id');
      const token = localStorage.getItem('token');

      await axios.delete(`http://localhost:4561/api/task/${_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log('Deleting task with ID:', tID);

      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== _id));
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const loginUser = async () => {
    try {
      const User_id = localStorage.getItem('User_id');
      const token = localStorage.getItem('token');

      const response = await axios.get(`http://localhost:4561/api/task/${User_id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userTasks = response.data;

      setTodos(
        userTasks.map((task: { _id: any; task: any }) => ({
          ...task,
          id: task._id,
          text: task.task,
          editText: task.task,
        }))
      );
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    loginUser();
  }, []);

  const signout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('User_id');
    localStorage.removeItem('email');
    localStorage.removeItem('userData');
    navigate('/');
  };

  useEffect(() => {
    todos.forEach((todo) => {
      if (todo.isEditing && textInputRefs.current[todo.id]) {
        textInputRefs.current[todo.id]?.focus();
      }
    });
  }, [todos]);

  return (
    <div className="container mt-5">
      <button className="btn btn-secondary position-absolute top-0 end-0 m-2" onClick={signout}>
        Signout
      </button>
      <h1 className="text-center mb-4">Todo App</h1>
      <div className="mb-3 d-flex">
        <input
          type="text"
          className="form-control flex-grow-1"
          placeholder="Enter a task"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
        />
        <button className="btn btn-primary ms-2" onClick={addTodo}>
          Add Todo
        </button>
      </div>

      <div className="d-flex flex-wrap">
        {todos.map((todo) => (
          <div
            key={todo.id}
            className={`p-3 m-2 sticky-note ${todo.completed ? 'text-muted' : 'text-dark'}`}
          >
            <textarea
              ref={(ref) => (textInputRefs.current[todo.id] = ref)}
              readOnly={!todo.isEditing}
              className={`form-control flex-grow-1 ${todo.completed ? 'text-muted text-decoration-line-through' : ''
                }`}
              value={todo.editText}
              onChange={(e) =>
                setTodos((prevTodos) =>
                  prevTodos.map((t) => (t.id === todo.id ? { ...t, editText: e.target.value } : t))
                )
              }
              style={{
                wordBreak: 'break-word',
                whiteSpace: 'pre-wrap',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
                backgroundColor: 'transparent', 
                border: 'none', 
               outline: 'none',
              }}
              onClick={() => startEditing(todo.id)}
              onBlur={() => updateTodo(todo.id)}
            ></textarea>

            <div className="btn-group" style={{ position: 'absolute', bottom: '5px', right: '5px' }}>
              <button className="btn btn-warning" onClick={() => startEditing(todo.id)}>
                <AiOutlineEdit size={16} />
              </button>
              <button className="btn btn-success" onClick={() => updateTodo(todo.id)}>
                <AiOutlineCheck size={16} />
              </button>
              <button className="btn btn-danger" onClick={() => deleteTodo(todo.id)}>
                <AiOutlineClose size={12} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
