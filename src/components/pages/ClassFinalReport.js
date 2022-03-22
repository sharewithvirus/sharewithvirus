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
import StaffSelectInstituteRole from "../StaffSelectInstituteRole";
import FinalReport from "../FinalReport";
import InstituteRoleTab from "../InstituteRoleTab";

const ClassFinalReport = () => {
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

        setCatalogIns(res.data.staff.institute);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });

    axios
      .get(`${requestURL}/staffclass/${params.cid}`)
      .then((res) => {

        setClassData(res.data.classes);
        setCatalogStudent(res.data.classes.ApproveStudent);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  }, []);

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
  // },[studentText])

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
              <InstituteRoleTab uid={params.id}/>
              <div className={styles.leftBar}>
                <UserStaffAboutSection sid={params.sid} uid={params.id}/>
                <div
                  className={`d-flex form-group ${styles.insRole} mt-3 mx-auto`}
                >
                  
                </div>

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
                  <h3>{classData.className} Class Student Final Report</h3>
                </div>
                <div className={`${styles.outer2} mt-4`}>
                  <div className={`my-4 ${styles.ddetail}`}>
                  <div className="row col-11 col-lg-12 col-xl-12 justify-item-center mx-auto">
                    <div className="col-2">
                      <div className={`${styles.dTab} ${styles.active} my-2`}
                      onClick={() =>
                          navigate(
                            `/user/${params.id}/staff/${params.sid}/class/catalog/${params.cid}`
                          )
                        }
                      >
                        <span>
                        <img src="/images/catalog-icon.svg" alt="Register" />
                          <p className={styles.ttext}>  &nbsp; Catalog </p>
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
                          <p className={styles.ttext}>  &nbsp; Fee </p>
                        </span>
                      </div>
                      </div>
                      <div className="col-2">
                      <div
                        className={`${styles.dTab} ${styles.active} my-2`}
                        onClick={() =>
                          navigate(
                            `/user/${params.id}/staff/${params.sid}/class/behaviour/${params.cid}`
                          )
                        }
                      >
                        <span>
                        <img src="/images/behaviour-icon.svg" title="Behaviour"/>
                          <p className={styles.ttext}>  &nbsp; Behaviour </p>
                        </span>
                      </div>
                      </div>
                      <div className="col-2">
                      <div
                        className={`${styles.dTab} my-2`}
                        // onClick={() =>
                        //   navigate(
                        //     `/user/${params.id}/staff/${params.sid}/class/finalreport/${params.cid}`
                        //   )
                        // }
                      >
                        <span>
                        <img src="/images/final-report-icon.svg" title="Final Report"/>
                          <p className={styles.ttext}>  &nbsp; Final Report </p>
                        </span>
                      </div>
                      </div>
                    </div>
                    <h4>Final Report</h4>

                    <div className="col-9 container">
                      <FinalReport />
                    </div>
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

export default ClassFinalReport;
