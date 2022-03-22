import React, { useState, useEffect } from "react";
import styles from "../../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { requestURL } from "../../ReqUrl";
import Loading from "../../Loading";
import Crop from "../../CropFunctionality/Crop";
import { Dialog } from "@mui/material";
const PlaylistImageUpload = (props) => {
  const [photoURL, setPhotoURL] = useState("");
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState("");
  const [openCrop, setOpenCrop] = useState(false);
  const [upload, setUpload] = useState(false);
  const [uploadCover, setUploadCover] = useState(false);
  const [profilePhoto, setProfilePhoto] = useState("");
  const [profileCover, setProfileCover] = useState("");
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  useEffect(() => {
    if (upload && width < 201) {
      setOpen(true);
      let formData = new FormData();
      formData.append("file", file);
      axios
        .post(`${requestURL}/e-content/${props.eid}/photo`, formData)
        .then((res) => {
          setOpen(false);
          setUpload(false);
          console.log(res.data.message);
        })
        .catch(() => {
          console.log("Some thing went wrong");
        });
    } else if (uploadCover && width > 202) {
      setOpen(true);
      let formData = new FormData();
      formData.append("file", file);
      axios
        .post(`${requestURL}/e-content/${props.eid}/cover`, formData)
        .then((res) => {
          setOpen(false);
          setProfileCover(false);
          console.log(res.data.message);
        })
        .catch(() => {
          console.log("Some thing went wrong");
        });
    } else {
    }
  }, [upload, uploadCover]);

  const coverChange = (e) => {
    const image = URL.createObjectURL(e.target.files[0]);
    setFile(e.target.files[0]);
    setWidth(810);
    setHeight(250);
    setProfileCover(image);
    setPhotoURL(image);
    setOpenCrop(true);
  };
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
      {open && <Loading open={open} />}
      {openCrop && (
        <Dialog open={openCrop}>
          <Crop
            setPhotoURL={setPhotoURL}
            photoURL={photoURL}
            setFile={setFile}
            setOpenCrop={setOpenCrop}
            setUpload={setUpload}
            setUploadCover={setUploadCover}
            width={width}
            height={height}
            setProfileCover={setProfileCover}
            setProfilePhoto={setProfilePhoto}
          />
        </Dialog>
      )}
      <div className={styles.shiftup}>
        <div className={`${styles.profilecover} `}>
          <form style={{ marginTop: "0px" }}>
            <label
              htmlFor="coverImage"
              style={{
                display: "flex !important",
                justifyContent: "flex-end",
                marginRight: "10px",
              }}
            >
              <i className={`fas fa-edit ${styles.editcover}`}></i>
            </label>
            {!profileCover && (
              <img
                src={props.coverImg}
                className={`img-fluid  ${styles.imageUploadCover}`}
                alt="Profile"
              />
            )}
            {profileCover && (
              <img
                src={profileCover}
                className={`img-fluid  ${styles.imageUploadCover}`}
                alt="Profile"
              />
            )}
            <input
              type="file"
              id="coverImage"
              style={{ display: "none" }}
              name="file"
              accept="image/gif, image/jpeg, image/png"
              onChange={coverChange}
            />
          </form>
        </div>

        <div className={styles.profilecoverImage}>
          <div
            className={styles.profileImageHovering}
            style={{ marginTop: "31px" }}
          >
            <label htmlFor="profileImage">
              <i
                className={`fas fa-edit ${styles.editprofileImage}`}
                style={{
                  position: "fixed",
                  marginTop: " 111px",
                  color: "blue",
                }}
              ></i>
            </label>
            <form style={{ marginTop: "-31px" }}>
              {!profilePhoto && (
                <img
                  src={props.profileImg}
                  className={`img-fluid`}
                  style={{ height: "172px", width: "172px" }}
                  alt="Profile"
                />
              )}
              {profilePhoto && (
                <img
                  src={profilePhoto}
                  className={`img-fluid`}
                  style={{ height: "172px", width: "172px" }}
                  alt="Profile"
                />
              )}
              <input
                type="file"
                id="profileImage"
                style={{ display: "none" }}
                name="file"
                onChange={profileChange}
                accept="image/gif, image/jpeg, image/png"
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaylistImageUpload;
