const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('albuns', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    nome: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    descricao: {
      type: DataTypes.TEXT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'albuns',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "albuns_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
