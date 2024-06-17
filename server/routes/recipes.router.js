const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// This route *should* return the logged in users pets
router.get('/', rejectUnauthenticated, (req, res) => {
    console.log('/pet GET route');
    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);
    let queryText = `SELECT r.id, r.recipe_name, r.description, r.instructions, r.favorite, r.likes
FROM recipes r
JOIN recipes_ingredients ri ON r.id = ri.recipe_id
JOIN ingredients i ON ri.ingredients_id = i.id
JOIN user_ingredients ui ON i.id = ui.ingredients_id
WHERE ui.user_id = $1
GROUP BY r.id
HAVING COUNT(DISTINCT ri.ingredients_id) = (SELECT COUNT(*) FROM recipes_ingredients WHERE recipe_id = r.id)
`;
    pool.query(queryText, [req.user.id] ).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
});

// This route *should* add a pet for the logged in user
router.post('/', rejectUnauthenticated, async (req, res) => {
    console.log('/pet POST route');
    console.log(req.body);
    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);

    try {
        const result = await pool.query(`INSERT INTO "pets" ("name", "user_id") VALUES ($1, $2) RETURNING *;`, [req.body.name, req.user.id]);
        res.send(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.sendStatus(500);
    }
    
});



module.exports = router;