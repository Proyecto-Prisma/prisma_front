import React, { useState, useContext } from "react";  // Import useContext if you're using context
import  AuthContext  from '../../AuthContext.js';
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useNavigate } from "react-router-dom"; // Updated import
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "./../../firebaseConfig";

// Crear un tema personalizado
const theme = createTheme({
  palette: {
    primary: {
      main: "#FF005B", // Color rosa personalizado
    },
  },
  components: {
    // Personalización global para todos los MuiTextField
    MuiTextField: {
      defaultProps: {
        // Aplicar el color de enfoque al color primario del tema
        InputLabelProps: {
          color: "primary",
        },
        InputProps: {
          sx: {
            "&.Mui-focused fieldset": {
              borderColor: "#FF005B", // Cambiar el color del borde al enfocarse
            },
          },
        },
      },
    },
  },
});
function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://tec.mx/es">
        Tecnológico de Monterrey
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}
const pink = "#FF005B";
const darkPink = "#C0005E";

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default function Login() {
  const navigate = useNavigate();
  const { setAuthData } = useContext(AuthContext);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      const response = await axios.post("https://flask-fire-qwreg2y2oq-uc.a.run.app/auth/login", {
        id_token: idToken,
      });
      const { uid } = response.data;
      setAuthData({ token: idToken, uid });
      toast.success("Login successful");
      navigate("/prisma");
    } catch (error) {
      toast.error(error.message || "An error occurred.");
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <img
              src="assets/logo/prisma-logo.png"
              alt="prisma-logo"
              style={{ maxWidth: "50%" }}
            />
          </div>
          <Typography component="h1" variant="h5">
            Bienvenido, inicia sesión
          </Typography>
          <Button
            onClick={handleGoogleSignIn}
            fullWidth
            variant="contained"
            sx={{
              mt: 3,
              mb: 2,
              backgroundColor: "#FF005B",
              "&:hover": {
                backgroundColor: "#C0005E",
              },
            }}
          >
            Iniciar sesión con Google
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/signup" variant="body2" sx={{ color: "#C0005E" }}>
                {"¿No tienes cuenta? Regístrate"}
              </Link>
            </Grid>
          </Grid>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
        <ToastContainer position="top-center" />
      </Container>
    </ThemeProvider>
  );
}
