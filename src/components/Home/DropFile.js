import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

import "./drop-file-input.css";

import { ImageConfig } from "../../components/Home/ImageConfig";
import uploadImg from "/Users/salomon/Documents/Projects/prisma_app/src/assets/input-file/upload.png";

const DropFile = (props) => {
  const wrapperRef = useRef(null);

  const [fileList, setFileList] = useState([]);

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");

  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");

  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    if (newFile) {
      const updatedList = [...fileList, newFile];
      setFileList(updatedList);
      props.onFileChange(updatedList);
    }
  };

  const fileRemove = (file) => {
    const updatedList = [...fileList];
    updatedList.splice(fileList.indexOf(file), 1);
    setFileList(updatedList);
    props.onFileChange(updatedList);
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
          <img src={uploadImg} alt="" style={{maxWidth:"30%"}}/>
          <p>Arrastra o elige tu archivo</p>
        </div>
        <input type="file" value="" onChange={onFileDrop} style={{width:"400px"}}/>
      </div>
      {fileList.length > 0 ? (
        <div className="drop-file-preview">
          <p className="drop-file-preview__title">Listo para subir</p>
          {fileList.map((item, index) => (
            <div key={index} className="drop-file-preview__item">
              <img
                src={
                  ImageConfig[item.type.split("/")[1]] || ImageConfig["default"]
                }
                alt=""
                style={{ height: "50%" }}
              />
              <div className="drop-file-preview__item__info">
                <p>{item.name}</p>
                <p>{item.size}B</p>
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
      ) : null}
    </>
  );
};

DropFile.propTypes = {
  onFileChange: PropTypes.func,
};

export default DropFile;
