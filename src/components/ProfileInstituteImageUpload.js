import React, { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ImageUpload, CoverImageUpload } from "./ImageUpload";

const ProfileInstituteImageUpload = (props) => {
  const navigate = useNavigate();
  return (
    <>
      {props.id ? (
        <div className={styles.shiftup}>
          <div className={`${styles.profilecover} `}>
            <CoverImageUpload
              coverPath={props.pathUrl}
              coverPicSrc={props.coverPicSrc}
              idCover={props.id}
            />
          </div>
          <div className={styles.profilecoverImage}>
            <ImageUpload
              photoPath={props.pathUrl}
              profilePicSrc={props.profilePicSrc}
              idImage={props.id}
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
              <i class="fas fa-cogs mx-1 mt-1"></i>
              {props.actionBtn}
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

ProfileInstituteImageUpload.defaultProps = {
  profilePicSrc:
    "https://themes.pixelstrap.com/friendbook/assets/images/user/1.jpg",
  coverPicSrc:
    "https://themes.pixelstrap.com/friendbook/assets/images/cover/5.jpg",
  acctionBtn: "Action Button",
};

export default ProfileInstituteImageUpload;
