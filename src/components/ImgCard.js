import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';

export default function ImgCard({img, text, height, width, imgHeight}) {
  return (
    <Card  elevation={6} sx={{  width:{width},height:{height},  borderRadius: '22px'}}>
      {img && (
        <CardMedia
        component="img"
        alt={text}
        height={imgHeight}
        image={img}
      />
      )}
      <CardContent >
        <Typography sx={{textAlign:'center'}}  variant="caption" component="div">
          {text}
        </Typography>
      </CardContent>
    </Card>
  );
}