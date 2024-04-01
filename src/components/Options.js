import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Grid } from "@mui/material";

export default function Options({ options, selected, setSelected}) {
  

  const handleSelected = (event, selected) => {
    setSelected(selected);
  };

  return (
    <ToggleButtonGroup
      value={selected}
      exclusive
      onChange={handleSelected}
      aria-label="text alignment"
      fullWidth
     
      
    >
      <Grid container spacing={2}>
        {options.map((option, index) => (
          <Grid key={index} item xs={6}>
            <ToggleButton  sx={{borderRadius:'3rem'}} value={index} aria-label="left aligned">
              {option.option}
            </ToggleButton>
          </Grid>
        ))}
      </Grid>
    </ToggleButtonGroup>
  );
}
