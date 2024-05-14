import React, { useState, useEffect } from "react";
import { Box, Button, Grid, Paper, Typography, Slider  } from "@mui/material";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  Radar,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
  Legend,
  LineChart,
  Line,
} from "recharts";
import axios from "axios";
import { Cell } from "recharts";
import ReactWordcloud from "react-wordcloud";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from "@mui/material";
import { Chart } from "react-google-charts";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { CircularProgress } from "@mui/material";

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
          axios.get(
            "https://flask-fire-qwreg2y2oq-uc.a.run.app/data/visualize/keywords"
          ),
          axios.get(
            "https://flask-fire-qwreg2y2oq-uc.a.run.app/data/visualize/countries"
          ),
          axios.get(
            "https://flask-fire-qwreg2y2oq-uc.a.run.app/data/visualize/cited_times"
          ),
          axios.get(
            "https://flask-fire-qwreg2y2oq-uc.a.run.app/data/visualize/authors"
          ),
          axios.get(
            "https://flask-fire-qwreg2y2oq-uc.a.run.app/data/visualize/publication_years"
          ),
          axios.get(
            "https://flask-fire-qwreg2y2oq-uc.a.run.app/data/visualize/abstract"
          ),
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
        console.log("Datos recibidos para abstract:", chartData.abstract);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    fetchData();
  }, []);

  const generateRandomColor = () => {
    return "#" + Math.floor(Math.random() * 16777215).toString(16);
  };

  const [maxWordCount, setMaxWordCount] = useState(20);

  // Actualizar el máximo del slider cuando se actualice chartData.abstract
  useEffect(() => {
    if (chartData && chartData.abstract) {
      setMaxWordCount(chartData.abstract.length);
    }
  }, [chartData]);

  const options = {
    rotations: 0,
    rotationAngles: [0],
    fontSizes: [40, 60],
  };

  const data = [
    ["Country", "Popularity"],
    ...chartData.countries.map((countryData) => [
      countryData.country,
      countryData.frequency,
    ]),
  ];

  const [wordCount, setWordCount] = useState(20);

  const colors_bar = ['#BA68C8', '#FF9800', '#4CAF50', '#2196F3', '#FFC107', '#9C27B0', '#FF5722', '#8BC34A', '#03A9F4', '#FFEB3B'];

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#AF19FF",
    "#FFC0CB",
  ]; // Puedes agregar más colores según sea necesario

  const downloadChartsAsPDF = () => {
    setIsLoading(true); // Activar el loader
    const charts = document.querySelectorAll(".graph-container");
    const pdf = new jsPDF();

    const downloadNextChart = (index) => {
      if (index < charts.length) {
        const chart = charts[index];
        const tempContainer = document.createElement("div"); // Crear un contenedor temporal
        tempContainer.appendChild(chart.cloneNode(true)); // Clonar el contenido de la gráfica al contenedor temporal
        document.body.appendChild(tempContainer); // Agregar el contenedor temporal al DOM para que sea renderizado y tenga dimensiones
  
        html2canvas(tempContainer, { scale: 2 })
          .then((canvas) => {
            const imgData = canvas.toDataURL("image/png");
            let width = 410; // Ancho por defecto
            let height = 120; // Alto por defecto
            
            // Ajustar el tamaño solo para la nube de palabras y el mapa
            if (chart.id === "chart10") {
              width = 350; // Ancho reducido para la nube de palabras
              height = 180; // Alto reducido para la nube de palabras
            } else if (chart.id === "chart12") {
              width = 380; // Ancho reducido para el mapa
              height = 150; // Alto reducido para el mapa
            }
            
            pdf.addImage(imgData, "PNG", 10, 10, width, height);
            pdf.addPage();
            document.body.removeChild(tempContainer); // Eliminar el contenedor temporal después de usarlo
            downloadNextChart(index + 1);
          })
          .catch((error) => {
            console.error("Error al convertir gráfico a imagen:", error);
            document.body.removeChild(tempContainer); // En caso de error, eliminar el contenedor temporal
            downloadNextChart(index + 1);
            setIsLoading(false); // Desactivar el loader en caso de error
          });
      } else {
        pdf.save("Graficas SLR.pdf");
        setIsLoading(false); // Desactivar el loader al finalizar
      }
    };

    downloadNextChart(0);
  };

  const downloadChartAsPNG = (chartId) => {
    const chart = document.getElementById(chartId);
    html2canvas(chart).then((canvas) => {
      const link = document.createElement("a");
      link.download = `${chartId}.png`;
      link.href = canvas.toDataURL();
      link.click();
    });
  };

  const [isLoading, setIsLoading] = useState(false);

  const customColorScale = [
    "#FFEDA0",
    "#FED976",
    "#FEB24C",
    "#FD8D3C",
    "#FC4E2A",
    "#E31A1C",
    "#BD0026",
    "#800026"
  ];

  return (
    <Box mt={4} mx={4}>
      <Grid container spacing={3}>
        <Grid item xs={8}>
          <Typography
            variant="h2"
            mb={4}
            sx={{ color: "#FF005B", fontWeight: "bold" }}
          >
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
            onClick={downloadChartsAsPDF}
            disabled={isLoading} // Disable the button while loading
          >
            {isLoading ? (
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <CircularProgress size={24} sx={{ color: "white", mr: 1 }} />
                Descargando...
              </Box>
            ) : (
              "Descargar"
            )}
          </Button>
        </Grid>
      </Grid>

      <Typography variant="h4" mt={4} mb={2} sx={{ fontWeight: 600 }}>
        Keywords
      </Typography>

      <Grid container spacing={3} sx={{ justifyContent: "center" }}>
        <Grid item xs={12} sm={12} md={9}>
          <Paper
            elevation={3}
            style={{ borderRadius: "1rem", padding: "4rem" }}
            id="chart1"
            className="graph-container"
          >
            <Typography
              variant="h6"
              gutterBottom
              style={{ fontWeight: "bold" }}
            >
              Keywords Histogram Chart
            </Typography>
            <BarChart
              width={900}
              height={500}
              data={chartData.keywords}
              margin={{
                top: 10,
                bottom: 50, // Aumentado para proporcionar más espacio
              }}
            >
              <Bar dataKey="frequency">
                {chartData.keywords.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={generateRandomColor()} />
                ))}
                <LabelList
                  dataKey="frequency"
                  position="top"
                  fontWeight="bold"
                  
                />
              </Bar>
              <XAxis
                dataKey="keyword"
                angle={-45}
                textAnchor="end"
                interval={0}
                height={120}
              />
              <YAxis />
              <Tooltip />
            </BarChart>
          </Paper>
          <Box mt={3} textAlign={"end"}>
            <Button
              variant="outlined"
              onClick={() => downloadChartAsPNG("chart1")}
              sx={{
                color: "#FF005B",
                borderColor: "#FF005B",
                textTransform: "none",
                fontWeight: "bold",
                ":hover": {
                  color: "white",
                  backgroundColor: "#FF005B",
                  borderColor: "#FF005B",
                },
              }}
            >
              Descargar gráfica de barras
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={9}>
          <Paper
            elevation={3}
            style={{ borderRadius: "1rem", padding: "4rem" }}
            id="chart2"
            className="graph-container"
          >
            <Typography
              variant="h6"
              gutterBottom
              style={{ fontWeight: "bold" }}
            >
              Keywords Radar Chart
            </Typography>
            <RadarChart
              width={900}
              height={500}
              margin={{
                top: 10,
                bottom: 50, // Aumentado para proporcionar más espacio
              }}
              data={chartData.keywords}
            >
              <PolarGrid />
              <PolarAngleAxis dataKey="keyword" />
              <Radar
                dataKey="frequency"
                stroke="#F06292"
                fill="#F06292"
                fillOpacity={0.6}
                label={{
                  position: "inside",
                  offset: 5,
                  fontWeight: "bold",
                }}
              />
              <Tooltip />
            </RadarChart>
          </Paper>
          <Box mt={3} textAlign={"end"}>
            <Button
              variant="outlined"
              onClick={() => downloadChartAsPNG("chart2")}
              sx={{
                color: "#FF005B",
                borderColor: "#FF005B",
                textTransform: "none",
                fontWeight: "bold",
                ":hover": {
                  color: "white",
                  backgroundColor: "#FF005B",
                  borderColor: "#FF005B",
                },
              }}
            >
              Descargar gráfica de radar
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={9}>
          <Paper
            elevation={3}
            style={{ borderRadius: "1rem", padding: "4rem" }}
            id="chart3"
            className="graph-container"
          >
            <Typography
              variant="h6"
              gutterBottom
              style={{ fontWeight: "bold" }}
            >
              Keywords Pie Chart
            </Typography>
            <PieChart
              width={900}
              height={500}
              margin={{
                top: 10,
                bottom: 50,
              }}
            >
              <Pie
                data={chartData.keywords}
                height={500}
                width={500}
                dataKey="frequency"
                nameKey="keyword"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={{ fontWeight: "bold" }}
              >
                {chartData.keywords.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={generateRandomColor()} />
                ))}
              </Pie>
              <Tooltip />
              <Legend wrapperStyle={{ bottom: "-15px" }} />
            </PieChart>
          </Paper>
          <Box mt={3} textAlign={"end"}>
            <Button
              variant="outlined"
              onClick={() => downloadChartAsPNG("chart3")}
              sx={{
                color: "#FF005B",
                borderColor: "#FF005B",
                textTransform: "none",
                fontWeight: "bold",
                ":hover": {
                  color: "white",
                  backgroundColor: "#FF005B",
                  borderColor: "#FF005B",
                },
              }}
            >
              Descargar gráfica de pie
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Typography variant="h4" mt={4} mb={2} sx={{ fontWeight: 600 }}>
        Cited Times
      </Typography>

      <Grid container spacing={3} sx={{ justifyContent: "center" }}>
        <Grid item xs={12} sm={12} md={9}>
          <Paper
            elevation={3}
            style={{ borderRadius: "1rem", padding: "4rem" }}
            id="chart4"
            className="graph-container"
          >
            <Typography
              variant="h6"
              gutterBottom
              style={{ fontWeight: "bold" }}
            >
              Cited Times Article Table (By index)
            </Typography>
            <TableContainer
              width={900}
              height={500}
              margin={{
                top: 10,
                bottom: 50,
              }}
            >
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
          <Box mt={3} textAlign={"end"}>
            <Button
              variant="outlined"
              onClick={() => downloadChartAsPNG("chart4")}
              sx={{
                color: "#FF005B",
                borderColor: "#FF005B",
                textTransform: "none",
                fontWeight: "bold",
                ":hover": {
                  color: "white",
                  backgroundColor: "#FF005B",
                  borderColor: "#FF005B",
                },
              }}
            >
              Descargar tabla
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={9}>
          <Paper
            elevation={3}
            style={{ borderRadius: "1rem", padding: "4rem" }}
            id="chart5"
            className="graph-container"
          >
            <Typography
              variant="h6"
              gutterBottom
              style={{ fontWeight: "bold" }}
            >
              Cited Times Bar Chart (By index)
            </Typography>
            <BarChart
              width={900}
              height={500}
              margin={{
                top: 10,
                bottom: 50,
              }}
              data={chartData.citedTimes}
            >
              <Bar dataKey="cited_times">
                {chartData.citedTimes.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors_bar[index % colors_bar.length]} />
                ))}
                <LabelList dataKey="cited_times" position="top" />
              </Bar>
              <XAxis
                dataKey="row_number"
                label={{
                  value: "Article Index",
                  position: "insideBottom",
                  dy: 10,
                }}
              />
              <YAxis
                label={{
                  value: "Frequency",
                  angle: -90,
                  position: "insideLeft",
                }}
              />
              <Tooltip
                cursor={{ fill: "transparent" }}
                contentStyle={{ textAlign: "left" }}
                formatter={(value, name, props) => [
                  `${props.payload.title}: ${value}`,
                  "Article Title",
                ]} // Modificado para mostrar título y frecuencia
              />
            </BarChart>
          </Paper>
          <Box mt={3} textAlign={"end"}>
            <Button
              variant="outlined"
              onClick={() => downloadChartAsPNG("chart5")}
              sx={{
                color: "#FF005B",
                borderColor: "#FF005B",
                textTransform: "none",
                fontWeight: "bold",
                ":hover": {
                  color: "white",
                  backgroundColor: "#FF005B",
                  borderColor: "#FF005B",
                },
              }}
            >
              Descargar gráfica de barras
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} sm={6} md={9}>
          <Paper
            elevation={3}
            style={{ borderRadius: "1rem", padding: "4rem" }}
            id="chart6"
            className="graph-container"
          >
            <Typography
              variant="h6"
              gutterBottom
              style={{ fontWeight: "bold" }}
            >
              Cited Times Pie Chart (By index)
            </Typography>
            <PieChart
              width={900}
              height={500}
              margin={{
                top: 10,
                bottom: 50,
              }}
            >
              <Pie
                data={chartData.citedTimes}
                dataKey="cited_times"
                nameKey="row_number"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#BA68C8"
                label = {{fontWeight: "bold"}}
              >
                {chartData.citedTimes.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                formatter={(value, name, props) => [
                  `${props.payload.title}: ${value}`,
                  "Article Title",
                ]}
              />
              <Legend />
            </PieChart>
          </Paper>
          <Box mt={3} textAlign={"end"}>
            <Button
              variant="outlined"
              onClick={() => downloadChartAsPNG("chart6")}
              sx={{
                color: "#FF005B",
                borderColor: "#FF005B",
                textTransform: "none",
                fontWeight: "bold",
                ":hover": {
                  color: "white",
                  backgroundColor: "#FF005B",
                  borderColor: "#FF005B",
                },
              }}
            >
              Descargar gráfica de pie
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Typography variant="h4" mt={4} mb={2} sx={{ fontWeight: 600 }}>
        Publication Years
      </Typography>

      <Grid container spacing={3} justifyContent={"center"}>
        <Grid item xs={12} sm={12} md={9}>
          <Paper
            elevation={3}
            style={{ borderRadius: "1rem", padding: "4rem" }}
            id="chart8"
            className="graph-container"
          >
            <Typography
              variant="h6"
              gutterBottom
              style={{ fontWeight: "bold" }}
            >
              Publication Years (Bar Chart)
            </Typography>
            <BarChart
              width={900}
              height={500}
              margin={{
                top: 10,
                bottom: 50,
              }}
              label={{ fontWeight: "bold" }}
              data={chartData.publicationYears}
            >
              <XAxis
                dataKey="year"
                label={{
                  value: "Year",
                  position: "insideBottom",
                  offset: -10,
                  style: { fontWeight: "bold" },
                }}
              />
              <YAxis
                label={{
                  value: "Frequency",
                  angle: -90,
                  position: "insideLeft",
                  style: { fontWeight: "bold" },
                }}
              />
              <Tooltip />

              <Bar dataKey="frequency" fill="#FF7043">
                <LabelList dataKey="frequency" position="top" />
              </Bar>
            </BarChart>
          </Paper>
          <Box mt={3} textAlign={"end"}>
            <Button
              variant="outlined"
              onClick={() => downloadChartAsPNG("chart8")}
              sx={{
                color: "#FF005B",
                borderColor: "#FF005B",
                textTransform: "none",
                fontWeight: "bold",
                ":hover": {
                  color: "white",
                  backgroundColor: "#FF005B",
                  borderColor: "#FF005B",
                },
              }}
            >
              Descargar gráfica de barras
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={9}>
          <Paper
            elevation={3}
            style={{ borderRadius: "1rem", padding: "4rem" }}
            id="chart9"
            className="graph-container"
          >
            <Typography
              variant="h6"
              gutterBottom
              style={{ fontWeight: "bold" }}
            >
              Publication Years (Line Chart)  
            </Typography>
            <LineChart
              width={900}
              height={500}
              margin={{
                top: 10,
                bottom: 50,
                right: 30,
              }}
              data={chartData.publicationYears}
            >
              <XAxis
                dataKey="year"
                label={{
                  value: "Year",
                  position: "insideBottom",
                  offset: -10,
                  style: { fontWeight: "bold" },
                }}
              />
              <YAxis
                label={{
                  value: "Frequency",
                  angle: -90,
                  position: "insideLeft",
                  style: { fontWeight: "bold" },
                }}
              />
              <Tooltip />

              <Line
                type="monotone"
                dataKey="frequency"
                stroke="#FF7043"
                label={{ position: "top", fontWeight: "bold"}}
              />
            </LineChart>
          </Paper>
          <Box mt={3} textAlign={"end"}>
            <Button
              variant="outlined"
              onClick={() => downloadChartAsPNG("chart9")}
              sx={{
                color: "#FF005B",
                borderColor: "#FF005B",
                textTransform: "none",
                fontWeight: "bold",
                ":hover": {
                  color: "white",
                  backgroundColor: "#FF005B",
                  borderColor: "#FF005B",
                },
              }}
            >
              Descargar gráfica lineal
            </Button>
          </Box>
        </Grid>
      </Grid>

      <Typography variant="h4" mt={4} mb={2} sx={{ fontWeight: 600 }}>
        Abstract
      </Typography>
      <Grid container spacing={3} justifyContent={"center"}>
        <Grid item xs={12} sm={12} md={9}>
          <Paper elevation={3} style={{ borderRadius: "1rem", padding: "4rem" }} id="chart10" className="graph-container">
            <Typography variant="h6" gutterBottom style={{ fontWeight: "bold" }}>
              Abstract Wordcloud
            </Typography>
            <div style={{ height: 400 }}>
              <ReactWordcloud words={chartData.abstract.slice(0, wordCount)} options={options} />
            </div>
            <Box mt={3}>
              <Typography variant="body1" gutterBottom style={{ fontWeight: "bold" }}>
                Cantidad de palabras: {wordCount}
              </Typography>
              {/* Slider para ajustar el recuento de palabras */}
              <Slider
                value={wordCount}
                onChange={(e, newValue) => setWordCount(newValue)}
                min={5}
                max={maxWordCount}
                step={5}
                aria-labelledby="continuous-slider"
              />
            </Box>
          </Paper>
          <Box mt={3} textAlign={"end"}>
            <Button
              variant="outlined"
              onClick={() => downloadChartAsPNG("chart10")}
              sx={{
                color: "#FF005B",
                borderColor: "#FF005B",
                textTransform: "none",
                fontWeight: "bold",
                ":hover": {
                  color: "white",
                  backgroundColor: "#FF005B",
                  borderColor: "#FF005B",
                },
              }}
            >
              Descargar nube de palabras
            </Button>
          </Box>
        </Grid>
      </Grid>


      <Typography variant="h4" mt={4} mb={2} sx={{ fontWeight: 600 }}>
        Geographic Distribution
      </Typography>
      <Grid container spacing={3} justifyContent={"center"}>
        <Grid item xs={12} sm={12} md={9}>
          <Paper
            elevation={3}
            style={{ borderRadius: "1rem", padding: "4rem" }}
            id="chart7"
            className="graph-container"
          >
            <Typography
              variant="h6"
              gutterBottom
              style={{ fontWeight: "bold" }}
            >
              Authors Geographic Distribution Bar Chart
            </Typography>
            <BarChart
              width={900}
              height={500}
              margin={{
                top: 10,
                bottom: 50,
              }}
              data={chartData.countries}
            >
              <XAxis
                dataKey="country"
                label={{
                  value: "Country",
                  position: "insideBottom",
                  offset: -10,
                  style: { fontWeight: "bold" },
                }}
              />
              <YAxis
                label={{
                  value: "Frequency",
                  angle: -90,
                  position: "insideLeft",
                  style: { fontWeight: "bold" },
                }}
              />
              <Tooltip />
              <Bar dataKey="frequency" fill="#8884d8">
                <LabelList
                  dataKey="frequency"
                  position="top"
                  fill="#000"
                  fontSize={12}
                  fontWeight={"bold"}
                />
                {chartData.countries.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={generateRandomColor()} />
                ))}
              </Bar>
            </BarChart>
          </Paper>
          <Box mt={3} textAlign={"end"}>
            <Button
              variant="outlined"
              onClick={() => downloadChartAsPNG("chart7")}
              sx={{
                color: "#FF005B",
                borderColor: "#FF005B",
                textTransform: "none",
                fontWeight: "bold",
                ":hover": {
                  color: "white",
                  backgroundColor: "#FF005B",
                  borderColor: "#FF005B",
                },
              }}
            >
              Descargar gráfica de barras
            </Button>
          </Box>
        </Grid>
        <Grid item xs={12} sm={12} md={9}>
          <Paper
            elevation={3}
            style={{ borderRadius: "1rem", padding: "4rem" }}
            id="chart11"
            className="graph-container"
          >
            <Typography
              variant="h6"
              gutterBottom
              style={{ fontWeight: "bold" }}
            >
              Geographic Distribution Pie Chart
            </Typography>
            <PieChart
              width={900}
              height={500}
              margin={{
                top: 10,
                bottom: 50,
                right: 30,
              }}
            >
              <Pie
                data={chartData.countries}
                dataKey="frequency"
                nameKey="country"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={{ fontWeight: "bold" }}
              >
                {chartData.countries.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={generateRandomColor()} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </Paper>
          <Box mt={3} textAlign={"end"}>
            <Button
              variant="outlined"
              onClick={() => downloadChartAsPNG("chart11")}
              sx={{
                color: "#FF005B",
                borderColor: "#FF005B",
                textTransform: "none",
                fontWeight: "bold",
                ":hover": {
                  color: "white",
                  backgroundColor: "#FF005B",
                  borderColor: "#FF005B",
                },
              }}
            >
              Descargar gráfica de pie
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={9}>
          <Paper
            elevation={3}
            style={{ borderRadius: "1rem", padding: "4rem" }}
            id="chart12"
            className="graph-container"
          >
            <Typography
              variant="h6"
              gutterBottom
              style={{ fontWeight: "bold" }}
            >
              Countries Map Chart
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
              options={{
                colorAxis: { colors: customColorScale },
              }}
            />
          </Paper>
          <Box mt={3} textAlign={"end"}>
            <Button
              variant="outlined"
              onClick={() => downloadChartAsPNG("chart12")}
              sx={{
                color: "#FF005B",
                borderColor: "#FF005B",
                textTransform: "none",
                fontWeight: "bold",
                ":hover": {
                  color: "white",
                  backgroundColor: "#FF005B",
                  borderColor: "#FF005B",
                },
              }}
            >
              Descargar mapa
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={9}>
          <Paper
            elevation={3}
            style={{ borderRadius: "1rem", padding: "4rem" }}
            id="chart13"
            className="graph-container"
          >
            <Typography
              variant="h6"
              gutterBottom
              style={{ fontWeight: "bold" }}
            >
              Countries Table Chart
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
                        <span
                          style={{ color: index === 0 ? "red" : "inherit" }}
                        >
                          {countryData.country}
                        </span>
                      </TableCell>
                      <TableCell align="right">
                        <span
                          style={{ color: index === 0 ? "red" : "inherit" }}
                        >
                          {countryData.frequency}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
          <Box mt={3} textAlign={"end"}>
            <Button
              variant="outlined"
              onClick={() => downloadChartAsPNG("chart13")}
              sx={{
                color: "#FF005B",
                borderColor: "#FF005B",
                textTransform: "none",
                fontWeight: "bold",
                ":hover": {
                  color: "white",
                  backgroundColor: "#FF005B",
                  borderColor: "#FF005B",
                },
              }}
            >
              Descargar tabla
            </Button>
          </Box>
        </Grid>


        
      </Grid>

      <Typography variant="h4" mt={4} mb={2} sx={{ fontWeight: 600 }}>
        Authors
      </Typography>
      <Grid container spacing={3} justifyContent={"center"}>
        
      <Grid item xs={12} sm={12} md={9}>
          <Paper
            elevation={3}
            style={{ borderRadius: "1rem", padding: "4rem" }}
            id="chart14"
            className="graph-container"
          >
            <Typography
              variant="h6"
              gutterBottom
              style={{ fontWeight: "bold" }}
            >
              Authors Histogram Chart
            </Typography>
            <BarChart
              width={900}
              height={500}
              data={chartData.authors}
              margin={{
                top: 50,
                bottom: 50, // Aumentado para proporcionar más espacio
              }}
            >
              <Bar dataKey="frequency">
                {chartData.authors.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={generateRandomColor()} />
                ))}
                <LabelList
                  dataKey="frequency"
                  position="top"
                  fontWeight="bold"
                  
                />
              </Bar>
              <XAxis
                dataKey="author"
                angle={-45}
                textAnchor="end"
                interval={0}
                height={120}
              />
              <YAxis />
              <Tooltip />
            </BarChart>
          </Paper>
          <Box mt={3} textAlign={"end"}>
            <Button
              variant="outlined"
              onClick={() => downloadChartAsPNG("chart14")}
              sx={{
                color: "#FF005B",
                borderColor: "#FF005B",
                textTransform: "none",
                fontWeight: "bold",
                ":hover": {
                  color: "white",
                  backgroundColor: "#FF005B",
                  borderColor: "#FF005B",
                },
              }}
            >
              Descargar gráfica de barras
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={9}>
          <Paper
            elevation={3}
            style={{ borderRadius: "1rem", padding: "4rem" }}
            id="chart15"
            className="graph-container"
          >
            <Typography
              variant="h6"
              gutterBottom
              style={{ fontWeight: "bold" }}
            >
              Authors Radar Chart
            </Typography>
            <RadarChart
              width={900}
              height={500}
              margin={{
                top: 10,
                bottom: 50, // Aumentado para proporcionar más espacio
              }}
              data={chartData.authors}
            >
              <PolarGrid />
              <PolarAngleAxis dataKey="author" />
              <Radar
                dataKey="frequency"
                stroke="#F06292"
                fill="#F06292"
                fillOpacity={0.6}
                label={{
                  position: "inside",
                  offset: 5,
                  fontWeight: "bold",
                }}
              />
              <Tooltip />
            </RadarChart>
          </Paper>
          <Box mt={3} textAlign={"end"}>
            <Button
              variant="outlined"
              onClick={() => downloadChartAsPNG("chart15")}
              sx={{
                color: "#FF005B",
                borderColor: "#FF005B",
                textTransform: "none",
                fontWeight: "bold",
                ":hover": {
                  color: "white",
                  backgroundColor: "#FF005B",
                  borderColor: "#FF005B",
                },
              }}
            >
              Descargar gráfica de radar
            </Button>
          </Box>
        </Grid>

        <Grid item xs={12} sm={12} md={9}>
          <Paper
            elevation={3}
            style={{ borderRadius: "1rem", padding: "4rem" }}
            id="chart16"
            className="graph-container"
          >
            <Typography
              variant="h6"
              gutterBottom
              style={{ fontWeight: "bold" }}
            >
              Authors Pie Chart
            </Typography>
            <PieChart
              width={900}
              height={500}
              margin={{
                top: 10,
                bottom: 50,
              }}
            >
              <Pie
                data={chartData.authors}
                height={500}
                width={500}
                dataKey="frequency"
                nameKey="author"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label={{ fontWeight: "bold" }}
              >
                {chartData.authors.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={generateRandomColor()} />
                ))}
              </Pie>
              <Tooltip />
              <Legend wrapperStyle={{ bottom: "-15px" }} />
            </PieChart>
          </Paper>
          <Box mt={3} textAlign={"end"}>
            <Button
              variant="outlined"
              onClick={() => downloadChartAsPNG("chart16")}
              sx={{
                color: "#FF005B",
                borderColor: "#FF005B",
                textTransform: "none",
                fontWeight: "bold",
                ":hover": {
                  color: "white",
                  backgroundColor: "#FF005B",
                  borderColor: "#FF005B",
                },
              }}
            >
              Descargar gráfica de pie
            </Button>
          </Box>
        </Grid>
      


        
      </Grid>

      
    </Box>
  );
};

export default Graphs;
