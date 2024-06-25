import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DropdownSearch from "../DropdownSearch/DropdownSearch";
import UserIngredientsTable from "../UserIngredientsTable/UserIngredientsTable";
import MyPantrySwitch from "../MyPantrySwitch/MyPantrySwitch";

export default function MyPantryPage () {

    const dispatch = useDispatch();

    const recipes = useSelector((store) => store.recipes);


    return (

        <>
        <h3>Recipe Count: {recipes.length}</h3>
        <DropdownSearch/>
        <UserIngredientsTable/>
        <MyPantrySwitch/>
        </>
    )
}