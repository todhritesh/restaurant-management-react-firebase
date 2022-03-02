import React ,{useState,useEffect}  from 'react';
import Grid from '@mui/material/Grid';
import ItemCard from './ItemCard';
import {db} from "../../firebase-config";
import {getDocs , collection} from "firebase/firestore"


export default function ItemContainer({tableData , setTableData}) {

  const [item , setItem] = useState([])
  const itemCollectionRef = collection(db , "items");
  useEffect(() => {
    const getItemDocs = async () => {
      const data = await getDocs(itemCollectionRef);
      setItem(data.docs.map(item=>({...item.data(),id:item.id})));
    }
    getItemDocs()
  }, [])

  function handleTableData(title,price){
    const alreadyExist = tableData.some(item=>item.title === title);
    if(alreadyExist){
      const updatedQty = tableData.map(item=>{
        if(item.title===title){
          return {
            ...item,
            qty:item.qty+1
          }
        }else{
          return {
            ...item,
          }
        }
      })
      setTableData(updatedQty)
    }else{
      setTableData([...tableData,{title:title,price:price,qty:1}])
    } 
  }

  return (
      <Grid container sx={{mt:2,pb:4,pr:1}} spacing={2} >
        
        {
          item.map((element,i)=>(
            
            <Grid item xs={3}>
              <ItemCard handleTableData={handleTableData} key={i} title={element.title} image={element.image} price={element.price} />
            </Grid>
            )
          )
        }
        
        
      </Grid>
  );
}
