
-- USER is a reserved keyword with Postgres
-- You must use double quotes in every query that user is in:
-- ex. SELECT * FROM "user";
-- Otherwise you will have errors!
CREATE TABLE IF NOT EXISTS "ingredients" (
	"id" bigint GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
	"name" text NOT NULL,
	"measurement" text,
	"user_id" bigint,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "user" (
	"id" bigint GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
	"username" text NOT NULL,
	"password" text NOT NULL,
	"admin" boolean NOT NULL DEFAULT false,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "user_ingredients" (
	"id" bigint GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
	"user_id" bigint NOT NULL,
	"ingredients_id" bigint NOT NULL,
	"amount" text NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "recipes" (
	"id" bigint GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
	"recipe_type" bigint NOT NULL,
	"recipe_name" text NOT NULL,
	"description" text NOT NULL,
	"instructions" text NOT NULL,
	"favorite" boolean NOT NULL DEFAULT false,
	"likes" bigint NOT NULL,
	"user_id" bigint,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "recipe_type" (
	"id" bigint GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
	"name" text NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "Favorites" (
	"id" bigint GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
	"user_id" bigint NOT NULL,
	"recipe_id" bigint NOT NULL,
	"favorite" boolean NOT NULL,
	PRIMARY KEY ("id")
);

CREATE TABLE IF NOT EXISTS "recipes_ingredients" (
	"id" bigint GENERATED ALWAYS AS IDENTITY NOT NULL UNIQUE,
	"recipe_id" bigint NOT NULL,
	"ingredients_id" bigint NOT NULL,
	PRIMARY KEY ("id")
);

ALTER TABLE "ingredients" ADD CONSTRAINT "ingredients_fk3" FOREIGN KEY ("user_id") REFERENCES "user"("id");

ALTER TABLE "user_ingredients" ADD CONSTRAINT "user_ingredients_fk1" FOREIGN KEY ("user_id") REFERENCES "user"("id");

ALTER TABLE "user_ingredients" ADD CONSTRAINT "user_ingredients_fk2" FOREIGN KEY ("ingredients_id") REFERENCES "ingredients"("id");
ALTER TABLE "recipes" ADD CONSTRAINT "recipes_fk1" FOREIGN KEY ("recipe_type") REFERENCES "recipe_type"("id");

ALTER TABLE "Favorites" ADD CONSTRAINT "Favorites_fk1" FOREIGN KEY ("user_id") REFERENCES "user"("id");

ALTER TABLE "Favorites" ADD CONSTRAINT "Favorites_fk2" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id");
ALTER TABLE "recipes_ingredients" ADD CONSTRAINT "recipes_ingredients_fk1" FOREIGN KEY ("recipe_id") REFERENCES "recipes"("id");

ALTER TABLE "recipes_ingredients" ADD CONSTRAINT "recipes_ingredients_fk2" FOREIGN KEY ("ingredients_id") REFERENCES "ingredients"("id");
