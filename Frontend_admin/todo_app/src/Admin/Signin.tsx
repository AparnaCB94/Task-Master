
import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
  username: string;
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if(username==='admin01'&& email==='admin01@gmail.com'&& password==='password01'){
    try {
      const response = await axios.post('http://localhost:4561/api/admin/signin', {
        username: username,
        email: email,
        password: password,
      });

      // Assuming your backend returns a token and user data in the response
      const { token, userData } = response.data;

      // Store the token in localStorage or a state management solution
      localStorage.setItem('token', token);

      // Redirect to the user-list page or perform any other actions as needed
      navigate('/user-list');
    } catch (error) {
      // Handle login failure, show an alert or error message
      console.error('Login failed:', (error as Error).message);
    }}
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h2 className="card-title mb-4">Login</h2>
              <form>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleLogin}
                >
                  Admin Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
