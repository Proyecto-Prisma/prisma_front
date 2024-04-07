import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { BarChart, Bar, PieChart, Pie, RadarChart, PolarGrid, PolarAngleAxis, Radar, XAxis, YAxis, Tooltip, Legend, LineChart, Line } from 'recharts';
import axios from 'axios';

const Graphs = () => {
  const [chartData, setChartData] = useState({
    keywords: [],
    countries: [],
    citedTimes: [],
    top5CitedTimes: []
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseKeywords = await axios.get('http://127.0.0.1:5000/data/visualize/keywords');
        const responseCountries = await axios.get('http://127.0.0.1:5000/data/visualize/countries');
        const responseCitedTimes = await axios.get('http://127.0.0.1:5000/data/visualize/cited_times');

        const citedTimesData = responseCitedTimes.data.chart_data.filter(item => item.cited_times !== "No data");
        console.log('Cited Times Data:', citedTimesData);

        setChartData({
          keywords: responseKeywords.data.chart_data,
          countries: responseCountries.data.chart_data,
          citedTimes: citedTimesData,

        });
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchData();
  }, []);

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
              Histogram
            </Typography>
            <BarChart width={400} height={300} data={chartData.keywords}>
              <Bar dataKey="frequency" fill="#66BB6A" />
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
              Pie Chart
            </Typography>
            <PieChart width={400} height={300}>
              <Pie
                data={chartData.countries}
                dataKey="frequency"
                nameKey="country"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#42A5F5"
                label
              />
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
            <RadarChart
              outerRadius={90}
              width={400}
              height={300}
              data={chartData.keywords}
            >
              <PolarGrid />
              <PolarAngleAxis dataKey="keyword" />
              <Radar
                dataKey="frequency"
                stroke="#F06292"
                fill="#F06292"
                fillOpacity={0.6}
              />
              <Tooltip />
            </RadarChart>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8} >
          <Paper elevation={3} style={{ padding: 16, borderRadius: "1rem" }}>
            <Typography variant="h6" gutterBottom>
              Line Chart
            </Typography>
            <LineChart width={800} height={300} data={chartData.keywords}>
              <XAxis dataKey="keyword" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="frequency" stroke="#FF7043" />
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
      </Grid>
    </Box>
  );
};

export default Graphs;
