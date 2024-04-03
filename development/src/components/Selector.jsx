import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function BasicSelect(props) {
  const [brand, setBrand] = React.useState('');

  const handleChange = (event) => {
    setBrand(event.target.value);
    props.filter(event.target.value, props.getState(event.target.value), props.getStateSetter(event.target.value));

  };

  if (props.isReset && (brand !== '')) {
    setBrand('');
  }

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl fullWidth disabled={props.getState(brand)} variant="filled">
        <InputLabel id="filterSelect">{props.category}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={brand}
          label={props.category}
          onChange={handleChange}
        >
          <MenuItem value={props.one}>{props.one}</MenuItem>
          <MenuItem value={props.two}>{props.two}</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}

