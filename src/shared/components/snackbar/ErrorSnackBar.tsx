import { Alert, Snackbar } from "@mui/material";

interface ErrorSnackBarProps {
  error: string;
  open: boolean;
  onClose: () => void;
}

const ErrorSnackBar = (props: ErrorSnackBarProps) => {
  return (
    <Snackbar open={props.open} onClose={props.onClose}>
      <Alert severity="error" onClose={props.onClose}>
        {props.error}
      </Alert>
    </Snackbar>
  );
};

export default ErrorSnackBar;
