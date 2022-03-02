import React,{useState,useEffect} from 'react';
import FormControl from '@mui/material/FormControl';
import { Button, Grid, Typography } from '@mui/material';
import { TextField } from '@mui/material';
import {useNavigate} from 'react-router-dom'
import {auth, db} from "../firebase-config";
import {signInWithEmailAndPassword,onAuthStateChanged} from "firebase/auth"
import {collection,doc,getDoc} from 'firebase/firestore'
import findRole from '../findRole';

export default function LoginPage({setRole,setUser,role,user}) {

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

  async function login(){
    try{
      await signInWithEmailAndPassword(auth,email,password);
      const uid = auth.currentUser.uid;
      const docRef =  doc(db,'users',uid);
      const data = await getDoc(docRef);
      const userRole = data.data().role;
      setRole(userRole)
      setUser(auth.currentUser);
      if(userRole==="staff"){
        navigate("/main-page")
      }
      if(userRole==="admin"){
        navigate("/admin-page")
      }
    }catch(err){
      console.log(err)
    }
  }

  return (
    
      <Grid item xs={5} sx={{mx:'auto',width:'100%',mt:15}}>
        <Typography variant="h5" sx={{mb:2}}>
          Login Here
        </Typography>
      <FormControl fullWidth variant="standard" sx={{mb:2}}>
        <TextField label="Email" variant="outlined" color='primary'  onChange={(e)=>setEmail(e.target.value)} value={email} id="bootstrap-input" placeholder="Email ..." />
      </FormControl>

      <FormControl fullWidth variant="standard" sx={{mb:2}}>
        <TextField label="Password" variant="outlined" color='primary'  onChange={(e)=>setPassword(e.target.value)} value={password} id="bootstrap-input" placeholder="Password ..." />
      </FormControl>

      <Button color="warning" onClick={login} variant="contained">
        Login
      </Button>
      </Grid>
  );
}
