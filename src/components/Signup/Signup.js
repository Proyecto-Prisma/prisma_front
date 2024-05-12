import React from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth";
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

const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export default function SignUp() {
  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const idToken = await result.user.getIdToken();
      await axios.post("https://flask-fire-qwreg2y2oq-uc.a.run.app/auth/login", {
        id_token: idToken,
      });
      toast.success("Registration successful! Please login.");
      // Redirect to login page or other action
    } catch (error) {
      toast.error(error.message || "An error occurred during signup.");
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
            Regístrate en PRISMA
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
            Regístrate con Google
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                ¿Ya tienes cuenta? Inicia sesión
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
