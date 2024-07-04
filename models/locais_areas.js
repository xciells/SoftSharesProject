const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('locais_areas', {
    local_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'locais',
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
    tableName: 'locais_areas',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "locais_areas_pkey",
        unique: true,
        fields: [
          { name: "local_id" },
          { name: "area_id" },
        ]
      },
    ]
  });
};
