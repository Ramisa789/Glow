import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LanginPage';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import SkinCareGenerator from './Pages/SkinCareGenerator';
import UserProfile from './Pages/UserProfile';

function App(){
  return (
    <div>
      <Router>
        <Route exac path = '//' element={<LandingPage/>}/>
        <Route exac path = '/login' element={<Login/>}/>
        <Route exac path = '/SignUp' element={<SignUp/>}/>
        <Route exac path = '/SkinCareGenerator' element={<SkinCareGenerator/>}/>
        <Route exac path = '/UserProfile' element={<UserProfile/>}/>
      </Router>
    </div>
  );
}

export default App;
