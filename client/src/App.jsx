import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "./pages/homePage";
import LoginPage from "./pages/loginPage";
import ProfilePage from "./pages/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
import BackdropUI from "./commons/Backdrop";
import SnackbarComponent from "./commons/Snackbar";
function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  const isLoading = useSelector((state) => state.isLoading);
  const isOpenSnackbar = useSelector((state) => state.isOpenSnackbar);
  const snackbarType = useSelector((state) => state.snackbarType);
  const snackbarMessage = useSelector((state) => state.snackbarMessage);
  return (
    <div className="app">
      <BrowserRouter>
        <BackdropUI isLoading={isLoading}>
          <SnackbarComponent openSnackbar={isOpenSnackbar} message={snackbarMessage} snackbarType={snackbarType}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <Routes>
                <Route path="/" element={<LoginPage />}></Route>
                <Route
                  path="/home"
                  element={isAuth ? <HomePage /> : <Navigate to="/" />}
                ></Route>
                <Route
                  path="/profile/:userId"
                  element={isAuth ? <ProfilePage /> : <Navigate to="/" />}
                ></Route>
              </Routes>
            </ThemeProvider>
          </SnackbarComponent>
        </BackdropUI>
      </BrowserRouter>
    </div>
  );
}

export default App;
