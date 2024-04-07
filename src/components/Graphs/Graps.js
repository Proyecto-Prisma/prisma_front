import React, { useState, useEffect } from 'react';
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import { BarChart, Bar, PieChart, Pie, RadarChart, PolarGrid, PolarAngleAxis, Radar, ScatterChart, Scatter, XAxis, YAxis, Tooltip, Legend, LineChart, Line } from 'recharts';
import axios from 'axios';

const Graphs = () => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseKeywords = await axios.get('http://127.0.0.1:5000/data/visualize/keywords');
        const responseCountries = await axios.get('http://127.0.0.1:5000/data/visualize/countries');
        const responseCitedTimes = await axios.get('http://127.0.0.1:5000/data/visualize/cited_times');

        setChartData({
          keywords: responseKeywords.data.chart_data,
          countries: responseCountries.data.chart_data,
          citedTimes: responseCitedTimes.data.chart_data
        });
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchData();
  }, []);

  const renderChart = (data, type) => {
    if (!data) return null;

    if (data.length === 0) {
      return <Typography variant="body1">No data available</Typography>;
    }

    // Render different types of charts based on the type of data
    switch (type) {
      case 'keywords':
        return (
          <BarChart width={400} height={300} data={data}>
            <Bar dataKey="frequency" fill="#8884d8" />
            <XAxis dataKey="keyword" />
            <YAxis />
            <Tooltip />
            <Legend />
          </BarChart>
        );
      case 'countries':
        return (
          <PieChart width={400} height={300}>
            <Pie data={data} dataKey="frequency" nameKey="country" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label />
            <Tooltip />
            <Legend />
          </PieChart>
        );
      case 'citedTimes':
        return (
          <BarChart width={800} height={500} data={data}>
            <Bar dataKey="Times Cited" fill="#8884d8" />
            <XAxis dataKey="Article Title" />
            <YAxis />
            <Tooltip />
            <Legend />
          </BarChart>
        );
      default:
        return null;
    }
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
        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: 16, borderRadius: "1rem" }}>
            <Typography variant="h6" gutterBottom>
              Histogram
            </Typography>
            {renderChart(chartData?.keywords, 'keywords')}
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: 16, borderRadius: "1rem" }}>
            <Typography variant="h6" gutterBottom>
              Pie Chart
            </Typography>
            {renderChart(chartData?.countries, 'countries')}
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper elevation={3} style={{ padding: 16, borderRadius: "1rem" }}>
            <Typography variant="h6" gutterBottom>
              Cited Times Chart
            </Typography>
            {renderChart(chartData?.citedTimes, 'citedTimes')}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Graphs;
