import React, { useRef, useState } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import { CircularProgress } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAuth } from "../../AuthContext"; // Adjust path as needed

const FileUpload = ({ searchString, inicio, fin }) => {
  const { authData } = useAuth(); // Get auth data from context
  const uid = authData ? authData.uid : null;
  const pink = "#FF005B";
  const darkPink = "#C0005E";
  const [scopusFile, setScopusFile] = useState(null);
  const [wosFile, setWosFile] = useState(null);
  const [dataProcessed, setDataProcessed] = useState(false);
  const [loading, setLoading] = useState(false); // State to track loading
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!scopusFile || !wosFile || !searchString || !inicio || !fin) {
      toast.error("Se requieren la cadena de búsqueda y ambos archivos.");
      return;
    }

    setLoading(true); // Start loading

    const formData = new FormData();
    formData.append("scopus_file", scopusFile);
    formData.append("wos_file", wosFile);
    formData.append("cadena_busqueda", searchString);
    formData.append("user_uid", uid);
    formData.append("inicio", inicio);
    formData.append("fin", fin);

    try {
      const response = await axios.post(
        "https://flask-fire-qwreg2y2oq-uc.a.run.app/data/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data && response.data.upload_key) {
        localStorage.setItem("upload_key", response.data.upload_key);
        console.log("Upload key saved:", response.data.upload_key);
        await axios.get(
          "https://flask-fire-qwreg2y2oq-uc.a.run.app/data/process"
        );
        setDataProcessed(true); // Enable the Export Data button
        toast.success("Archivos procesados con éxito. Listo para exportar.");
      } else {
        console.log("Upload key not found in the response");
      }
    } catch (error) {
      setDataProcessed(false);
      toast.error(
        error.response?.data?.error ||
          "Ocurrió un error durante la carga o el procesamiento."
      );
    } finally {
      setLoading(false); // End loading
    }
  };

  const handleExport = async () => {
    try {
      const formData = new FormData();
      formData.append("folder_id", localStorage.getItem("upload_key"));
      const response = await axios.post(
        "https://flask-fire-qwreg2y2oq-uc.a.run.app/data/export",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          responseType: "blob", // Ensure the response is treated as a Blob
        }
      );
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
          onClick={() =>
            scopusInputRef.current && scopusInputRef.current.click()
          }
          onDragEnter={(e) => e.preventDefault()}
          onDragOver={(e) => e.preventDefault()}
          onDragLeave={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            setScopusFile(e.dataTransfer.files[0]);
          }}
          style={{
            marginBottom: "20px",
            padding: "20px",
            border: "2px dashed gray",
            cursor: "pointer",
            textAlign: "center",
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
          onClick={() => wosInputRef.current && wosInputRef.current.click()}
          onDragEnter={(e) => e.preventDefault()}
          onDragOver={(e) => e.preventDefault()}
          onDragLeave={(e) => e.preventDefault()}
          onDrop={(e) => {
            e.preventDefault();
            setWosFile(e.dataTransfer.files[0]);
          }}
          style={{
            marginBottom: "20px",
            padding: "20px",
            border: "2px dashed gray",
            cursor: "pointer",
            textAlign: "center",
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

      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        >
          <CircularProgress />
        </div>
      ) : (
        dataProcessed && (
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
        )
      )}

      <ToastContainer />
    </div>
  );
};

export default FileUpload;
