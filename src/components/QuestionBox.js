import React, { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  FormGroup,
  Grid,
  IconButton,
  Paper,
  Slide,
  TextField,
  Typography,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import CheckIcon from "@mui/icons-material/Check";
import AddBoxOutlined from "@mui/icons-material/AddBoxOutlined";
import { useDispatch } from "react-redux";
import { addQuestions } from "../redux/actions";
import CustomChip from "./CustomChip";
export default function QuestionBox({ index, quizTitle, titleError}) {
  
  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState([]);
  const [option, setOption] = useState("");
  const [select, setSelect] = useState(false);
  const [addError, SetaddError] = useState("");
  const [success, setSuccess] = useState('');
  const dispatch = useDispatch();


  const addHandler = () => {
    let error = null; // Initialize error variable
  
    // Check if options length is less than 2
    if (options.length < 2) {
      error = [1, 'Please add at least two options'];
    } 
    // Check if at least one correct answer is selected
    else if (!options.some(option => option.correct)) {
      error = [2, 'Please select one correct answer'];
    }
  
    // If there's an error, set it and return without dispatching
    if (error) {
      SetaddError(error);
      return;
    }
  
    // If there's no error, dispatch addQuestions action and reset state
    dispatch(addQuestions({ question: question, options: options }));
    setSuccess('Question Added');
    setQuestion('');
    setOptions([]);
    setOption('');
  };
  

 

  useEffect(() => {
    if(addError[0] === 1 && options.length >= 2) {
      SetaddError('');
    }
    else if (addError[0] === 2) {
      if(options[options.length - 1]['correct']) {
        SetaddError('');
      }
    }
    if (success) {
      const timer = setTimeout(() => {
        setSuccess(""); // Reset the success state after a delay
      }, 1500); // Adjust the delay time as needed
      return () => clearTimeout(timer); // Clean up the timer
    }
   
  }, [addError, options.length, select, options, success]);

  const handleAddOption = () => {
    let updatedOptions = [...options]; // Create a copy of options array
    for (let index = 0; index < updatedOptions.length; index++) {
      const currentOption = updatedOptions[index];
      if (currentOption["correct"] && select) {
        updatedOptions[index] = { ...currentOption, correct: false }; // Update correctness
      }
    }
    // Add new option
    setOptions([...updatedOptions, { option: option, correct: select }]);
    setSelect(false);
    setOption("");
    
  };

  const handleDelete = (index) => {
    const updatedOptions = [
      ...options.slice(0, index),
      ...options.slice(index + 1),
    ];

    setOptions(updatedOptions);
  };

  const questionError =
  (question.trim().length < 10 || question.trim().length > 200) ? true : false;

  return (
    <div>
     
      <Paper sx={{ p: 5, my: 2 }} elevation={3}>
        <Box
          sx={{
            "& .MuiTextField-root": { m: 1, width: "100%" },
          }}
        >
          <Typography sx={{ textAlign: "end", fontWeight: "bold" }}>
            Question {index + 1}
          </Typography>
          <TextField
            error={
              question.length && (question.trim().length < 10 || question.trim().length > 200)
                ? true
                : false
            }
            color={
              question.trim().length >= 10 && question.trim().length <= 200 ? "success" : null
            }
            id="outlined-multiline-static"
            required
            placeholder="Enter Quiz Question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            type="text"
            helperText={
              `Question length should be minimum of 10 characters and maximum of 200 characters. ${question.trim().length}/200`
            }
            size="small"
          />
        </Box>
        <FormGroup row sx={{ justifyContent: "center", mt: 2 }}>
          <TextField
            value={option || ""}
            onChange={(e) => setOption(e.target.value)}
            size="small"
            placeholder="Add Option..."
            type="text"
          />
          <FormControlLabel
            sx={{ ml: 2 }}
            label="Correct"
            control={
              <Checkbox
                checkedIcon={<CheckIcon />}
                checked={select}
                color="success"
                label={"correct"}
                onChange={(e) => setSelect(e.target.checked)}
              />
            }
          />
          <IconButton
            onClick={handleAddOption}
            disabled={
              questionError ||
              option.length === 0 ||
              options.length === 4
                ? true
                : false
            }
            color="primary"
          >
            <AddCircleIcon />
          </IconButton>
        </FormGroup>

      
          <Grid container spacing={2}  mt={3}>
            {options.map((option, index) => (
              <Grid ml={4} item xs={5} key={index}>
                <CustomChip text={option.option} handleDelete={handleDelete} correct={option.correct} index={index}/>
              </Grid>
            ))}
          </Grid>
          <Slide in={!!success}>
        <Alert
          severity="info"
        >
          {success}
        </Alert>
      </Slide>
      
        
        {addError && <Alert variant="filled" severity="warning"   sx={{ width:'400px', justifyContent:'center', marginLeft:'277px', marginTop:'24px'}}>{addError[1]}</Alert>}
     
      </Paper>
      <Box sx={{ textAlign: "center"}}>
          <Button
            
            disabled={(titleError|| questionError)}
            sx={{ justifySelf: "center" }}
            onClick={addHandler}
            variant="outlined"
            color="primary"
            startIcon={<AddBoxOutlined />}
          >
            Add Question
          </Button>

        </Box>

    </div>
  );
}
