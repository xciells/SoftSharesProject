// controllers/areasController.js
const jwt = require('jsonwebtoken'); 
const db = require('../models');
const Areas = db.areas;

const areasController = {
    getAllAreas: async (req, res) => {
        try {
            const areas = await Areas.findAll();
            res.status(200).json(areas);
        } catch (error) {
            console.error('Erro ao buscar áreas:', error);
            res.status(500).json({ error: 'Erro ao buscar áreas' });
        }
    },

    createArea: async (req, res) => {
        const { nome } = req.body;
        try {
            const newArea = await Areas.create({ nome });
            res.status(201).json(newArea);
        } catch (error) {
            console.error('Erro ao criar área:', error);
            res.status(500).json({ error: 'Erro ao criar área' });
        }
    }
};

module.exports = areasController;