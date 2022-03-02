import  React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { PriceChange } from '@mui/icons-material';


export default function ItemCard({title,image,price,handleTableData}) {


  return (
    <Card onClick={()=>handleTableData(title,price)}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="100"
          sx={{objectFit:"contain"}}
          image={image}
          alt="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="body2" component="div">
            {title}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            Rs : {price}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
