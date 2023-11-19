import React, { useEffect } from 'react';
import logo from './logo.svg';
import './App.css';
import Usersignin from './Signin/Signin';



import SignUpForm from './Register/Register';
import  { useState } from 'react';

import Todo from './TodoPage/Todo';

import ContactForm from './Home/Contact';
import HomePage from './Home/Home';

import { BrowserRouter, Route, Routes } from "react-router-dom";


 
function App() {
  return (
    <div className="App">
 
{/* <Note/> */}

{/* <Todo/> */}
   <BrowserRouter>
     <Routes>

      <Route index element={<HomePage />} />
     <Route path="/api/user/signup" element={<SignUpForm/>} />
     <Route path="/api/user/login" element={<Usersignin/>} />
     <Route path="/api/todo" element={<Todo/>} >
    
  
       </Route>
     </Routes>
   </BrowserRouter>    

    </div>
  );
}
 
export default App;