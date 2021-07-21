
const { user } = require('../../models')
const { generateAccessToken, isAuthorized } = require('../tokenFunctions');

module.exports ={
    get: (req, res) => {
      if(req.query.email||req.query.username){   //파라미터가 있을때(상현)
        let findKey,findname
        if(req.query.email) {findkey = 'email'; findname = req.query.email}
        if(req.query.username) {findkey = 'username'; findname = req.query.username}
        user.findOne({
          where: {
            [findkey]:findname
          },
        })
          .then((data) => {         
            if (!data) {
               return res.status(200).json({message:'ok'});
            }
            return res.status(404).json({message:'요청하신 정보는 이미 사용중입니다.'})
          })
      }

      else {                                     //파라미터가 없을때 (상현)
        let userInfo = isAuthorized(req)
        if(userInfo) {
          let {email,username} = userInfo
          return res.json({"data":{email,username},"message":'ok'})
        }
        else return res.json({"message": "Server is currently not available"})
      }
      
    },
    put: (req, res) => {

    },
    delete: (req, res) => {

    }
  };