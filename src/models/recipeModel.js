const pool = require('../db/db');

const Recipe = {
    create: async (name_recipe, ingredients, userId) => {
        const result = await pool.query(
            'INSERT INTO recipe (name_recipe, ingredients, create_date, user_id) VALUES ($1, $2, CURRENT_TIMESTAMP, $3) RETURNING *',
            [name_recipe, ingredients, userId]
        );
        return result.rows[0];
    },

};

module.exports = Recipe;
