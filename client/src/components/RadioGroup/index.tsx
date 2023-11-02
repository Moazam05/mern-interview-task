import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";

interface RadioGroupFieldProps {
  value: string; 
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: (event: React.FocusEvent<HTMLInputElement>) => void;
}
const RadioGroupField: React.FC<RadioGroupFieldProps> = ({
  value,
  onChange,
  onBlur,
}) => {
  return (
    <FormControl>
      <RadioGroup
        row
        name="city"
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      >
        <FormControlLabel value="Lahore" control={<Radio />} label="Lahore" />
        <FormControlLabel value="Karachi" control={<Radio />} label="Karachi" />
      </RadioGroup>
    </FormControl>
  );
};

export default RadioGroupField;
