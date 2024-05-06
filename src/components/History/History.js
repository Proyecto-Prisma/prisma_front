import React, { useState, useEffect } from "react";
import { useAuth } from "../../AuthContext"; // Import useAuth hook from AuthContext
import {
  Card,
  CardActionArea,
  CardContent,
  Typography,
  Grid,
  Modal,
  Box,
  Button,
  CardMedia,
  CircularProgress,
} from "@mui/material";
import { ref, onValue } from "firebase/database";
import { database } from "../../firebaseConfig"; // Importing the initialized database object
import historyBackground from "../../assets/background-history.jpeg"; // Import the background image

// Style for the modal for consistent UI/UX
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400, // Width adjusted for better viewing on different devices
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2,
};

const History = () => {
  const [historyItems, setHistoryItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);
  const { authData } = useAuth(); // Using the `uid` from AuthContext
  const uid = authData ? authData.uid : null;
  console.log(uid);
  const pink = "#FF005B";

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return " " + new Date(dateString).toLocaleDateString(undefined, options);
  };

  useEffect(() => {
    if (!uid) return; // Do not proceed if there is no user `uid`

    setLoading(true);
    const historyRef = ref(database, "/uploads"); // Note: We're now referencing the parent uploads node

    const unsubscribe = onValue(
      historyRef,
      (snapshot) => {
        const uploadsData = snapshot.val();
        console.log("data", uploadsData.user);
        const uploadsList = uploadsData
          ? Object.keys(uploadsData)
              .map((key) => {
                const item = uploadsData[key];
                console.log("item", item);
                console.log("files", item.files);
                // Check if the user matches the uid from AuthContext
                if (item.files && item.user === uid) {
                  const title = item.cadena_busqueda; // Based on your DB structure, this seems not to be an array anymore
                  return {
                    id: key,
                    title,
                    date: item.creacion_registro,
                    files: item.files, // Adjust according to how you want to handle the files node
                    startDate: item.inicio,
                    endDate: item.fin,
                  };
                } else {
                  return null; // This item does not belong to the user
                }
              })
              .filter(Boolean) // Remove any null entries
          : [];
        setHistoryItems(uploadsList);
        setLoading(false);
      },
      (error) => {
        console.error("Firebase read failed: " + error.message);
        setLoading(false);
      }
    );

    // Clean up the subscription on component unmount or uid change
    return () => unsubscribe();
  }, [uid]); // Dependency array includes `uid`

  const handleOpen = (item) => {
    // Assuming item has a 'files' object within it
    setSelectedItem({
      ...item,
      fileDetails: [
        { name: "Archivo Procesado", url: item.files.processed_data },
        { name: "Scopus", url: item.files.scopus_file },
        { name: "WoS", url: item.files.wos_file },
      ],
    });
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <Grid container spacing={2}>
      {loading ? (
        <Grid item xs={12} style={{ textAlign: "center" }}>
          <CircularProgress />
        </Grid>
      ) : (
        historyItems.map((item) => (
          <Grid item xs={12} sm={6} md={4} key={item.id}>
            <Card sx={{ cursor: "pointer", borderRadius: "20px" }}>
              <CardActionArea onClick={() => handleOpen(item)}>
                <CardMedia
                  component="img"
                  height="140"
                  image={historyBackground} // Placeholder image path
                  alt="Historical Data"
                />
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ color: pink, fontWeight: "bold", fontSize: "25px" }}
                  >
                    {item.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Generado en:{formatDate(item.date)}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))
      )}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          {selectedItem && (
            <>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                marginBottom={2}
                sx={{ color: pink, fontWeight: "bold", fontSize: "2rem" }}
              >
                {selectedItem.title}
              </Typography>
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2, fontSize: "15px" }}
              >
                Fecha: {formatDate(selectedItem.date)}
              </Typography>
              <Typography
                id="modal-modal-description"
                marginBottom={2}
                sx={{ fontSize: "10px", color: "gray" }}
              >
                Rango de años: {selectedItem.startDate} - {selectedItem.endDate}
              </Typography>
              {selectedItem.fileDetails.map((fileDetail, index) => (
                <Button
                  key={index}
                  href={fileDetail.url}
                  download
                  variant="contained"
                  sx={{
                    display: "block",
                    mb: 1,
                    backgroundColor: pink,
                    color: "white",
                    p: 2,
                    textTransform: "none",
                    fontWeight: "bold",
                    "&:hover": { backgroundColor: "#ff005b" },
                  }}
                >
                  Descargar {fileDetail.name}
                </Button>
              ))}
            </>
          )}
        </Box>
      </Modal>
    </Grid>
  );
};

export default History;
