import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopInstitute from "../NavbarTopInstitute";
import AboutSection from "../AboutSection";
import NavbarBottomInstitute from "../NavbarBottomInstitute";
import BackButton from "../BackButton";
import axios from "axios";
import { requestURL } from "../ReqUrl";
import { Success, Danger } from "../SnackBar";

const SchoolLeaving = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [insData, setInsData] = useState("");
  const [studentInsData, setStudentInsData] = useState([]);
  const [adminMsg, setAdminMsg] = useState({
    showMessages: false,
    showMessagesDanger: false,
    msg: "",
  });
  const [leavingData, setLeavingData] = useState({
    studentLeavingInsDate: "",
    studentLeavingStudy: "",
    studentLeavingRemark: "",
    studentLeavingBehaviour: "",
    studentLeavingReason: "",
    studentBookNo: '',
    studentCertificateNo: '',
    sid: "",
  });

  const CertificateHandler = (e) => {
    const { name, value } = e.target;
    setLeavingData({
      ...leavingData,
      [name]: value,
    });
  };

  const CertificateHandlerChange = (e) => {
    e.preventDefault();
    axios
      .post(
        `${requestURL}/ins/${params.id}/student/leaving/certificate`,
        leavingData
      )
      .then((res) => {
        setAdminMsg({ showMessages: true, msg: res.data.message });

        setTimeout(() => {
          console.log(res.data.student)
          navigate(
            `/ins/${params.id}/student/leaving/certificate/${res.data.student._id}`
          );
        }, 100);
      })
      .catch((e) => {
        console.log("Something went wrong");
      });
  };

  useEffect(() => {
    axios
      .get(`${requestURL}/insdashboard/${params.id}`)
      .then((res) => {
        setInsData(res.data.institute);
        setStudentInsData(res.data.institute.ApproveStudent);
      })
      .catch((e) => {
        console.log("Something went wrong");
      });
  }, []);

  return (
    <>
      {adminMsg.showMessages ? <Success msg={adminMsg.msg} /> : null}
      <div className={styles.mainScreen}>
        <NavbarTopInstitute id={params.id} />
        <div className={`${styles.mainContent} `}>
          <div className="row">
            <div className={`col col-lg-4 col-xl-3 ${styles.leftside}`}>
              <div className={styles.leftBar}>
                <AboutSection id={params.id} />
                <div className={` ${styles.about} ${styles.leftMenu}`}>
                <div
                    className={`mt-5 ${styles.dabout} ${styles.active}`}
                    onClick={() => navigate(`/allstaff/${params.id}`)}
                  >
                    <img
                    src="/images/staff-icon.svg"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Staff"
                  /> Staff
                  </div>
                  <div
                    className={`${styles.dabout} mt-3 mb-2`}
                    onClick={() => navigate(`/allstudent/${params.id}`)}
                  >
                    <img
                    src="/images/student-icon.svg"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Student"
                  /> Students
                  </div>
                </div>
              </div>
            </div>
            <div className={`col col-lg-8 col-xl-9  mx-auto ${styles.midside}`}>
              <div className={`${styles.about}`} style={{ marginTop: "24px" }}>
                {/* <BackButton /> */}
                <div className={` ${styles.outer2}`}>
                  <form className="row" onSubmit={CertificateHandlerChange}>
                    <h4>
                      Student School Leaving Certificate
                      <span
                        className={styles.staffForm}
                        onClick={() => navigate(`/studentform/${params.id}`)}
                      >
                        <img
                          src="/images/s-three-icon.svg"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Menu"
                        />
                      </span>
                    </h4>
                    <div className={`mb-5 ${styles.ddetail}`}>
                    <div className="row col-11 col-lg-12 col-xl-12 justify-item-center mx-auto">
                      <div className="col-12 col-md-4">
                        <div
                          className={`${styles.dTab} ${styles.active}`}
                          onClick={() => navigate(`/allstudent/${params.id}`)}
                        >
                          <span>
                          <span>
                          <img
                          src="/images/student-icon.svg"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Student"
                        /> Students
                          </span>
                          </span>
                        </div>
                        </div>
                      <div className="col-12 col-md-4">
                        <div className={`${styles.dTab} `}>
                          <span>
                          <span>
                          <img
                          src="/images/s-certificate-icon.svg"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Certificate"
                        /> Certificate
                          </span>
                          </span>
                        </div>
                        </div>
                      <div className="col-12 col-md-4">
                        <div
                          className={`${styles.dTab} ${styles.active} `}
                          // onClick={() => navigate("/studentcomplaints")}
                        >
                          <span>
                            <img
                          src="/images/s-complaint-icon.svg"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Complaints"
                        /> Complaints
                          </span>
                        </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6 mb-2">
                      <label htmlFor="stsearch" className="form-group mb-2">
                        Select Student
                      </label>
                      <select
                        name="sselect"
                        id="sselect"
                        name="sid"
                        className="form-control"
                        onChange={CertificateHandler}
                        required
                      >
                        <option value="Select Student">Select Student</option>
                        {studentInsData &&
                          studentInsData.map((st) => (
                            <option value={st._id}>{`${st.studentGRNO} - ${
                              st.studentFirstName
                            } ${
                              st.studentMiddleName ? st.studentMiddleName : ""
                            } ${st.studentLastName}`}</option>
                          ))}
                      </select>
                    </div>
                    <div className="col-12 col-md-6 mb-2">
                      <label htmlFor="sresult" className="form-group mb-2">
                        Study / Progress
                      </label>
                      <select
                        type="text"
                        name="studentLeavingStudy"
                        className="form-control"
                        id="sresult"
                        placeholder="Write Your Reason / Subject Here..."
                        onChange={CertificateHandler}
                        required
                      >
                        <option value="select study / progress">
                          Select study / progress
                        </option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                      </select>
                    </div>      
                    <div className="col-12 col-md-6 mb-2">
                      <label htmlFor="sdate" className="form-group mb-2">
                        Leaving Date
                      </label>
                      <input
                        type="date"
                        name="studentLeavingInsDate"
                        className="form-control"
                        id="sdate"
                        placeholder="Date"
                        onChange={CertificateHandler}
                        required
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-2">
                      <label htmlFor="remark" className="form-group mb-2">
                        Remark
                      </label>
                      <select
                        type="text"
                        name="studentLeavingRemark"
                        className="form-control"
                        id="remark"
                        placeholder="Enter Remark"
                        onChange={CertificateHandler}
                        required
                      >
                        <option value="Select Remark">Select Remark</option>
                        <option value="Nice">Nice</option>
                        <option value="Awesome">Awesome</option>
                        <option value="Marvelous">Marvelous</option>
                      </select>
                    </div>
                    <div className="col-12 col-md-6 mb-2">
                      <label htmlFor="remarks" className="form-group mb-2">
                        Behaviour
                      </label>
                      <select
                        type="text"
                        name="studentLeavingBehaviour"
                        className="form-control"
                        id="remarks"
                        placeholder="Enter Student Behaviour"
                        onChange={CertificateHandler}
                        required
                      >
                        <option value="Select Beahviour">
                          Select Beahviour
                        </option>
                        <option value="Bad">Bad</option>
                        <option value="Good">Good</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Extra-Ordinary">Extra-Ordinary</option>
                      </select>
                    </div>
                    <div className="col-12 col-md-6 mb-2">
                      <label htmlFor="book" className="form-group mb-2">
                        Book No.
                      </label>
                      <input
                        type="tel"
                        name="studentBookNo"
                        className="form-control"
                        id="book"
                        placeholder="Enter Book No."
                        onChange={CertificateHandler}
                        required
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-2">
                      <label htmlFor="book" className="form-group mb-2">
                        Certificate No.
                      </label>
                      <input
                        type="tel"
                        name="studentCertificateNo"
                        className="form-control"
                        id="book"
                        placeholder="Enter Certificate No."
                        onChange={CertificateHandler}
                        required
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-2">
                      <label htmlFor="sres" className="form-group mb-2">
                        Reason / Subject
                      </label>
                      <textarea
                        type="text"
                        name="studentLeavingReason"
                        className="form-control"
                        id="sres"
                        placeholder="Write Your Reason / Subject Here..."
                        onChange={CertificateHandler}
                        required
                      ></textarea>
                    </div>
                    
                    <div className="col-12 d-flex justify-content-around my-5">
                      {/* <button
                        type="submit"
                        className="btn btn-success  px-5 mx-5"
                      >
                        Apply Online
                      </button> */}

                      <button type="submit" className="btn btn-primary  px-5">
                        Continue with Certificate
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <NavbarBottomInstitute id={params.id}/>
      </div>
    </>
  );
};

export default SchoolLeaving;
