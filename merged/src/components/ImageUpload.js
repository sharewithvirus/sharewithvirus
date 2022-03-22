import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import styles from "./Home.module.css";
import Loading from "./Loading";

const ImageUpload = (props) => {
  const [image, setImage] = useState("");
  const [imageShow, setImageShow] = useState("");
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [open, setOpen] = useState(false);
  // const [notification, setNotification] = useState({
  //   showMessages: false,
  //   msg: "",
  // });
  const saveFile = (e) => {
    setImage(e.target.files[0]);
    setFile(() => e.target.files);
    setFileName(() => e.target.files[0].name);
    // console.log(file, fileName);
  };

  useEffect(() => {
    if (image) {
      setOpen(true);
      const formData = new FormData();
      formData.append("file", file[0]);
      formData.append("fileName", fileName);
      const id = props.idImage;
      const src = URL.createObjectURL(image);
      setImageShow(src);
      axios
        .post(`${props.photoPath}/photo/${id}`, formData)
        .then((res) => {
          setOpen(false);
          // setNotification({ showMessages: true, msg: res.data.message });
        })
        .catch((e) => {
          console.log("Something Went Wrong...");
        });
    }
  }, [image]);

  return (
    <>
      <Loading opne={open} />
      <div className={styles.profileImageHovering}>
        <label htmlFor="profileImage">
          <i
            class={`fas fa-edit ${styles.editprofileImage}`}
            style={{ marginTop: "111px" }}
          ></i>
            {/* <img
              src="/images/edit-pencil-icon.svg"
              alt="user"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Edit"
              style={{marginTop: '111px', marginLeft: ''}}
            />  */}
          
        </label>
        <img
          src={props.profilePicSrc}
          className={`img-fluid `}
          style={
            image
              ? { display: "none" }
              : { height: "172px", marginTop: "-144px", width: "172px" }
          }
          alt="Profile"
        />
        <input
          type="file"
          accept=""
          multiple
          id="profileImage"
          style={{ display: "none" }}
          name="imagePhoto"
          onChange={saveFile}
        />

        {image ? (
          <img
            className={`img-fluid `}
            src={imageShow}
            style={{ height: "172px", marginTop: "-144px", width: "172px" }}
            alt="profile is not uploaded"
          />
        ) : null}
      </div>
    </>
  );
};

const CoverImageUpload = (props) => {
  // const valueStyle = props.styleValue ? "830px" : "810px";
  const [image, setImage] = useState("");
  const [imageShow, setImageShow] = useState("");
  const [file, setFile] = useState("");
  const [fileName, setFileName] = useState("");
  const [open, setOpen] = useState(false);
  // const [notification, setNotification] = useState({
  //   showMessages: false,
  //   msg: "",
  // });
  const saveFile = (e) => {
    setImage(e.target.files[0]);
    setFile(() => e.target.files);
    setFileName(() => e.target.files[0].name);
    console.log(file, fileName);
  };
  useEffect(() => {
    if (image) {
      setOpen(true);
      const formData = new FormData();
      formData.append("file", file[0]);
      formData.append("fileName", fileName);
      const id = props.idCover;
      const src = URL.createObjectURL(image);
      setImageShow(src);
      axios
        .post(`${props.coverPath}/coverphoto/${id}`, formData)
        .then((res) => {
          setOpen(false);
          // setNotification({ showMessages: true, msg: res.data.message });
        })
        .catch((e) => {
          console.log("Something Went Wrong...");
        });
    }
  }, [image]);
  return (
    <>
      <Loading opne={open} />

      <div>
        <label
          htmlFor="profileCoverImage"
          style={{
            display: "flex !important",
            justifyContent: "flex-end",
            marginRight: "10px",
          }}
        >
          <p>
            <i
              class={`fas fa-edit ${styles.editcover}`}
              // style={{ marginLeft: " 820px" }}
            ></i>
          </p>
        </label>
        <img
          src={props.coverPicSrc}
          // src={props.coverPicSrc}
          className={`img-fluid ${styles.imageUploadCover}`}
          // style={{ height: "200px" }}
          alt="cover-image"
          style={image ? { display: "none" } : { color: "white" }}
        />
        <input
          type="file"
          accept=""
          multiple
          id="profileCoverImage"
          style={{ display: "none" }}
          name="coverPhoto"
          onChange={saveFile}
        />
        {image ? (
          <img
            className={`img-fluid ${styles.imageUploadCover}`}
            src={imageShow}
            alt="profile is not uploaded"
          />
        ) : null}
      </div>
    </>
  );
};
// ImageUpload.defaultProps = {
//   profilePicSrc:
//     "https://themes.pixelstrap.com/friendbook/assets/images/user/1.jpg",
//   coverPicSrc:
//     "https://themes.pixelstrap.com/friendbook/assets/images/cover/5.jpg",
// };
// CoverImageUpload.defaultProps = {
//   profilePicSrc:
//     "https://themes.pixelstrap.com/friendbook/assets/images/user/1.jpg",
//   coverPicSrc:
//     "https://themes.pixelstrap.com/friendbook/assets/images/cover/5.jpg",
// };
export { ImageUpload, CoverImageUpload };
