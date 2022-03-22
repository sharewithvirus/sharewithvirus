import React, { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { ImageUpload, CoverImageUpload } from "./ImageUpload";

const ProfileUserImageUpload = (props) => {
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
              className="btn btn-secondary bg-transparent"
              onClick={() => navigate(`/personal/${props.id}`)}
            >
              <img
              src="/images/setting-icon.svg"
              alt="user"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Setting"
            /> Setting
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

ProfileUserImageUpload.defaultProps = {
  profilePicSrc:
    "https://themes.pixelstrap.com/friendbook/assets/images/user/1.jpg",
  coverPicSrc:
    "https://themes.pixelstrap.com/friendbook/assets/images/cover/5.jpg",
  acctionBtn: "Action Button",
};

export default ProfileUserImageUpload;
