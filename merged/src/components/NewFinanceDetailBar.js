import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { getdepartmenttotalstudent } from "./finalReportFormula";

const NewFinanceDetailBar = (props) => {

  return (
    <>
        <div className={` ${styles.bar} ${styles.newDetailsBar}`}>
          <div className={styles.barMainrow}>
            <div
              className={`col col-xl-4  ${styles.barOrder2} ${styles.barInner} `}
            >
              <div
                className={` ${styles.barInnersLeft} ${styles.barLeftShort}`}
              >
                {/* <p>{props.financeText.financeHead ? 
                    `${props.financeText.financeHead.staffFirstName} ${props.financeText.financeHead.staffMiddleName ? props.financeText.financeHead.staffMiddleName : ''}
                    ${props.financeText.financeHead.staffLastName}` : ''
                }</p> */}
                <p>Finance Manager</p>
              </div>
            </div>
            <div
              className={`col col-xl-4   ${styles.barOrder1} ${styles.barInner} `}
            >
              <div className={`w-100 ${styles.barInnerCenter}`}>
                <p className={` ${styles.profileName}`}>
                  {`Finance Department`}
                </p>
              </div>
            </div>
            <div
              className={`col col-xl-4 ${styles.barOrder3} ${styles.barInner}`}
            >
              <div className={styles.barInnersRight}>
                <p>{props.financeText.financeAbout ? "" : 'About Finance'} </p>
                <p>
                  {" "}
                  &nbsp;{" "}
                  {props.financeText.financeAbout ? props.financeText.financeAbout.substr(0, 28) : ""}
                </p>
              </div>
            </div>
          </div>
        </div>
     
    </>
  );
};


export default NewFinanceDetailBar;
