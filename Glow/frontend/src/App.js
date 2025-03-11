import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './Pages/LandingPage';
import Login from './Pages/Login';
import SignUp from './Pages/SignUp';
import SkinCareGenerator from './Pages/SkinCareGenerator';
import SavedRoutines from './Pages/savedRoutines';

function App(){
  return (
    <div>
      <Router>
        <Routes>
          <Route path = '/' element={<LandingPage/>}/>
          <Route path = '/login' element={<Login/>}/>
          <Route path = '/SignUp' element={<SignUp/>}/>
          <Route path = '/SkinCareGenerator' element={<SkinCareGenerator/>}/>
          <Route path = '/SavedRoutines' element={<SavedRoutines/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
