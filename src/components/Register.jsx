import React,{useState,useEffect} from 'react';
import FormControl from '@mui/material/FormControl';
import { Button, Grid, Typography } from '@mui/material';
import { TextField } from '@mui/material';
import {useNavigate} from 'react-router-dom'
import {auth, db} from "../firebase-config";
import {createUserWithEmailAndPassword,onAuthStateChanged} from "firebase/auth"
import {setDoc,doc,getDoc} from 'firebase/firestore'
import findRole from '../findRole';
import { NearMeDisabledTwoTone } from '@mui/icons-material';

export default function RegisterPage({setRole,setUser,role,user}) {

  onAuthStateChanged(auth,currentUser=>{
    if(currentUser){
      setUser(currentUser)
    }
  })

  useEffect(()=>{
    const res = async () => {
      if(user?.uid){
        const userRole = await findRole(user.uid,setRole)
        if(userRole==="admin"){
          navigate("/admin-page");
        }
        if(userRole==="staff"){
          navigate("/main-page");
        }
      }
    }
    res()
   },[user])
  

  const navigate = useNavigate()
  const [email , setEmail] = useState('')
  const [password , setPassword] = useState('')
  const [name , setName] = useState('')

  async function register(){
    try{
      const created = await createUserWithEmailAndPassword(auth,email,password);
      const uid = auth.currentUser.uid;
      const docRef =  doc(db,'users',uid);
      await setDoc(docRef , {
          name:name,
          email:email,
          role:"staff",
      })
      
      setRole("staff")
      setUser(auth.currentUser);
      navigate("main-page")
    }catch(err){
      console.log(err)
    }
  }

  return (
    
      <Grid item xs={5} sx={{mx:'auto',width:'100%',mt:15}}>
        <Typography variant="h5" sx={{mb:2}}>
          Register Here
        </Typography>
      <FormControl fullWidth variant="standard" sx={{mb:2}}>
        <TextField label="Name" variant="outlined" color='primary'  onChange={(e)=>setName(e.target.value)} value={name} id="bootstrap-input" placeholder="Email ..." />
      </FormControl>

      <FormControl fullWidth variant="standard" sx={{mb:2}}>
        <TextField label="Email" variant="outlined" color='primary'  onChange={(e)=>setEmail(e.target.value)} value={email} id="bootstrap-input" placeholder="Email ..." />
      </FormControl>

      <FormControl fullWidth variant="standard" sx={{mb:2}}>
        <TextField label="Password" variant="outlined" color='primary'  onChange={(e)=>setPassword(e.target.value)} value={password} id="bootstrap-input" placeholder="Password ..." />
      </FormControl>

      <Button color="success" onClick={register} variant="contained">
        Register
      </Button>
      </Grid>
  );
}
