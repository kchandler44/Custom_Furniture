import { BadRequestError } from '../customErrors/bad-request-error.js';
import { User } from '../models/usersModel.js';
import { attachCookie } from '../util/attachCookie.js';

export const login = async (req, res) => {
    console.log('are we here?');
  const { username, password } = req.body;
  console.log(username, password);
  // validate username and password - they exist
  if (!username || !password) {
    throw new BadRequestError('Must provide username and password');
  }
  // query database for user with given username
  const existingUser = await User.findOne({ username });
  // handle case where no user exists with that username
  console.log('existingUser: ', existingUser);
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
  const { userId } = req.params;
  const existingUser = await User.findOne({ userId });
  //req.params will contain userId
  //req.body will contain oldPassword, newPassword
  const { oldPassword, newPassword } = req.body;
  console.log('oldPassword: ', oldPassword, 'newPassword: ', newPassword);
  // reconfirm that oldPassword matches existing password using comparePassword
  const passwordsMatch = await existingUser.comparePassword(oldPassword);
  if (!passwordsMatch) {
    throw new BadRequestError('Invalid credentials');
  }
  // if passwords do match, update the pw with restrictions
  const restrictions = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).+$/;
  if (newPassword.length < 8 || !restrictions) {
    throw new BadRequestError(
      'Password must contain the following: at least 8 characters, at least 1 uppercase letter, and at least '
    );
  }
  // updateOne first and then save so that it .pre is triggered from the userModel
  const updatedPassword = await User.updateOne({ password: newPassword });
  console.log(updatedPassword, ' is updatedPassword');
  await existingUser.save();
  res.status(200).send({ message: 'success' });
};
