// models/areas.js
const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    const Areas = sequelize.define('areas', {
        id: {
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true
        },
        nome: {
            type: DataTypes.STRING(100),
            allowNull: false
        }
    }, {
        sequelize,
        tableName: 'areas',
        schema: 'public',
        timestamps: false,
        indexes: [
            {
                name: "areas_pkey",
                unique: true,
                fields: [
                    { name: "id" },
                ]
            },
        ]
    });

    Areas.associate = function (models) {
        Areas.belongsToMany(models.utilizadores, {
            through: 'utilizadores_areas',
            as: 'utilizadores',
            foreignKey: 'area_id',
            otherKey: 'utilizador_id'
        });
    };

    return Areas;
};
