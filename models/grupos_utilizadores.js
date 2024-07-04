const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('grupos_utilizadores', {
    grupo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'grupos',
        key: 'id'
      }
    },
    utilizador_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'utilizadores',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'grupos_utilizadores',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "grupos_utilizadores_pkey",
        unique: true,
        fields: [
          { name: "grupo_id" },
          { name: "utilizador_id" },
        ]
      },
    ]
  });
};
