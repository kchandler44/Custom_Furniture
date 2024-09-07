import React from 'react';
import '../assets/styles.scss';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login.jsx';
import Account from '../pages/Account.jsx';
import Home from '../pages/Home.jsx';
import Manage from '../pages/Manage.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <div className='container'>
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/manage' element={<Manage />} />
          <Route path='/login' element={<Login />} />
          <Route path='/account' element={<Account />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;