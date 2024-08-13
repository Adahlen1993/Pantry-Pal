const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/spoonacular', async (req, res) => {  // POST request from frontend
    const { ingredients } = req.body;  // Extract ingredients from the request body
    const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;

    try {
        const response = await axios.get(`https://api.spoonacular.com/recipes/findByIngredients`, {  // GET request to Spoonacular API
            params: {
                apiKey: SPOONACULAR_API_KEY,
                ingredients: ingredients.join(','),  // Join the ingredients array into a comma-separated string
                number: 1  // Adjust this number as needed
            }
        });
        res.json(response.data);  // Send the recipe data back to the frontend
    } catch (error) {
        console.error(`Error fetching recipes from Spoonacular:`, error);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
