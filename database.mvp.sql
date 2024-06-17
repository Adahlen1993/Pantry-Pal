SELECT r.id, r.recipe_name, r.description, r.instructions, r.favorite, r.likes
FROM recipes r
JOIN recipes_ingredients ri ON r.id = ri.recipe_id
JOIN ingredients i ON ri.ingredients_id = i.id
JOIN user_ingredients ui ON i.id = ui.ingredients_id
WHERE ui.user_id = $1
GROUP BY r.id
HAVING COUNT(DISTINCT ri.ingredients_id) = (SELECT COUNT(*) FROM recipes_ingredients WHERE recipe_id = r.id)

The Goal
We need to find recipes where the user has all the required ingredients.

The Query Breakdown
sql
Copy code
SELECT r.id, r.recipe_name, r.description, r.instructions, r.favorite, r.likes
FROM recipes r
JOIN recipes_ingredients ri ON r.id = ri.recipe_id
JOIN ingredients i ON ri.ingredients_id = i.id
JOIN user_ingredients ui ON i.id = ui.ingredients_id
WHERE ui.user_id = $1
GROUP BY r.id
HAVING COUNT(DISTINCT ri.ingredients_id) = (SELECT COUNT(*) FROM recipes_ingredients WHERE recipe_id = r.id);
Step-by-Step Explanation
Selecting Columns:

sql
Copy code
SELECT r.id, r.recipe_name, r.description, r.instructions, r.favorite, r.likes
This line selects the columns we want to see in our result: recipe ID, name, description, instructions, whether it's a favorite, and the number of likes.
EXPLANATION
From the Recipes Table:

sql
Copy code
FROM recipes r
We start with the recipes table and give it the alias r.

Joining with Recipes_Ingredients Table:

sql
Copy code
JOIN recipes_ingredients ri ON r.id = ri.recipe_id
We join recipes_ingredients with recipes to link recipes to their required ingredients. r.id = ri.recipe_id ensures we only get ingredients for each specific recipe.

Joining with Ingredients Table:

sql
Copy code
JOIN ingredients i ON ri.ingredients_id = i.id
We join ingredients with recipes_ingredients to get detailed information about each ingredient.

Joining with User_Ingredients Table:

sql
Copy code
JOIN user_ingredients ui ON i.id = ui.ingredients_id
We join user_ingredients with ingredients to find out which ingredients the user has.

Filtering by User ID:

sql
Copy code
WHERE ui.user_id = $1
We filter the results to only include ingredients that the specific user (represented by $1, a placeholder for user ID) has.

Grouping by Recipe ID:

sql
Copy code
GROUP BY r.id
We group the results by recipe ID so we can count the ingredients per recipe.

Ensuring the User Has All Ingredients:

sql
Copy code
HAVING COUNT(DISTINCT ri.ingredients_id) = (SELECT COUNT(*) FROM recipes_ingredients WHERE recipe_id = r.id);
COUNT(DISTINCT ri.ingredients_id): Counts the number of different ingredients the user has for each recipe.
(SELECT COUNT(*) FROM recipes_ingredients WHERE recipe_id = r.id): Subquery that counts the total number of ingredients required by the recipe.
HAVING COUNT(DISTINCT ri.ingredients_id) = (SELECT COUNT(*) FROM recipes_ingredients WHERE recipe_id = r.id): Ensures that the number of ingredients the user has matches the total number of ingredients required by the recipe. In other words, the user has all the necessary ingredients to make the recipe.
Summary
The query links the recipes with their ingredients.
It then checks which ingredients the user has.
It groups the results by recipe.
Finally, it filters the recipes to only include those where the user has all the required ingredients.