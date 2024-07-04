const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('forums_locais', {
    forum_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'forums',
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
    tableName: 'forums_locais',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "forums_locais_pkey",
        unique: true,
        fields: [
          { name: "forum_id" },
          { name: "local_id" },
        ]
      },
    ]
  });
};
