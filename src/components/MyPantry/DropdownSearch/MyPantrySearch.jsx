import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import React from 'react';
import { useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

export default function FreeSolo() {
    const [inputValue, setInputValue] = useState('');
    const [selectIngredient, setSelectIngredient] = useState(null);
    const ingredients = useSelector((store) => store.ingredients);
    const dispatch = useDispatch();

    console.log(selectIngredient);
    console.log(inputValue);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch({ type: 'ADD_INGREDIENT', payload: selectIngredient });
        dispatch({ type: 'FETCH_RECIPES' });
    };

    useEffect(() => {
        dispatch({ type: 'FETCH_INGREDIENTS' });
    }, [dispatch]);

    return (
        <form onSubmit={handleSubmit}>
            <Autocomplete
                freeSolo
                id="free-solo-2-demo"
                options={ingredients}
                getOptionLabel={(option) => option.name}
                value={selectIngredient}
                onChange={(event, newValue) => {
                    setSelectIngredient(newValue);
                }}
                inputValue={inputValue}
                onInputChange={(event, newInputValue) => {
                    setInputValue(newInputValue);
                }}
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Find Ingredients"
                        InputProps={{
                            ...params.InputProps,
                            type: 'search',
                        }}
                    />
                )}
            />
            <button type="submit">Submit</button>
        </form>
    );
}