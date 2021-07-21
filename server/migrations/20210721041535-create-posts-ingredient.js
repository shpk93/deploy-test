'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('posts_ingredients', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      post_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      ingredient_id: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });

    await queryInterface.addConstraint('posts_ingredients', {
      fields: ['post_id'],
      type: 'foreign key',
      name: 'fk_pi_post',
      references: {
        table: 'posts',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });

    await queryInterface.addConstraint('posts_ingredients', {
      fields: ['ingredient_id'],
      type: 'foreign key',
      name: 'fk_pi_ingredient',
      references: {
        table: 'ingredients',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint('posts_ingredients', 'fk_pi_post');
    await queryInterface.removeConstraint('posts_ingredients', 'fk_pi_ingredient');
    await queryInterface.dropTable('posts_ingredients');
  }
};