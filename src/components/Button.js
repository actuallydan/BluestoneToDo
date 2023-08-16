import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { BORDER_RADIUS } from '../config/styles';

const StyledButton = styled(Button)({
    textTransform: 'none',
    fontWeight: "bold",
    borderRadius: BORDER_RADIUS,
});

export default function CustomButton({ children, ...props }) {
    return (
        <StyledButton
            variant='contained'
            size="small"
            {...props}>
            {children}
        </StyledButton>
    )
}