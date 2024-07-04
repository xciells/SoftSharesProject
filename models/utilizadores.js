const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('utilizadores', {
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
    password: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    numero_colaborador: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    morada: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    data_nascimento: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    contacto: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    tipoid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'tipos_utilizadores',
        key: 'id'
      }
    }
  }, {
    sequelize,
    tableName: 'utilizadores',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "utilizadores_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
