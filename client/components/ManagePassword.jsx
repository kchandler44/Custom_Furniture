import React, { useState } from 'react';

const ManagePage = ({ oldPassword, userId, changePassword }) => {
  return (
    <div>
      <h2>Login Successful</h2>
      <div>
        <button
          className='button'
          onClick={(e) => {
            changePassword();
          }}
        >
          Change Password
        </button>
      </div>
    </div>
  );
};