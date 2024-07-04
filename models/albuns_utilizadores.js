const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('albuns_utilizadores', {
    album_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'albuns',
        key: 'id'
      }
    },
    utilizador_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'utilizadores',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'albuns_utilizadores',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "albuns_utilizadores_pkey",
        unique: true,
        fields: [
          { name: "album_id" },
          { name: "utilizador_id" },
        ]
      },
    ]
  });
};
