import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Card,
  Grid,
  Box,
  CardContent,
  Paper,
} from "@mui/material";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import b1 from "../../assets/images/busq1.png"; // Adjust the path as necessary
import b2 from "../../assets/images/busq2.png"; // Adjust the path as necessary

import scopus from "../../assets/db/scopus.png";
import wos from "../../assets/db/wos.png";
import pubmed from "../../assets/db/pubmed.png";
import eric from "../../assets/db/eric.png";
import ieee from "../../assets/db/ieee.png";
import sd from "../../assets/db/science.png";
import jstor from "../../assets/db/jstor.png";

import slr from "../../assets/images/slr.jpeg"; // Adjust the path as necessary

import videoplace from "../../assets/placeholders/video.gif"; // Adjust the path as necessary

const One = () => {
  const pink = "#FF005B";
  const darkPink = "#C0005E";
  const orange = "#FF3D3E";
  const yellow = "#FFB901";
  const databases = [
    {
      name: "Scopus",
      description:
        "Scopus es una base de datos de referencia multidisciplinaria que proporciona resúmenes y citas de artículos de revistas científicas. Ofrece herramientas de seguimiento, análisis y visualización de investigaciones.",
      logoUrl: scopus,
      link: "https://www.scopus.com",
    },
    {
      name: "Web of Science",
      description:
        "Web of Science ofrece una plataforma integral para citas de investigación y enlaces a textos completos en diversas disciplinas científicas, facilitando el acceso a fuentes de alta calidad para investigadores y académicos.",
      logoUrl: wos,
      link: "https://www.webofscience.com",
    },
    {
      name: "PubMed",
      description:
        "PubMed es una base de datos gratuita gestionada por la National Library of Medicine de EE. UU., que facilita el acceso a la literatura en ciencias de la vida y artículos biomédicos, siendo esencial para profesionales de la salud.",
      logoUrl: pubmed,
      link: "https://www.pubmed.gov",
    },
    {
      name: "ERIC",
      description:
        "ERIC, el Educational Resource Information Center, ofrece una vasta colección de recursos relacionados con la educación, incluyendo artículos de revistas, informes de investigación y otros materiales educativos.",
      logoUrl: eric,
      link: "https://eric.ed.gov",
    },
    {
      name: "IEEE Xplore",
      description:
        "IEEE Xplore es una biblioteca digital líder que proporciona acceso a publicaciones técnicas en ingeniería, tecnología, y áreas relacionadas, ofreciendo artículos, conferencias y estándares de IEEE.",
      logoUrl: ieee,
      link: "https://ieeexplore.ieee.org",
    },
    {
      name: "Science Direct",
      description:
        "Science Direct, plataforma de Elsevier, es líder en proporcionar acceso a literatura científica y técnica, cubriendo una amplia gama de áreas temáticas, desde ciencias físicas e ingeniería hasta ciencias de la vida y ciencias sociales.",
      logoUrl: sd,
      link: "https://www.sciencedirect.com",
    },
    {
      name: "JSTOR",
      description:
        "JSTOR facilita el acceso a una amplia gama de contenido académico en diversas disciplinas, incluyendo miles de revistas académicas, libros y fuentes primarias, apoyando la investigación y el aprendizaje académico.",
      logoUrl: jstor,
      link: "https://www.jstor.org",
    },
  ];

  const steps = [
    {
      title: "Paso 1",
      description:
        "Accede a la página web de la base de datos que deseas consultar.",
      color: orange,
    },
    {
      title: "Paso 2",
      description:
        "Dirígete a la sección de búsqueda e introduce los términos relevantes para tu consulta.",
      color: yellow,
    },
    {
      title: "Paso 3",
      description:
        "Realiza la búsqueda y, posteriormente, localiza y selecciona el botón de descarga.",
      color: darkPink,
    },
    {
      title: "Paso 4",
      description:
        "Descarga los resultados en formato .csv, si está disponible.",
      color: pink,
    },
  ];

  return (
    <>
      <AppBar
        position="static"
        style={{
          background: "transparent",
          boxShadow:
            "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
        }}
      >
        <Toolbar>
          <img
            src="assets/logo/prisma-logo.png"
            alt="prisma-logo"
            style={{ maxWidth: "4%", margin: "1rem 2rem" }}
          />
          <Box style={{ flexGrow: 1 }}></Box>
          <Button
            sx={{
              backgroundColor: pink,
              fontWeight: "bold",
              textTransform: "none",
              color: "white",
              marginRight: "2rem",
              padding: "0.5rem 2rem",
              borderRadius: "1rem",

              ":hover": {
                backgroundColor: darkPink,
              },
            }}
          >
            Registro
          </Button>
          <Button
            sx={{
              backgroundColor: pink,
              fontWeight: "bold",
              textTransform: "none",
              color: "white",
              marginRight: "2rem",
              padding: "0.5rem 1rem",
              borderRadius: "1rem",

              ":hover": {
                backgroundColor: darkPink,
              },
            }}
          >
            Iniciar Sesión
          </Button>
        </Toolbar>
      </AppBar>

      <Box sx={{ margin: "3rem 5rem" }}>
        <Grid container spacing={3} mb={5}>
          <Grid item xs={12} md={6}>
            <Typography variant="h2" mb={3}>
              ¿Qué es{" "}
              <span style={{ color: pink, fontWeight: "bold" }}>PRISMA?</span>
            </Typography>
            <Typography variant="body1" paragraph sx={{ textAlign: "justify" }}>
              El programa PRISMA (Preferred Reporting Items for Systematic
              Reviews and Meta-Analysis) es una metodología establecida en 2009
              por expertos en investigación y epidemiología para mejorar la
              calidad y transparencia de las revisiones sistemáticas. Se ha
              convertido en un estándar reconocido por la comunidad científica y
              adoptado por revistas y organizaciones para la presentación de
              estas revisiones. PRISMA también da nombre a una plataforma web
              diseñada para apoyar a investigadores y académicos en la
              experimentación e investigación, facilitando el análisis y
              presentación gráfica de información a través de procesos como la
              Revisión Sistemática de Literatura (SLR) y la normalización de
              datos. Acepta resultados de diversas bases de datos como World of
              Science, Scopus, IEEE Explore, etc., en formatos variados,
              incluidos valores separados por comas y archivos de texto.
            </Typography>
          </Grid>

          <Grid item xs={12} md={6} textAlign={"center"}>
            <img
              src="assets/logo/prisma-logo.png"
              alt="PRISMA Illustration"
              style={{ maxWidth: "100%", height: "85%" }}
            />
          </Grid>
        </Grid>

        <Grid container spacing={3} alignItems="center" mb={10}>
          <Grid item xs={12} md={6}>
            <Paper
              elevation={3}
              style={{ maxWidth: "90%", overflow: "hidden" }}
            >
              <img
                src={slr}
                alt="SLR Method Illustration"
                style={{ width: "100%", height: "auto" }}
              />
            </Paper>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h2" mb={3}>
              <span style={{ fontWeight: "bold", color: darkPink }}>
                Método SLR:
              </span>{" "}
              Revisión Sistemática de Literatura
            </Typography>
            <Typography variant="body1" paragraph sx={{ textAlign: "justify" }}>
              El método SLR es una técnica esencial para validar documentos
              académicos. SLR, o Revisión Sistemática de la Literatura, es un
              tipo de revisión de la literatura que recopila y analiza
              críticamente múltiples estudios o trabajos de investigación a
              través de un proceso sistemático. Este método se utiliza para
              identificar, evaluar e interpretar el trabajo de investigadores,
              académicos y profesionales en un campo elegido. Este método es
              usado como base para los procesos de la aplicación PRISMA, antes
              de dar los resultados para los investigadores que hacen uso de
              nuestra plataforma.
            </Typography>
          </Grid>
        </Grid>

        <Box mb={10}>
          <Typography variant="h4" mb={3} textAlign={"center"}>
            ¿Cómo hacer una búsqueda en las{" "}
            <span style={{ fontWeight: "bold", color: orange }}>
              bases de datos
            </span>
            ?
          </Typography>
          <Grid
            container
            spacing={4}
            style={{ display: "flex", alignItems: "stretch" }}
            mb={5}
          >
            {steps.map((step, index) => (
              <Grid
                item
                xs={12}
                sm={6}
                md={3}
                key={index}
                style={{ display: "flex" }}
              >
                <Card
                  raised
                  sx={{
                    borderRadius: "1rem",
                    backgroundColor: step.color,
                    color: "white",
                    fontWeight: "bold",
                    width: "100%", // Asegura que la Card ocupe todo el espacio disponible en su Grid item
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardContent sx={{ flex: 1, margin: "3rem" }}>
                    <Typography
                      variant="h5"
                      component="h2"
                      sx={{ fontWeight: "bold" }}
                      gutterBottom
                    >
                      {step.title}
                    </Typography>
                    <Typography variant="body1">{step.description}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
          <Box textAlign={"center"}>
            <img
              src={videoplace}
              alt="SLR Method Illustration"
              style={{ width: "70%", height: "auto", borderRadius: "3rem" }}
            />
          </Box>
        </Box>

        <Box my={4} mb={10}>
          <Typography
            variant="h4"
            textAlign={"center"}
            mb={3}
            fontWeight={"bold"}
          >
            Bases de Datos
          </Typography>
          <Grid container spacing={2}>
            {databases.map((database, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: "1rem",
                    boxShadow:
                      "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
                    height: "100%", // Asegura que la tarjeta llene el contenedor
                  }}
                >
                  <CardContent sx={{ flexGrow: 1, padding: "0.5rem" }}>
                    <Box
                      component="img"
                      src={database.logoUrl}
                      alt={`${database.name} logo`}
                      sx={{
                        maxWidth: "100%",
                        height: 60,
                        display: "block", // Asegura que la imagen no se deforme
                        mx: "auto", // Centra la imagen horizontalmente
                      }}
                    />
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      sx={{ mt: 2, mb: 2 }}
                      textAlign={"justify"}
                    >
                      {database.description}
                    </Typography>
                  </CardContent>
                  <Box
                    sx={{
                      padding: "0.5rem",
                      display: "flex",
                      justifyContent: "end",
                      mb: 2,
                    }}
                  >
                    <a
                      href={database.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        textDecoration: "none",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Typography variant="body1" style={{ color: orange, fontWeight: "bold" }}>
                        Visitar base de datos
                      </Typography>
                      <ArrowForwardIcon
                        style={{ color: orange, marginLeft: 4 }}
                      />
                    </a>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box my={4}>
          <Typography
            variant="h4"
            textAlign={"center"}
            mb={3}
            fontWeight={"bold"}
          >
            Ejemplos de Búsquedas
          </Typography>

          <Grid container spacing={4}>
            <Grid item xs={6}>
              <img
                src={b1}
                alt="Ejemplo 1 de busqueda"
                style={{ maxWidth: "100%", margin: "1rem" }}
              />
            </Grid>
            <Grid item xs={6}>
              <img
                src={b2}
                alt="Ejemplo 2 de busqueda"
                style={{ maxWidth: "100%", margin: "1rem" }}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
    </>
  );
};

export default One;
