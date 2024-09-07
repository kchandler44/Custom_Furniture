import { BadRequestError } from '../customErrors/bad-request-error.js';
import { User } from '../models/usersModel.js';
import { attachCookie } from '../util/attachCookie.js';

const requirements = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).+$/;

export const createUser = async (req, res) => {
  const { username, password } = req.body;
  // validate inputs
  if (!username || !password) {
    throw new BadRequestError('Invalid inputs');
  }
  if (password.length < 8 || !requirements) {
    throw new BadRequestError('password must meet requirements');
  }
  // Check to see if user with this username already exists
  const existingUser = await User.findOne({ username });
  if (existingUser) {
    throw new BadRequestError('User with that username exists');
  }

  //create user document
  const newUser = await User.create({ username, password });
  newUser.save();
  // createJWT defined on userSchema
  const token = newUser.createJwt();
  // set cookie on res obj with name 'token'
  // attachCookie method - defined in util folder
  attachCookie(res, token);
  console.log(newUser, ' => newUser');
  console.log(password, '=> password');
  res.status(201).send(newUser);
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  // validate username and password - they exist
  if (!username || !password) {
    throw new BadRequestError('Must provide username and password');
  }
  // query database for user with given username
  const existingUser = await User.findOne({ username });
  // handle case where no user exists with that username
  if (!existingUser) {
    throw new BadRequestError('Invalid credentials');
  }
  // if user does exist, compare given pw to pw in db
  // comparePassword is defined on userSchema -> accepts provided pw as arg
  const passwordsMatch = await existingUser.comparePassword(password);
  if (!passwordsMatch) {
    throw new BadRequestError('Invalid credentials');
  }
  // if pws match, create a JWT
  // createJwt is defined on userSchema -> returns token
  const token = existingUser.createJwt();
  // attach jwt to cookie
  // attachCookie is helper function in util folder
  // accepts response obj and token as args
  attachCookie(res, token);
  res.status(200).send(existingUser);
};

export const logout = async (req, res) => {
  // set cookie on res obj with name 'token' to null
  // make cookie httpOnly
  // set cookie expiration to 500ms from now
  res.cookie('token', null, {
    httpOnly: true,
    secure: false,
    expire: new Date(Date.now() + 500),
  });
  res.status(200).send({ message: 'success' });
};

export const changePassword = async (req, res) => {
  //req.params will contain userId
  //req.body will contain oldPassword, newPassword
  const { id } = req.params;
  const { oldPassword, newPassword } = req.body;
  const existingUser = await User.findById(id);
  // make sure password is long enough and meets proper requirements defined above
  if (newPassword.length < 8 || !requirements) {
    throw new BadRequestError(
      'Password must contain the following: at least 8 characters, at least 1 uppercase letter, and at least 1 symbol'
    );
  }
  if (newPassword === oldPassword) {
    throw new BadRequestError('Password cannot be reused');
  }
  // updateOne first and then save so that it .pre is triggered from the userModel
  existingUser.password = newPassword;
  existingUser.markModified('password');
  existingUser.save();
  res.status(200).send('password updated successfully');
};
