import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';

import RecipieCard from '../components/recipieCard'



export default function BasicGrid(props) {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
          {props.recipies.map(recipie => (
          <Grid xs={4}>
            <RecipieCard recipie={recipie}/>
          </Grid>
          ))}
      </Grid>
    </Box>
  );
}