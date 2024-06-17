-- Inserting the recipe type (assuming it doesn't exist yet)
INSERT INTO "recipe_type" ("name") VALUES ('Italian') ON CONFLICT ("name") DO NOTHING;
-- Retrieve the ID for the recipe type
SELECT id INTO recipe_type_id FROM "recipe_type" WHERE "name" = 'Italian';

-- Inserting the recipe
INSERT INTO "recipes" ("recipe_type", "recipe_name", "description", "instructions", "favorite", "likes", "user_id")
VALUES (recipe_type_id, 'Saltimbocca di Pollo alla Romana', 'Prosciutto-Stuffed Chicken Breast Roulades', 
'Place chicken breasts onto a sheet of parchment paper. Place a prosciutto slice and a sage leaf onto each breast. Roll chicken from the short end over prosciutto and secure with wooden skewers. Melt butter in a skillet over medium-high heat. Add rolled chicken and cook until well browned, 2 to 3 minutes per side. Add wine, salt, and pepper; cook until chicken is no longer pink in the center, 8 to 10 minutes. An instant-read thermometer inserted into the center should read at least 165 degrees F (74 degrees C). Let rest for 5 minutes before serving.', 
false, 0, 1)
RETURNING id INTO recipe_id;

-- Inserting ingredients (assuming they don't exist yet)
INSERT INTO "ingredients" ("name", "measurement") VALUES 
('Chicken Breast', 'count') ON CONFLICT ("name") DO NOTHING;
INSERT INTO "ingredients" ("name", "measurement") VALUES 
('Prosciutto', 'slice') ON CONFLICT ("name") DO NOTHING;
INSERT INTO "ingredients" ("name", "measurement") VALUES 
('Sage Leaves', 'count') ON CONFLICT ("name") DO NOTHING;
INSERT INTO "ingredients" ("name", "measurement") VALUES 
('Butter', 'tablespoon') ON CONFLICT ("name") DO NOTHING;
INSERT INTO "ingredients" ("name", "measurement") VALUES 
('Dry White Wine', 'fluid ounce') ON CONFLICT ("name") DO NOTHING;
INSERT INTO "ingredients" ("name", "measurement") VALUES 
('Salt', 'pinch') ON CONFLICT ("name") DO NOTHING;
INSERT INTO "ingredients" ("name", "measurement") VALUES 
('Black Pepper', 'to taste') ON CONFLICT ("name") DO NOTHING;

-- Retrieve the IDs for the ingredients
SELECT id INTO chicken_breast_id FROM "ingredients" WHERE "name" = 'Chicken Breast';
SELECT id INTO prosciutto_id FROM "ingredients" WHERE "name" = 'Prosciutto';
SELECT id INTO sage_leaves_id FROM "ingredients" WHERE "name" = 'Sage Leaves';
SELECT id INTO butter_id FROM "ingredients" WHERE "name" = 'Butter';
SELECT id INTO white_wine_id FROM "ingredients" WHERE "name" = 'Dry White Wine';
SELECT id INTO salt_id FROM "ingredients" WHERE "name" = 'Salt';
SELECT id INTO black_pepper_id FROM "ingredients" WHERE "name" = 'Black Pepper';

-- Inserting into recipes_ingredients
INSERT INTO "recipes_ingredients" ("recipe_id", "ingredients_id") VALUES 
(recipe_id, chicken_breast_id), 
(recipe_id, prosciutto_id), 
(recipe_id, sage_leaves_id), 
(recipe_id, butter_id), 
(recipe_id, white_wine_id), 
(recipe_id, salt_id), 
(recipe_id, black_pepper_id);
