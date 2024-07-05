'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('utilizadores', 'area_id', {
      type: Sequelize.INTEGER,
      allowNull: false,
      references: {
        model: 'areas',
        key: 'id'
      }
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('utilizadores', 'area_id');
  }
};
