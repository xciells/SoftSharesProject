const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('comentarios', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    forum_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'forums',
        key: 'id'
      }
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'utilizadores',
        key: 'id'
      }
    },
    comentario: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    data_comentario: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.Sequelize.literal('CURRENT_TIMESTAMP')
    }
  }, {
    sequelize,
    tableName: 'comentarios',
    schema: 'public',
    timestamps: false,
    indexes: [
      {
        name: "comentarios_pkey",
        unique: true,
        fields: [
          { name: "id" },
        ]
      },
    ]
  });
};
