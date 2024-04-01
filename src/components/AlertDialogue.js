import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import WarningAmberSharpIcon from "@mui/icons-material/WarningAmberSharp";
import { Box, ThemeProvider } from "@mui/material";
import { deleteQuiz } from "../redux/actions";
import { useDispatch } from "react-redux";
import theme from "./theme";
export default function AlertDialogue({ open, index, close }) {
  const dispatch = useDispatch();

  const deleteHandler = () => {
    dispatch(deleteQuiz({ index }));
    close();
  };

  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        <Dialog
          open={open}
          onClose={close}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <Box sx={{p:5}} display={'flex'} flexDirection={'column'} alignItems={'center'}>
          <WarningAmberSharpIcon
            color="customWarningColor"
            sx={{ fontSize: "100px" }}
          />
          <DialogTitle lineHeight={0} id="alert-dialog-title">
            Are You Sure Want to delete this?
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Deleting this would lead to permanent loss of quiz.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button color="light" variant="contained" onClick={close}>
              NO
            </Button>
            <Button
              style={{ color: "white" }}
              color="customWarningColor"
              variant="contained"
              onClick={deleteHandler}
              autoFocus
            >
              YES
            </Button>
          </DialogActions>
          </Box>
        </Dialog>
      </ThemeProvider>
    </React.Fragment>
  );
}
