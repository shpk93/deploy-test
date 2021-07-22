const { like } = require('../../models');
const { isAuthorized } = require('../tokenFunctions');
module.exports = {
  post: (req, res) => {
    let post_id = req.body.post_id;
    // let userInfo = isAuthorized(req);
    let userInfo = { id: 1 };
    if (userInfo) {
      like.create({ post_id, user_id: userInfo.id });
      res.status(201).json({ message: 'ok' });
    } else {
      res.status(401).json({ message: 'Unauthorized request' });
    }
  },
  delete: (req, res) => {
    let post_id = Number(req.params.id);
    // let userInfo = isAuthorized(req)
    let userInfo = { id: 1 };

    if (userInfo) {
      like.destroy({
        where: {
          user_id: userInfo.id,
          post_id,
        },
      });
      res.status(200).json({ message: 'ok' });
    } else {
      res.status(401).json({ message: 'Unauthorized request' });
    }
  },
};
