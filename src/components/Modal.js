import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#000000',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          '&:hover': {
            backgroundColor: '#1976d2', // Blue hover color
          },
          '&:active': {
            backgroundColor: '#1976d2', // Blue click color
          },
          textTransform: 'none',
        },
      },
    },
  },
});

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: 'none',
  boxShadow: 24,
  borderRadius: '8px',
  p: 4,
  outline: 'none',
};

const Buttons = [
  { label: 'MCQ', sub: '(single answer)', variant: 'outlined' },
  { label: 'MCQ',sub: '(multiple answers)', variant: 'outlined' },
  { label: 'Short Answer', variant: 'outlined' },
  { label: 'Description', variant: 'outlined' }
];

export default function BasicModal({selectedType}) {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);
  const HandleSelect = (value) => {
    selectedType(value);
    handleClose();
  }

  return (
    <div>
      <ThemeProvider theme={theme}>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography sx={{fontWeight:'bold'}}  >
              Select Question Type
            </Typography>
            {Buttons.map((button, index) => (
              <Button onClick={() => HandleSelect(`${button.label}${button.sub}`)} key={index} variant={button.variant} sx={{mr:2, mt:2}}  color='primary'>{button.label} <Box  
              style={{ fontSize: '10px' }} sx={{  fontWeight: 'light',fontStyle: 'italic'  }} >{button.sub}</Box></Button>
            ))}
          </Box>
        </Modal>
      </ThemeProvider>
    </div>
  );
}
