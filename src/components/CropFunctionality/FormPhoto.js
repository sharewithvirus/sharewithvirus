import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Crop from "./CropPhoto";
import { Dialog } from "@mui/material";
import styles from "../Home.module.css";
const FormPhoto = (props) => {
  const [photoURL, setPhotoURL] = useState("");
  const [file, setFile] = useState("");
  const [openCrop, setOpenCrop] = useState(false);
  const [upload, setUpload] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  useEffect(() => {
    if (upload) {
      let formData = new FormData();
      formData.append("file", file);
      props.cropFile(file);
      setUpload(false);
    }
  }, [upload]);

  const profileChange = (e) => {
    const image = URL.createObjectURL(e.target.files[0]);
    setFile(e.target.files[0]);
    console.log("Photo file: ", file);
    setWidth(300);
    setHeight(180);
    setProfilePhoto(image);
    setPhotoURL(image);
    setOpenCrop(true);
  };

  return (
    <>
      {openCrop && (
        <Dialog open={openCrop}>
          <Crop
            setPhotoURL={setPhotoURL}
            photoURL={photoURL}
            setFile={setFile}
            setOpenCrop={setOpenCrop}
            setUpload={setUpload}
            width={width}
            height={height}
            setProfilePhoto={setProfilePhoto}
          />
        </Dialog>
      )}

      <label htmlFor="img">
        <i
          class={`fas fa-edit ${styles.editprofileImage}`}
          style={{ marginTop: "111px" }}
        ></i>
      </label>
      <img
        src={"/images/blank-profile.png"}
        className={`img-fluid `}
        style={
          profilePhoto
            ? { display: "none" }
            : {
                height: "172px",
                marginTop: "-144px",
                width: "172px",
                borderRadius: "50%",
              }
        }
        alt="Profile"
      />
      <input
        id="img"
        name="file"
        onChange={profileChange}
        type="file"
        style={{ display: "none" }}
        accept="image/gif, image/jpeg, image/png"
        required
      />

      {profilePhoto ? (
        <img
          className={`img-fluid `}
          src={profilePhoto}
          style={{
            height: "172px",
            marginTop: "-144px",
            width: "172px",
            borderRadius: "50%",
          }}
          alt="profile is not uploaded"
        />
      ) : null}
      {/* <label htmlFor="img">
        <img
          src={profilePhoto ? profilePhoto : props.src}
          className={`img-fluid `}
          alt="thumbnail"
          style={{ cursor: "pointer", borderRadius: "50%", width:"" }}
        />
      </label> */}
    </>
  );
};

export default FormPhoto;
