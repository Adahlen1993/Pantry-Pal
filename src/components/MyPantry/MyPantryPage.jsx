import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserIngredientsTable from './UserIngredientsTable/UserIngredientsTable';
import MyPantrySwitch from './MyPantrySwitch/MyPantrySwitch';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { makeStyles } from '@mui/styles';

import TestSearch from './DropdownSearch/MyPantrySearch';

const useStyles = makeStyles((theme) => ({
  container: {
    marginTop: theme.spacing(4),
    marginBottom: theme.spacing(4),
  },
  heading: {
    fontFamily: 'Kurale, serif',
    textAlign: 'center',
    marginBottom: theme.spacing(2),
  },
  searchSwitchContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(2),
  },
}));

export default function MyPantryPage() {
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: 'FETCH_RECIPES' });
  }, [dispatch]);

  const recipes = useSelector((store) => store.recipes);

  return (
    <Container className={classes.container}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h3" className={classes.heading}>
            MyPantry
          </Typography>
        </Grid>
        <Grid item xs={12} sm={9}>
          <Box className={classes.searchSwitchContainer}>
            <TestSearch />
            <MyPantrySwitch />
          </Box>
        </Grid>
        <Grid item xs={12} sm={3}>
          {/* Additional content can go here */}
        </Grid>
        <Grid item xs={12}>
          <UserIngredientsTable />
        </Grid>
      </Grid>
    </Container>
  );
}
