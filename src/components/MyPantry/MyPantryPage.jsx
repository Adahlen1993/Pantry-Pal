import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import DropdownSearch from "../DropdownSearch/DropdownSearch";
import UserIngredientsTable from "../UserIngredientsTable/UserIngredientsTable";

export default function MyPantryPage () {

    const dispatch = useDispatch();

    const searchIngredients = e => {
       dispatch({type: 'SEARCH_INGREDIENTS', payload: e.target.value}) 
    }


    return (

        <>
        <DropdownSearch/>
        <UserIngredientsTable/>
        </>
    )
}