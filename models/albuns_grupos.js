const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('albuns_grupos', {
    album_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'albuns',
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
    tableName: 'albuns_grupos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "albuns_grupos_pkey",
        unique: true,
        fields: [
          { name: "album_id" },
          { name: "grupo_id" },
        ]
      },
    ]
  });
};
