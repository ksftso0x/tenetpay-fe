import { styled } from "@mui/material/styles";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import { OutlinedInputProps } from "@mui/material/OutlinedInput";

const ReusedTextField = styled((props: TextFieldProps) => (
  <TextField
    InputLabelProps={{ style: { color: "gray" } }}
    InputProps={{ disableUnderline: true } as Partial<OutlinedInputProps>}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiFilledInput-root": {
    border: "1.5px solid gray",
    overflow: "hidden",
    borderRadius: 4,
    background: "white",
    fontWeight: "semibold",
    transition: theme.transitions.create([
      "border-color",
      "background-color",
      "box-shadow",
    ]),
    //   "&.Mui-focused": {
    //     borderColor: "#f47646",
    //   },
  },
}));
export default ReusedTextField;
