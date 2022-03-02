import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { Button, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function OrderTable({tableData, setTableData}) {

  function handleAddItem(title){
    const updatedQty = tableData.map(item=>{
      if(item.title===title){
        return {
          ...item,
          qty:item.qty+1
        }
      }else{
        return {
          ...item
        }
      }
    })
    setTableData(updatedQty)
  }

  function deleteItem(title){
    const updatedQty = tableData.filter(item=>item.title!==title)
    setTableData(updatedQty)
  }

  function handleMinusItem(title,qty){
    if(qty===1){
      const updatedItem = tableData.filter(item=>{
        return item.title!==title
      })
      setTableData(updatedItem)
      return 
    } 

    const updatedQty = tableData.map(item=>{
      if(item.title===title){
        return {
          ...item,
          qty:item.qty-1
        }
      }else{
        return {
          ...item
        }
      }
    })
    setTableData(updatedQty)
  }

  return (
    <TableContainer  component={Paper}>
        <h2>Your Order</h2>
      <Table size="small" aria-label="simple table">
        <TableHead >
          <TableRow >
            <TableCell sx={{fontWeight:"bolder"}}>Product Name</TableCell>
            <TableCell sx={{fontWeight:"bolder"}} >Unit Price</TableCell>
            <TableCell sx={{fontWeight:"bolder"}} >Total</TableCell>
            <TableCell sx={{fontWeight:"bolder"}} >Qty</TableCell>
            <TableCell sx={{fontWeight:"bolder"}} >Del</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>

            {
              tableData.map((item,i)=>(
                <TableRow key={i} sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
                  <TableCell >
                    {item.title}
                  </TableCell>
                  <TableCell >Rs. {item.price}</TableCell>
                  <TableCell >{item.price * item.qty}</TableCell>
                  <TableCell sx={{display:'flex',alignItems:'center'}}>
                    <IconButton color="success" onClick={()=>handleAddItem(item.title)}>
                      <AddIcon color="success" fontSize='small' />
                    </IconButton>
                    <span>{item.qty}</span>
                    <IconButton color="error" onClick={()=>handleMinusItem(item.title,item.qty)}>
                      <RemoveIcon color="error" fontSize='small'/>
                    </IconButton>
                  </TableCell>
                  <TableCell >
                      <IconButton onClick={()=>deleteItem(item.title)} color='error'><DeleteOutlineIcon fontSize='small' /></IconButton>
                </TableCell>
                </TableRow>
              ))
            }

            {/* <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }} >
              <TableCell >
                Apple
              </TableCell>
              <TableCell >Rs. 5</TableCell>
              <TableCell >4</TableCell>
              <TableCell >2</TableCell>
              <TableCell >
                  <IconButton color='error'><DeleteOutlineIcon fontSize='small' /></IconButton>
             </TableCell>
            </TableRow> */}
           
        </TableBody>
      </Table>
    </TableContainer>
  );
}
