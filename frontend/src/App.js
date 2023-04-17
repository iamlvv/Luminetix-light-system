import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ContextCreatePage from './components/context/ContextCreatePage';
import ContextInfo from './components/context/ContextInfo';
import ContextLastPage from './components/context/ContextLastPage';
import ContextLastPageCreate from './components/context/ContextLastPageCreate';
import ContextNextPage from './components/context/ContextNextPage';
import ContextNextPageCreate from './components/context/ContextNextPageCreate';
import ContextSetup from './pages/ContextSetup';
import HomePage from './pages/Homepage';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Statistics from './pages/Statistics';
import UserDetail from './pages/UserDetail';
import ManualControl from './pages/ManualControl';

function App() {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/contextsetup" element = {<ContextSetup />} />
            <Route path='manualcontrol' element={<ManualControl/>} />
            <Route path='/statistics' element={<Statistics/>} />
            <Route path='/userdetail' element={<UserDetail/>} />
            <Route path='signup' element={<Signup/>} />
            <Route path='/homepage' element={<HomePage/>} />
            <Route path='/contextsetup/:id' element={<ContextInfo/>} />
            <Route path='/contextsetup/:id/finish' element = {<ContextLastPage />} />
            <Route path='/contextsetup/createnew' element = {<ContextCreatePage />} />
            <Route path='/contextsetup/createnew/finish' element = {<ContextLastPageCreate />} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
