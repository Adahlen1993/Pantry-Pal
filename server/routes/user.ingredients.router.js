const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// This route *should* return the logged in users pets
router.get('/', (req, res) => {
    console.log('/ user-ingredients GET route');
    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);
    {
        let queryText = `SELECT user_ingredients.id AS user_ing_id, ingredients.name, ingredients.id
FROM ingredients
JOIN user_ingredients ON ingredients.id = user_ingredients.ingredients_id
JOIN "user" ON "user".id = user_ingredients.user_id
WHERE "user".id = $1`;
    pool.query(queryText, [req.user.id]).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
    } 
});

// This route *should* add a pet for the logged in user
router.post('/', rejectUnauthenticated, async (req, res) => {
    console.log('/user ingredients DELETE route');
    console.log(req.body);
    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);

    try {
        const result = await pool.query(`INSERT INTO "user_ingredients" ("ingredients_id", "user_id") VALUES ($1, $2) RETURNING *;`, [req.body.id, req.user.id]);
        res.send(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
    
});

module.exports = router;