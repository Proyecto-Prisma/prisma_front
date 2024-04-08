import React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FileUpload from "../FileUpload/FileUpload";
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

const Home = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box mt={4}>
        <Typography variant="h4" gutterBottom sx={{ fontWeight: "bold", fontSize: "50px" }}>
          Herramienta SLR
        </Typography>
        <Typography variant="body1" paragraph sx={{ paddingBottom: "3rem", fontSize: "20px", color: "gray" }}>
          ¡Bienvenido a la página de carga de archivos! Aquí puedes subir tus
          documentos para comenzar tu revisión sistemática de literatura.
          Simplemente selecciona tus archivos utilizando los formularios a
          continuación. Establece tu cadena de búsqueda y los años de inicio y
          fin para afinar tu investigación. Comencemos.
        </Typography>

        <Grid container spacing={3} sx={{ marginBottom: "2rem" }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Cadena de búsqueda"
              placeholder="Cadena de búsqueda"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              type="number"
              label="Año de Inicio"
              placeholder="YYYY"
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <TextField
              fullWidth
              type="number"
              label="Año de Fin"
              placeholder="YYYY"
              variant="outlined"
            />
          </Grid>
        </Grid>

        <Box>
          <FileUpload />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default Home;
