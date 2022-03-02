import React,{useState,useEffect} from 'react';
import FormControl from '@mui/material/FormControl';
import { Button, Grid, Typography } from '@mui/material';
import { TextField } from '@mui/material';
import {useNavigate} from 'react-router-dom'
import {db} from '../../firebase-config';
import {addDoc , collection} from 'firebase/firestore'; 

export default function AddCategory() {

  const navigate = useNavigate()
  const categoryCollectionRef = collection(db,'categories');
  const [catTitle , setCatTitle] = useState('')

  async function addCatData(){
    try{
      const res = await addDoc(categoryCollectionRef , {
          cat_title : catTitle
      })
      setCatTitle('')
    }catch{
      console.log('error')
    }
  }

  return (

    <Grid sx={{mt:10}}>
      <Grid item xs={10} sx={{mx:'auto',width:'100%',mt:4}}>
        <Typography variant="h5" sx={{mb:2}}>
          Add Recipe Category 
        </Typography>
      <FormControl fullWidth variant="standard" sx={{mb:2}}>
        <TextField label="Category Title" variant="outlined" color='primary'  onChange={(e)=>{return setCatTitle(e.target.value)}} value={catTitle} placeholder='' id="bootstrap-input" placeholder="Title ..." />
      </FormControl>

      <Button onClick={addCatData} variant="contained">
        Add Category
      </Button>
      </Grid>
    </Grid>
  );
}
