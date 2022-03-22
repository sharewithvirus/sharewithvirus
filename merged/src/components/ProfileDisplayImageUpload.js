import React, { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ImageUpload, CoverImageUpload } from "./ImageUpload";

const ProfileDisplayImageUpload = (props) => {
  const navigate = useNavigate();

  const imageUploadHandler = (url, pathName) => {
    const val = false;
    console.log("This is ProfileDisplayImageUpload image: ", url);
    props.onImageData(url, pathName, val);
  };

  const coverImageUploadHandler = (url, pathName) => {
    const val = true;
    console.log("This is ProfileDisplayImageUpload cover: ", url);

    props.onImageData(url, pathName, val);
  };
  return (
    <>
      {props.id ? (
        <div className={styles.shiftup}>
          <div className={`${styles.profilecover} `}>
            <CoverImageUpload
              coverPicSrc={props.coverPicSrc}
              onCoverImageUpload={coverImageUploadHandler}
            />
          </div>
          <div className={styles.profilecoverImage}>
            <ImageUpload
              profilePicSrc={props.profilePicSrc}
              onImageUpload={imageUploadHandler}
            />
          </div>
          <div className={styles.additionalProfileBtn}>
            {/* <button
              type="submit"
              className="btn btn-primary "
              onClick={() => navigate(`/newadmission`)}
            >
              <i class="fas fa-plus mt-1 mx-2"></i>
              <i>New Admissions</i>
            </button> */}
            <button
              type="submit"
              className="btn btn-primary "
              onClick={() => navigate(`/inssetting/${props.id}`)}
            >
              <i class="fas fa-cogs mx-1 mt-1"></i>{props.actionBtn}
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.shiftup}>
          <div className={`${styles.profilecover} `}>
            <CoverImageUpload
              coverPicSrc={props.coverPicSrc}
              onCoverImageUpload={coverImageUploadHandler}
              styleValue={props.styleValue}
            />
          </div>
          <div className={`${styles.profilecoverImage}`}>
            <ImageUpload
              profilePicSrc={props.profilePicSrc}
              onImageUpload={imageUploadHandler}
            />
          </div>
          <div className={styles.additionalProfileBtn}>
            <button
              type="submit"
              className="btn btn-primary "
              onClick={() => navigate(`/homesettings/${props.uid}`)}
            >
              <i class="fas fa-plus mt-1 mx-2"></i>
              <i> {props.actionBtn}</i>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

ProfileDisplayImageUpload.defaultProps = {
  profilePicSrc:
    "https://themes.pixelstrap.com/friendbook/assets/images/user/1.jpg",
  coverPicSrc:
    "https://themes.pixelstrap.com/friendbook/assets/images/cover/5.jpg",
  acctionBtn: "Action Button",
};

export default ProfileDisplayImageUpload;
