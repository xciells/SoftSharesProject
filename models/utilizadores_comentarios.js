const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('utilizadores_comentarios', {
    utilizador_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'utilizadores',
        key: 'id'
      }
    },
    comentario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'comentarios',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'utilizadores_comentarios',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "utilizadores_comentarios_pkey",
        unique: true,
        fields: [
          { name: "utilizador_id" },
          { name: "comentario_id" },
        ]
      },
    ]
  });
};
