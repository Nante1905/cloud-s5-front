import { Alert, Snackbar } from "@mui/material";

interface SuccessSnackBarProps {
  message: string;
  open: boolean;
  onClose: () => void;
}

const SuccessSnackBar = (props: SuccessSnackBarProps) => {
  return (
    <Snackbar open={props.open} onClose={props.onClose}>
      <Alert severity="success" onClose={props.onClose}>
        {props.message}
      </Alert>
    </Snackbar>
  );
};

export default SuccessSnackBar;
