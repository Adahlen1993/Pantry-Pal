import React, { useEffect } from 'react';
import { Redirect, Route, HashRouter as Router, Switch } from 'react-router-dom';
import 'semantic-ui-css/semantic.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useDispatch, useSelector } from 'react-redux';
import Nav from '../Nav/Nav';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import LoginPage from '../LoginPage/LoginPage';
import RegisterPage from '../RegisterPage/RegisterPage';
import MyPantryPage from '../MyPantry/MyPantryPage';
import Admin from '../Admin/Admin';
import Recipes from '../Recipes/Recipes';
import RecipePage from '../Recipes/RecipePage/RecipePage';
import DefaultPantryToolTip from '../MyPantry/MyPantrySwitch/DefaultPantryToolTip';
import './App.css';

function App() {
  const dispatch = useDispatch();
  const user = useSelector((store) => store.user);

  useEffect(() => {
    dispatch({ type: 'FETCH_USER' });
  }, [dispatch]);

  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Redirect exact from="/" to="/home" />

          <ProtectedRoute exact path="/mypantry">
            <MyPantryPage />
          </ProtectedRoute>

          <ProtectedRoute exact path="/recipes">
            <Recipes />
          </ProtectedRoute>

          <ProtectedRoute exact path="/admin">
            <Admin />
          </ProtectedRoute>

          <ProtectedRoute exact path="/defaultpantry">
            <DefaultPantryToolTip />
          </ProtectedRoute>

          <ProtectedRoute exact path="/recipe/:id">
            <RecipePage />
          </ProtectedRoute>

          <Route exact path="/login">
            {user.id ? <Redirect to="/mypantry" /> : <LoginPage />}
          </Route>

          <Route exact path="/registration">
            {user.id ? <Redirect to="/mypantry" /> : <RegisterPage />}
          </Route>

          <Route exact path="/home">
            {user.id ? <Redirect to="/mypantry" /> : <LoginPage />}
          </Route>

          <Route>
            <h1>404</h1>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
