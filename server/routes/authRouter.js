import express from 'express';
import {
  login,
  logout,
  changePassword,
} from '../controllers/authController.js';

const auth = express.Router();

auth.post('/login', login);
auth.post('/logout', logout);
auth.patch('/change-password/:id', changePassword);

export default auth;
