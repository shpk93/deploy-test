const { post,like,posts_ingredient,sequelize} = require('../../models')
const { QueryTypes } = require('sequelize');
const { isAuthorized } = require('../tokenFunctions');
const likes = require('../likes');

module.exports ={
    get: async (req, res) => {
        //전체 포스트 정보를 api형식에 맞춰서 받아올 쿼리
        const postInfo = await sequelize.query(`SELECT 
        posts.id, users.username, posts.title, ingredients.name as mainmenu, ingredients.img_url, IFNULL(like_count.likes,0) as likes
        FROM users 
        JOIN posts on users.id = posts.user_id 
        RIGHT JOIN posts_ingredients as pi on posts.id =  pi.post_id 
        JOIN ingredients on pi.ingredient_id = ingredients.id 
        JOIN ingredientTypes on ingredientTypes.id = ingredients.type_id
        LEFT JOIN (SELECT posts.id as post_id, COUNT(*) as likes FROM likes JOIN posts on likes.post_id = posts.id GROUP BY posts.id) as like_count on posts.id = like_count.post_id
        WHERE ingredientTypes.name = 'main'`
        , { type: QueryTypes.SELECT });

        //쿼리 결과 데이터와 함께 response 전송
        res.status(200).json({data: postInfo, message: "ok"});
    },
    getId: async (req, res) => {
        let id = Number(req.params.id)
        //id에 해당하는 포스트 세부정보, 재료 세부정보 요청 쿼리
        const postInfo = await sequelize.query(`SELECT 
            users.username, posts.id, posts.title, posts.content, ingredientTypes.name as ingredient_type, ingredients.name, ingredients.img_url 
            FROM users 
            JOIN posts on users.id = posts.user_id 
            RIGHT JOIN posts_ingredients as pi on posts.id =  pi.post_id 
            JOIN ingredients on pi.ingredient_id = ingredients.id 
            JOIN ingredientTypes on ingredientTypes.id = ingredients.type_id 
            WHERE posts.id = `+id, { type: QueryTypes.SELECT })
        //쿼리 결과를 api형식에 맞게 가공할 Initial Value
        const responseData = {
            id: postInfo[0].id,
            username: postInfo[0].username,
            title: postInfo[0].title,
            content: postInfo[0].content,
            menu: {
                main:[],
                bread:[],
                cheese:[],
                vege:[],
                sauce:[],
                addable:[],
                addmeat:[]
            }
        }
        //받아온 쿼리 결과값을 api형식에 맞게 가공
        postInfo.forEach(item => {
            switch(item.ingredient_type){
                case "main":
                    responseData.menu.main.push({
                        name: item.name,
                        img_url: item.img_url
                    })
                    break;
                case "bread":
                    responseData.menu.bread.push({
                        name: item.name,
                        img_url: item.img_url
                    })
                    break;
                case "cheese":
                    responseData.menu.cheese.push({
                        name: item.name,
                        img_url: item.img_url
                    })
                    break;
                case "vege":
                    responseData.menu.vege.push({
                        name: item.name,
                        img_url: item.img_url
                    })
                    break;
                case "sauce":
                    responseData.menu.sauce.push({
                        name: item.name,
                        img_url: item.img_url
                    })
                    break;
                case "addable":
                    responseData.menu.addable.push({
                        name: item.name,
                        img_url: item.img_url
                    })
                    break;
                case "addmeat":
                    responseData.menu.addmeat.push({
                        name: item.name,
                        img_url: item.img_url
                    })
                    break;
                default:
                    console.log("unhandled type")
            }
        },responseData);

        //해당 포스트의 좋아요수 쿼리
        const likesInfo = await like.count({where: {post_id:id}})

        //좋아요 수에 대한 쿼리 값을 responseData의 likes 항목에 추가
        responseData.likes = likesInfo;

        //결과 데이터와 함께 response 전송
        res.status(200).json({data: responseData, message: "ok"});
    },
    post: async (req, res) => {
        let userInfo = isAuthorized(req)
        //토큰 확인 후 로그인 상태일 시
        if(userInfo){
            //request data를 기반으로 post테이블에 레코드 생성
            let postId = await post.create({ user_id: userInfo.id, title: req.body.title, content: req.body.content },{returning: true})
            .then(created =>{
                return created.dataValues.id
            });

            //menu Array값을 posts_ingredients테이블에 추가가능한 데이터 형식으로 매핑.
            let ingredientsToCreate = req.body.menu.map(ingredientId => {
                return {
                    post_id: postId,
                    ingredient_id: ingredientId
                }
            })
            //menu에 있는 재료들을 posts_ingredients테이블에 레코드로 추가
            await posts_ingredient.bulkCreate(ingredientsToCreate,{returning:true}).then(created => {
                console.log(created);
            })
            res.status(201).json({"message": "ok"});
        }else{ // 로그인 상태가 아니면 포스트 게시 불가
            res.status(401).json({"message": "Unauthorized request"});
        }
    },
    delete: (req, res) => {
      let id = Number(req.params.id)
      let userInfo = isAuthorized(req)
      
      if(userInfo){
        post.findOne({
          where: {
            id,
          },
        }).then((data) => {
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