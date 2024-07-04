const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('grupos_areas', {
    grupo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'grupos',
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
    tableName: 'grupos_areas',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "grupos_areas_pkey",
        unique: true,
        fields: [
          { name: "grupo_id" },
          { name: "area_id" },
        ]
      },
    ]
  });
};
