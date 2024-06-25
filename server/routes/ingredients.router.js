const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');
const { rejectUnauthenticated } = require('../modules/authentication-middleware');

// This route *should* return the logged in users pets
router.get('/', (req, res) => {
    console.log('/ingredients GET route');
    console.log('is authenticated?', req.isAuthenticated());
    console.log('user', req.user);
    {
        let queryText = `SELECT * FROM "ingredients";`;
    pool.query(queryText).then((result) => {
        res.send(result.rows);
    }).catch((error) => {
        console.log(error);
        res.sendStatus(500);
    });
    } 
});

// router.put('/search', rejectUnauthenticated, async (req, res) => {
//     console.log('user',req.body.id);
  
//     try{
//       const result = await pool.query(
//         `SELECT * FROM ingredients WHERE id = $1`, [ req.body.id]
//       );
//       res.send(result.rows);
//     } catch (err) {
//       console.error(err);
//       res.sendStatus(500);
//     }
//     // endpoint functionality
//   });

router.put('/', rejectUnauthenticated, async (req, res) => {
    console.log('user',req.user);
  
    try{
      const result = await pool.query(
        `UPDATE "ingredients"
        SET "name" = $1, user_id = $2
        WHERE ingredients.id = $3`, [req.body.name, req.body.user_id, req.body.id]
      );
      res.send(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.sendStatus(500);
    }
    // endpoint functionality
  });
// This route *should* add a pet for the logged in user
router.post('/', rejectUnauthenticated, async (req, res) => {
    console.log('/pet POST route');
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