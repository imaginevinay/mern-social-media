import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { forwardRef } from "react";
import { useDispatch } from "react-redux";
import { setSnackBar } from "../../state";


const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackbarComponent = ({
  openSnackbar,
  message,
  snackbarType,
  children,
}) => {
  const dispatch = useDispatch();
  return (
    <div>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={() => dispatch(setSnackBar({isOpenSnackbar : false}))}>
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
