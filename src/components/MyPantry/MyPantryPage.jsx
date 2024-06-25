import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DropdownSearch from "../DropdownSearch/DropdownSearch";
import UserIngredientsTable from "../UserIngredientsTable/UserIngredientsTable";
import MyPantrySwitch from "../MyPantrySwitch/MyPantrySwitch";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function MyPantryPage () {

    const dispatch = useDispatch();

    const recipes = useSelector((store) => store.recipes);


    return (

        <>
       <h1>MyPantry</h1>
   

        <DropdownSearch/>
        <UserIngredientsTable/>
        <MyPantrySwitch/>
      
        </>
    )
}