import React, { useState, useEffect } from "react";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { getdepartmenttotalstudent } from "./finalReportFormula";

const NewDetailsBar = (props) => {
  //  For Department Data New Details Bar
  let studentCount = 0;
  let classCount = 0;

  //  console.log(props.batchData)

  if (props.batchData == null || props.batchData === undefined) {
    // console.log(`cData Value is undefine`)
  } else {
    let bdataClasslist = props.batchData.classroom
      ? props.batchData.classroom
      : 0;
    // console.log(bdataClasslist.length)
    classCount = bdataClasslist.length ? bdataClasslist.length : 0;
    studentCount = getdepartmenttotalstudent(bdataClasslist, classCount);
  }

  // For Class Data New Details Bar

  let classSubjectCount = 0;
  let classStudentCount = 0;

  if (props.cData == null || props.cData === undefined) {
    // console.log(`cData Value is undefine`)
  } else {
    classSubjectCount = props.cData.subject ? props.cData.subject.length : 0;
    classStudentCount = props.cData.ApproveStudent
      ? props.cData.ApproveStudent.length
      : 0;
  }

  return (
    <>
      {props.dData ? (
        <div className={` ${styles.bar} ${styles.newDetailsBar}`}>
          <div className={styles.barMainrow}>
            <div
              className={`col col-xl-4  ${styles.barOrder2} ${styles.barInner} `}
            >
              <div
                className={` ${styles.barInnersLeft} ${styles.barLeftShort}`}
              >
                <p>{classCount}</p>
                <p>Class</p>
              </div>
              <div
                className={` ${styles.barInnersLeft} ${styles.barRightShort}`}
              >
                <p>{studentCount}</p>
                <p>Students</p>
              </div>
            </div>
            <div
              className={`col col-xl-4   ${styles.barOrder1} ${styles.barInner} `}
            >
              <div className={`w-100 ${styles.barInnerCenter}`}>
                <p className={` ${styles.profileName}`}>
                  {`${props.dData.dName ? props.dData.dName : ""}`}
                </p>
              </div>
            </div>
            <div
              className={`col col-xl-4 ${styles.barOrder3} ${styles.barInner}`}
            >
              <div className={styles.barInnersRight}>
                <p>{props.dData.dAbout ? "" : props.head1} </p>
                <p>
                  {" "}
                  &nbsp;{" "}
                  {props.dData.dAbout ? props.dData.dAbout.substr(0, 28) : ""}
                </p>
              </div>
              <div className={styles.barInnersRight}>
                <p>{props.head2} </p>
                <p>&nbsp; {props.batchData ? props.batchData.batchName : ""}</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className={` ${styles.bar} ${styles.newDetailsBar}`}>
          <div className={styles.barMainrow}>
            <div
              className={`col col-xl-4  ${styles.barOrder2} ${styles.barInner} `}
            >
              <div
                className={` ${styles.barInnersLeft} ${styles.barLeftShort}`}
              >
                <p>{classSubjectCount}</p>
                <p>Subjects</p>
              </div>
              <div
                className={` ${styles.barInnersLeft} ${styles.barRightShort}`}
              >
                <p>{classStudentCount}</p>
                <p>Students</p>
              </div>
            </div>
            <div
              className={`col col-xl-4   ${styles.barOrder1} ${styles.barInner} `}
            >
              <div className={`w-100 ${styles.barInnerCenter}`}>
                <p className={` ${styles.profileName}`}>
                  {`${props.cData.className ? props.cData.className : ""}`} (
                  {props.cData.classTitle ? props.cData.classTitle : ""})
                </p>
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
                <p>&nbsp; {props.batchData ? props.batchData.batchName : ""}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

NewDetailsBar.defaultProps = {
  name: "Profile Name",
  subjectsCount: 0,
  studentsCount: 0,
  head1: "About",
  body1: "Description",
  head2: "Batch",
  body2: "2021-2022",
};

export default NewDetailsBar;
