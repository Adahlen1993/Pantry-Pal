const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

router.get("/", rejectUnauthenticated, (req, res) => {
  let queryText = `SELECT * FROM recipe_type;
`;
  pool
    .query(queryText)
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

// For future feature

// router.post('/', rejectUnauthenticated, async (req, res) => {

//     try {
//         const result = await pool.query(`INSERT INTO "recipes_type" ("name", "user_id") VALUES ($1, $2) RETURNING *;`, [req.body.name, req.user.id]);
//         res.send(result.rows[0]);
//     } catch (err) {
//         console.error(err);
//         res.sendStatus(500);
//     }

// });

module.exports = router;
