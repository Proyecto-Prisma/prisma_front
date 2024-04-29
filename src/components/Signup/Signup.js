import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";

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

export default function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const pink = "#FF005B";
  const darkPink = "#C0005E";

  const handleSubmit = async (event) => {
    event.preventDefault();
    const config = {
      headers: {
        'Content-Type': 'application/json',
      },
    };
    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      await axios.post("https://flask-fire-qwreg2y2oq-uc.a.run.app/auth/signup", {
        email,
        password,
        config
      });
      toast.success("Registration successful! Please login.");
      // Redirect to login page or other action
    } catch (error) {
      toast.error(
        error.response?.data?.error || "An error occurred during signup."
      );
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
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Correo institucional"
                  name="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirmPassword"
                  label="Confirmar contraseña"
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: pink, // Change to the desired color
                "&:hover": {
                  backgroundColor: darkPink, // Change to the desired hover color
                },
              }}
            >
              Regístrate
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  ¿Ya tienes cuenta? Inicia sesión
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
        <ToastContainer position="top-center" />
      </Container>
    </ThemeProvider>
  );
}
