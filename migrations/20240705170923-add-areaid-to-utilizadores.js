'use strict';

module.exports = {
    up: async (queryInterface, Sequelize) => {
        // Adicionar a coluna area_id com um valor padr�o tempor�rio
        await queryInterface.addColumn('utilizadores', 'area_id', {
            type: Sequelize.INTEGER,
            allowNull: true, // Temporariamente permitir nulo
        });

        // Atualizar todos os utilizadores para ter area_id = 1
        await queryInterface.sequelize.query(`
      UPDATE utilizadores SET area_id = 1 WHERE area_id IS NULL;
    `);

        // Alterar a coluna para n�o permitir nulo
        await queryInterface.changeColumn('utilizadores', 'area_id', {
            type: Sequelize.INTEGER,
            allowNull: false,
            references: {
                model: 'areas',
                key: 'id'
            }
        });
    },

    down: async (queryInterface, Sequelize) => {
        // Remover a coluna area_id
        await queryInterface.removeColumn('utilizadores', 'area_id');
    }
};
