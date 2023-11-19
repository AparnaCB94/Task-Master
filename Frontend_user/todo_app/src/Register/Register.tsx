import React, { useState } from 'react';
import '../Assets/register.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const SignUpForm: React.FC = () => {
  const navigate = useNavigate();

  const [isChecked, setIsChecked] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    number: '',
  });

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(e.target.checked);
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;

    if (!email.includes('@')) {
      setEmailError('Invalid email format');
    } else {
      setEmailError('');
    }

    setFormData({
      ...formData,
      email,
    });
  };

  const handleRegister = async () => {
    if (!isChecked || !!passwordError || !!emailError) {
      // Do not submit the form if conditions are not met
      return;
    }

    try {
      const response = await axios.post('http://localhost:4561/api/user/signup', formData);

      if (response.status === 201) {
        setRegistrationSuccess(true);
        navigate('/api/user/login'); // Redirect the user after successful registration
      } else {
        // Handle registration failure (e.g., display an error message)
      }
    } catch (error) {
      // Handle network or server errors
    }
  };

  return (
    <section className="vh-100" style={{ backgroundColor: '#eee' }}>
      <div className="container h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-12 col-xl-11">
            <div className="card text-black" style={{ borderRadius: '25px' }}>
              <div className="card-body p-md-5">
                <div className="row justify-content-center">
                  <div className="col-md-10 col-lg-6 col-xl-5 order-2 order-lg-1">
                    <p className="text-center h1 fw-bold mb-5 mx-1 mx-md-4 mt-4">Task Master</p>
                    <h2 style={{ textAlign: 'center', color: 'black', fontWeight: 'bold', marginBottom: '1rem' }}>
                      Sign Up
                    </h2>
                    <form className="mx-1 mx-md-4">
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-user fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" htmlFor="form3Example1c">
                            Your Name
                          </label>
                          <input
                            type="text"
                            id="form3Example1c"
                            className="form-control"
                            placeholder="Your Name"
                            value={formData.username}
                            onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-envelope fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" htmlFor="form3Example3c">
                            Your Email
                          </label>
                          <input
                            type="email"
                            id="form3Example3c"
                            className="form-control"
                            placeholder="Your Email"
                            value={formData.email}
                            onChange={handleEmailChange}
                          />
                          {emailError && <div className="text-danger">{emailError}</div>}
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" htmlFor="form3Example4c">
                            Password
                          </label>
                          <input
                            type="password"
                            id="form3Example4c"
                            className="form-control"
                            placeholder="Password"
                            value={formData.password}
                            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                          />
                        </div>
                      </div>
                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-lock fa-lg me-3 fa-fw"></i>
                        <div className="form-outline flex-fill mb-0">
                          <label className="form-label" htmlFor="form3Example4c">
                            Phone
                          </label>
                          <input
                            type="number"
                            id="form3Example4c"
                            className="form-control"
                            placeholder="Phone"
                            value={formData.number}
                            onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                          />
                        </div>
                      </div>

                      <div className="d-flex flex-row align-items-center mb-4">
                        <i className="fas fa-key fa-lg me-3 fa-fw"></i>
                      </div>
                      <div className="form-check d-flex justify-content-center mb-5">
                        <input
                          className="form-check-input me-2"
                          type="checkbox"
                          value=""
                          id="form2Example3c"
                          onChange={handleCheckboxChange}
                        />
                        <label className="form-check-label" htmlFor="form2Example3">
                          I agree to all statements in <a href="#!">Terms of service</a>
                        </label>
                      </div>
                      <div className="d-flex justify-content-center mx-4 mb-3 mb-lg-4">
                        <button
                          type="button"
                          className="btn btn-primary btn-lg"
                          disabled={!isChecked || !!passwordError || !!emailError}
                          onClick={handleRegister}
                        >
                          Register
                        </button>
                      </div>
                    </form>
                  </div>
                  <div className="col-md-10 col-lg-6 col-xl-7 d-flex align-items-center order-1 order-lg-2">
                    <img
                      src="https://images.pexels.com/photos/4050341/pexels-photo-4050341.jpeg?auto=compress&cs=tinysrgb&w=600"
                      className="img-fluid"
                      alt="Sample image"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUpForm;
