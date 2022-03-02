import * as React from 'react';
import Grid from '@mui/material/Grid';
import { Typography ,Button} from '@mui/material';
import BoltIcon from '@mui/icons-material/Bolt';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

export default function AmountCard({tableData}) {

  function calculateTotal(){
    const totalSum = tableData.reduce((sum,item)=>(sum+(item.qty*item.price)),0)
    return totalSum
  }

  return (
      <Grid container spacing={2} sx={{py:3,pr:1}}>
        <Grid item xs={12}>
          <Typography component="span" variant="h3">
            Total :&nbsp;
          </Typography>
          <Typography component="span" variant="h4">
            Rs. {calculateTotal()}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Button fullWidth variant="contained" color="warning" endIcon={<BoltIcon/>}>
              Fast Cash 
          </Button>
        </Grid>
        <Grid item xs={6} >
        <Button  fullWidth variant="contained" color="success" endIcon={<ShoppingCartIcon/>}>
              Check out
          </Button>
        </Grid>
        
      </Grid>
  );
}
