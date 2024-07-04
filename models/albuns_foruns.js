const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('albuns_foruns', {
    album_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'albuns',
        key: 'id'
      }
    },
    forum_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'forums',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'albuns_foruns',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "albuns_foruns_pkey",
        unique: true,
        fields: [
          { name: "album_id" },
          { name: "forum_id" },
        ]
      },
    ]
  });
};
