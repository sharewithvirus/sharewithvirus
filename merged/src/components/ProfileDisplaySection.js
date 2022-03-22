import React from "react";
// import { useNavigate } from "react-router";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

const ProfileDisplaySection = (props) => {
  // const navigate = useNavigate();

  return (
    <div className="mt-4">
      {/* <div className="editIcon">
        <i class={`fas fa-edit ${styles.editprofileImage}`}></i>
        <i class={`fas fa-edit ${styles.editcover}`}></i>
      </div> */}
      <div className={`${styles.profilecover} `}>
        <img
          src={props.coverPicSrc}
          alt="cover"
          className={`img-fluid ${styles.imageDiaplayCover}`}
        />
      </div>
      <div className={styles.profilecoverImage}>
        <img className={`img-fluid `} src={props.profilePicSrc} alt="profile" />
      </div>
      <div className={styles.additionalProfileBtn}>
        <button
          type="submit"
          className="btn btn-primary "
          // onClick={() => navigate("/newadmission")}
        >
          <i class="fas fa-plus mt-1 mx-2"></i>
          <i> {props.actionBtn}</i>
        </button>
      </div>
    </div>
  );
};

ProfileDisplaySection.defaultProps = {
  profilePicSrc: "/images/image-boy2.png",
  coverPicSrc: "/images/other-places-cover-photo.jpg",
  acctionBtn: "Action Button",
};

export default ProfileDisplaySection;
