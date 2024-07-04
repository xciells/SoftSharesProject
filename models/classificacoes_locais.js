const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('classificacoes_locais', {
    classificacao_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'classificacoes',
        key: 'id'
      }
    },
    local_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'locais',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'classificacoes_locais',
    schema: 'public',
    timestamps: false
  });
};
