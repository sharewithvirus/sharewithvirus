import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import styles from "./Home.module.css";
import Loading from "./Loading";
import Crop from "./CropFunctionality/CropPhoto";
import { Dialog } from "@mui/material";
const ImageUpload = (props) => {
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
      axios
        .post(`${props.photoPath}/photo/${props.idImage}`, formData)
        .then((res) => {
          // setOpen(false);
          setUpload(false);
        })
        .catch((e) => {
          console.log("Something Went Wrong...");
        });
    }
  }, [upload]);

  const profileChange = (e) => {
    const image = URL.createObjectURL(e.target.files[0]);
    setFile(e.target.files[0]);
    setWidth(200);
    setHeight(200);
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
      <div className={styles.profileImageHovering}>
        <label htmlFor="img">
          <i
            class={`fas fa-edit ${styles.editprofileImage}`}
            style={{ marginTop: "111px" }}
          ></i>
        </label>
        <img
          src={props.profilePicSrc}
          className={`img-fluid `}
          style={
            profilePhoto
              ? { display: "none" }
              : { height: "172px", marginTop: "-144px", width: "172px" }
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
            style={{ height: "172px", marginTop: "-144px", width: "172px" }}
            alt="profile is not uploaded"
          />
        ) : null}
      </div>
    </>
  );
};

const CoverImageUpload = (props) => {
  const [coverPhotoURL, setCoverPhotoURL] = useState("");
  const [coverFile, setCoverFile] = useState("");
  const [coverOpenCrop, setCoverOpenCrop] = useState(false);
  const [coverUpload, setCoverUpload] = useState(false);
  const [coverProfilePhoto, setCoverProfilePhoto] = useState("");
  const [coverWidth, setCoverWidth] = useState("");
  const [coverHeight, setCoverHeight] = useState("");

  const coverProfileChange = (e) => {
    const image = URL.createObjectURL(e.target.files[0]);
    setCoverFile(e.target.files[0]);
    setCoverWidth(810);
    setCoverHeight(250);
    setCoverProfilePhoto(image);
    setCoverPhotoURL(image);
    setCoverOpenCrop(true);
  };
  useEffect(() => {
    if (coverUpload) {
      let formData = new FormData();
      formData.append("file", coverFile);
      axios
        .post(`${props.coverPath}/coverphoto/${props.idCover}`, formData)
        .then((res) => {
          // setOpen(false);
          setCoverUpload(false);
        })
        .catch((e) => {
          console.log("Something Went Wrong...");
        });
    }
  }, [coverUpload]);
  return (
    <>
      {coverOpenCrop && (
        <Dialog open={coverOpenCrop}>
          <Crop
            setPhotoURL={setCoverPhotoURL}
            photoURL={coverPhotoURL}
            setFile={setCoverFile}
            setOpenCrop={setCoverOpenCrop}
            setUpload={setCoverUpload}
            width={coverWidth}
            height={coverHeight}
            setProfilePhoto={setCoverProfilePhoto}
          />
        </Dialog>
      )}
      <div>
        <label
          htmlFor="coverImg"
          style={{
            display: "flex !important",
            justifyContent: "flex-end",
            marginRight: "10px",
          }}
        >
          <p>
            <i class={`fas fa-edit ${styles.editcover}`}></i>
          </p>
        </label>
        <img
          src={props.coverPicSrc}
          className={`img-fluid ${styles.imageUploadCover}`}
          alt="cover-image"
          style={coverProfilePhoto ? { display: "none" } : { color: "white" }}
        />
        <input
          id="coverImg"
          name="file"
          onChange={coverProfileChange}
          type="file"
          style={{ display: "none" }}
          accept="image/gif, image/jpeg, image/png"
          required
        />
        {coverProfilePhoto ? (
          <img
            className={`img-fluid ${styles.imageUploadCover}`}
            src={coverProfilePhoto}
            alt="profile is not uploaded"
          />
        ) : null}
      </div>
    </>
  );
};

export { ImageUpload, CoverImageUpload };
