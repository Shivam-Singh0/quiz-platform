import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import theme from './theme';
import { ThemeProvider } from '@emotion/react';
import { updateQuiz } from '../redux/actions';
import { useDispatch } from 'react-redux';

export default function FormDilogue({ open, index, close, editTitle: title, editDescription: description }) {
  const dispatch = useDispatch();
  const [quizTitle, setQuizTitle] = React.useState(title);
  const [quizDescription, setQuizDescription] = React.useState(description);
  const [titleError, setTitleError] = React.useState(false);

  const validateTitle = (title) => {
    return title.trim().length >= 10 && title.trim().length <= 30;
  };

  const handleTitleChange = (event) => {
    const newTitle = event.target.value;
    setQuizTitle(newTitle);
    setTitleError(!validateTitle(newTitle));
  };

  const submitHandler = (index) => {
    dispatch(updateQuiz({index, quizTitle, quizDescription}))
    close();
  };

  return (
    <React.Fragment  >
      <ThemeProvider theme={theme}>
      <Dialog
        open={open}
        onClose={close}
        
        PaperProps={{
          component: 'form',
          onSubmit: (event) => {
            event.preventDefault();
            submitHandler(index);
          },
        }}
       
      >
        <DialogTitle>Update Quiz</DialogTitle>
        <DialogContent sx={{width:'279px'}}>
          <TextField
            onChange={handleTitleChange}
            color='purple'
            focused
            required
            margin="dense"
            label="Quiz Title"
            type="text"
            fullWidth
            variant="outlined"
            value={quizTitle}
            error={quizTitle.length > 0 && titleError}
            helperText={quizTitle && titleError ? "Title should be 10 and 30 characters long" : ""}
          />
        </DialogContent>
        <DialogContent sx={{width:'279px'}}>
          <TextField

            onChange={(e) => setQuizDescription(e.target.value)}
            color='purple'
            focused
            margin="dense"
            label="Quiz Description"
            type="text"
            fullWidth
            multiline
            rows={4}
            variant="outlined"
            value={quizDescription}
          />
        </DialogContent>
        <DialogActions>
          <Button  variant='contained' color='light' onClick={close} >Cancel</Button>
          <Button variant='contained' style={{ color: "white" }} color='purple' type="submit" disabled={!validateTitle(quizTitle)}>Submit</Button>
        </DialogActions>
      </Dialog>
      </ThemeProvider>
    </React.Fragment>
  );
}
