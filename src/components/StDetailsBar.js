import React from "react";
import { useNavigate } from "react-router";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

const StDetailsBar = (props) => {
  return (
    <>
      <div className={` ${styles.bar} ${styles.newDetailsBar}`}>
        <div className={styles.barMainrow}>
          <div
            className={`col col-xl-4  ${styles.barOrder2} ${styles.barInner} `}
          >
            <div className={` ${styles.barInnerNew}`}>
              <button
                type="submit"
                className="btn btn-primary btn-sm px-4 mb-3"
              >
                Designation
              </button>
              <h6>
                <i>Department Head</i>
              </h6>
            </div>
          </div>
          <div
            className={`col col-xl-4   ${styles.barOrder1} ${styles.barInner} `}
          >
            <div className={`w-100 ${styles.barInnerCenter}`}>
              <p className={` ${styles.profileName}`}>{props.name}</p>
            </div>
          </div>
          <div
            className={`col col-xl-4 ${styles.barOrder3} ${styles.barInner}`}
          >
            <div className={styles.barInnersRight}>
              <p>{props.head1} </p>
              <p> &nbsp; {props.body1}</p>
            </div>
            <div className={styles.barInnersRight}>
              <p>{props.head2} </p>
              <p>&nbsp; {props.body2}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

StDetailsBar.defaultProps = {
  name: "Staff Name",
  subjectsCount: 50,
  studentsCount: 500,
  head1: "Department : ",
  body1: "{Description}",
  head2: "Joining No : ",
  body2: "194",
};

export default StDetailsBar;
