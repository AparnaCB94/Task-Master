import React, { useState } from 'react';
import axios from 'axios';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
 
  const handleChange = (e: { target: { id: any; value: any; }; }) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
    console.log(formData);
  };
  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
  
    try {
      const response = await axios.post('http://localhost:4561/api/contact', formData);
  
      if (response.status === 201) {
        setSuccessMessage('Message sent successfully');
        console.log('Message sent successfully');
  
        // Clear the form fields
        setFormData({
          name: '',
          email: '',
          message: '',
        });
      } else {
        setSuccessMessage('Error sending message');
        console.error('Error sending message');
      }
    } catch (error:any) {
      setSuccessMessage('Error: ' + error.message);
      console.error('Error:', error);
    }
  };
  
  return (
    <div className="col-md-6">
      <h2 className="text-center mb-4">Contact Us</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Your Name
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Your Email
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="message" className="form-label">
            Message
          </label>
          <textarea
            className="form-control"
            id="message"
            rows={3}
            value={formData.message}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
      {successMessage && <div className="mt-3 text-success">{successMessage}</div>}
    </div>
  );
};

export default ContactForm;
