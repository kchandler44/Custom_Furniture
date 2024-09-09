import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles.scss';

const Login = () => {
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (userId) {
  //     console.log('user successfully logged in');
  //     navigate('/manage');
  //   }
  // }, [userId]);

  const login = async () => {
    const authUser = { username: username, password: password };
    const response = await fetch('http://localhost:3000/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(authUser),
    });
    if (response.ok) {
      const responseData = await response.json();
      setUserId(responseData._id);
      setUsername('');
      setPassword('');
    } else {
      alert('Username and/or password not recognized');
      console.log('Failed to login');
    }
  };

  return (
    <div className='loginPage'>
      {!userId ? (
        <div>
          <h2>Log In</h2>
          <input
            className='loginDetails'
            type='text'
            value={username}
            placeholder='Username'
            onChange={(e) => setUsername(e.target.value)}
          ></input>
          <input
            className='loginDetails'
            type='text'
            value={password}
            placeholder='Password'
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button
            className='button'
            onClick={(e) => {
              login();
            }}
          >
            Log In
          </button>
        </div>
      ) : (
        <div>
          <h2>Login Successful!</h2>
          <button
            className='button'
            onClick={(e) => {
              navigate('/manage');
            }}
          >Continue</button>
          <button
            className='button'
            onClick={(e) => {
              changePassword;
            }}
          >
            Change Password
          </button>
          <button
            className='button'
            onClick={(e) => {
              logout;
            }}
          >
            Log Out
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
