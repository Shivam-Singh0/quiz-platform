import { Box, Button,  Paper, Typography } from "@mui/material";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import Options from "./Options";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import CardText from './CardText.js'

function Quiz() {
  const [questionNumber, setQuestionNumber] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const { id, userName } = useParams();
  const quizzes = useSelector((state) => state.quizzes);

  const currentQuiz = quizzes.length > 0 ? quizzes[Number(id)] : {};
  const questionsLength = currentQuiz.questions.length;
  const currentQuestion = currentQuiz.questions[questionNumber];
  const [selected, setSelected] = useState(0);

  const handleScore = () => {
    const selectedOption = currentQuestion.options[selected];
    if (selectedOption.correct) {
      setScore(score + 1);
    }
    setSelected(0);
  };

  const handleNext = () => {
    handleScore();
    if (questionNumber + 1 < questionsLength) {
      setQuestionNumber(questionNumber + 1);
    } else {
      setSubmitted(true);
    }
  };

  return (
    <div>
      {submitted ? (
        <Box display={'flex'} justifyContent={'center'} >
        <CardText score={score} total={questionsLength} user={userName} title={currentQuiz.quizTitle}/>
        </Box>
      ) : (
        <div>
          <Typography textAlign={"center"} variant="h3" fontWeight={"bold"}>
            {currentQuiz.quizTitle}
          </Typography>
          <Typography textAlign={"center"} variant="body1" fontWeight={"bold"}>
            {currentQuiz.quizDescription}
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mt: 10,
            }}
          >
            <Paper
              elevation={4}
              sx={{
                p: 5,
                width: "1010px",
                height: "30vh",
                borderRadius: "3rem",
              }}
            >
              <Typography my={2}>
                {`Q${questionNumber + 1}:`} {currentQuestion.question}
              </Typography>
              <Options
                selected={selected}
                setSelected={setSelected}
                options={currentQuestion.options}
              />
            </Paper>
          </Box>
          <Box
            display={"flex"}
            justifyContent={"space-between"}
            sx={{ mx: 27, mt: 2 }}
          >
            <Paper sx={{ alignSelf: "start", p: 1 }} elevation={6}>
              <Typography fontWeight={"bold"}>
                Questions {questionNumber + 1}/{questionsLength}
              </Typography>
            </Paper>
            <Button
              sx={{ alignSelf: "end" }}
              onClick={handleNext}
              variant="contained"
              endIcon={
                questionNumber + 1 < questionsLength && <ArrowForwardIcon />
              }
            >
              {questionNumber + 1 === questionsLength
                ? "Submit"
                : "Next Question"}
            </Button>
          </Box>
        </div>
      )}
    </div>
  );
}

export default Quiz;
