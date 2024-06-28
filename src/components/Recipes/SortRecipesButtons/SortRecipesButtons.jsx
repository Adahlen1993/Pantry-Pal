import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Typography from '@mui/material/Typography';
import FilterListIcon from '@mui/icons-material/FilterList';
import IconButton from '@mui/material/IconButton';

const images = [
  {
    url: 'https://www.thedailymeal.com/img/gallery/mexican-food-can-be-traced-all-the-way-back-to-7000-bc/intro-1674486308.jpg',
    title: 'Mexican Food',
    type: 4,
  },
  {
    url: 'https://wpcdn.us-midwest-1.vip.tn-cloud.net/www.charlottemagazine.com/content/uploads/2023/03/s/h/08-12-21-jimmny-cltmag-0673.jpg',
    title: 'Italian Food',
    type: 3,
  },
  {
    url: 'https://americajosh.com/wp-content/uploads/2022/10/What-I-Learned-from%E2%80%A6-American-Food_.jpg',
    title: 'American Food',
    type: 15,
  },
];

const Image = styled('div')(({ theme, url }) => ({
  width: '100%',
  height: 50, // Reduced height
  backgroundImage: `url(${url})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: theme.palette.common.black,
    opacity: 0.4,
  },
}));

// Define the action creator
const fetchFilteredRecipesRequest = (userId, recipeType) => ({
  type: 'FETCH_FILTERED_RECIPES',
  payload: { userId, recipeType },
});

export default function SortRecipesDropdown() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [selectedType, setSelectedType] = useState('');

  const handleSelectChange = (event) => {
    const recipeType = event.target.value;
    setSelectedType(recipeType);
    const userId = user.id; // Replace with dynamic user ID
    dispatch(fetchFilteredRecipesRequest(userId, recipeType));
  };

  return (
    <Box sx={{ minWidth: 300, width: '100%' }}>
      <FormControl fullWidth>
        <InputLabel id="recipe-filter-label">Filter Recipes</InputLabel>
        <Select
          labelId="recipe-filter-label"
          id="recipe-filter"
          value={selectedType}
          label="Filter Recipes"
          onChange={handleSelectChange}
          startAdornment={
            <IconButton edge="start" color="inherit" aria-label="filter">
              <FilterListIcon />
            </IconButton>
          }
        >
          {images.map((image) => (
            <MenuItem key={image.type} value={image.type}>
              <Image url={image.url}>
                <Typography
                  variant="subtitle1"
                  color="inherit"
                  sx={{
                    zIndex: 1,
                    fontWeight: 'bold', // Bolder font
                  }}
                >
                  {image.title}
                </Typography>
              </Image>
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
}
