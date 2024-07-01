const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

router.get("/", (req, res) => {
  {
    let queryText = `SELECT user_ingredients.id, ingredients.name, ingredients.id AS user_ing_id
FROM ingredients
JOIN user_ingredients ON ingredients.id = user_ingredients.ingredients_id
JOIN "user" ON "user".id = user_ingredients.user_id
WHERE "user".id = $1`;
    pool
      .query(queryText, [req.user.id])
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

router.post("/default", async (req, res) => {
  const userId = req.body.user_id;
  const ingredientIds = req.body.ingredient_id; // Array of ingredient IDs
  console.log("ingredient array", req.body);
  if (!userId || !Array.isArray(ingredientIds) || ingredientIds.length === 0) {
    return res.status(400).send("Invalid input");
  }

  try {
    const client = await pool.connect();

    const insertPromises = ingredientIds.map((ingredientId) => {
      return client.query(
        'INSERT INTO "user_ingredients" ("user_id", "ingredients_id") VALUES ($1, $2) ON CONFLICT ("user_id", "ingredients_id") DO NOTHING',
        [userId, ingredientId]
      );
    });

    await Promise.all(insertPromises);
    client.release();

    res.status(200).send("Ingredients inserted successfully");
  } catch (error) {
    console.error("Error inserting ingredients", error);
    res.status(500).send("Internal server error");
  }
});

router.delete("/default", async (req, res) => {
  const userId = req.body.user_id;
  const ingredientIds = req.body.ingredient_ids; // Array of ingredient IDs

  if (!userId || !Array.isArray(ingredientIds) || ingredientIds.length === 0) {
    return res.status(400).send("Invalid input");
  }

  try {
    const client = await pool.connect();

    const deletePromises = ingredientIds.map((ingredientId) => {
      return client.query(
        'DELETE FROM "user_ingredients" WHERE "user_id" = $1 AND "ingredients_id" = $2',
        [userId, ingredientId]
      );
    });

    await Promise.all(deletePromises);
    client.release();

    res.status(200).send("Ingredients deleted successfully");
  } catch (error) {
    console.error("Error deleting ingredients", error);
    res.status(500).send("Internal server error");
  }
});

router.delete("/", rejectUnauthenticated, async (req, res) => {
  console.log("/user ingredients DELETE route");
  console.log("useringredient delete", req.body.ingredients_id);
  console.log("is authenticated?", req.isAuthenticated());
  console.log("user", req.user);

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
