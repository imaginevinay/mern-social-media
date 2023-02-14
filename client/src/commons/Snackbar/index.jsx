import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { forwardRef } from "react";


const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackbarComponent = ({
  openSnackbar,
  message,
  snackbarType,
  children,
}) => {
  return (
    <div>
      <Snackbar open={openSnackbar} autoHideDuration={6000}>
        {snackbarType === "success" ? (
          <Alert severity="success" sx={{ width: "100%" }}>
            {message}
          </Alert>
        ) : (
          <Alert severity="error" sx={{ width: "100%" }}>
            {message}
          </Alert>
        )}
      </Snackbar>
      {children}
    </div>
  );
};

export default SnackbarComponent;
