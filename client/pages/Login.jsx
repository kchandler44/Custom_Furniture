import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/styles.scss';

const Login = () => {
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  // change default set to false. Changes to true when Change Password button is clicked.
  const [change, setChange] = useState(false);

  const navigate = useNavigate();

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
    }
  };

  const logout = async () => {
    const response = await fetch('http://localhost:3000/api/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(response),
    });
    if (response.ok) {
      setUserId('');
      alert('logout successful');
    }
  };

  const changePassword = async (userId) => {
    const response = await fetch(`/api/auth/change-password/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        oldPassword: password,
        newPassword: newPassword,
      }),
    });
    if (response.ok) {
      const data = await response.json();
      setPassword('');
      setNewPassword('');
      setUserId('');
      alert('password reset successful');
    } else {
      alert('problem updating password');
    }
  };

  const handleChangeClick = async () => {
    setChange(true);
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
              navigate(`/manage/:id${userId}`);
            }}
          >
            Continue
          </button>
          <button
            className='button'
            onClick={(e) => {
              handleChangeClick();
            }}
          >
            Change Password
          </button>
          <div>
            {' '}
            {change && (
              <div>
                Enter Existing Password
                <input
                  type='text'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                ></input>
                Enter New Password
                <input
                  type='text'
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                ></input>
                <button
                  className='button'
                  onClick={(e) => {
                    changePassword(userId);
                  }}
                >
                  Update Password
                </button>
              </div>
            )}
          </div>
          <button
            className='button'
            onClick={(e) => {
              logout();
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
