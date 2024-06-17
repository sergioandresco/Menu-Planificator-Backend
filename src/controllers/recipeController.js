// src/controllers/recipeController.js
const Recipe = require('../models/recipeModel');

exports.createRecipe = async (req, res) => {
    const { name_recipe, ingredients } = req.body;

    if (!name_recipe || !ingredients) {
        return res.status(400).json({ error: 'Name and ingredients are obligatory' });
    }

    try {
        const recipe = await Recipe.create(name_recipe, ingredients);
        res.status(201).json(recipe);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error creating the recipe' });
    }
};
