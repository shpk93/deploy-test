require('dotenv').config();
const { sign, verify } = require('jsonwebtoken');

module.exports = {
    generateAccessToken: (data) => {
      return sign(data, process.env.ACCESS_SECRET, { expiresIn: "1h" })
      // HINT: 토큰을 리턴하세요. (공식 문서의 Synchronous한 방법을 사용합니다)
    },

    isAuthorized: (req) => {
      let tokenCookie = req.headers.cookie;
      if(!tokenCookie) return null
      let token = tokenCookie.split(';')[0].slice(4)
      try {
        return verify(token, process.env.ACCESS_SECRET);
      } catch (err) {
        return null;
      }
    },
    sendAccessToken: async(res, accessToken) => {
      res.cookie("jwt", accessToken, {httpOnly: true});
      res.json({ message: 'ok' });
    },
};
