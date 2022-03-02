import { Grid } from '@mui/material'
import React,{useState} from 'react'
import AmountCard from './AmountCard'
import ItemCategory from './ItemCategory'
import ItemContainer from './ItemContainer'
import OrderTable from './OrderTable'
import SearchField from './SearchField'

function MainPage() {

  const [tableData , setTableData] = useState([])

  return (
    <Grid sx={{pt:10}}  container spacing={2}>
    <Grid item xs={1.6} sx={{height:window.innerHeight -64 ,overflow:"auto"}}>
        <SearchField/>
        <ItemCategory/>
    </Grid>
    <Grid item xs={6.5} sx={{height:window.innerHeight -64 ,overflow:"auto"}}>
      <SearchField/>
      <ItemContainer setTableData={setTableData} tableData={tableData} />
    </Grid>
    <Grid sx={{display:"flex",flexDirection:"column",justifyContent:"space-between",height:window.innerHeight -64 ,overflow:"auto"}} item xs={3.9}>
      <OrderTable setTableData={setTableData} tableData={tableData} />
      <AmountCard tableData={tableData} />
    </Grid>
  </Grid>
  )
}

export default MainPage