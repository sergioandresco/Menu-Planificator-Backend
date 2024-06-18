const Recipe = require('../models/recipeModel');
const pool = require('../db/db');

exports.createRecipe = async (req, res) => {
    const { name_recipe, ingredients, user_id } = req.body;

    if (!name_recipe || !ingredients || !user_id) {
        return res.status(400).json({ error: 'Name, ingredients, and user_id are obligatory' });
    }

    try {
        // Verificar si el user_id existe en la tabla users
        const userExists = await pool.query('SELECT 1 FROM users WHERE user_id = $1', [user_id]);

        if (userExists.rows.length === 0) {
            return res.status(404).json({ error: 'User with provided user_id does not exist' });
        }

        // Crear la receta
        const recipe = await Recipe.create(name_recipe, ingredients, user_id);
        res.status(201).json(recipe);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating the recipe' });
    }

};