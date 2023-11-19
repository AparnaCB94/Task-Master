
import React, { useState, useEffect } from 'react';
import '../Assets/signin.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


interface User {
  username: string;
  email: string;
  password: string;
}

const Usersignin: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const [emailError, setEmailError] = useState('');
 
  const handleLogin = async () => {
    if (!formData.email || !formData.password || !formData.username) {
      // Handle form validation or show an error message
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:4561/api/user/login', formData);
  
      if (response.status === 200) {
        const { token, userData } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('User_id', userData._id);
     
        navigate('/api/todo');
      }
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login error here
    }
  };
  

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setFormData({ ...formData, email: newEmail });
    if (!isValidEmail(newEmail)) {
      setEmailError('Enter a valid email!');
    } else {
      setEmailError('');
    }
  };

  return (
    <>
      <section className="h-100 gradient-form">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-xl-10">
              <div className="card rounded-3">
                <div className="row g-0">
                  <div className="col-lg-6">
                    <div className="card-body p-md-5 mx-md-4">
                      <div className="text-center">
                        <img
                          src="https://png.pngtree.com/png-vector/20191116/ourmid/pngtree-beautiful-admin-roles-line-vector-icon-png-image_1992804.jpg"
                          style={{ width: '185px' }}
                          alt="logo"
                        />
                        <h4 className="mt-1 mb-4">SignIn</h4>
                      </div>
                      <form>
                        <p>Please sign in to your account</p>
                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="form2Example11">
                            Username
                          </label>
                          <input
                            type="email"
                            id="form2Example11"
                            className="form-control"
                            placeholder="username"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="form2Example33">
                            Email
                          </label>
                          <input
                            type="email"
                            id="form2Example33"
                            className={`form-control ${emailError ? 'is-invalid' : ''}`}
                            placeholder="email"
                            value={formData.email}
                            onChange={handleEmailChange}
                          />
                        </div>
                        <div className="form-outline mb-4">
                          <label className="form-label" htmlFor="form2Example22">
                            Password
                          </label>
                          <input
                            type="password"
                            id="form2Example22"
                            className="form-control"
                            placeholder="password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          />
                        </div>
                        <div className="text-center pt-1 mb-5 pb-1">
                          {emailError && <div className="text-danger mb-3">{emailError}</div>}
                          <button
                            className="btn btn-primary btn-block fa-lg"
                            onClick={handleLogin}
                            type="button"
                          >
                            Log in
                          </button>
                        </div>
                        <div className="d-flex align-items-center justify-content-center pb-4">
                          <p className="mb-0 me-2">Don't have an account?</p>
                          <button type="button" className="btn btn-outline-danger" onClick={() => navigate("/api/user/signup")}>Sign Up</button>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                    <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                      <h2 className="mb-4 text-black">Task Master</h2>
                      <p className="small text-black mb-0">
                        Where Your Tasks Meet Their Master. Try it now and experience a new level of efficiency and success!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Usersignin;
