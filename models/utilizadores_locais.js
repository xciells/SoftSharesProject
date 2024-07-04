const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('utilizadores_locais', {
    utilizador_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'utilizadores',
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
    tableName: 'utilizadores_locais',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "utilizadores_locais_pkey",
        unique: true,
        fields: [
          { name: "utilizador_id" },
          { name: "local_id" },
        ]
      },
    ]
  });
};
