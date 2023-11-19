import React from 'react';


import LoginPage from './Admin/Signin';
import UserListPage from './Admin/userlist';


import { BrowserRouter, Route, Routes } from "react-router-dom";
import MessagesPage from './Admin/viewmessage';


 
function App() {
  return (
    <div className="App">
 



  <BrowserRouter>
     <Routes>

      <Route index element={<LoginPage />} />
      <Route path="/user-list" element={<UserListPage/>} />
      <Route path="/messages" element={<MessagesPage/>} >
   
       </Route>
     </Routes>
   </BrowserRouter>   

    </div>
  );
}
 
export default App;