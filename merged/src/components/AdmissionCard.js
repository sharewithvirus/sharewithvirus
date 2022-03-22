import React from "react";
// import { useNavigate } from "react-router";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

const AdmissionCard = (props) => {
  // const navigate = useNavigate();

  return (
    <>
      <div
        className={`mt-5 ${styles.dlogo} ${styles.admissionCard}`}
        // onClick={() => navigate("/application")}
      >
        <img className={styles.dlogoImages} src={props.imgSrc} alt="not found" />
        <p className={styles.dlogoText}>
          <small>{props.department}</small>
          <br /> <hr />
          <small>{props.batch}</small>
        </p>
      </div>
    </>
  );
};

AdmissionCard.defaultProps = {
  imgSrc: "images/icon-admission.svg",
  department: "Department Name",
  batch: "FY Batch Name",
};

export default AdmissionCard;
