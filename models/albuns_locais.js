const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('albuns_locais', {
    album_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'albuns',
        key: 'id'
      }
    },
    local_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'locais',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'albuns_locais',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "albuns_locais_pkey",
        unique: true,
        fields: [
          { name: "album_id" },
          { name: "local_id" },
        ]
      },
    ]
  });
};
