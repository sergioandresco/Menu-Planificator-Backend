// src/models/recipeModel.js
const pool = require('../db/db');

const Recipe = {
    create: async (name_recipe, ingredients) => {
        const result = await pool.query(
            'INSERT INTO recipes (name_recipe, ingredients, create_date) VALUES ($1, $2, CURRENT_TIMESTAMP) RETURNING *',
            [name_recipe, ingredients]
        );
        return result.rows[0];
    },

};

module.exports = Recipe;
