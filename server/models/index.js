'use strict';
require('dotenv').config();
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

//Associations
const {user,post,posts_ingredient,like,ingredient,ingredientType} = sequelize.models;
like.belongsTo(user);
user.hasMany(like);
post.hasMany(like);
like.belongsTo(post);
user.hasMany(post);
post.belongsTo(user);
post.hasMany(posts_ingredient);
posts_ingredient.belongsTo(post);
posts_ingredient.belongsTo(ingredient);
ingredient.hasMany(posts_ingredient);
ingredientType.hasMany(ingredient);
ingredient.belongsTo(ingredientType);

module.exports = db;
