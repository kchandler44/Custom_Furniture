import express from 'express';
import {
  createUser,
  login,
  logout,
  changePassword,
} from '../controllers/authController.js';

const auth = express.Router();

auth.post('/create', createUser);
auth.post('/login', login);
auth.post('/logout', logout);
auth.patch('/change-password/:id', changePassword);

export default auth;
