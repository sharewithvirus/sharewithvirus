import React, { useState, useCallback } from "react";
import styles from "../../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { requestURL } from "../../ReqUrl";
import Loading from "../../Loading";
// import CropFunctionality from "./CropFunctionality";

const PlaylistImageUpload = (props) => {
  const [coverImage, setCoverImage] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [open, setOpen] = useState(false);

  const coverChange = (e) => {
    const image = URL.createObjectURL(e.target.files[0]);
    setCoverImage(image);
    setOpen(true);
    let formData = new FormData();
    formData.append("file", e.target.files[0]);
    axios
      .post(`${requestURL}/e-content/${props.eid}/cover`, formData)
      .then((res) => {
        setOpen(false);
      })
      .catch(() => {
        console.log("Some thing went wrong");
      });
  };
  const profileChange = (e) => {
    const image = URL.createObjectURL(e.target.files[0]);
    setProfileImage(image);
    setOpen(true);
    let formData = new FormData();
    formData.append("file", e.target.files[0]);
    axios
      .post(`${requestURL}/e-content/${props.eid}/photo`, formData)
      .then((res) => {
        setOpen(false);
      })
      .catch(() => {
        console.log("Some thing went wrong");
      });
  };

  return (
    <>
      {open && <Loading open={open} />}
      {/* {coverImage && <CropFunctionality coverImage={coverImage} />} */}
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
            {!coverImage && (
              <img
                src={props.coverImg}
                className={`img-fluid  ${styles.imageUploadCover}`}
                alt="Profile"
              />
            )}
            {coverImage && (
              <img
                src={coverImage}
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
              {!profileImage && (
                <img
                  src={props.profileImg}
                  className={`img-fluid`}
                  style={{ height: "172px", width: "172px" }}
                  alt="Profile"
                />
              )}
              {profileImage && (
                <img
                  src={profileImage}
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
