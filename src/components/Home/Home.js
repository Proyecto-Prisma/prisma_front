import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";
import DropFile from "./DropFile";
import Button from "@mui/material/Button";

const Home = () => {
  const pink = "#FF005B";
  const darkPink = "#C0005E";
  const [showScopus, setShowScopus] = useState(true);
  const [showWos, setShowWos] = useState(true);

  return (
    <Box mt={4}>
      <Typography variant="h4" gutterBottom>
        Herramienta SLR
      </Typography>
      <Typography variant="body1" paragraph sx={{ paddingBottom: "3rem" }}>
        Welcome to the file upload page! Please select your files using the
        forms below.
      </Typography>

      {/* New Inputs for Indice de búsqueda and Year */}
      <Grid container spacing={3} sx={{ marginBottom: "2rem" }}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            label="Cadena de búsqueda"
            placeholder="Cadena de busqueda"
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

      <Grid container spacing={3} alignItems="center" justifyContent="center">
        <Grid item>
          <FormControlLabel
            control={
              <Switch
                checked={showScopus}
                onChange={() => setShowScopus(!showScopus)}
                sx={{ color: pink}}

              />
            }
            label="Mostrar ARCHIVO SCOPUS"
          />
        </Grid>
        <Grid item>
          <FormControlLabel
            control={
              <Switch checked={showWos} onChange={() => setShowWos(!showWos)} />
            }
            label="Mostrar ARCHIVO WOS"
          />
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {showScopus && (
          <Grid item xs={12} md={6}>
            <Paper elevation={3} style={{ padding: 16, borderRadius: "1rem" }}>
              <Typography variant="h6" gutterBottom>
                ARCHIVO SCOPUS
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph>
                Ingrese su archivo SCOPUS en formato .xlsx
              </Typography>
              <div style={{ marginLeft: "8rem" }}>
                <DropFile
                  onFileChange={(files) => console.log("Form 1 files:", files)}
                />
              </div>
            </Paper>
          </Grid>
        )}
        {showWos && (
          <Grid item xs={12} md={6}>
            <Paper elevation={3} style={{ padding: 16, borderRadius: "1rem" }}>
              <Typography variant="h6" gutterBottom>
                ARCHIVO WOS
              </Typography>
              <Typography variant="body2" color="textSecondary" paragraph>
                Ingrese su archivo WOS en formato .csv
              </Typography>
              <div style={{ marginLeft: "8rem" }}>
                <DropFile
                  onFileChange={(files) => console.log("Form 2 files:", files)}
                />
              </div>
            </Paper>
          </Grid>
        )}
      </Grid>

      <div style={{ marginTop: "2rem", textAlign: "center" }}>
        <Button
          variant="contained"
          size="large"
          sx={{
            backgroundColor: pink,
            fontWeight: "bold",
            textTransform: "none",
            padding: "0.5rem 4rem",
            ":hover": {
              backgroundColor: darkPink,
            },
          }}
        >
          Ejecutar SLR
        </Button>
      </div>
    </Box>
  );
};

export default Home;
