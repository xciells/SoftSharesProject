const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('locais_foruns', {
    local_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'locais',
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
    tableName: 'locais_foruns',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "locais_foruns_pkey",
        unique: true,
        fields: [
          { name: "local_id" },
          { name: "forum_id" },
        ]
      },
    ]
  });
};
