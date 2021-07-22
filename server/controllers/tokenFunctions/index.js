require('dotenv').config();
const {
  sign,
  verify
} = require('jsonwebtoken');

module.exports = {
  generateAccessToken: (data) => {
    return sign(data, process.env.ACCESS_SECRET)
  },

  isAuthorized: (req) => {
    // cookies: {
    //   jwt: {
    //     accessToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiIxMjNAMTIzLjEyMyIsInVzZXJuYW1lIjoi6rmA7L2U65SpIiwiY3JlYXRlZEF0IjoiMjAyMC0xMC0xMFQxMDowMDoxMi4wMDBaIiwidXBkYXRlZEF0IjoiMjAyMC0xMC0xMFQxMDowMDoxMi4wMDBaIiwiaWF0IjoxNjI2OTIyNDcxfQ.Gwez1EKwyz9s56jmEUFBuNAjywNU12BIRARnSltq0iw'
    //   }
    // }
    console.log(req)
    let tokenCookie = req.cookies.jwt.accessToken; //쿠키 바꾼곳
    if (!tokenCookie) return null
    let token = tokenCookie.split(';')[0].slice(4) // 안쓰고 위 tokenCookie사용
    try {
      return verify(tokenCookie, process.env.ACCESS_SECRET);
    } catch (err) {
      return null;
    }
  },
  sendAccessToken: async (res, accessToken) => {
    res.cookie("jwt", {
      accessToken
    }, {
      httpOnly: true
    });
    res.json({
      message: 'ok'
    });
  },
};