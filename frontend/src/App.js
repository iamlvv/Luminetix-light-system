import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import HomePage from './pages/Homepage';

function App() {
  return (
    <div>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/contextsetup" element={<h1>ContextSetup</h1>} />
            <Route path='/login' element={<h1>Login</h1>} />
            <Route path='manualcontrol' element={<h1>ManualControl</h1>} />
            <Route path='/statistics' element={<h1>Statistics</h1>} />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
