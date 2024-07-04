const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('utilizadores_albuns', {
    utilizador_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'utilizadores',
        key: 'id'
      }
    },
    album_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'albuns',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'utilizadores_albuns',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "utilizadores_albuns_pkey",
        unique: true,
        fields: [
          { name: "utilizador_id" },
          { name: "album_id" },
        ]
      },
    ]
  });
};
