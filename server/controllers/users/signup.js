const { user } = require('../../models');
const { generateAccessToken } = require('../tokenFunctions');

module.exports = (req, res) => {
  // TODO: 회원가입 및 사용자 생성 로직을 작성하세요.
  let { username, email, password } = req.body;

  if (!username || !email || !password) {
    res.status(422).send('insufficient parameters supplied');
  }
  user
    .findOrCreate({
      where: {
        email: email,
      },
      defaults: {
        password,
        username,
      },
    })
    .then(async ([user, created]) => {
      if (!created) {
        return res.status(409).send({ message: 'this email has already been registered' }); // 닉네임도 중복되는 메세지로 바뀌어야할듯 /상현
      }
      delete user.dataValues.password;
      let token = generateAccessToken(user.dataValues);
      res.cookie('jwt', token, { httpOnly: true });
      return res.status(201).json({ message: 'ok' });
    });
};
