const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('utilizadores_areas', {
    utilizador_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'utilizadores',
        key: 'id'
      }
    },
    area_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'areas',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'utilizadores_areas',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "utilizadores_areas_pkey",
        unique: true,
        fields: [
          { name: "utilizador_id" },
          { name: "area_id" },
        ]
      },
    ]
  });
};
