const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('utilizadores_grupos', {
    utilizador_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'utilizadores',
        key: 'id'
      }
    },
    grupo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'grupos',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'utilizadores_grupos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "utilizadores_grupos_pkey",
        unique: true,
        fields: [
          { name: "utilizador_id" },
          { name: "grupo_id" },
        ]
      },
    ]
  });
};
