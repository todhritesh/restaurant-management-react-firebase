import React,{useEffect} from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { getDocs ,collection} from 'firebase/firestore';
import { db } from '../../firebase-config';

export default function ItemCategory() {
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };
  const categoryCollectionRef = collection(db,"categories");
  const [category,setCategory] = React.useState([]);

  useEffect(()=>{
    const getCatDocs = async () => {
      const data = await getDocs(categoryCollectionRef);
      setCategory(data.docs.map(item=>({...item.data(),id:item.id})));
    }
    getCatDocs();
  },[])

  return (
    <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
      <List component="nav" aria-label="secondary mailbox folder">

      {
        category.map((item,i)=>(
          <>
            <ListItemButton
              selected={selectedIndex === i}
              onClick={(event) => handleListItemClick(event, i)}
            >
              <ListItemText primary={item.cat_title} />
            </ListItemButton>
            <Divider />
          </>
        ))
      }
      </List>
    </Box>
  );
}
