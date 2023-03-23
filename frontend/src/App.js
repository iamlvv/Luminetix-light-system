import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ContextInfo from './components/context/ContextInfo';
import ContextSetup from './pages/ContextSetup';
import HomePage from './pages/Homepage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Statistics from './pages/Statistics';
import UserDetail from './pages/UserDetail';

function App() {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/contextsetup" element = {<ContextSetup />} />
            <Route path='/login' element={<Login/>} />
            <Route path='manualcontrol' element={<h1>ManualControl</h1>} />
            <Route path='/statistics' element={<Statistics/>} />
            <Route path='/userdetail' element={<UserDetail/>} />
            <Route path='signup' element={<Signup/>} />
            <Route path='/homepage' element={<HomePage/>} />
            <Route path='/contextsetup/:id' element={<ContextInfo/>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
