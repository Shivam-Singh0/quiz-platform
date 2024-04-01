import React from "react";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";
import { Alert, Box, Button, Fab, Stack, Switch } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { changeStatus } from "../redux/actions";
import { Link } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditNoteIcon from "@mui/icons-material/EditNote";
import AlertDialogue from "./AlertDialogue";
import FormDilogue from "./FormDilogue";

const Item = styled(Paper)(({ theme, variant }) => ({
  display: "flex",
  backgroundColor: variant === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  color: variant === "dark" ? "white" : theme.palette.text.secondary,
  boxShadow: theme.shadows[6],
  justifyContent: "space-between",
}));

const MyQuiz = () => {
  const dispatch = useDispatch();
  const quizzes = useSelector((state) => state.quizzes);
  const statusHandler = (e, index) => {
    let status = e.target.checked;
    dispatch(changeStatus({ status, index }));
  };

  const [open, setOpen] = React.useState(false);
  const [openForm, setOpenForm] = React.useState(false);
  const [editTitle, setEdititle] = React.useState('');
  const [editDescription, setEdiDescription] = React.useState('');
  const [delIndex, setDelIndex] = React.useState(0);
  const [editIndex, setEdiIndex] = React.useState('');

  const deleteHandler = (index) => {
    setDelIndex(index);
    setOpen(true);
  };

  const editHandler = (index, title, description) => {
    setEdititle(title);
    setEdiDescription(description);
    setEdiIndex(index);
    setOpenForm(true);
  };

  const formCloseHandler = () => {
    setOpenForm(false);
  };

  const closeHandler = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ px: 25, py: 13 }}>
      <FormDilogue
        open={openForm}
        editTitle={editTitle}
        editDescription={editDescription}
        close={formCloseHandler}
        index={editIndex}
        key={`form-${editIndex}`}
      />
      <AlertDialogue
                open={open}
                close={closeHandler}
                index={delIndex}
                key={`Alert-${delIndex}`}
              />
      <Box textAlign={"center"} mb={2}>
        <Button
          startIcon={<EditNoteIcon />}
          component={Link}
          to="/create"
          variant="contained"
          color="primary"
        >
          Create New Quiz
        </Button>
      </Box>
      <Stack spacing={2}>
        <Item variant="dark">
          <Box style={{ width: "10%" }}>Quiz No.</Box>
          <Box style={{ width: "40%" }}>Title</Box>
          <Box style={{ width: "15%" }}>Status</Box>
          <Box style={{ width: "20%" }}>Created On</Box>
          <Box style={{ width: "15%" }}>Actions</Box>
        </Item>
        {quizzes.length > 0 ? (
          quizzes.map((quiz, index) => (
            <Box key={index}>
              <Item>
                <Box style={{ width: "10%" }}>{index + 1}</Box>
                <Box style={{ width: "40%" }}>{quiz.quizTitle}</Box>
                <Box style={{ width: "15%" }}>
                  <Switch
                    onChange={(e) => statusHandler(e, index)}
                    checked={quiz.status}
                    size="small"
                    color="info"
                  />
                </Box>
                <Box style={{ width: "20%" }}>{quiz.createdOn}</Box>
                <Box display={"flex"} gap={1} style={{ width: "15%" }}>
                  <Fab
                    onClick={() => editHandler(index, quiz.quizTitle, quiz.quizDescription)}
                    color="secondary"
                    size="small"
                    aria-label="add"
                  >
                    <EditIcon />
                  </Fab>
                  <Fab
                    onClick={() => deleteHandler(index)}
                    color="error"
                    size="small"
                    aria-label="add"
                  >
                    <DeleteForeverIcon />
                  </Fab>
                </Box>
              </Item>
            </Box>
          ))
        ) : (
          <Alert variant="filled" severity="error">
            No quiz available
          </Alert>
        )}
      </Stack>
    </Box>
  );
};

export default MyQuiz;
