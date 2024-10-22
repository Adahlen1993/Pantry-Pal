const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

router.get("/", (req, res) => {
  {
    let queryText = `SELECT * FROM "user";`;
    pool
      .query(queryText)
      .then((result) => {
        res.send(result.rows);
      })
      .catch((error) => {
        console.log(error);
        res.sendStatus(500);
      });
  }
});

router.post("/", rejectUnauthenticated, async (req, res) => {
  try {
    const result = await pool.query(
      `INSERT INTO "user_ingredients" ("ingredients_id", "user_id") VALUES ($1, $2) RETURNING *;`,
      [req.body.id, req.user.id]
    );
    res.send(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});
router.put("/", rejectUnauthenticated, async (req, res) => {
  try {
    const result = await pool.query(
      `UPDATE "user"
        SET "username" = $1, "admin" = $2
        WHERE "user".id = $3`,
      [req.body.username, req.body.admin, req.body.id]
    );
    res.send(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.delete("/", rejectUnauthenticated, async (req, res) => {
  try {
    const result = await pool.query(
      `DELETE FROM user_ingredients ui
WHERE ui.ingredients_id = $1 AND ui.user_id = $2 RETURNING *;`,
      [req.body.ingredients_id, req.user.id]
    );
    res.send(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;
