import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";

import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
const ReportCardBothSideStyle = (props) => {
  return (
    <div className={`${styles.reportTopDesign1}`}>
      <div>
        <div className={`${styles.reportTopBox4}`}></div>
        <div
          className={`${styles.reportTopBox1}`}
          style={{ visibility: "hidden" }}
        ></div>

        <div className={`${styles.reportTopDesign}`}>
          <h6
            className={`py-md-3  py-sm-2 offset-sm-4 offset-md-0 ${styles.reportText}`}
            id={styles.reportCardBatch}
          >
            Class:- {props.classdData ? props.classdData.className : ""}-
            {props.classdData ? props.classdData.classTitle : ""}
            <br />
            {props.classdData
              ? `${
                  props.classdData.batch ? props.classdData.batch.batchName : ""
                }`
              : ""}
          </h6>
        </div>
        <div className={`${styles.reportTopBox5}`}></div>
        <div
          className={`${styles.reportTopBox3}`}
          style={{ visibility: "hidden" }}
        ></div>
      </div>
    </div>
  );
};

export default ReportCardBothSideStyle;
