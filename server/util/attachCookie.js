export const attachCookie = (res, token) => {
  res.cookie('token', token, {
    httpOnly: true,
    secure: false,
    // maybe shorten time to less than a day
    expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
  });
};
