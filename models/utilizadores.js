// models/utilizadores.js
const Sequelize = require('sequelize');
module.exports = function (sequelize, DataTypes) {
    const Utilizadores = sequelize.define('utilizadores', {
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
        },
        ativo: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        },
        senha_temporaria: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
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

    Utilizadores.associate = function (models) {
        Utilizadores.belongsToMany(models.areas, {
            through: 'utilizadores_areas',
            as: 'areas',
            foreignKey: 'utilizador_id',
            otherKey: 'area_id'
        });
    };

    return Utilizadores;
};
