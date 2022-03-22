import React, { useState } from "react";
import { useNavigate } from "react-router";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

const ProfileDiaplaySection = (props) => {
  const navigate = useNavigate();
  return (
    <>
      {props.id ? (
        <div className={styles.shiftup}>
          <div className={`${styles.profilecover} `}>
            <img
              src={props.coverPicSrc}
              alt="cover-image"
              style={{ height: "200px" }}
              className={`img-fluid ${styles.imageDiaplayCover}`}
            />
          </div>
          <div className={styles.profilecoverImage}>
            <img
              className={`img-fluid `}
              style={{ height: "172px" }}
              src={props.profilePicSrc}
              alt="profile"
            />
          </div>
          <div className={styles.additionalProfileBtn}>
            {/* <button
              type="submit"
              className="btn btn-secondary bg-transparent "
              onClick={() => navigate(`/newadmission`)}
            >
              <i class="fas fa-plus mt-1 mx-2"></i>
              <i>New Admissions</i>
            </button> */}
            <button
              type="submit"
              className="btn btn-secondary bg-transparent "
              onClick={() => navigate(`/inssetting/${props.id}`)}
            >
              <img
              src="/images/setting-icon.svg"
              alt="user"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Setting"
            /> {props.actionBtn}
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.shiftup}>
          <div className={`${styles.profilecover} `}>
            <img
              src={props.coverPicSrc}
              alt="cover-image"
              className={`img-fluid ${styles.imageDiaplayCover}`}
            />
          </div>
          <div className={`${styles.profilecoverImage}`}>
            <img
              className={`img-fluid `}
              style={{ height: "172px" }}
              src={props.profilePicSrc}
              alt="profile"
            />
          </div>
          <div className={styles.additionalProfileBtn}>
            <button
              type="submit"
              className="btn btn-secondary bg-transparent "
              onClick={() => navigate(`/personal/${props.uid}`)}
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
      )}
    </>
  );
};

ProfileDiaplaySection.defaultProps = {
  profilePicSrc: "/images/image-boy2.png",
  coverPicSrc: "/images/user-ins-cover-photo2.jpg",
  acctionBtn: "Action Button",
};

export default ProfileDiaplaySection;
