import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import "./drop-file-input.css";
import uploadImg from "../../assets/input-file/upload.png";
import axios from 'axios';

const DropFile = ({ onFileChange, source }) => {
  const wrapperRef = useRef(null);
  const [fileList, setFileList] = useState([]);

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");
  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");
  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const onFileDrop = (e) => {
    const newFiles = e.target.files;
    if (newFiles.length) {
      const updatedList = [...fileList, ...newFiles];
      setFileList(updatedList);
      onFileChange(updatedList);
  
      const formData = new FormData();
      formData.append(source, newFiles[0], newFiles[0].name);
  
      axios.post("http://localhost:5000/upload", formData)
        .then((response) => {
          console.log("Success:", response.data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  const fileRemove = (file) => {
    const updatedList = fileList.filter((item) => item !== file);
    setFileList(updatedList);
    onFileChange(updatedList);
  };

  return (
    <>
      <div
        ref={wrapperRef}
        className="drop-file-input"
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <div className="drop-file-input__label">
          <img src={uploadImg} alt="" style={{ maxWidth: "30%" }} />
          <p>Drag or choose your file</p>
        </div>
        <input
          type="file"
          onChange={onFileDrop}
          multiple={false} // Set to true if you want to accept multiple files
          style={{ width: "400px" }}
        />
      </div>
      {fileList.length > 0 && (
        <div className="drop-file-preview">
          <p className="drop-file-preview__title">Ready to upload</p>
          {fileList.map((item, index) => (
            <div key={index} className="drop-file-preview__item">
              <img
                src={URL.createObjectURL(item)}
                alt=""
                style={{ height: "50%" }}
              />
              <div className="drop-file-preview__item__info">
                <p>{item.name}</p>
                <p>{item.size} bytes</p>
              </div>
              <span
                className="drop-file-preview__item__del"
                onClick={() => fileRemove(item)}
              >
                x
              </span>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

DropFile.propTypes = {
  onFileChange: PropTypes.func.isRequired,
  source: PropTypes.oneOf(["scopus_file", "wos_file"]).isRequired,
};

export default DropFile;
