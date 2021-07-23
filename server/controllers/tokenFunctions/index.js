require('dotenv').config();
const { sign, verify } = require('jsonwebtoken');

module.exports = {
  generateAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET);
  },

  isAuthorized: (req) => {
    let tokenCookie = req.cookies.jwt;
    if (!tokenCookie) return null;
    try {
      return verify(tokenCookie, process.env.ACCESS_SECRET);
    } catch (err) {
      return null;
    }
  },
  sendAccessToken: async (res, accessToken) => {
    res.cookie('jwt', accessToken, {
      httpOnly: true,
    });
    res.json({
      message: 'ok',
    });
  },
};
