const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const PORT = process.env.PORT || 5001;
const bodyParser = require('body-parser');


// Middleware Includes
const sessionMiddleware = require('./modules/session-middleware');
const passport = require('./strategies/user.strategy');

// Route Includes
const userRouter = require('./routes/user.router');
const ingredientsRouter = require('./routes/ingredients.router');
const recipesRouter = require('./routes/recipes.router');
const recipePageRouter = require('./routes/recipe.page.router');
const userIngredientsRouter = require('./routes/user.ingredients.router');
const allUserRouter = require('./routes/all.user.router');
const spoonacularRouter = require('./routes/spoonacular.router');
const recipeTypeRouter = require('./routes/recipe.type.router')



// Express Middleware
app.use(express.json());
app.use(express.static('build'));
app.use(bodyParser.json());
app.use(cors());


// Passport Session Configuration
app.use(sessionMiddleware);

// Start Passport Sessions
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/api/user', userRouter);
app.use('/api/ingredients', ingredientsRouter);
app.use('/api/recipes', recipesRouter);
app.use('/api/user/ingredients', userIngredientsRouter);
app.use('/api/user/all', allUserRouter);
app.use('/api/recipe', recipePageRouter);
app.use('/api/sprecipe', spoonacularRouter);
app.use('/api/recipetype', recipeTypeRouter);


// Listen Server & Port
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
