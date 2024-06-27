import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import Typography from '@mui/material/Typography';
// import { Provider } from 'react-redux';
// import store from './store';

// Define actions within the same file
const fetchFilteredRecipesRequest = (userId, recipeType) => ({
  type: 'FETCH_FILTERED_RECIPES',
  payload: { userId, recipeType },
});

const images = [
  {
    url: 'https://www.thedailymeal.com/img/gallery/mexican-food-can-be-traced-all-the-way-back-to-7000-bc/intro-1674486308.jpg',
    title: 'Mexican Food',
    width: '30%',
    type: 4
  },
  {
    url: 'https://wpcdn.us-midwest-1.vip.tn-cloud.net/www.charlottemagazine.com/content/uploads/2023/03/s/h/08-12-21-jimmny-cltmag-0673.jpg',
    title: 'Italian Food',
    width: '30%',
    type: 3
  },
  {
    url: 'https://americajosh.com/wp-content/uploads/2022/10/What-I-Learned-from%E2%80%A6-American-Food_.jpg',
    title: 'American Food',
    width: '30%',
    type: 15
  },
];

const ImageButton = styled(ButtonBase)(({ theme }) => ({
  position: 'relative',
  height: 200,
  [theme.breakpoints.down('sm')]: {
    width: '100% !important',
    height: 100,
  },
  '&:hover, &.Mui-focusVisible': {
    zIndex: 1,
    '& .MuiImageBackdrop-root': {
      opacity: 0.15,
    },
    '& .MuiImageMarked-root': {
      opacity: 0,
    },
    '& .MuiTypography-root': {
      border: '4px solid currentColor',
    },
  },
}));

const ImageSrc = styled('span')({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundSize: 'cover',
  backgroundPosition: 'center 40%',
});

const Image = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: theme.palette.common.white,
}));

const ImageBackdrop = styled('span')(({ theme }) => ({
  position: 'absolute',
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  backgroundColor: theme.palette.common.black,
  opacity: 0.4,
  transition: theme.transitions.create('opacity'),
}));

const ImageMarked = styled('span')(({ theme }) => ({
  height: 3,
  width: 18,
  backgroundColor: theme.palette.common.white,
  position: 'absolute',
  bottom: -2,
  left: 'calc(50% - 9px)',
  transition: theme.transitions.create('opacity'),
}));

export default function SortRecipesButtons() {
  const dispatch = useDispatch();
  const recipes = useSelector((state) => state.recipes);
  const loading = useSelector((state) => state.loading);
  const error = useSelector((state) => state.error);

  const handleButtonClick = (recipeType) => {
    const userId = 1;  // Replace with dynamic user ID
    dispatch(fetchFilteredRecipesRequest(userId, recipeType));
  };

  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }}>
      {images.map((image) => (
        <ImageButton
          focusRipple
          key={image.title}
          style={{
            width: image.width,
          }}
          onClick={() => handleButtonClick(image.type)}
        >
          <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
          <ImageBackdrop className="MuiImageBackdrop-root" />
          <Image>
            <Typography
              component="span"
              variant="subtitle1"
              color="inherit"
              sx={{
                position: 'relative',
                p: 4,
                pt: 2,
                pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
              }}
            >
              {image.title}
              <ImageMarked className="MuiImageMarked-root" />
            </Typography>
          </Image>
        </ImageButton>
      ))}
 
    </Box>
  );
}

 
