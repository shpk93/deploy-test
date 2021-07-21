const { post,user,posts_ingredient } = require('../../models')
const { isAuthorized } = require('../tokenFunctions');

module.exports ={
    get: (req, res) => {

    },
    getId: (req, res) => {

    },
    post: (req, res) => {

    },
    delete: (req, res) => {
      let id = Number(req.params.id)
      let userInfo = isAuthorized(req)
      
      if(userInfo){
        post.findOne({
          where: {
            id,
          },
        })
          .then((data) => {
            if(userInfo.id === data.dataValues.user_id) {
              post.destroy({
                where: {
                  id
                }
              })
              .then(del => res.status(200).json({"message": "ok"}))
            }
            else return res.status(401).json({"message": "Unauthorized request"})

          })
      }
      else return res.status(401).json({"message": "Unauthorized request"})
    }
  };