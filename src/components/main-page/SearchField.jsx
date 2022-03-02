import React from 'react'
import { FormControl, FormHelperText, InputAdornment, OutlinedInput } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';


function SearchField() {
  return (
    <FormControl sx={{ m: 1,width:"97%"}} variant="outlined">
        <OutlinedInput
        sx={{height:"4vh"}}
        id="outlined-adornment-weight"
        // value={values.weight}
        // onChange={handleChange('weight')}
        endAdornment={<SearchIcon/>}
        aria-describedby="outlined-weight-helper-text"
        inputProps={{
            'aria-label': 'weight',
        }}
        />
    </FormControl>
  )
}

export default SearchField