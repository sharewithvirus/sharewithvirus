import React from "react";
import { useNavigate } from "react-router";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Dcard = (props) => {
  const navigate = useNavigate();

  return (
    <>
      {props.departData &&
        props.departData.map((dt) => (
          <div
            className={` ${styles.dlogo} ${styles.cardView}`}
            onClick={() => navigate(`/${props.id}/department/${dt._id}`)}
          >
            <img
              className={styles.dlogoImages}
              src={
                dt.profilePhoto ? dt.profilePhoto : "/images/icon-admission.svg"
              }
              alt="not found"
            />
            <p className={styles.dlogoText}>
              <small>{dt.dName}</small>
            </p>
          </div>
        ))}
    </>
  );
};
Dcard.defaultProps = {
  imgSrc: "/images/logo-department.png",
  dname: " Department Name",
};

export default Dcard;
