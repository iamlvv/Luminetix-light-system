import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/Homepage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import UserDetail from './pages/UserDetail';

function App() {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/contextsetup" element={<h1>ContextSetup</h1>} />
            <Route path='/login' element={<Login/>} />
            <Route path='manualcontrol' element={<h1>ManualControl</h1>} />
            <Route path='/statistics' element={<h1>Statistics</h1>} />
            <Route path='/userdetail' element={<UserDetail/>} />
            <Route path='signup' element={<Signup/>} />
            <Route path='/homepage' element={<HomePage/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
