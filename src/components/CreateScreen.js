import React, { useState } from "react";
import Modal from "../components/Modal";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  ThemeProvider,
  Typography,
  createTheme,
} from "@mui/material";
import QuestionBox from "./QuestionBox";
import { useDispatch, useSelector } from "react-redux";
import { addQuiz } from "../redux/actions";

function CreateScreen() {
  const dispatch = useDispatch();
  const [questionType, setQuestionType] = useState("");
  const questions = useSelector((state) => state.questions);
  const [quizTitle, setQuizTitle] = useState("");
  const [quizDescription, setQuizDescription] = useState("");
  const handleSelected = (value) => {
    setQuestionType(value);
  };
  const lightTheme = createTheme({ palette: { mode: "light" } });
  const index = questions.length;

  // Determine if there's an error in the title field
  const titleError =
    quizTitle.length && (quizTitle.trim().length < 10 || quizTitle.trim().length > 30) ? true : false;

  const submitHandler = () => {
    const date = new Date();
    const createdOn = `${date.toLocaleDateString(undefined, {month:'short', day: 'numeric'})} ${date.toLocaleTimeString(undefined, {hour:'numeric', minute:'2-digit', hour12:true})}`;
    dispatch(addQuiz({quizTitle,quizDescription,questions, createdOn, 'status':true}))
   setQuizTitle('');
   setQuizDescription('');
  }
    


  return (
    <Container>
      <Modal selectedType={handleSelected} />
      <Typography variant="h4" fontWeight={"bold"} mb={4}>
        Create New Quiz
      </Typography>
      <ThemeProvider theme={lightTheme}>
        <Paper sx={{ p: 5, my: 4 }} elevation={3}>
          <Box sx={{ "& .MuiTextField-root": { m: 1, width: "100%" } }}>
            <TextField
              error={titleError}
              color={quizTitle.trim().length >= 10 && quizTitle.trim().length <= 30 ? 'success' : undefined}
              placeholder="Enter Quiz Title"
              required
              id="outlined-required"
              value={quizTitle}
              onChange={(e) => setQuizTitle(e.target.value)}
              helperText={`Title should be minimum of 10 characters and maximum of 30 characters. ${quizTitle.trim().length}/30`}
            />
            <TextField
              required
              placeholder="Enter Quiz Description"
              multiline
              rows={4}
              value={quizDescription}
              onChange={(e) => setQuizDescription(e.target.value)}
            />
          </Box>
        </Paper>
        {questions.length > 0 && (
          <Paper sx={{ p: 3 }} elevation={3}>
            {questions.map((value, index) => (
              <Paper elevation={4} sx={{ px: 4, py: 1, my: 1 }} key={index}>
                <Typography variant="subtitle1">{`Question ${
                  index + 1
                }:`}</Typography>
                <Typography variant="caption" sx={{ overflowWrap: 'break-word' }}>{value['question']}</Typography>
              </Paper>
            ))}
          </Paper>
        )}
        {questionType === "MCQ(single answer)" ? (
          <QuestionBox quizDescription={quizDescription} quizTitle={quizTitle} index={index} titleError={titleError} />
        ) : (
          <Typography>
            {questionType && `Not implemented yet for "${questionType}"`}
          </Typography>
        )}
        <Button onClick={submitHandler} variant="contained" disabled={(questions.length < 1 || titleError || quizTitle.trim().length < 1) ? true : false} color="primary">
          Submit
        </Button>
      </ThemeProvider>
    </Container>
  );
}

export default CreateScreen;
