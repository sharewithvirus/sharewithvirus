import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopUser from "../NavbarTopUser";
import AboutSection from "../AboutSection";
import BackButton from "../BackButton";
import NavbarBottomUser from "../NavbarBottomUser";
import axios from "axios"; 
import { createTheme } from "@mui/system";
import { requestURL } from "../ReqUrl";
import { Success, Danger } from "../SnackBar";
import UserStaffAboutSection from "../UserStaffAboutSection";
import UserStaffSideBar from "../UserStaffSideBar";
import StaffSelectInstituteRole from "../StaffSelectInstituteRole";
import { moment } from 'moment'
import InstituteRoleTab from "../InstituteRoleTab";


const ClassAttendenceHistory = (props) => {
  const navigate = useNavigate();

  const params = useParams();

  const [catalogIns, setCatalogIns] = useState("");
  const [classData, setClassData] = useState("");
  const [catalogStudent, setCatalogStudent] = useState([]);
  const [date, setDate] = useState(new Date())

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

  const [attendText, setAttendText] = useState([]);
  const [presentData, setPresentData] = useState([]);
  const [absentData, setAbsentData] = useState([]);
  const [attendenceData, setAttendenceData] = useState({
    attendDate: "",
  });
  const [adminMsg, setAdminMsg] = useState({
    showMessages: false,
    showMessagesDanger: false,
    msg: "",
  });
  const GetAttendenceHandler = (e) => {
    const { name, value } = e.target;
    setAttendenceData({
      ...attendenceData,
      [name]: value,
    });
  };

  const GetAttendenceHandlerChange = (e) => {
    e.preventDefault();
    axios
      .post(`${requestURL}/attendence/detail`, attendenceData)
      .then((res) => {
        setAdminMsg({ showMessages: true, msg: res.data.message });
        setAttendText(res.data.attendDate);
        setPresentData(res.data.attendDates.presentStudent);
        setAbsentData(res.data.attendDates.absentStudent);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  };

  useEffect(() =>{
    axios.post(`${requestURL}/attendence/detail`, {
      attendDate: `${date.getFullYear()}-${date.getMonth() >=10 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`}-${date.getDate()}`
    })
    .then((res) =>{
      setPresentData(res.data.attendDates.presentStudent);
      setAbsentData(res.data.attendDates.absentStudent);
    })
    .catch((e) =>{
      console.log("Something went wrong")
    })
  },[])


  return (
    <>
      {adminMsg.showMessages ? <Success msg={adminMsg.msg} /> : null}

      <div className={styles.mainScreen}>
        <NavbarTopUser uid={params.id} />
        <div className={`${styles.mainContent} ${styles.dashboard}`}>
          <div className="row">
            <div className={`col col-lg-4 col-xl-3 ${styles.leftside}`}>
              <InstituteRoleTab uid={params.id}/>
              <div className={styles.leftBar}>
                <UserStaffAboutSection sid={params.sid} uid={params.id}/>
                <div
                  className={`d-flex form-group ${styles.insRole} mt-3 mx-auto`}
                >
                  {catalogIns && (
                    <p className="text-white mx-2"
                    style={{border: '1px solid grey', cursor: 'pointer', padding: '4px'}}
                    >
                      {catalogIns.insName} ( Staff )
                    </p>
                  )}
                </div>

                <div className={` ${styles.about} ${styles.leftMenu}`}>
                <UserStaffSideBar sid={params.sid} uid={params.id}/>
                </div>
              </div>
            </div>
            <div className={`col col-lg-8 col-xl-9  mx-auto ${styles.midside}`}>
            <StaffSelectInstituteRole id={params.id} sid={params.sid}/>
              <div className={`${styles.about}`} style={{ marginTop: "24px" }}>
                {/* <BackButton /> */}
                <div className={styles.insTitle}>
                  <h3>{classData.className} Class Catalog</h3>
                </div>
                <div className={`${styles.outer2} mt-4`}>
                  {/* <h4 className="my-3">Class Catalog</h4> */}
                  <div className={`my-4 ${styles.ddetail}`}>
                    <div className="row">
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
                          &nbsp; Catalog
                        </span>
                      </div>
                      <div
                        className={`${styles.dTab} my-2`}
                        onClick={() =>
                          navigate(
                            `/user/${params.id}/staff/${params.sid}/class/attendence/${params.cid}`
                          )
                        }
                      >
                        <span>
                        <img src="/images/s-attendence-icon.svg" title="Attendence"/> 
                          &nbsp; Attendence
                        </span>
                      </div>
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
                          &nbsp; Fee
                        </span>
                      </div>
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
                          &nbsp; Behaviour
                        </span>
                      </div>
                      <div className={`${styles.dTab} ${styles.active} my-2`}
                      onClick={() => navigate(`/user/${params.id}/staff/${params.sid}/class/finalreport/${params.cid}`)}

                      >
                        <span>
                        <img src="/images/final-report-icon.svg" title="Final Report"/>
                          &nbsp; Final Report
                        </span>
                      </div>
                    </div>
                    <hr />
                    <form onSubmit={GetAttendenceHandlerChange}>
                      <div className="row mt-5">
                        <div className="col-12 col-md-6">
                          {/* <label htmlFor="fee" className="form-group mx-1">
                            Date
                          </label> */}
                          <input
                            type="date"
                            className="form-control"
                            id="fee"
                            name="attendDate"
                            onChange={GetAttendenceHandler}
                            required
                          />
                        </div>
                        <div className="col-12 col-md-6">
                          <button
                            type="submit"
                            className="btn btn-outline-primary"
                          >
                            Select Date
                          </button>
                        </div>
                      </div>
                    </form>
                    <p className={`${styles.dlogoText} mt-5`}>Students List</p>
                    <div className="row">
                    <div className="col-12 col-md-4 d-flex">
                      <div className={` gx-0 mt-5  ${styles.cardContainer} `}>
                        {presentData &&
                          presentData.map((dt) => (
                            <div
                            className={` ${styles.dlogo} ${styles.cardView}`}
                            >
                            <p className={styles.dlogoText}>
                              <img className={styles.insUserProfiles} src='/images/logo-department.png' />
                              <br/>
                              <small>({dt.studentGRNO})</small>
                              <br/>
                              <small> {`${dt.studentFirstName} ${dt.studentMiddleName ? dt.studentMiddleName : ''} ${dt.studentLastName}`}</small>
                              <span className="text-primary">(Present)</span>
                            </p>
                            </div>
                            ))}
                            </div>
                          <div className={` gx-0 mt-5  ${styles.cardContainer} `}>
                          {absentData &&
                            absentData.map((dt) => (
                              <div
                              className={` ${styles.dlogo} ${styles.cardView}`}
                              >
                              <p className={styles.dlogoText}>
                                <img className={styles.insUserProfiles} src='/images/logo-department.png' />
                                <br/>
                                <small>({dt.studentGRNO})</small>
                                <br/>
                                <small> {`${dt.studentFirstName} ${dt.studentMiddleName ? dt.studentMiddleName : ''} ${dt.studentLastName}`}</small>
                                <span className="text-danger">(Absent)</span>
                              </p>
                              </div>
                              ))}
                              </div>
                          </div>

                          {/* <div className="col-12 col-md-6 d-flex">
                            <div className={styles.examCard}>
                              <span
                                className={`${styles.dlogoText}  p-2 px-4 mx-5`}
                              >
                                {ct.studentGRNO} -{" "}
                                {`${ct.studentFirstName} ${
                                  ct.studentMiddleName
                                    ? ct.studentMiddleName
                                    : ""
                                } ${ct.studentLastName}`}{" "}
                              </span>
                            </div>
                          </div>
                        ))} */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <NavbarBottomUser />
      </div>
    </>
  );
};

export default ClassAttendenceHistory;
