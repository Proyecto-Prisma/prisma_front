import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { BarChart, Bar, PieChart, Pie, RadarChart, PolarGrid, PolarAngleAxis, Radar, XAxis, YAxis, Tooltip, Legend, LineChart, Line } from 'recharts'; // Agregamos LabelList de recharts
import axios from 'axios';
import {Cell } from 'recharts'; // Importamos las componentes necesarias
import ReactWordcloud from 'react-wordcloud'; // Importamos ReactWordcloud
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'; // Importamos los componentes de react-simple-maps
import customGeoJSON from './custom.geo.json';
import {TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'; // Asegúrate de importar los componentes necesarios de Material-UI


const Graphs = () => {
  const [chartData, setChartData] = useState({
    keywords: [],
    countries: [],
    citedTimes: [],
    authors: [],
    publicationYears: [],
    abstract: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseKeywords = await axios.get('http://82.165.212.88:8000/data/visualize/keywords');
        const responseCountries = await axios.get('http://82.165.212.88:8000/data/visualize/countries');
        const responseCitedTimes = await axios.get('http://82.165.212.88:8000/data/visualize/cited_times');
        const responseAuthors = await axios.get('http://82.165.212.88:8000/data/visualize/authors'); // Agregamos la nueva solicitud para autores
        const responsePublicationYears = await axios.get('http://82.165.212.88:8000/data/visualize/publication_years'); // Agregamos la nueva solicitud para años de publicación
        const responseAbstractKeywords = await axios.get('http://82.165.212.88:8000/data/visualize/abstract'); // Agregamos la nueva solicitud para resúmenes

        setChartData({
          keywords: responseKeywords.data.chart_data,
          countries: responseCountries.data.chart_data,
          citedTimes: responseCitedTimes.data.chart_data,
          authors: responseAuthors.data.chart_data, // Agregamos los datos de autores
          publicationYears: responsePublicationYears.data.chart_data, // Agregamos los datos de años de publicación
          abstract: responseAbstractKeywords.data.chart_data, // Agregamos los datos de resúmenes  
           // Imprimimos los datos de resúmenes en la consola
        });
        console.log('Abstracts:', responseCountries.data.chart_data);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchData();
  }, []);

  const generateRandomColor = () => {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
  };

  const getColorFromFrequency = (frequency) => {
    // Aquí puedes definir tu lógica para asignar colores basados en la frecuencia
    // Por ejemplo, puedes asignar un rango de colores basado en la frecuencia
    // Cuanto mayor sea la frecuencia, más oscuro será el color, etc.
    // Por simplicidad, aquí utilizaremos un gradiente de azul a rojo basado en la frecuencia
    const maxFrequency = 100; // Este es solo un valor de ejemplo, puedes ajustarlo según tus datos
    const minColor = [0, 0, 255]; // Azul
    const maxColor = [255, 0, 0]; // Rojo
    
    // Calculamos el color interpolando entre minColor y maxColor según la frecuencia
    const color = maxColor.map((max, i) => Math.round((max - minColor[i]) * (frequency / maxFrequency) + minColor[i]));
  
    // Convertimos el color a formato hexadecimal
    return `rgb(${color.join(',')})`;
  };

  const options = {
    rotations: 0,
    rotationAngles: [0],
    fontSizes: [40, 60],
  };

  return (
    <Box mt={4}>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <Typography variant="h4" mb={4}>
            Gráficas de lectura SLR
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Button
            variant="contained"
            color="primary"
            style={{ float: "right" }}
            sx={{
              backgroundColor: "#FF005B",
              fontWeight: "bold",
              textTransform: "none",
              ":hover": {
                backgroundColor: "#C0005E",
              },
            }}
          >
            Descargar
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ padding: 16, borderRadius: "1rem" }}>
            <Typography variant="h6" gutterBottom>
              Keywords Frequency
            </Typography>
            <BarChart width={400} height={300} data={chartData.keywords}>
              <Bar dataKey="frequency">
                {
                  chartData.keywords.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={generateRandomColor()} />
                  ))
                }
              </Bar>
              <XAxis dataKey="keyword" />
              <YAxis />
              <Tooltip />
              <Legend />
            </BarChart>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ padding: 16, borderRadius: "1rem" }}>
            <Typography variant="h6" gutterBottom>
              Countries
            </Typography>
            <PieChart width={400} height={300}>
              <Pie
                data={chartData.countries}
                dataKey="frequency"
                nameKey="country"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {
                  chartData.countries.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={generateRandomColor()} />
                  ))
                }
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ padding: 16, borderRadius: "1rem" }}>
            <Typography variant="h6" gutterBottom>
              Radar Chart
            </Typography>
            <RadarChart width={400} height={300} data={chartData.keywords}>
              <PolarGrid />
              <PolarAngleAxis dataKey="keyword" />
              <Radar
                dataKey="frequency"
                stroke="#F06292"
                fill="#F06292"
                fillOpacity={0.6}
                label={{
                  position: 'outside', // Puedes cambiar 'top' a 'inside' o 'outside' según tus preferencias
                  offset: 50, // Ajusta este valor para cambiar la distancia entre el label y el punto de la gráfica
                }}
              />
              <Tooltip />
            </RadarChart>
          </Paper>
        </Grid>


        <Grid item xs={12} md={8}>
        <Paper elevation={3} style={{ padding: 16, borderRadius: "1rem" }}>
          <Typography variant="h6" gutterBottom>
            Keywords LineChart
          </Typography>
          <LineChart width={800} height={300} data={chartData.keywords}>
            <XAxis dataKey="keyword" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="frequency" stroke="#FF7043" label={{ position: 'top' }} />
          </LineChart>
        </Paper>
      </Grid>

        <Grid item xs={12} md={8}>
          <Paper elevation={3} style={{ padding: 16, borderRadius: "1rem" }}>
            <Typography variant="h6" gutterBottom>
              Cited Times Chart
            </Typography>
            <BarChart width={800} height={300} data={chartData.citedTimes}>
              <Bar dataKey="cited_times" fill="#BA68C8" />
              <XAxis dataKey="title" />
              <YAxis />
              <Tooltip cursor={{ fill: 'transparent' }} />
              <Legend />
            </BarChart>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper elevation={3} style={{ padding: 16, borderRadius: "1rem" }}>
            <Typography variant="h6" gutterBottom>
              Publication Years
            </Typography>
            <LineChart width={800} height={300} data={chartData.publicationYears}>
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="frequency" stroke="#FF7043" label={{ position: 'top' }} />
            </LineChart>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper elevation={3} style={{ padding: 16, borderRadius: "1rem" }}>
            <Typography variant="h6" gutterBottom>
              Authors
            </Typography>
            <PieChart width={800} height={300}>
              <Pie
                data={chartData.authors}
                dataKey="frequency"
                nameKey="author"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {
                  chartData.authors.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={generateRandomColor()} />
                  ))
                }
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Paper>
        </Grid>

        <Grid container spacing={3}>
          <Grid item xs={6} md={12}>
            <Paper elevation={3} style={{ padding: 16, borderRadius: '1rem' }}>
              <Typography variant="h6" gutterBottom>
                Nube de palabras del abstract
              </Typography>
              <div style={{ height: 400 }}> {/* Altura ajustable según sea necesario */}
                <ReactWordcloud words={chartData.abstract} options={options} />
    
              </div>
            </Paper>
          </Grid>
        </Grid>

        
        <Grid container spacing={3}>
  <Grid item xs={12} md={6}>
    <Paper elevation={3} style={{ padding: 16, borderRadius: "1rem" }}>
      <Typography variant="h6" gutterBottom>
        Países
      </Typography>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{ scale: 120 }}
        width={800}
        height={500}
      >
        <Geographies geography={customGeoJSON}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const countryName = geo.properties && geo.properties.name ? geo.properties.name.trim().toUpperCase() : null;
              const listNames = chartData.countries.map((data) => data.country.toUpperCase());

              console.log('Country Name:', countryName);
              console.log('List Names:', listNames);

              // Verificar si el nombre del país está en la lista de nombres
              const isInList = listNames.includes(countryName);

              // Si el país está en la lista, colorearlo, de lo contrario, dejarlo gris
              const fillColor = isInList ? getColorFromFrequency(chartData.countries.find((data) => data.country.toUpperCase() === countryName).frequency) : '#cccccc';

              // Obtener el valor de la frecuencia para la etiqueta
              const frequencyLabel = chartData.countries.find((data) => data.country.toUpperCase() === countryName)?.frequency;

              return (
                <React.Fragment key={geo.rsmKey}>
                  <Geography
                    geography={geo}
                    fill={fillColor}
                    style={{
                      hover: {
                        fill: '#F53',
                        outline: 'none',
                      },
                    }}
                  />
                  {frequencyLabel && geo.centroid && (
                    <text
                      x={geo.centroid[0]}
                      y={geo.centroid[1]}
                      style={{
                        fontFamily: 'Arial, sans-serif',
                        fontSize: '10px',
                        fill: '#000',
                        pointerEvents: 'none',
                        userSelect: 'none',
                      }}
                      textAnchor="middle"
                    >
                      {frequencyLabel}
                    </text>
                  )}
                </React.Fragment>
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </Paper>
  </Grid>

  {/* Datos de frecuencia de países */}
  <Grid item xs={12} md={6}>
    <Paper elevation={3} style={{ padding: 16, borderRadius: '1rem' }}>
      <Typography variant="h6" gutterBottom>
        Frecuencia de Países
      </Typography>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>País</TableCell>
              <TableCell align="right">Frecuencia</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {chartData.countries.map((countryData, index) => (
              <TableRow key={index}>
                <TableCell>{countryData.country}</TableCell>
                <TableCell align="right">
                  <span style={{ fontWeight: 'bold', color: countryData.frequency > 50 ? 'red' : 'inherit' }}>
                    {countryData.frequency}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Paper>
  </Grid>
</Grid>




      </Grid>
    </Box>
  );
};

export default Graphs;
