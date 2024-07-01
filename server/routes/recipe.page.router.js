const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

router.get("/:id", rejectUnauthenticated, (req, res) => {
  let queryText = `SELECT * FROM recipes 
WHERE id = $1;`;
  pool
    .query(queryText, [req.params.id])
    .then((result) => {
      console.log("recipe page", result.rows[0]);
      res.send(result.rows[0]);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

module.exports = router;
