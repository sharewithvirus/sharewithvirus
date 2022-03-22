import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { requestURL } from "../ReqUrl";
import moment from "moment";
import axios from "axios";
import Pdf from "react-to-pdf";
import React from "react";

const ref = React.createRef();

const SchoolLeavingCertificate = () => {
  // const navigate = useNavigate();
  const params = useParams();

  const [insData, setInsData] = useState("");
  const [studentData, setStudentData] = useState("");
  const [classData, setClassData] = useState("");
  const [first, setFirst] = useState(false);
  const [dateData, setDateData] = useState(new Date());

  useEffect(() => {
    axios
      .get(`${requestURL}/insdashboard/${params.id}`)
      .then((res) => {
        setInsData(res.data.institute);
        setFirst(true);
      })
      .catch((e) => {
        console.log("something went wrong");
      });

    axios
      .get(`${requestURL}/studentdesignationdata/${params.sid}`)
      .then((res) => {
        setStudentData(res.data.student);
        setClassData(res.data.student.studentClass);
      })
      .catch((e) => {
        console.log("something went wrong");
      });
  }, []);

  return (
    <>
      <div
        className={`row ${styles.schoolMain} `}
        style={{ marginLeft: "5px" }}
      >
        <div className={`col-12 col-md-7 mx-auto`} ref={ref}>
          <div>
            <div className={` row mt-1 ${styles.schoolHeading}`}>
              <div className={`col-sm-3 mx-3`}>
                <img
                  className={`${styles.schoolLogo}`}
                  src={
                    insData.photoId === "1"
                      ? "/images/institute-avatar.jpeg"
                      : first
                      ? `${requestURL}/insprofileabout/photo/${insData.insProfilePhoto}`
                      : null
                  }
                />
              </div>
              <div
                className={`col-sm-7 mr-5 ${styles.schoolHeadingName}`}
                style={{ marginLeft: "-50px" }}
              >
                <h5 className={`my-1`}>
                  Affiliate To {insData.insAffiliated}
                </h5>
                <h3>{insData.insName}</h3>
                <p className={styles.schoolVillage}>
                  {`${insData.insDistrict} - ${insData.insPincode}`}
                </p>
              </div>
            </div>
            <div className={`row mt-1 ${styles.schoolEdit}`}>
              {/* <p className={`col-sm-4 `} style={{ fontSize: "1.3em" }}>
                Editable Text file
              </p> */}
              <p
                id={styles.p1}
                className={`col-sm-6 `}
              >
                {insData.insEditableText}
              </p>
              {/* <p
              id={styles.p2}
              className={`col-sm-7 offset-sm-3 my-1 ${styles.schoolDotField1}`}
              style={{marginLeft: '187px'}}
            ></p> */}
              <p
                id={styles.p3}
                className={`col-sm-8 offset-sm-2 my-1 `}
                style={{ marginLeft: "158px" }}
              ></p>
            </div>
          </div>
          <div className={`row my-1 ${styles.schoolNumber}`}>
            <div className={`col-sm-4`}>
              GR. No. :{" "}
              {`${
                studentData.studentGRNO < 10
                  ? `0${studentData.studentGRNO}`
                  : studentData.studentGRNO
              }`}
            </div>
            <div className={`col-sm-4`}>Book No. {studentData.studentBookNo <=10 ? `0${studentData.studentBookNo}` : studentData.studentBookNo}</div>
            <div className={`col-sm-4`}>Certificate No. : 01</div>
          </div>
          <h4
            className={`col -sm-12 text-center ${styles.schoolLeavingHeading}`}
            style={{ marginTop: "6px" }}
          >
            -:Leaving Certificate:-
          </h4>
          <p className={`row my-1 ${styles.schoolLeavingPara}`}>
            {/* <p className={`col-sm-4`} style={{ fontSize: "1.3em" }}>
              Editable Text file
            </p> */}
            <p id={styles.p4} className={` col-sm-6 `}>
              {insData.insEditableTexts}
            </p>
          </p>
          <div className={styles.schoolBodyBox}>
            <div className={`row`}>
              <div className="col-sm-5 col-md-3">
                <p className={`py-2 ${styles.schoolLeftBox}`}>Name</p>
              </div>
              <div className="col-sm-7 col-md-9">
                <p className={`py-2 ${styles.schoolRightBox}`}>{`${
                  studentData.studentFirstName
                } ${
                  studentData.studentMiddleName
                    ? studentData.studentMiddleName
                    : ""
                } ${studentData.studentLastName}`}</p>
              </div>
            </div>
            <div className={`row`}>
              <div className="col-sm-5 col-md-3">
                <p className={`py-2 ${styles.schoolLeftBox}`}>Mother Name</p>
              </div>
              <div className="col-sm-7 col-md-9">
                <p className={`py-2 ${styles.schoolRightBox}`}>
                  {studentData.studentParentsName}
                </p>
              </div>
            </div>

            <div className={`row`}>
              <div className="col-sm-5 col-md-3">
                <p className={`py-2 ${styles.schoolLeftBox}`}>Religion :</p>
              </div>
              <div className="col-sm-7 col-md-3">
                <p className={`py-2 ${styles.schoolRightBox}`}>
                  {studentData.studentReligion}
                </p>
              </div>
              <div className="col-sm-5 col-md-3">
                <p className={`py-2 ${styles.schoolLeftBox}`}>Caste:</p>
              </div>
              <div className="col-sm-7 col-md-3">
                <p className={`py-2 ${styles.schoolRightBox}`}>
                  {studentData.studentCastCategory}
                </p>
              </div>
            </div>
            <div className={`row`}>
              <div className="col-sm-5 col-md-3">
                <p className={`py-2 ${styles.schoolLeftBox}`}>Nationality</p>
              </div>
              <div className="col-sm-7 col-md-3">
                <p className={`py-2 ${styles.schoolRightBox}`}>
                  {studentData.studentNationality}
                </p>
              </div>

              <div className="col-sm-5 col-md-3">
                <p className={`py-2 ${styles.schoolLeftBox}`}>M Tongue</p>
              </div>
              <div className="col-sm-7 col-md-3">
                <p className={`py-2 ${styles.schoolRightBox}`}>
                  {studentData.studentMTongue}
                </p>
              </div>
            </div>
            <div className={`row`}>
              <div className="col-sm-5 col-md-3">
                <p className={`py-2 ${styles.schoolLeftBox}`}>Birth Place</p>
              </div>
              <div className="col-sm-7 col-md-9">
                <p className={`py-2 ${styles.schoolRightBox}`}>
                  {studentData.studentBirthPlace}, {studentData.studentState}
                </p>
              </div>
            </div>
            <div className={`row`}>
              <div className="col-sm-5 col-md-3">
                <p className={`py-2 ${styles.schoolLeftBox}`}>DOB</p>
              </div>
              <div className="col-sm-7 col-md-9">
                <p className={`py-2 ${styles.schoolRightBox}`}>
                  {studentData.studentDOB}
                </p>
              </div>
            </div>
            {/* <div className={`row`}>
            <div className="col-sm-5 col-md-3">
              <p className={`py-2`}></p>
            </div> */}
            {/* <div className="col-sm-7 col-md-9">
              <p className={`py-2 ${styles.schoolRightBox}`}>
                In words : Ten/December/Two thousand seven
              </p>
            </div> */}
            {/* </div> */}
            <div className={`row`}>
              <div className="col-sm-5 col-md-3">
                <p className={`py-2 ${styles.schoolLeftBox}`}>Join Date</p>
              </div>
              <div className="col-sm-7 col-md-9">
                <p className={`py-2 ${styles.schoolRightBox}`}>16/08/2017</p>
              </div>
            </div>
            <div className={`row`}>
              <div className="col-sm-5 col-md-3">
                <p className={`py-2 ${styles.schoolLeftBox}`}>Progress</p>
              </div>
              <div className="col-sm-7 col-md-3">
                <p className={`py-2 ${styles.schoolRightBox}`}>
                  {studentData.studentLeavingStudy}
                </p>
              </div>

              <div className="col-sm-5 col-md-3">
                <p className={`py-2 ${styles.schoolLeftBox}`}>Behaviour</p>
              </div>
              <div className="col-sm-7 col-md-3">
                <p className={`py-2 ${styles.schoolRightBox}`}>
                  {studentData.studentLeavingBehaviour}
                </p>
              </div>
            </div>
            <div className={`row`}>
              <div className="col-sm-5 col-md-3">
                <p className={`py-2 ${styles.schoolLeftBox}`}>Leave</p>
              </div>
              <div className="col-sm-7 col-md-3">
                <p className={`py-2 ${styles.schoolRightBox}`}>
                  {studentData.studentLeavingInsDate}
                </p>
              </div>

              <div className="col-sm-5 col-md-3">
                <p className={`py-2 ${styles.schoolLeftBox}`}>Class Name</p>
              </div>
              <div className="col-sm-7 col-md-3">
                <p className={`py-2 ${styles.schoolRightBox}`}>
                  {classData.className}
                </p>
              </div>
            </div>
            {/* <div className={`row`}>
            <div className="col-sm-5 col-md-3">
              <p className={`py-2 ${styles.schoolLeftBox}`}>
                Class name
              </p>
            </div>
            <div className="col-sm-7 col-md-9">
              <p className={`py-2 ${styles.schoolRightBox}`}>
                {classData.className}
              </p>
            </div>
          </div> */}
            <div className={`row`}>
              <div className="col-sm-5 col-md-3">
                <p className={`py-2 ${styles.schoolLeftBox}`}>Reason</p>
              </div>
              <div className="col-sm-7 col-md-9">
                <p className={`py-2 ${styles.schoolRightBox}`}>
                  {studentData.studentLeavingReason}
                </p>
              </div>
            </div>
            <div className={`row`}>
              <div className="col-sm-5 col-md-3">
                <p className={`py-2 ${styles.schoolLeftBox}`}>Remark</p>
              </div>
              <div className="col-sm-7 col-md-9">
                <p className={`py-2 ${styles.schoolRightBox}`}>
                  {studentData.studentLeavingRemark}
                </p>
              </div>
            </div>

            <div className={`row`}>
              <p className={styles.schoolBottom} style={{ fontSize: "12px" }}>
                Giving this certificate all information is correct as per
                institute register.
              </p>
            </div>
            <div
              style={{ marginTop: "0px" }}
              className={`row ${styles.schoolBottomSignature1}`}
            >
              <div
                className={`col-sm-4 col-md-4`}
                style={{ marginBottom: "0px" }}
              >
                <h5>{moment(dateData).format("DD-MM-YYYY")}</h5>
                <h5>Date</h5>
              </div>
              <div
                className={`col-sm-4 col-md-4`}
                style={{ marginBottom: "0px" }}
              >
                <h5 style={{ textAlign: "center" }}>{insData.insAdminClerk}</h5>
                <h5 style={{ textAlign: "center" }}>Clark</h5>
              </div>
              <div
                className={`col-sm-4 col-md-4`}
                style={{ marginBottom: "0px" }}
              >
                <h5 style={{ textAlign: "right" }}>{insData.insPrinciple}</h5>
                <h5 style={{ textAlign: "right" }}>Principle</h5>
              </div>
            </div>
          </div>
          <div className={styles.schoolBottomSignature}></div>
          <p style={{ fontSize: "12px" }} className="mx-3">
            Note: No one execpt one who is making this certificate should
            interferenwith any details of this certificate, other student will
            be expelled and legal action will be taken.
          </p>
        </div>
      </div>
      <Pdf targetRef={ref} filename={`${studentData.studentFirstName}.pdf`}>
        {({ toPdf }) => (
          <button
            type="button"
            className="btn btn-outline-danger btn-sm my-4 px-5 mx-auto"
            onClick={toPdf}
          >
            Download Pdf
          </button>
        )}
      </Pdf>
    </>
  );
};

export default SchoolLeavingCertificate;
