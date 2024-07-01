const express = require("express");
const router = express.Router();
const axios = require("axios");

// For future feature

// router.get('/', (req, res) => {
//    // send all gifs back to the client
//    const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY; // from .env file
//    axios.get(`https://api.spoonacular.com/recipes/findByIngredients?apiKey=${SPOONACULAR_API_KEY}&ingredients=apples,+flour,+sugar&number=1`).then(response => {
//       // console.log(response.data.data);
//       res.send(response.data.data);
//    })
// })
// module.exports = router;
