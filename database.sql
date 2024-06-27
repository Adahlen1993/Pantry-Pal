CREATE TABLE IF NOT EXISTS "user" (
    "id" bigint GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
    "username" text NOT NULL,
    "password" text NOT NULL,
    "admin" boolean NOT NULL DEFAULT false,
    "default_pantry" boolean NOT NULL DEFAULT false,
    PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "ingredients" (
    "id" bigint GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
    "name" text NOT NULL,
    "user_id" bigint DEFAULT NULL,
    PRIMARY KEY ("id"),
    FOREIGN KEY ("user_id") REFERENCES "user"("id")
);

CREATE TABLE IF NOT EXISTS "recipe_type" (
    "id" bigint GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
    "name" text NOT NULL,
    PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "recipes" (
    "id" bigint GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
    "temp_id" text DEFAULT NUll,
    "recipe_type" bigint DEFAULT NULL,
    "recipe_name" text NOT NULL,
    "description" text NOT NULL,
    "instructions" text NOT NULL,
    "favorite" boolean NOT NULL DEFAULT false,
    "likes" bigint NOT NULL DEFAULT 0,
    "user_id" bigint DEFAULT NULL,
    "image" text DEFAULT NULL,
    "source" text DEFAULT NULL,
    "preptime" int DEFAULT 0,
    "waittime" int DEFAULT 0,
    "cooktime" int DEFAULT 0,
    "servings" int DEFAULT 0,
    "comments" text DEFAULT NULL,
    "calories" int DEFAULT 0,
    "fat" int DEFAULT 0,
    "satfat" int DEFAULT 0,
    "carbs" int DEFAULT 0,
    "fiber" int DEFAULT 0,
    "sugar" int DEFAULT 0,
    "protein" int DEFAULT 0,
    "recipe_ingredients_list" text NOT NULL,
    PRIMARY KEY ("id"),
    FOREIGN KEY ("recipe_type") REFERENCES "recipe_type"("id"),
    FOREIGN KEY ("user_id") REFERENCES "user"("id")
);


CREATE TABLE IF NOT EXISTS "user_ingredients" (
    "id" bigint GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
    "user_id" bigint NOT NULL,
    "ingredients_id" bigint NOT NULL,
    "amount" text DEFAULT NULL,
    PRIMARY KEY ("id"),
    FOREIGN KEY ("user_id") REFERENCES "user"("id"),
    FOREIGN KEY ("ingredients_id") REFERENCES "ingredients"("id"),
    CONSTRAINT user_ingredient_unique UNIQUE ("user_id", "ingredients_id")
);



CREATE TABLE IF NOT EXISTS "Favorites" (
    "id" bigint GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
    "user_id" bigint NOT NULL,
    "recipe_id" bigint NOT NULL,
    "favorite" boolean DEFAULT NULL,
    PRIMARY KEY ("id"),
    FOREIGN KEY ("user_id") REFERENCES "user"("id"),
    FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id")
);

CREATE TABLE IF NOT EXISTS "recipes_ingredients" (
    "id" bigint GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
    "recipe_id" bigint NOT NULL,
    "ingredients_id" bigint NOT NULL,
    PRIMARY KEY ("id"),
    FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id"),
    FOREIGN KEY ("ingredients_id") REFERENCES "ingredients"("id")
);

