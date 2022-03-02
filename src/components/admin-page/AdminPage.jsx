import { Grid } from '@mui/material';
import React from 'react'
import AddCategory from './AddCategory';
import AddItem from './AddItem';

function AdminPage() {
 

  return (
    <Grid sx={{pt:10}}  container spacing={2}>
        <Grid item xs={7}>
            <AddItem/>
        </Grid>
        
        <Grid item xs={5}>
            <AddCategory/>
        </Grid>
        
    </Grid>
  )
}

export default AdminPage