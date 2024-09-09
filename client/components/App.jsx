import React from 'react';
import '../assets/styles.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login.jsx';
import Home from '../pages/Home.jsx';
import Manage from '../pages/Manage.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <div className='container'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/manage' element={<Manage />} />
          <Route path='/login' element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;