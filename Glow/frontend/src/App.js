import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import SkinCareGenerator from './Pages/SkinCareGenerator';
import UserProfile from './Pages/UserProfile';
import LLMTest from './Pages/LLMTest';

function App(){
  return (
    <div>
      <Router>
        <Routes>
          <Route path = '//' element={<LandingPage/>}/>
          <Route path = '/login' element={<Login/>}/>
          <Route path = '/SignUp' element={<SignUp/>}/>
          <Route path = '/SkinCareGenerator' element={<SkinCareGenerator/>}/>
          <Route path = '/UserProfile' element={<UserProfile/>}/>
          <Route path = '/LLMTest' element={<LLMTest />}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
