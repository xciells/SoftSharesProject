const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('utilizadores_classificacoes', {
    utilizador_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'utilizadores',
        key: 'id'
      }
    },
    classificacao_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'classificacoes',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'utilizadores_classificacoes',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "utilizadores_classificacoes_pkey",
        unique: true,
        fields: [
          { name: "utilizador_id" },
          { name: "classificacao_id" },
        ]
      },
    ]
  });
};
