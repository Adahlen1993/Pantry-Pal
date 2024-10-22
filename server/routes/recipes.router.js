const express = require("express");
const router = express.Router();
const pool = require("../modules/pool");
const {
  rejectUnauthenticated,
} = require("../modules/authentication-middleware");

router.get("/", rejectUnauthenticated, (req, res) => {
  let queryText = `SELECT 
    r.id, 
    r.recipe_name, 
    r.description, 
    r.instructions, 
    r.favorite, 
    r.likes,
    r.image -- Add the image field here
FROM recipes r
JOIN recipes_ingredients ri ON r.id = ri.recipe_id
JOIN ingredients i ON ri.ingredients_id = i.id
JOIN user_ingredients ui ON i.id = ui.ingredients_id
WHERE ui.user_id = $1
GROUP BY r.id
HAVING COUNT(DISTINCT ri.ingredients_id) = (SELECT COUNT(*) FROM recipes_ingredients WHERE recipe_id = r.id);

`;
  pool
    .query(queryText, [req.user.id])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

router.put("/all", rejectUnauthenticated, async (req, res) => {
  console.log("user", req.user);

  try {
    const result = await pool.query(
      `UPDATE "recipes"
        SET "recipe_name" = $1, "recipe_type" = $2, description = $3, instructions = $4, likes = $5, image = $6, user_id = $7, preptime = $8, waittime = $9, cooktime = $10, recipe_ingredients_list = $11
        WHERE "recipes".id = $12`,
      [
        req.body.recipe_name,
        req.body.recipe_type,
        req.body.description,
        req.body.instructions,
        req.body.likes,
        req.body.image,
        req.body.user_id,
        req.body.preptime,
        req.body.waittime,
        req.body.cooktime,
        req.body.recipe_ingredients_list,
        req.body.id,
      ]
    );
    res.send(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

router.get("/filtered", rejectUnauthenticated, (req, res) => {
  const userId = req.query.userId;
  const recipeType = req.query.recipeType;

  let queryText = `
        SELECT r.id, r.recipe_name, r.description, r.instructions, r.favorite, r.likes
        FROM recipes r
        JOIN recipes_ingredients ri ON r.id = ri.recipe_id
        JOIN ingredients i ON ri.ingredients_id = i.id
        JOIN user_ingredients ui ON i.id = ui.ingredients_id
        WHERE ui.user_id = $1
        AND r.recipe_type = $2
        GROUP BY r.id
        HAVING COUNT(DISTINCT ri.ingredients_id) = (
            SELECT COUNT(*) FROM recipes_ingredients WHERE recipe_id = r.id
        );
    `;
  pool
    .query(queryText, [userId, recipeType])
    .then((result) => {
      res.send(result.rows);
    })
    .catch((error) => {
      console.log(error);
      res.sendStatus(500);
    });
});

router.get("/all", rejectUnauthenticated, (req, res) => {
  let queryText = `SELECT * FROM recipes ORDER BY recipe_name;
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

router.post("/all", rejectUnauthenticated, async (req, res) => {
  const {
    recipe_name,
    recipe_type,
    description,
    instructions,
    likes,
    preptime,
    cooktime,
    waittime,
    user_id,
    image,
    recipe_ingredients_list,
  } = req.body;

  try {
    const result = await pool.query(
      `INSERT INTO "recipes" (
                "recipe_name",
                "recipe_type",
                "description",
                "instructions",
                "likes",
                "preptime",
                "cooktime",
                "waittime",
                "user_id",
                "image",
                "recipe_ingredients_list"
            ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
            RETURNING *;`,
      [
        recipe_name,
        recipe_type,
        description,
        instructions,
        likes,
        preptime,
        cooktime,
        waittime,
        req.user.id,
        image,
        recipe_ingredients_list,
      ]
    );
    res.send(result.rows[0]);
  } catch (err) {
    console.error(err);
    res.sendStatus(500);
  }
});

module.exports = router;
