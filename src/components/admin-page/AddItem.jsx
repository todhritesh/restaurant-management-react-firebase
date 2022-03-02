import React,{useState,useEffect} from 'react';
import FormControl from '@mui/material/FormControl';
import { Button, CircularProgress, Grid, Input, InputLabel, MenuItem, Select, Typography } from '@mui/material';
import { TextField } from '@mui/material';
import {useNavigate} from 'react-router-dom'
import {db} from '../../firebase-config';
import {addDoc , getDocs , collection , doc} from 'firebase/firestore'; 
import AttachFileIcon from '@mui/icons-material/AttachFile';
import { storage } from '../../firebase-config';
import { ref , uploadBytesResumable , getDownloadURL} from 'firebase/storage';


export default function AddItem() {

  const navigate = useNavigate()
  const itemCollectionRef = collection(db,'items');
  const categoryCollectionRef = collection(db,'categories');
  const [title , setTitle] = useState('')
  const [catData , setCatData] = useState([{}]);
  const [categoryId , setCategoryId] = useState("");
  const [image , setImage] = useState("");
  const [price , setPrice] = useState("");
  const [progress , setPorgress] = useState(0);

  async function addItem(){
    try{
      const uploadFile = async (file) => {
        const storageRef = ref(storage , `images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef , file);
        uploadTask.on('state_changed',snapShot => {
          const prog = Math.round((snapShot.bytesTransferred / snapShot.totalBytes)*100)
          setPorgress(prog)
        },(err)=>{console.log(err)},
        async () => {
          const imageUrl = await getDownloadURL(uploadTask.snapshot.ref)
          await addDoc(itemCollectionRef , {
            title : title,
            category : doc(db,"categories",categoryId),
            price : price,
            image : imageUrl,
          })
          setTitle("")
          setCategoryId("")
          setPrice("")
          setPorgress(0)
        }
        )
      }
      await uploadFile(image)
      // await addDoc(itemCollectionRef , {
      //     title : title,
      //     category : doc(db,"categories",categoryId),
      //     price : price,
      //     image : imageUrl,
      // })
      // setTitle("")
      // setCategoryId("")
      // setPrice("")
    }catch{
      console.log('error')
    }
  }

  useEffect(()=>{
    const getCatDocs = async () => {
      const data = await getDocs(categoryCollectionRef );
      setCatData(data.docs.map(item=>({...item.data(),id:item.id})))
    }
    getCatDocs()
  },[])

  return (

    <Grid sx={{mt:10}}>
      <Grid item xs={10} sx={{mx:'auto',width:'100%',mt:4}}>
        <Typography variant="h5" sx={{mb:2}}>
          Add Item
        </Typography>
      <FormControl fullWidth variant="standard" sx={{mb:2}}>
        <TextField label=" Title" variant="outlined" color='primary'  onChange={(e)=>{return setTitle(e.target.value)}} value={title} placeholder='' id="bootstrap-input" placeholder="Title ..." />
      </FormControl>

      <FormControl fullWidth variant="standard" sx={{mb:2}}>
        <TextField label="Price" variant="outlined" color='primary'  onChange={(e)=>{return setPrice(e.target.value)}} value={price} placeholder='' id="bootstrap-input" placeholder="Title ..." />
      </FormControl>

      <FormControl  fullWidth variant="standard" sx={{mb:2}}>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
        value={categoryId}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          label="Category"
          onChange={(e)=>setCategoryId(e.target.value)}
           value={categoryId} 
          >
            {
              catData.map((item)=>(
                <MenuItem key={item.id} value={item.id}>{item.cat_title}</MenuItem>
              ))
            }
        </Select>
      </FormControl>

      <FormControl fullWidth variant="standard" sx={{mb:2}}>
        <input onChange={(e)=>setImage(e.target.files[0])} type="file" style={{display:"none"}} id="upload-file" />
        <label htmlFor='upload-file' style={{display:"inline-block"}}>
          <Typography variant="h6" component="span">Upload&nbsp;&nbsp;</Typography>
          <Button color='success' variant='contained' component="span" endIcon={<AttachFileIcon/>}>
            Upload file
          </Button>
        </label>
          {progress>0 && <CircularProgress color="success" value={progress} variant="determinate" />}
      </FormControl>

      { 
      progress == 0 &&    
      <Button onClick={addItem} variant="contained">
        Add Item 
      </Button>
      }
      </Grid>
    </Grid>
  );
}
