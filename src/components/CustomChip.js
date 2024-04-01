import * as React from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import { Chip } from "@mui/material";

export default function CustomChip({ text, handleDelete, correct, index }) {
  return (
    <Chip
    sx={{
        '& .MuiChip-deleteIcon': {
          color: 'red',
        },
        width : '100%',
      }}
      label={text}
      onDelete={() => handleDelete(index)}
      deleteIcon={<DeleteIcon  />}
      variant="outlined"
      color={correct ? 'success':'primary'}   />
  );
}