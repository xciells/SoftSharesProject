const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('grupos_locais', {
    grupo_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'grupos',
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
    tableName: 'grupos_locais',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "grupos_locais_pkey",
        unique: true,
        fields: [
          { name: "grupo_id" },
          { name: "local_id" },
        ]
      },
    ]
  });
};
