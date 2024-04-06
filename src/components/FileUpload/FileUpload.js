import React, { useRef, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const FileUpload = () => {
  const pink = "#FF005B";
  const darkPink = "#C0005E";
  const [scopusFile, setScopusFile] = useState(null);
  const [wosFile, setWosFile] = useState(null);
  const [dataProcessed, setDataProcessed] = useState(false); // State to track if the data is ready for export
  const [drag, setDrag] = useState(false);
  const scopusInputRef = useRef(null);
  const wosInputRef = useRef(null);

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "scopusFile" && files.length) {
      setScopusFile(files[0]);
    } else if (name === "wosFile" && files.length) {
      setWosFile(files[0]);
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    setDrag(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setDrag(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e, fileType) => {
    e.preventDefault();
    setDrag(false);
    const file = e.dataTransfer.files[0];
    if (fileType === "scopus") {
      setScopusFile(file);
    } else if (fileType === "wos") {
      setWosFile(file);
    }
  };

  const handleDivClick = (fileType) => {
    if (fileType === "scopus") {
      scopusInputRef.current.click();
    } else if (fileType === "wos") {
      wosInputRef.current.click();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!scopusFile || !wosFile) {
      toast.error("Se requieren ambos archivos.");
      return;
    }

    const formData = new FormData();
    formData.append("scopus_file", scopusFile);
    formData.append("wos_file", wosFile);

    try {
      await axios.post("http://127.0.0.1:5000/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      // After successful upload, call the /process endpoint
      await axios.get("http://127.0.0.1:5000/process");
      setDataProcessed(true); // Enable the Export Data button
      toast.success("Archivos procesados con éxito. Listo para exportar.");
    } catch (error) {
      setDataProcessed(false); // Disable the Export Data button if there's an error

      toast.error(
        error.response?.data?.error ||
          "Ocurrió un error durante la carga o el procesamiento."
      );
    }
  };

  const handleExport = async () => {
    try {
      const response = await axios.get("http://127.0.0.1:5000/export", {
        responseType: "blob", // Ensure the response is treated as a Blob
      });
      const fileURL = window.URL.createObjectURL(new Blob([response.data]));
      const fileLink = document.createElement("a");
      fileLink.href = fileURL;
      fileLink.setAttribute("download", "processed_data.xlsx"); // Set the download file name
      document.body.appendChild(fileLink);
      fileLink.click();
      document.body.removeChild(fileLink);
      toast.success("Datos exportados con éxito.");
    } catch (error) {
      console.error("Error de exportación:", error);
      toast.error("Ocurrió un error durante la exportación.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div
          onClick={() => handleDivClick("scopus")}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, "scopus")}
          style={{
            marginBottom: "20px",
            padding: "20px",
            border: drag ? "2px solid blue" : "2px dashed gray",
            cursor: "pointer",
          }}
        >
          <p>
            {scopusFile
              ? `Archivo Scopus: ${scopusFile.name} cargado`
              : "Puedes arrastrar y soltar el archivo de Scopus aquí, o hacer clic para seleccionar."}
          </p>
          <input
            ref={scopusInputRef}
            type="file"
            name="scopusFile"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>
        <div
          onClick={() => handleDivClick("wos")}
          onDragEnter={handleDragEnter}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={(e) => handleDrop(e, "wos")}
          style={{
            marginBottom: "20px",
            padding: "20px",
            border: drag ? "2px solid blue" : "2px dashed gray",
            cursor: "pointer",
          }}
        >
          <p>
            {wosFile
              ? `Archivo WoS: ${wosFile.name} cargado`
              : "Puedes arrastrar y soltar el archivo de WoS aquí, o hacer clic para seleccionar."}
          </p>
          <input
            ref={wosInputRef}
            type="file"
            name="wosFile"
            onChange={handleFileChange}
            style={{ display: "none" }}
          />
        </div>
        <div style={{ marginTop: "2rem", textAlign: "center" }}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{
              backgroundColor: pink,
              fontWeight: "bold",
              textTransform: "none",
              padding: "0.5rem 4rem",
              ":hover": {
                backgroundColor: darkPink,
              },
            }}
          >
            Ejecutar SLR
          </Button>
        </div>
      </form>

      {dataProcessed && (
        <div style={{ marginTop: "1rem", textAlign: "center" }}>
          <Button
            onClick={handleExport}
            variant="contained"
            size="large"
            sx={{
              backgroundColor: "transparent",
              color: pink,
              border: `2px solid ${pink}`,
              fontWeight: "bold",
              textTransform: "none",
              padding: "0.5rem 4rem",
              ":hover": {
                backgroundColor: pink,
                color: "white",
              },
            }}
          >
            Exportar Datos
          </Button>
        </div>
      )}

      <ToastContainer />
    </div>
  );
};

export default FileUpload;
