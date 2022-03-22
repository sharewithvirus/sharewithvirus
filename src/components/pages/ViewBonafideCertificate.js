import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "../Home.module.css";
// import jsPDF from 'jspdf'
import axios from "axios";
import { requestURL } from "../ReqUrl";
import Pdf from "react-to-pdf";

const ref = React.createRef();

const ViewBonafideCertificate = () => {
  // const navigate = useNavigate();
  const params = useParams();

  const [insData, setInsData] = useState("");
  const [studentData, setStudentData] = useState("");
  const [classData, setClassData] = useState("");
  const [first, setFirst] = useState(false);
  const [first1, setFirst1] = useState(false);
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
        setFirst1(true);
      })
      .catch((e) => {
        console.log("something went wrong");
      });
  }, [params.id, params.sid]);

  return (
    <>
      <div className="row">
        <div className="col-12 col-md-7 mx-auto">
          <div
            className={`${styles.bonaTop} 
    ${styles.profilecoverName}`}
            ref={ref}
          >
            <div
              style={{
                marginLeft: "20px",
                marginRight: "20px",
                backgroundColor: "#f8f8f8",
                marginTop: "-1px",
              }}
            >
              <div>
                <div className={styles.bona}>
                  <div className={styles.bonaHead}>
                    <img
                      className={styles.bonaLogo}
                      src={
                        insData.photoId === "1"
                          ? "/images/institute-avatar.jpeg"
                          : first
                          ? `${requestURL}/insprofileabout/photo/${insData.insProfilePhoto}`
                          : null
                      }
                      alt=""
                      style={{
                        width: "120px",
                        height: "100px",
                        borderRadius: "50%",
                      }}
                    />
                  </div>
                  <div className={styles.bonaHeadName}>
                    <h2 style={{ marginRight: "180px", color: "#4047da" }}>
                      {insData.insName}
                    </h2>
                    <h3
                      style={{
                        marginRight: "180px",
                        color: "#020202",
                        fontSize: "1.2rem",
                      }}
                    >{`${insData.insDistrict} - ${insData.insPincode}`}</h3>
                  </div>
                </div>
                <h3 style={{ color: "#2f2e70", fontSize: "3rem" }}>
                  Bona-fide Certificate
                </h3>
              </div>
              <div className={styles.bonaDateImage}>
                <div className={styles.bonaSubjectDate}>
                  <div className={styles.bonaDate} style={{ color: "#232323" }}>
                    Date : {studentData.studentCertificateDate}
                  </div>
                  <div
                    className={styles.bonaSubject}
                    style={{ marginLeft: "24px", color: "#232323" }}
                  >
                    <p>Subject : </p>
                    <p className={styles.subP1}> {studentData.studentReason}</p>
                  </div>
                </div>
                <div className={styles.bonaImageDiv}>
                  <img
                    className={styles.bonaImage}
                    src={
                      studentData.photoId === "1"
                        ? // ? "https://image.shutterstock.com/image-vector/person-icon-260nw-282598823.jpg"
                          "/images/image-boy2.png"
                        : first1
                        ? `${requestURL}/search/insdashboard/studentdata/photo/${studentData.studentProfilePhoto}`
                        : null
                    }
                    alt=""
                  />
                </div>
              </div>
              {/* <p className={styles.subP2}></p> */}
              <div className={styles.bonaText}>
                <p className={styles.bonaPara}>
                  <span className={styles.bonaSpace}></span>
                  This is to certify that Mr./Miss{" "}
                  <span
                    className={styles.bonaSpan}
                    style={{ color: "#131313" }}
                  >
                    {`${studentData.studentFirstName} ${
                      studentData.studentMiddleName
                        ? studentData.studentMiddleName
                        : ""
                    } ${studentData.studentLastName}`}
                    ,{" "}
                  </span>
                  Birthdate as per records of institute is{" "}
                  <span
                    className={styles.bonaSpan}
                    style={{ color: "#131313" }}
                  >
                    {studentData.studentDOB},
                  </span>
                  is a bonafied student this institute, studying in class
                  <span
                    className={styles.bonaSpan}
                    style={{ color: "#131313" }}
                  >
                    {" "}
                    {classData.className} (Batch)
                  </span>
                  .
                </p>
                <p className={styles.bonaDeclare}>
                  <span className={styles.bonaSpace}></span>To the best of my
                  knowledge he/she bear a good moral character.
                </p>
              </div>
              <div className={styles.bonaBottom1}>
                <h3
                  className={styles.bonaBottomPrincipals}
                  style={{ color: "#010101" }}
                >
                  {insData.insPrinciple}
                </h3>
                <h3 className={styles.bonaBottomStamps}></h3>
              </div>
              <div
                className={styles.bonaBottom}
                style={{ marginBottom: "0px" }}
              >
                <h3
                  className={styles.bonaBottomPrincipal}
                  style={{ color: "#010101" }}
                >
                  Principal
                </h3>
                <h3
                  className={styles.bonaBottomStamp}
                  style={{ color: "#010101", marginRight: '10px' }}
                >
                  Stamp of Institute
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Pdf targetRef={ref} filename={`${studentData.studentFirstName}.pdf`}>
        {({ toPdf }) => (
          <button
            type="button"
            className="btn btn-outline-danger mx-auto px-5 mb-3"
            onClick={toPdf}
          >
            Download Pdf
          </button>
        )}
      </Pdf>
    </>
  );
};

export default ViewBonafideCertificate;