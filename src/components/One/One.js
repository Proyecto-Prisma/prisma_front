import React, { useEffect, useState } from "react";
import {
  AppBar,
  Avatar,
  Toolbar,
  Typography,
  Button,
  Card,
  Grid,
  Box,
  CardContent,
} from "@mui/material";

import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import howToUse from "../../assets/home/how-to-use.png"; // Adjust the path as necessary
import scopus from "../../assets/db/scopus.png";
import wos from "../../assets/db/wos.png";
import pubmed from "../../assets/db/pubmed.png";
import eric from "../../assets/db/eric.png";
import ieee from "../../assets/db/ieee.png";
import sd from "../../assets/db/science.png";
import jstor from "../../assets/db/jstor.png";
import prismaMock from "../../assets/home/prisma-mock.png"; // Adjust the path as necessary
import videoplace from "../../assets/placeholders/video.gif"; // Adjust the path as necessary

const One = () => {
  const pink = "#FF005B";
  const darkPink = "#C0005E";
  const orange = "#FF3D3E";
  const yellow = "#FFB901";
  const [navbarBg, setNavbarBg] = useState("transparent");

  const handleScroll = () => {
    if (window.scrollY > 50) {
      setNavbarBg("rgba(255, 255, 255, 0.8)");
    } else {
      setNavbarBg("transparent");
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

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

  const team = [
    {
      name: "Dr. Ledo",
      role: "Administrador de Proyecto",
    },
    {
      name: "Salomón Martínez",
      role: "Desarrolador Frontend",
    },
    {
      name: "Arturo Alfaro",
      role: "Desarrollador Backend",
    },
    {
      name: "Arturo Carballo",
      role: "Desarrollador Backend",
    },
    {
      name: "Antonio Cedillo",
      role: "Base de Datos",
    },
  ];

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          backgroundColor: navbarBg,
          boxShadow: "none",
          zIndex: 1300,
          transition: "background-color 0.3s ease-in-out",
        }}
      >
        <Toolbar>
          <img
            src="assets/logo/prisma-logo.png"
            alt="prisma-logo"
            style={{ maxWidth: "4%", margin: "1rem 5rem" }}
          />
          <Box sx={{ flexGrow: 1 }} />
          <a href="/signup">
            <Button
              sx={{
                fontWeight: "bold",
                textTransform: "none",
                color: pink,
                marginRight: "2rem",
                padding: "0.5rem 2rem",
                borderRadius: "1rem",
                border: `2px solid ${pink}`,
                ":hover": {
                  backgroundColor: pink,
                  color: "white",
                },
              }}
            >
              Registro
            </Button>
          </a>
          <a href="/login">
            <Button
              sx={{
                fontWeight: "bold",
                textTransform: "none",
                color: pink,
                marginRight: "5rem",
                padding: "0.5rem 1rem",
                borderRadius: "1rem",
                border: `2px solid ${pink}`,
                ":hover": {
                  backgroundColor: pink,
                  color: "white",
                },
              }}
            >
              Iniciar Sesión
            </Button>
          </a>
        </Toolbar>
      </AppBar>
      <Box sx={{ margin: "3rem 5rem" }}>
        <Grid container spacing={3} mb={5}>
          <Grid item xs={12} md={6}>
            <Typography variant="h1" mb={3} fontSize={"8rem"}>
              <p style={{ fontSize: "2rem", margin: 0, fontWeight: "bold" }}>
                Introduciendo{" "}
              </p>
              <span style={{ color: pink, fontWeight: "bold" }}>PRISMA</span>
              <span
                style={{
                  display: "block",
                  color: "blue",
                  marginTop: "-10px", // Ajusta el valor según sea necesario
                  fontSize: "30px",
                  fontWeight: "bold",
                  marginLeft: "25rem",
                }}
              >
                by Tec
              </span>
            </Typography>

            <Typography
              variant="body1"
              paragraph
              sx={{
                textAlign: "justify",
                fontSize: "25px",
                paddingTop: "2rem",
              }}
            >
              <span style={{ color: pink, fontWeight: "bold" }}>PRISMA </span>
              <span style={{ color: "blue", fontWeight: "bold" }}>
                by Tec
              </span>{" "}
              es un software que ayuda a los investigadores a analizar artículos
              científicos de dos bases de datos, generando un archivo Excel con
              los resultados combinados y proporcionando visualizaciones
              gráficas basadas en los atributos de los artículos.
            </Typography>
            <Box sx={{ textAlign: "center", mt: 5 }}>
              <Button
                href="/prisma"
                sx={{
                  fontWeight: "bold",
                  fontSize: "1rem",
                  textTransform: "none",
                  color: pink,
                  padding: "0.5rem 2rem",
                  borderRadius: "1rem",
                  border: `2px solid ${pink}`,
                  ":hover": {
                    backgroundColor: pink,
                    color: "white",
                  },
                }}
              >
                Probar ahora <ArrowForwardIcon sx={{ marginLeft: 1 }} />
              </Button>
            </Box>
          </Grid>

          <Grid item xs={12} md={6} textAlign={"center"}>
            <img
              src={prismaMock}
              alt="PRISMA Mockup"
              style={{ maxWidth: "100%", height: "85%" }}
            />
          </Grid>
        </Grid>

        <Box mb={10}>
          <Typography
            variant="h2"
            mb={5}
            textAlign={"center"}
            gutterBottom
            sx={{ fontSize: "3rem" }}
          >
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
            mb={10}
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
              style={{ width: "100%", height: "auto", borderRadius: "3rem" }}
            />
          </Box>
        </Box>

        <Box my={4} mb={10}>
          <Typography variant="h3" textAlign={"center"} mb={5} gutterBottom>
            Bases de Datos
          </Typography>
          <Grid container spacing={5}>
            {databases.map((database, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
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
                  <CardContent sx={{ flexGrow: 1, padding: "2rem" }}>
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
                        <Typography
                          variant="body1"
                          style={{ color: orange, fontWeight: "bold" }}
                        >
                          Visitar base de datos
                        </Typography>
                        <ArrowForwardIcon
                          style={{ color: orange, marginLeft: 4 }}
                        />
                      </a>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box mb={10}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6} lg={6}>
              <img
                src={howToUse}
                alt="Ejemplo de búsqueda"
                style={{
                  maxWidth: "100%",
                }}
              />
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <Typography
                variant="h4"
                textAlign="left"
                mb={5}
                sx={{ fontSize: "3rem" }}
              >
                ¿Cómo usar{" "}
                <span style={{ color: pink, fontWeight: "bold" }}>Prisma</span>{" "}
                <span style={{ fontWeight: "bold", color: "blue" }}>
                  by Tec?
                </span>
              </Typography>
              <Typography
                variant="h5"
                color="textPrimary"
                gutterBottom
                sx={{ fontWeight: "bold" }}
              >
                01. Crea tu cuenta
              </Typography>
              <Typography variant="body1" color="textSecondary" paragraph>
                Vincula tu cuenta de correo electrónico con Google y comienza a
                utilizar PRISMA by Tec.
              </Typography>
              <Typography
                variant="h5"
                color="textPrimary"
                gutterBottom
                sx={{ fontWeight: "bold", marginTop: "2rem" }}
              >
                02. Descarga los Artículos
              </Typography>
              <Typography variant="body1" color="textSecondary" paragraph>
                Accede a las bases de datos Scopus y Web of Science y descarga
                los archivos .csv y .xlsx.
              </Typography>
              <Typography
                variant="h5"
                color="textPrimary"
                gutterBottom
                sx={{ fontWeight: "bold", marginTop: "2rem" }}
              >
                03. Sube ambos archivos a PRISMA by Tec.
              </Typography>
              <Typography variant="body1" color="textSecondary" paragraph>
                Completa el formulario de SLR con los archivos descargados, la
                cadena de búsqueda usada y el intervalo de años de la búsqueda.
              </Typography>
              <Typography
                variant="h5"
                color="textPrimary"
                gutterBottom
                sx={{ fontWeight: "bold", marginTop: "2rem" }}
              >
                04. Descarga el archivo de salida.
              </Typography>
              <Typography variant="body1" color="textSecondary" paragraph>
                Exporta el archivo Excel con los resultados combinados de las
                dos bases de datos.
              </Typography>
              <Typography
                variant="h5"
                color="textPrimary"
                gutterBottom
                sx={{ fontWeight: "bold", marginTop: "2rem" }}
              >
                05. Visualiza las gráficas.
              </Typography>
              <Typography variant="body1" color="textSecondary" paragraph>
                Accede a las visualizaciones gráficas de los resultados de tu
                SLR.
              </Typography>
              <Box sx={{ textAlign: "center", mt: 5 }}>
                <Button
                  href="/prisma"
                  sx={{
                    fontWeight: "bold",
                    fontSize: "1rem",
                    textTransform: "none",
                    color: pink,
                    padding: "0.5rem 2rem",
                    borderRadius: "1rem",
                    border: `2px solid ${pink}`,
                    ":hover": {
                      backgroundColor: pink,
                      color: "white",
                    },
                  }}
                >
                  Probar ahora <ArrowForwardIcon sx={{ marginLeft: 1 }} />
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <Box textAlign={"center"} mb={10}>
          <img
            src={videoplace}
            alt="SLR Method Illustration"
            style={{ width: "100%", height: "auto", borderRadius: "3rem" }}
          />
        </Box>
        <Box mb={10}>
          <Typography variant="h3" textAlign="center" mb={5} gutterBottom>
            Equipo de Desarrollo
          </Typography>
          <Grid container spacing={2} justifyContent="center">
            {team.map((member, index) => (
              <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
                <Box textAlign="center">
                  <Avatar
                    sx={{
                      width: 120,
                      height: 120,
                      margin: "0 auto",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                  >
                    {member.name[0]} {/* Muestra la inicial */}
                  </Avatar>
                  <Typography variant="h6" fontWeight="bold" mt={2}>
                    {member.name}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {member.role}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
        <Box
          mb={10}
          sx={{
            backgroundColor: pink, // Color similar al de la imagen
            padding: "6rem 2rem",
            textAlign: "center",
            borderRadius: "2rem",
            boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          }}
        >
          <Typography
            variant="h3"
            fontWeight="bold"
            color="white"
            gutterBottom
            sx={{ mb: 4 }}
          >
            ¿Listo para comenzar?
          </Typography>
          <Button
            href="/prisma"
            variant="outlined"
            size="large"
            sx={{
              color: "white",
              fontWeight: "bold",
              padding: "0.75rem 2rem",
              borderRadius: "1.5rem",
              borderColor: pink,
              textTransform: "none",
              boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
              ":hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                borderColor: "white",
              },
            }}
          >
            Empieza ahora
          </Button>
        </Box>
      </Box>
      {/* Footer */}
      <Box
        sx={{
          backgroundColor: darkPink,
          color: "#ffffff",
          textAlign: "center",
          padding: "5rem 0",
        }}
      >
        <Typography variant="h6" gutterBottom sx={{ fontWeight: "bold" }}>
          PRISMA by Tec
        </Typography>
        <Typography variant="body2" color="white">
          &copy; {new Date().getFullYear()} Todos los derechos reservados.
        </Typography>
      </Box>
    </>
  );
};

export default One;
