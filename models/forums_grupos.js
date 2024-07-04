const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('forums_grupos', {
    forum_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'forums',
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
    tableName: 'forums_grupos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "forums_grupos_pkey",
        unique: true,
        fields: [
          { name: "forum_id" },
          { name: "grupo_id" },
        ]
      },
    ]
  });
};
