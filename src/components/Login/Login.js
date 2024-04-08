import React, { useState } from "react";
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

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); // Updated to useNavigate
  // const { setAuthData } = useContext(AuthContext); // If using context for auth state

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post("http://82.165.212.88:8000/auth/login", {
        email,
        password,
      });
      toast.success(response.data.message);
      // Navigate to dashboard or another page upon successful login
      navigate("/prisma"); // Update this path as needed
    } catch (error) {
      toast.error(error.response?.data?.error || "An error occurred.");
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
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Correo institucional"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Contraseña"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Recuérdame"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{
                mt: 3,
                mb: 2,
                backgroundColor: pink,
                "&:hover": {
                  backgroundColor: darkPink,
                },
              }}
            >
              Iniciar sesión
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2" sx={{ color: darkPink }}>
                  ¿Olvidaste tu contraseña?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/signup" variant="body2" sx={{ color: darkPink }}>
                  {"¿No tienes cuenta? Regístrate"}
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
