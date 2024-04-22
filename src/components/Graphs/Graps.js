import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { BarChart, Bar, PieChart, Pie, RadarChart, PolarGrid, PolarAngleAxis, Radar, XAxis, YAxis, Tooltip, LabelList, Legend, LineChart, Line } from 'recharts';
import axios from 'axios';
import { Cell } from 'recharts';
import ReactWordcloud from 'react-wordcloud';
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
import { Chart } from "react-google-charts";


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
        const responses = await Promise.all([
          axios.get('http://127.0.0.1:5000/data/visualize/keywords'),
          axios.get('http://127.0.0.1:5000/data/visualize/countries'),
          axios.get('http://127.0.0.1:5000/data/visualize/cited_times'),
          axios.get('http://127.0.0.1:5000/data/visualize/authors'),
          axios.get('http://127.0.0.1:5000/data/visualize/publication_years'),
          axios.get('http://127.0.0.1:5000/data/visualize/abstract'),
        ]);

        const chartData = {
          keywords: responses[0].data.chart_data,
          countries: responses[1].data.chart_data,
          citedTimes: responses[2].data.chart_data,
          authors: responses[3].data.chart_data,
          publicationYears: responses[4].data.chart_data,
          abstract: responses[5].data.chart_data,
        };
          

        setChartData(chartData);
        console.log("Datos recibidos para países:", chartData.countries);
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchData();
  }, []);

  const generateRandomColor = () => {
    return '#' + Math.floor(Math.random()*16777215).toString(16);
  };


  const options = {
    rotations: 0,
    rotationAngles: [0],
    fontSizes: [40, 60],
  };

  const data = [
    ['Country', 'Popularity'],
    ...chartData.countries.map((countryData) => [countryData.country, countryData.frequency]),
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FFC0CB']; // Puedes agregar más colores según sea necesario

  return (
    <Box mt={4} mx={4}>
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

      <Typography variant="h5" mt={4} mb={2}>
        Seccion 1
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: 16, borderRadius: "1rem" }}>
            <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
              Keywords Frequency
            </Typography>
            <BarChart
              width={450}
              height={400}
              data={chartData.keywords}
              margin={{ bottom: 50, left: 50}}
            >
              <Bar dataKey="frequency">
                {chartData.keywords.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={generateRandomColor()} />
                ))}
                <LabelList dataKey="frequency" position="top" />
              </Bar>
              <XAxis dataKey="keyword" angle={-45} textAnchor="end" interval={0} height={100} />
              <YAxis />
              <Tooltip />
            </BarChart>
          </Paper>
        </Grid>


        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: 16, borderRadius: "1rem" }}>
            <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
              Keywords Frequency
            </Typography>
            <RadarChart width={600} height={300} margin={{ bottom: 50, left: 50}} data={chartData.keywords}>
              <PolarGrid />
              <PolarAngleAxis dataKey="keyword" />
              <Radar
                dataKey="frequency"
                stroke="#F06292"
                fill="#F06292"
                fillOpacity={0.6}
                label={{
                  position: 'inside', 
                  offset: 5, 
                }}
              />
              <Tooltip />
            </RadarChart>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper elevation={3} style={{ padding: 16, borderRadius: "1rem" }}>
            <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
              Keywords Pie Chart
            </Typography>
            <PieChart width={450} height={400}>
              <Pie
                data={chartData.keywords}
                dataKey="frequency"
                nameKey="keyword"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {
                  chartData.keywords.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={generateRandomColor()} />
                  ))
                }
              </Pie>
              <Tooltip />
              <Legend wrapperStyle={{ bottom: "-15px" }} />
            </PieChart>
          </Paper>
        </Grid>


      </Grid>

      <Typography variant="h5" mt={4} mb={2}>
        Seccion 2
      </Typography>

      <Grid container spacing={3}>

      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={3} style={{ padding: 16, borderRadius: "1rem" }}>
          <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
            Articles Table
          </Typography>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Index</TableCell>
                  <TableCell>Title</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {chartData.citedTimes.map((article, index) => (
                  <TableRow key={index}>
                    <TableCell>{article.row_number}</TableCell>
                    <TableCell>{article.title}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={3} style={{ padding: 16, borderRadius: "1rem" }}>
          <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
            Cited Times Chart (By index)
          </Typography>
          <BarChart width={400} height={400} data={chartData.citedTimes}>
            <Bar dataKey="cited_times" fill="#BA68C8">
              <LabelList dataKey="cited_times" position="top" />
            </Bar>
            <XAxis dataKey="row_number" label={{ value: 'Article Index', position: 'insideBottom', dy: 10 }} />
            <YAxis label={{ value: 'Frequency', angle: -90, position: 'insideLeft' }} />
            <Tooltip 
              cursor={{ fill: 'transparent' }} 
              contentStyle={{ textAlign: 'left' }} 
              formatter={(value, name, props) => [`${props.payload.title}: ${value}`, 'Article Title']} // Modificado para mostrar título y frecuencia
            />
          </BarChart>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={3} style={{ padding: 16, borderRadius: "1rem" }}>
          <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
            Cited Times PieChart (By index)
          </Typography>
          <PieChart width={400} height={400}>
            <Pie
              data={chartData.citedTimes}
              dataKey="cited_times"
              nameKey="row_number"
              cx="50%"
              cy="50%"
              outerRadius={80}
              fill="#BA68C8"
              label
            >
              {
                chartData.citedTimes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))
              }
            </Pie>
            <Tooltip formatter={(value, name, props) => [`${props.payload.title}: ${value}`, 'Article Title']} />
            <Legend />
          </PieChart>
        </Paper>
      </Grid>
    </Grid>

    <Typography variant="h5" mt={4} mb={2}>
        Seccion 2
      </Typography>

      <Grid container spacing={3}>

      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={3} style={{ padding: 16, borderRadius: "1rem" }}>
          <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
            Authors Geographic Distribution
          </Typography>
          <BarChart width={500} height={400} data={chartData.countries} margin={{ bottom: 50 }}>
            <XAxis dataKey="country" label={{ value: 'Country', position: 'insideBottom', offset: -10, style: { fontWeight: 'bold' } }} />
            <YAxis label={{ value: 'Frequency', angle: -90, position: 'insideLeft', style: { fontWeight: 'bold' } }}  />
            <Tooltip />
            <Bar dataKey="frequency" fill="#8884d8">
              <LabelList dataKey="frequency" position="top" fill="#000" fontSize={12} />
              {chartData.countries.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={generateRandomColor()} />
              ))}
            </Bar>
          </BarChart>
        </Paper>
      </Grid>

      <Grid item xs={12} sm={6} md={4}>
        <Paper elevation={3} style={{ padding: 16, borderRadius: "1rem" }}>
          <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
            Publication Years
          </Typography>
          <BarChart width={400} height={400} data={chartData.publicationYears} margin={{ bottom: 50 }}>
            <XAxis dataKey="year" label={{ value: 'Year', position: 'insideBottom', offset: -10, style: { fontWeight: 'bold' } }} />
            <YAxis label={{ value: 'Frequency', angle: -90, position: 'insideLeft', style: { fontWeight: 'bold' } }}  />
            <Tooltip />
            
            <Bar dataKey="frequency" fill="#FF7043">
              <LabelList dataKey="frequency" position="top" />
            </Bar>
          </BarChart>
          
        </Paper>
      </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: 16, borderRadius: "1rem" }}>
            <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
              Publication Years
            </Typography>
            <LineChart width={400} height={400} data={chartData.publicationYears} margin={{ bottom: 50 }}>
              <XAxis dataKey="year" label={{ value: 'Year', position: 'insideBottom', offset: -10, style: { fontWeight: 'bold' } }} />
              <YAxis label={{ value: 'Frequency', angle: -90, position: 'insideLeft', style: { fontWeight: 'bold' } }}  />
              <Tooltip />
              
              <Line type="monotone" dataKey="frequency" stroke="#FF7043" label={{ position: 'top' }} />
            </LineChart>
          </Paper>
        </Grid>
      </Grid>


      <Typography variant="h5" mt={4} mb={2}>
        Seccion 3
      </Typography>

      <Grid container spacing={3}>

        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: 16, borderRadius: "1rem" }}>
            <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
              Word Cloud from abstract
            </Typography>
            <div style={{ height: 400 }}>
              <ReactWordcloud words={chartData.abstract} options={options} />
            </div>
          </Paper>
        </Grid>
        
      </Grid>

      <Typography variant="h5" mt={4} mb={2}>
        Seccion 3
      </Typography>

      <Grid container spacing={3}>

      <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: 16, borderRadius: "1rem" }}>
            <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
              Countries
            </Typography>
            <PieChart width={500} height={300}>
              <Pie
                data={chartData.countries}
                dataKey="frequency"
                nameKey="country"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {chartData.countries.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={generateRandomColor()} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Paper>
        </Grid>

      

        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: 16, borderRadius: "1rem" }}>
          <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
            Countries Map
          </Typography>
          <Chart
            chartEvents={[
              {
                eventName: "select",
                callback: ({ chartWrapper }) => {
                  const chart = chartWrapper.getChart();
                  const selection = chart.getSelection();
                  if (selection.length === 0) return;
                  const region = data[selection[0].row + 1];
                  console.log("Selected : " + region);
                },
              },
            ]}
            chartType="GeoChart"
            width="100%"
            height="400px"
            data={data}
          />
          </Paper>
        </Grid>

        <Grid item xs={12} sm={6} md={4}>
          <Paper elevation={3} style={{ padding: 16, borderRadius: "1rem" }}>
            <Typography variant="h6" gutterBottom style={{ fontWeight: 'bold' }}>
              Countries Frequency
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Countrie</TableCell>
                    <TableCell align="right">Frequency</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {chartData.countries.map((countryData, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <span style={{ color: index === 0 ? 'red' : 'inherit' }}>{countryData.country}</span>
                      </TableCell>
                      <TableCell align="right">
                        <span style={{ color: index === 0 ? 'red' : 'inherit' }}>{countryData.frequency}</span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

  

        
      </Grid>

    </Box>
  );
};

export default Graphs;
