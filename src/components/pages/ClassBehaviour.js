import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopUser from "../NavbarTopUser";
import AboutSection from "../AboutSection";
import BackButton from "../BackButton";
import NavbarBottomUser from "../NavbarBottomUser";
import axios from "axios";
import { requestURL } from "../ReqUrl";
import { Success, Danger } from "../SnackBar";
import UserStaffAboutSection from "../UserStaffAboutSection";
import UserStaffSideBar from "../UserStaffSideBar";
import TextField from "@mui/material/TextField";
import Rating from "@mui/material/Rating";
import StaffSelectInstituteRole from "../StaffSelectInstituteRole";
import InstituteRoleTab from "../InstituteRoleTab";

const ClassBehaviour = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [catalogIns, setCatalogIns] = useState("");
  const [classData, setClassData] = useState("");
  const [catalogStudent, setCatalogStudent] = useState([]);
  const [adminMsg, setAdminMsg] = useState({
    showMessages: false,
    showMessagesDanger: false,
    msg: "",
  });
  useEffect(() => {
    axios
      .get(`${requestURL}/staffdesignationdata/${params.sid}`)
      .then((res) => {
        // console.log(res);
        const institute = res.data.staff.institute;
        setCatalogIns(institute);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });

    axios
      .get(`${requestURL}/staffclass/${params.cid}`)
      .then((res) => {
        // console.log(res);
        const Cdata = res.data.classes;
        const studentData = res.data.classes.ApproveStudent;
        setClassData(Cdata);
        setCatalogStudent(studentData);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  }, []);
  // }, [catalogStudent]);

  const [studentText, setStudentText] = useState("");

  const StudentStatusHandler = (id) => {
    axios
      .post(`${requestURL}/student/status`, {
        studentId: id,
      })
      .then((res) => {
        // console.log(res);
        setStudentText(res.data.student);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  };

  const [behaviourData, setBehaviourData] = useState({
    bratings: "",
    bimprovements: "",
    blackIn: "",
  });

  const BehaviourHandler = (e) => {
    const { name, value } = e.target;
    setBehaviourData({
      ...behaviourData,
      [name]: value,
    });
  };

  const BehaviourHandlerChange = (e) => {
    e.preventDefault();
    axios
      .post(
        `${requestURL}/class/${params.cid}/student/${studentText._id}/behaviour`,
        behaviourData
      )
      .then((res) => {
        setAdminMsg({ showMessages: true, msg: res.data.message });
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  };

  useEffect(() => {
    axios
      .get(`${requestURL}/staffclass/${params.cid}`)
      .then((res) => {})
      .catch((e) => {
        console.log("Soemthing went wrong");
      });
  }, []);
  // }, [studentText]);

  function handleChange(value) {
    navigate(`/${value}`);
  }

  return (
    <>
      <NavbarTopUser uid={params.id} />
      {adminMsg.showMessages ? <Success msg={adminMsg.msg} /> : null}

      <div className={styles.mainScreen}>
        <div className={`${styles.mainContent} ${styles.dashboard}`}>
          <div className="row">
            <div className={`col col-lg-4 col-xl-3 ${styles.leftside}`}>
              <InstituteRoleTab uid={params.id} />
              <div className={styles.leftBar}>
                <UserStaffAboutSection sid={params.sid} uid={params.id} />
                <div
                  className={`d-flex form-group ${styles.insRole} mt-3 mx-auto`}
                ></div>

                <div className={` ${styles.about} ${styles.leftMenu}`}>
                  <UserStaffSideBar sid={params.sid} uid={params.id}/>
                </div>
              </div>
            </div>
            <div className={`col col-lg-8 col-xl-9  mx-auto ${styles.midside}`}>
            <StaffSelectInstituteRole id={params.id} sid={params.sid} />
              <div className={`${styles.about}`} style={{ marginTop: "24px" }}>
                {/* <BackButton /> */}
                <div className={styles.insTitle}>
                  <h3>
                    {classData.className}-{classData.classTitle} Class Behaviour
                  </h3>
                </div>
                <div className={`${styles.outer2} mt-4`}>
                  <div className={`my-4 ${styles.ddetail}`}>
                    <div className="row col-11 col-lg-12 col-xl-12 justify-item-center mx-auto">
                      <div className="col-2">
                        <div
                          className={`${styles.dTab} ${styles.active} my-2`}
                          onClick={() =>
                            navigate(
                              `/user/${params.id}/staff/${params.sid}/class/catalog/${params.cid}`
                            )
                          }
                        >
                          <span>
                          <img src="/images/catalog-icon.svg" alt="Register" />
                            <p className={styles.ttext}> &nbsp; Catalog </p>
                          </span>
                        </div>
                      </div>
                      <div className="col-2">
                        <div
                          className={`${styles.dTab} ${styles.active} my-2`}
                          onClick={() =>
                            navigate(
                              `/user/${params.id}/staff/${params.sid}/class/mark/attendence/${params.cid}`
                            )
                          }
                        >
                          <span>
                          <img src="/images/s-attendence-icon.svg" title="Attendence"/> 
                            <p className={styles.ttext}> &nbsp; Attendence </p>
                          </span>
                        </div>
                      </div>
                      <div className="col-2">
                        <div
                          className={`${styles.dTab} ${styles.active} my-2`}
                          onClick={() =>
                            navigate(
                              `/user/${params.id}/staff/${params.sid}/class/fee/${params.cid}`
                            )
                          }
                        >
                          <span>
                          <img src="/images/finance-icon.svg" title="Finance"/> 
                            <p className={styles.ttext}> &nbsp; Fee </p>
                          </span>
                        </div>
                      </div>
                      <div className="col-2">
                        <div
                          className={`${styles.dTab} my-2`}
                          // onClick={() =>
                          //   navigate(
                          //     `/user/${params.id}/staff/${params.sid}/class/behaviour/${params.cid}`
                          //   )
                          // }
                        >
                          <span>
                          <img src="/images/behaviour-icon.svg" title="Behaviour"/>
                            <p className={styles.ttext}> &nbsp; Behaviour </p>
                          </span>
                        </div>
                      </div>
                      <div className="col-2">
                        <div
                          className={`${styles.dTab} ${styles.active} my-2`}
                          onClick={() =>
                            navigate(
                              `/user/${params.id}/staff/${params.sid}/class/finalreport/${params.cid}`
                            )
                          }
                        >
                          <span>
                          <img src="/images/final-report-icon.svg" title="Final Report"/>
                            <p className={styles.ttext}>
                              {" "}
                              &nbsp; Final Report{" "}
                            </p>
                          </span>
                        </div>
                      </div>
                    </div>
                    <hr />
                    <form onSubmit={BehaviourHandlerChange}>
                      <div className="row mt-4 mx-auto">
                        <div className="col-12 col-md-6 mt-4">
                          {/* <label htmlFor="rating">Rating</label> */}
                          <Rating
                            name="bratings"
                            defaultValue={1}
                            precision={1}
                            max={5}
                            size="large"
                            fullWidth
                            color={`yellow`}
                            onChange={BehaviourHandler}
                            id="rating"
                            required
                            style={{
                              fontSize: "1.8rem !important",
                              color: "yellow !important",
                            }}
                          />
                        </div>
                        <div className="col-12 col-md-6 mt-4">
                          <h5 className="mx-auto">
                            {studentText &&
                              `${studentText.studentFirstName} ${
                                studentText.studentMiddleName
                                  ? studentText.studentMiddleName
                                  : ""
                              } ${studentText.studentLastName}`}
                          </h5>
                        </div>
                        <div className="col-10 col-md-4 mt-4">
                          <TextField
                            label="Improvements"
                            name="bimprovements"
                            color="primary"
                            className="mt-2 mb-3"
                            focused
                            fullWidth
                            onChange={BehaviourHandler}
                            required
                          />
                        </div>
                        <div className="col-10 col-md-4 mt-4">
                          <TextField
                            label="Lack In Areas"
                            name="blackIn"
                            color="primary"
                            className="mt-2 mb-3"
                            focused
                            fullWidth
                            onChange={BehaviourHandler}
                            required
                          />
                        </div>
                        <div className="col-10 col-md-4 mt-2 ">
                          <button
                            type="submit"
                            className="btn btn-primary text-white  my-4"
                          >
                            Save Status
                          </button>
                        </div>
                      </div>
                      <h4>Students List</h4>
                      <div className="col-12 d-flex">
                        {catalogStudent &&
                          catalogStudent.map((ct) =>
                            ct.studentBehaviourReportStatus &&
                            ct.studentBehaviourReportStatus === "Ready" ? (
                              <span
                                className={`${styles.dlogoText} bg-secondary text-white p-2 px-4 mx-4`}
                                style={{ cursor: "pointer" }}
                              >
                                {ct.studentGRNO}
                              </span>
                            ) : (
                              <span
                                className={`${styles.dlogoText} bg-info text-white p-2 px-4 mx-4`}
                                onClick={() => {
                                  StudentStatusHandler(ct._id);
                                }}
                                style={{ cursor: "pointer" }}
                              >
                                {ct.studentGRNO}
                              </span>
                            )
                          )}
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NavbarBottomUser uid={params.id} />
    </>
  );
};

export default ClassBehaviour;
