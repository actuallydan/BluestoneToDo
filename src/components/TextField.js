import TextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { BORDER_RADIUS, colors } from '../config/styles';

const StyledTextField = styled(TextField)({
    "& .MuiOutlinedInput-notchedOutline": {
        borderColor: colors.lightGray,
        borderRadius: BORDER_RADIUS,
    },
});

export default function CustomTextField({ ...props }) {
    return (
        <StyledTextField
            variant="outlined"
            {...props}
        />
    )
}