import React, { useState } from "react";
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
const historyItems = [
  {
    id: 1,
    title: "Analysis Report 1",
    date: "2024-02-01",
    files: [
      { name: "Report_1.xlsx", url: "/files/report_1.xlsx" },
      { name: "Data_1.xlsx", url: "/files/data_1.xlsx" },
      { name: "Summary_1.pdf", url: "/files/summary_1.pdf" },
    ],
  },
  {
    id: 2,
    title: "Analysis Report 2",
    date: "2024-02-02",
    files: [
      { name: "Report_2.xlsx", url: "/files/report_2.xlsx" },
      { name: "Data_2.xlsx", url: "/files/data_2.xlsx" },
      { name: "Summary_2.pdf", url: "/files/summary_2.pdf" },
    ],
  },
  // Additional items can be added here
];

const History = () => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

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
          {selectedItem && (
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
