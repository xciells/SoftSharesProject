const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('areas_utilizadores', {
    area_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'areas',
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
    tableName: 'areas_utilizadores',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "areas_utilizadores_pkey",
        unique: true,
        fields: [
          { name: "area_id" },
          { name: "utilizador_id" },
        ]
      },
    ]
  });
};
