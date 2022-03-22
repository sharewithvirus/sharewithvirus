import React from "react";
import { useNavigate } from "react-router";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import axios from 'axios'
// import PostDisplay from "./PostDisplay";

const ProfileSections = (props) => {
  const navigate = useNavigate();

  return (
    <>
      {props.id ? (
        <p className={` mt-4 ${styles.dashIcon} ${styles.dashIconsInner}`}>
          <span onClick={() => navigate(`/insuserprofile/${props.id}`)}>
            <img
              src="/images/squared-menu-icon.svg"
              alt="user"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Menu"
            /> 
          </span>
          <span onClick={() => navigate(`/insuserprofileabout/${props.id}`)}>
            <img
              src="/images/info-icon.svg"
              alt="user"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Info"
            /> 
          </span>
          <span onClick={() => navigate(`/insuserprofiletag/${props.id}`)}>
            <img
              src="/images/favourites-icon.svg"
              alt="user"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Favourites"
            /> 
          </span>
          <span onClick={() => navigate(`/insuserprofiledisplay/${props.id}`)}>
          <img
            src="/images/open-eye-icon.svg"
            data-toggle="tooltip"
            data-placement="bottom"
            title="Display Persons"
          /> 
          </span>
        </p>
      ) : (
        // <hr />
        <p className={` mt-4 ${styles.dashIcon} ${styles.dashIconsInner}`}>
          <span onClick={() => navigate(`/userprofiles/${props.uid}`)}>
            <img
              src="/images/squared-menu-icon.svg"
              alt="user"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Menu"
            /> 
          </span>
          <span onClick={() => navigate(`/userprofilesabout/${props.uid}`)}>
            <img
              src="/images/info-icon.svg"
              alt="user"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Info"
            /> 
          </span>
          <span onClick={() => navigate(`/userprofiletag/${props.uid}`)}>
            <img
              src="/images/favourites-icon.svg"
              alt="user"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Favourites"
            /> 
          </span>
        </p>
      )}
    </>
  );
};

export default ProfileSections;
