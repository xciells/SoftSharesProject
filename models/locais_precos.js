const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('locais_precos', {
    local_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'locais',
        key: 'id'
      }
    },
    preco_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'precos',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'locais_precos',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "locais_precos_pkey",
        unique: true,
        fields: [
          { name: "local_id" },
          { name: "preco_id" },
        ]
      },
    ]
  });
};
