import React, { useState } from "react";
import ImgCard from "./ImgCard";
import { Alert, Box, Grid, Typography, }from "@mui/material";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import playbutton from '../playbutton.jpg'

function PlayForum() {
  const quizzes = useSelector((state) => state.quizzes);
  const [userName, setUserName] = useState('');

  const validateUser = () => {
    return userName.trim().length >= 10 && userName.trim().length <= 30;  
  }

  return (
    <Box 
    display="flex"
    flexDirection='column'
     alignItems={'center'}
    >
      <Typography variant="h2" my={3} sx={{fontWeight:'bold'}}>Play Quiz</Typography>
        <input  onChange={(e) => setUserName(e.target.value) } placeholder="Enter User Name" className="input-inset" />
        {userName && !validateUser() && <Typography variant="caption" color="error" sx={{ marginTop: 1 }}>
          Username length should be between 10 and 30
        </Typography>}
        
      {(validateUser() && quizzes.length > 0) && (
        <Grid my={3}  sx={{width:'691px'}} container spacing={2}>
        {quizzes.map((quiz, index) => 
          (quiz.status && (
            <Grid className="imageContainer" item xs={4} key={index}>
            <Link to={`/quiz/${index}/${userName}`} style={{textDecoration:'none' }}>
              <ImgCard height={'221px'} width={'221px'} img={playbutton} text={quiz.quizTitle} imgHeight={'175px'} />
            </Link>
          </Grid>
          ))
        )} 
      </Grid>
      )}
      {!quizzes.length > 0 && <Alert severity="error"> No Quiz Available </Alert>}
    </Box>
  );
}

export default PlayForum;
