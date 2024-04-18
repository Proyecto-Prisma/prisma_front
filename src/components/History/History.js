import React, { useState, useEffect } from "react";
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
} from "@mui/material";
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, onValue, off } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyDMqn9X38QQQ_FQLEVsKd3XCMDfDaNGVnc",
  authDomain: "prisma-58a39.firebaseapp.com",
  databaseURL: "https://prisma-58a39-default-rtdb.firebaseio.com",
  projectId: "prisma-58a39",
  storageBucket: "prisma-58a39.appspot.com",
  messagingSenderId: "532575758086",
  appId: "1:532575758086:web:76b7e4ef12cc5252736087",
  measurementId: "G-T0LYHFX9WH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// Define a style for the modal to improve its appearance
const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 1000,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  borderRadius: 2, // Rounded corners for a smoother look
};

// Sample data for history items
// const historyItems = [
//   {
//     id: 1,
//     title: "Analysis Report 1",
//     date: "2024-02-01",
//     files: [
//       { name: "Report_1.xlsx", url: "/files/report_1.xlsx" },
//       { name: "Data_1.xlsx", url: "/files/data_1.xlsx" },
//       { name: "Summary_1.pdf", url: "/files/summary_1.pdf" },
//     ],
//   },
//   {
//     id: 2,
//     title: "Analysis Report 2",
//     date: "2024-02-02",
//     files: [
//       { name: "Report_2.xlsx", url: "/files/report_2.xlsx" },
//       { name: "Data_2.xlsx", url: "/files/data_2.xlsx" },
//       { name: "Summary_2.pdf", url: "/files/summary_2.pdf" },
//     ],
//   },
//   // Additional items can be added here
// ];

const History = () => {
  const [historyItems, setHistoryItems] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    const historyRef = ref(database, '/uploads');
    onValue(historyRef, (snapshot) => {
      const uploadsData = snapshot.val();
      const uploadsList = uploadsData ? Object.keys(uploadsData).map(key => {
        const item = uploadsData[key];
        // Join 'cadena_busqueda' array items into a single string for the title.
        const title = item.cadena_busqueda;
        // Assuming 'files' object contains the files as properties.
        const filesArray = Object.keys(item.files).map(fileKey => {
          return {
            name: fileKey, // or any other property that you use as a name
            url: item.files[fileKey], // the URL of the file
          };
        });
        return {
          id: key,
          title, // Use the concatenated title string
          date: item.creacion_registro,
          files: filesArray,
        };
      }) : [];
      setHistoryItems(uploadsList);
    });

    // Unsubscribe from the database on component unmount
    return () => off(historyRef);
  }, []);

  const handleOpen = (item) => {
    setSelectedItem(item);
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  return (
    <Grid container spacing={2}>
      {historyItems.map((item) => (
        <Grid item xs={12} sm={6} md={6} key={item.id}>
          <Card sx={{ cursor: "pointer" }}>
            <CardActionArea onClick={() => handleOpen(item)}>
              <CardMedia
                component="img"
                height="140"
                image="/path/to/image.jpg" // Placeholder image path
                alt="Historical Data"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Generated on: {item.date}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>
      ))}

      {/* Modal for displaying selected history item details */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          {selectedItem && Array.isArray(selectedItem.files) && (
            <>
              <Typography
                id="modal-modal-title"
                variant="h6"
                component="h2"
                marginBottom={2}
              >
                {selectedItem.title}
              </Typography>
              <Typography
                id="modal-modal-description"
                sx={{ mt: 2 }}
                marginBottom={2}
              >
                Date: {selectedItem.date}
              </Typography>
              {selectedItem.files.map((file, index) => (
                <Button
                  key={index}
                  href={file.url}
                  download
                  variant="contained"
                  color="primary"
                  sx={{ display: "block", mb: 1 }}
                >
                  Download {file.name}
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
