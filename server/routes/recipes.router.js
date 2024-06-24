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

router.put('/', rejectUnauthenticated, async (req, res) => {
    console.log('user',req.user);
  
    try{
      const result = await pool.query(
        `UPDATE "recipes"
        SET "recipe_name" = $1, "recipe_type" = $2, description = $3, instructions = $4, likes = $5, image = $6, user_id = $7, preptime = $8, waittime = $9, cooktime = $10, recipe_ingredients_list = $11
        WHERE "recipes".id = $12`, [req.body.recipe_name, req.body.recipe_type, req.body.description, req.body.instructions, req.body.likes, req.body.image, req.body.user_id, req.body.preptime, req.body.waittime, req.body.cooktime, req.body.recipe_ingredients_list, req.body.id]
      );
      res.send(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
    // endpoint functionality
  });

router.get('/all', rejectUnauthenticated, (req, res) => {
    console.log('/pet GET route');
    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);
    let queryText = `SELECT * FROM recipes ORDER BY recipe_name;
`;
    pool.query(queryText ).then((result) => {
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