import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Card,
  Grid,
  Box,
  CardContent,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const One = () => {
  const pink = "#FF005B";
  const darkPink = "#C0005E";
  const databases = [
    {
      name: "Scopus",
      description:
        "Scopus es una base de datos multidisciplinaria con resúmenes y citas de artículos de revistas científicas.",
    },
    {
      name: "Web of Science",
      description:
        "Web of Science ofrece acceso a citas de investigación y enlaces a textos completos en diversas disciplinas científicas.",
    },
    {
      name: "PubMed",
      description:
        "PubMed es una base de datos gratuita de la literatura en ciencias de la vida y artículos biomédicos.",
    },
    {
      name: "ERIC",
      description:
        "ERIC proporciona acceso a una amplia gama de información relacionada con la educación.",
    },
    {
      name: "IEEE Xplore",
      description:
        "IEEE Xplore es una biblioteca digital que ofrece acceso a publicaciones técnicas en ingeniería y tecnología.",
    },
    {
      name: "Science Direct",
      description:
        "Science Direct es una plataforma líder de literatura científica y técnica que cubre una amplia gama de temas.",
    },
    {
      name: "JSTOR",
      description:
        "JSTOR proporciona acceso a miles de revistas académicas, libros y fuentes primarias en diversas disciplinas.",
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
      <Typography variant="h2" gutterBottom>
          ¿Que es PRISMA?
        </Typography>
        <Typography variant="body1" paragraph>

          El programa PRISMA o su nombre completo Preferred Reporting Items for Systematic Review and Meta-Analysis, 
          consiste en un algoritmo enfocado en la revisión Sistematica de trabajos, con el objetivo de analizar toda la evidencia
          relacionada al trabajo, esta fue creada en 2009 por un grupo de expertos en metodología de la investigación y 
          epidemiología con el objetivo de mejorar la calidad y la transparencia de las revisiones sistemáticas. 
          
          Desde entonces, se ha convertido en una referencia ampliamente aceptada en la comunidad científica y 
          ha sido adoptado por numerosas revistas y organizaciones como estándar para la presentación de revisiones sistemáticas.


          
          Igualmente es el nombre que lleva nuestra plataforma web enfocada en el apoyo a investigadores o personas interesadas en los 
          aspectos academicos como pueden ser experimentación e investigación. 

          PRISMA se encarga de analizar y presentar la informacion cargada por el usuario de una forma grafica y simple mediante 
          procesos como pueden ser el SLR o Revisión Sistematica de Literatura y la normalización para procesar y graficar los datos.

          Este acepta resultados de busqueda de varias bases de datos como puede ser World of Science, Scopus, IEEExplore, entre otros.
          El formato de estos resultados pueden ser de varios tipos, como lo puede ser valores separados por comas o archivos de texto.

     
         
        </Typography>

        <Typography variant="h2" gutterBottom>
          Método SLR: Revisión Sistemática de Literatura
        </Typography>
        <Typography variant="body1" paragraph>
        El método SLR es una técnica esencial para validar documentos académicos. SLR, o Revisión Sistemática de la Literatura, 
        es un tipo de revisión de la literatura que recopila y analiza críticamente múltiples estudios o trabajos de investigación 
        a través de un proceso sistemático.

        Este método se utiliza para identificar, evaluar e interpretar el trabajo de investigadores, académicos y profesionales 
        en un campo elegido.

        Este metodo es usado como base para los procesos de la aplicación PRISMA, antes de dar los resultados para los investigadores que hacen
        uso de nuestra plataforma.

        </Typography>

        <Accordion>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>Instrucciones para Búsquedas</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>
              Aquí se explican los pasos detallados para realizar búsquedas, toma en nota que algunas bases de datos piden alguna
              membresia o cuenta academica para acceder o descargar los datos.

              1. Entra a la pagina web de la base de datos que deseas consultar
              2. Busca la sección de busqueda e ingresa los conceptos que deseas consultar
              3.Tras la busqueda, busca el botón de descarga
              4. Descarga todos los apartados y en formato .csv, si posible.

              {/* {Aqui se debe insertar el video terminado de la explicacion de las busquedas y como descargarlas.} */}
            </Typography>
          </AccordionDetails>
        </Accordion>

        <Box my={4}>
          <Typography variant="h4" gutterBottom>
            Bases de Datos
          </Typography>
          <Grid container spacing={2}>
            {databases.map((database, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  sx={{
                    borderRadius: "1rem",
                    boxShadow:
                      "0px 2px 4px -1px rgba(0,0,0,0.2), 0px 4px 5px 0px rgba(0,0,0,0.14), 0px 1px 10px 0px rgba(0,0,0,0.12)",
                    padding: "0.5rem",
                  }}
                >
                  <CardContent>
                    <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                      {database.name}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {database.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        <Box my={4}>
          <Typography variant="h5">Ejemplos de Búsquedas</Typography>
          <Typography variant="body1" paragraph>
            En estas imagenes se presentan algunos ejemplos de busquedas mencionados en los videos y textos previos. 
          </Typography>
          <img
            src="assets/images/busq1.png"
            alt="Ejemplo 1 de busqueda"
            style={{ maxWidth: "50%", margin: "1rem 2rem" }}
          />

          <img
            src="assets/images/busq2.png"
            alt="Ejemplo 2 de busqueda"
            style={{ maxWidth: "50%", margin: "1rem 2rem" }}
          />
        </Box>
      </Box>
    </>
  );
};

export default One;
