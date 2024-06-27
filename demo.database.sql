-- Inserting users
INSERT INTO "user" (username, password, admin, default_pantry) VALUES 
('user1', 'password1', false, true),
('user2', 'password2', false, false),
('admin', 'adminpassword', true, false);

-- Inserting ingredients
INSERT INTO "ingredients" (name, user_id) VALUES 
('Tomato', 1),
('Cheese', 1),
('Basil', 1),
('Chicken', 2),
('Olive Oil', 2),
('Garlic', 2);

-- Inserting recipe types
INSERT INTO "recipe_type" (name) VALUES 
('Italian'),
('Mexican'),
('Chinese');

-- Inserting recipes
INSERT INTO "recipes" (temp_id, recipe_type, recipe_name, description, instructions, favorite, likes, user_id, image, source, preptime, waittime, cooktime, servings, comments, calories, fat, satfat, carbs, fiber, sugar, protein, recipe_ingredients_list) VALUES 
('temp1', 1, 'Tomato Basil Pizza', 'A delicious homemade pizza with fresh tomato and basil.', '1. Preheat oven...\n2. Spread sauce...\n3. Add toppings...\n4. Bake.', false, 10, 1, 'image_url', 'Source A', 15, 0, 20, 4, 'Great recipe!', 300, 10, 5, 40, 5, 5, 10, 'Tomato, Cheese, Basil'),
('temp2', 2, 'Chicken Tacos', 'Spicy and flavorful chicken tacos.', '1. Cook chicken...\n2. Warm tortillas...\n3. Add toppings...', true, 25, 2, 'image_url', 'Source B', 10, 0, 15, 6, 'Family favorite!', 450, 20, 8, 35, 6, 3, 25, 'Chicken, Olive Oil, Garlic');

-- Inserting user ingredients
INSERT INTO "user_ingredients" (user_id, ingredients_id, amount) VALUES 
(1, 1, '2 pieces'),
(1, 2, '200 grams'),
(1, 3, '10 leaves'),
(2, 4, '1 piece'),
(2, 5, '50 ml'),
(2, 6, '3 cloves');

-- Inserting favorites
INSERT INTO "Favorites" (user_id, recipe_id, favorite) VALUES 
(1, 1, true),
(2, 2, true);

-- Inserting recipes ingredients
INSERT INTO "recipes_ingredients" (recipe_id, ingredients_id) VALUES 
(1, 1),
(1, 2),
(1, 3),
(2, 4),
(2, 5),
(2, 6);
-- Additional ingredients
INSERT INTO "ingredients" (name, user_id) VALUES 
('Pepper', 1),
('Onion', 1),
('Beef', 2),
('Cilantro', 2),
('Rice', 2),
('Soy Sauce', 2),
('Carrot', 2),
('Pepperoni', 1),
('Mozzarella', 1);

-- Additional recipes
INSERT INTO "recipes" (temp_id, recipe_type, recipe_name, description, instructions, favorite, likes, user_id, image, source, preptime, waittime, cooktime, servings, comments, calories, fat, satfat, carbs, fiber, sugar, protein, recipe_ingredients_list) VALUES 
('temp3', 3, 'Beef Stir Fry', 'A quick and tasty beef stir fry.', '1. Marinate beef...\n2. Stir fry vegetables...\n3. Add beef...', true, 15, 2, 'image_url', 'Source C', 20, 0, 15, 4, 'Easy and quick!', 350, 15, 5, 25, 4, 3, 30, 'Beef, Carrot, Soy Sauce, Rice'),
('temp4', 1, 'Pepperoni Pizza', 'Classic pepperoni pizza with mozzarella cheese.', '1. Preheat oven...\n2. Spread sauce...\n3. Add pepperoni and cheese...\n4. Bake.', false, 30, 1, 'image_url', 'Source D', 15, 0, 20, 4, 'Kids love it!', 400, 18, 7, 35, 3, 4, 20, 'Pepperoni, Mozzarella, Tomato'),
('temp5', 2, 'Chicken Enchiladas', 'Spicy chicken enchiladas with cheese.', '1. Cook chicken...\n2. Prepare tortillas...\n3. Add sauce and cheese...', true, 20, 2, 'image_url', 'Source E', 25, 0, 30, 6, 'So flavorful!', 500, 25, 10, 40, 5, 6, 35, 'Chicken, Cheese, Onion'),
('temp6', 3, 'Fried Rice', 'Delicious fried rice with mixed vegetables.', '1. Cook rice...\n2. Stir fry vegetables...\n3. Mix with rice...', false, 10, 2, 'image_url', 'Source F', 15, 0, 10, 4, 'Perfect side dish!', 300, 8, 2, 45, 5, 2, 8, 'Rice, Carrot, Soy Sauce, Onion'),
('temp7', 1, 'Caprese Salad', 'Simple and fresh Caprese salad.', '1. Slice tomatoes and mozzarella...\n2. Arrange on plate...\n3. Add basil and drizzle with olive oil...', true, 5, 1, 'image_url', 'Source G', 10, 0, 0, 2, 'Great appetizer!', 250, 20, 10, 10, 2, 5, 5, 'Tomato, Mozzarella, Basil, Olive Oil'),
('temp8', 2, 'Guacamole', 'Creamy guacamole with a hint of spice.', '1. Mash avocados...\n2. Add lime juice...\n3. Mix in onions, cilantro, and tomatoes...', false, 18, 2, 'image_url', 'Source H', 10, 0, 0, 4, 'Perfect for dipping!', 150, 12, 2, 8, 4, 1, 2, 'Avocado, Onion, Cilantro'),
('temp9', 3, 'Sweet and Sour Chicken', 'Tangy sweet and sour chicken.', '1. Cook chicken...\n2. Prepare sauce...\n3. Mix together...', true, 12, 2, 'image_url', 'Source I', 20, 0, 15, 4, 'Kids favorite!', 400, 15, 5, 50, 3, 20, 25, 'Chicken, Pineapple, Bell Pepper, Soy Sauce'),
('temp10', 1, 'Spaghetti Carbonara', 'Creamy spaghetti carbonara.', '1. Cook pasta...\n2. Prepare sauce...\n3. Mix pasta with sauce...', false, 40, 3, 'image_url', 'Source J', 15, 0, 20, 4, 'Rich and delicious!', 600, 30, 12, 60, 5, 3, 20, 'Spaghetti, Egg, Bacon, Cheese');

-- Additional recipes ingredients
INSERT INTO "recipes_ingredients" (recipe_id, ingredients_id) VALUES 
(3, 7), -- Beef
(3, 11), -- Carrot
(3, 12), -- Soy Sauce
(3, 10), -- Rice
(4, 13), -- Pepperoni
(4, 14), -- Mozzarella
(4, 1), -- Tomato
(5, 4), -- Chicken
(5, 2), -- Cheese
(5, 8), -- Onion
(6, 10), -- Rice
(6, 11), -- Carrot
(6, 12), -- Soy Sauce
(6, 8), -- Onion
(7, 1), -- Tomato
(7, 14), -- Mozzarella
(7, 3), -- Basil
(7, 5), -- Olive Oil
(8, 8), -- Onion
(8, 9), -- Cilantro
(9, 4), -- Chicken
(9, 13), -- Pepperoni
(9, 12), -- Soy Sauce
(10, 15), -- Spaghetti
(10, 16), -- Egg
(10, 17), -- Bacon
(10, 2); -- Cheese
