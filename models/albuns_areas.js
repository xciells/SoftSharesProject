const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('albuns_areas', {
    album_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'albuns',
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
    tableName: 'albuns_areas',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "albuns_areas_pkey",
        unique: true,
        fields: [
          { name: "album_id" },
          { name: "area_id" },
        ]
      },
    ]
  });
};
