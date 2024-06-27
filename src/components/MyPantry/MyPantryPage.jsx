
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserIngredientsTable from './UserIngredientsTable/UserIngredientsTable';
import MyPantrySwitch from './MyPantrySwitch/MyPantrySwitch';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

import TestSearch from './DropdownSearch/MyPantrySearch';

import './MyPantryPage.css';

export default function MyPantryPage() {
  const dispatch = useDispatch();

  const recipes = useSelector((store) => store.recipes);

  return (
    <Container>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <h1 className="kurale-regular">MyPantry</h1>
        </Grid>
        <Grid item xs={12} sm={9}>
          <TestSearch />
          <MyPantrySwitch />
        </Grid>
        <Grid item xs={12} sm={3}>
        </Grid>
        <Grid item xs={12}>
          <UserIngredientsTable />
        </Grid>
      </Grid>
    </Container>
  );
}
