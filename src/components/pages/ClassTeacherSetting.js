import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopUser from "../NavbarTopUser";
// import ProfileDisplaySection from "../ProfileDisplaySection";
// import NewClassDetailBar from "../NewClassDetailBar";
import NavbarBottomUser from "../NavbarBottomUser";
import BackButton from "../BackButton";
import axios from "axios";
import { requestURL } from "../ReqUrl";
import UserStaffAboutSection from "../UserStaffAboutSection";
import UserStaffSideBar from "../UserStaffSideBar";
import StaffSelectInstituteRole from "../StaffSelectInstituteRole";
import InstituteRoleTab from "../InstituteRoleTab";
import ClassSetting from "../ClassSetting"

function ClassTeacherSetting() {
    const navigate = useNavigate();
    const params = useParams();
    const [index, setIndex] = useState(5)
    function handleChange(value) {
    navigate(`/${value}`);
  }
  const [userStaffMemberData, setUserStaffMemberData] = useState([]);
  const [userStudentData, setUserStudentData] = useState([]);
  const [staffDesignation, setStaffDesignation] = useState([]);
  const [staffIns, setStaffIns] = useState("");
  const [randData, setRandData] = useState('')
  const [classData, setClassData] = useState("");
  // const [deptData, setDeptData] = useState("");

  useEffect(() => {
    axios
      .get(`${requestURL}/userdashboard/${params.id}`)
      .then((res) => {
        const userstaff = res.data.user.staff;
        const userstudent = res.data.user.student;
        setUserStaffMemberData(userstaff);
        setUserStudentData(userstudent);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
    axios
      .get(`${requestURL}/staffdesignationdata/${params.sid}`)
      .then((res) => {
        const dStaff = res.data.staff;
        const institute = res.data.staff.institute;
        setStaffDesignation(dStaff);
        setStaffIns(institute);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });

    axios
      .get(`${requestURL}/staffclass/${params.cid}`)
      .then((res) => {
        const Cdata = res.data.classes;
        setClassData(Cdata);
        console.log(Cdata)

        // if(Cdata != null){
        //   axios
        //   .get(`${requestURL}/department-batch-detail/${ classData.batch.department }`)
        //   .then((res) => {
        //     console.log(res.data.department)
        //     setDeptData(res.data.department)
        //   })
        //   .catch((e) => {
        //     console.log("Something Went Wrong");
        //   });
        // }

      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });

      // Effect for Previous Batch Classes
      // axios
      // .get(`${requestURL}/department-batch-detail/${classData ? classData.batch.department: "" }`)
      // .then((res) => {
      //   const dData = res.data.department;
      //   console.log(dData)
      //   // setClassData(Cdata);
      // })
      // .catch((e) => {
      //   console.log("Something Went Wrong");
      // });
  }, []);

  // useEffect(() => {
  //         axios
  //         .get(`${requestURL}/department-batch-detail/${classData ? classData.batch.department: "" }`)
  //         .then((res) => {
  //           setDeptData(res.data.department)
  //         })
  //         .catch((e) => {
  //           console.log("Something Went Wrong");
  //         });
  // }, [classData]);

  const RandomCodeHandler = () =>{
    let rand1 = Math.floor(Math.random() * 5) + 1
    let rand2 = Math.floor(Math.random() * 5) + 1
    let rand3 = Math.floor(Math.random() * 5) + 1
    let rand4 = Math.floor(Math.random() * 5) + 1
    let rand5 = Math.floor(Math.random() * 5) + 1

    setRandData(`${rand1}${rand2}${rand3}${rand4}${rand5}`)
  }

  const ClassJoinCodeHandler = () =>{
    axios.post(`${requestURL}/ins/class/code`, {
      classId: params.cid,
      code: `C-${randData}`
    })
    .then((res) =>{

    })
    .catch((e) =>{
      console.log('something went wrong')
    })
  }








  return (
    <>
        <NavbarTopUser uid={params.id} />
      <div className={styles.mainScreen}>
        <div className={`${styles.mainContent} ${styles.dashboard}`}>
          <div className="row">
            <div className={`col col-lg-4 col-xl-3 ${styles.leftside}`}>
            <InstituteRoleTab sid={params.sid} uid={params.id}/>
              <div className={styles.leftBar}>
              <UserStaffAboutSection sid={params.sid} uid={params.id}/>
                <div
                  className={`d-flex form-group ${styles.insRole} mt-3 mx-auto`}
                >
                </div>
                <div className={` ${styles.about} ${styles.leftMenu}`}>
                  <UserStaffSideBar />
                </div>
              </div>
            </div>
            <div className={`col col-lg-8 col-xl-9  mx-auto ${styles.midside}`}>
            <StaffSelectInstituteRole id={params.id} sid={params.sid} />
              <div className={`${styles.about}`} style={{ marginTop: "24px" }}>
                <BackButton />
                <div className={styles.insTitle}></div>

                <div className={` ${styles.outer2} ${styles.profileCreationPage}`}>
                  <h4 className="my-3">Settings</h4>

                  <div className={`my-4 ${styles.ddetail} `}>
                            <div className="row col-11 col-lg-12 col-xl-12 justify-item-center mx-auto">
                            <div className="col-2">
                            <div className={`${styles.dTab} ${styles.active} my-2`}>
                                <span>
                                <i className={`fas fa-user`}></i>
                                &nbsp; Profile Info
                                </span>
                            </div>
                            </div>
                            <div className="col-2">
                            <div 
                            className={`my-2 ${styles.dTab} ${styles.active}`}
                            
                            >
                                <span>
                                <i className={`fas fa-user-friends `}></i>
                                &nbsp; Auto Attendance
                                </span>
                            </div>
                            </div>
                            <div className="col-2">
                            <div className={`my-2 ${styles.dTab} ${styles.active}`}
                            >
                                <span>
                                <i className={`fas fa-id-card-alt `}></i>
                                &nbsp; ID Cards
                                </span>
                            </div>
                            </div>
                            <div className="col-2">
                            <div className={`my-2 ${styles.dTab} ${styles.active}`}
                            >
                                <span>
                                <i className={`fas fa-mail-bulk `}></i>
                                &nbsp; Complaints Box
                                </span>
                            </div>
                            </div>
                            <div className="col-2">
                            <div
                                className={`my-2 ${styles.dTab} `}
                                
                            >
                                <span>
                                <i className={`fas fa-user-cog `}></i>
                                &nbsp; Class Settings
                                </span>
                            </div>
                            </div>
                            </div>
                        </div>
                  

                  {index === 1 &&
                    <>
                        
                        <form className="row mt-5 ">
                            <h5 className="mb-3">Available</h5>
                            <div className="col-12 col-md-6 my-2">
                            <input
                                disabled
                                type="text"
                                name="name"
                                className="form-control"
                                id="name"
                                placeholder="Name"
                            />
                            </div>
                            <div className="col-12 col-md-6 my-2">
                            <input
                                disabled
                                type="text"
                                name="mother"
                                className="form-control"
                                id="mother"
                                placeholder="Mother's Name"
                            />
                            </div>
                            <div className="col-12 col-md-6 my-2">
                            <input
                                disabled
                                type="text"
                                name="gender"
                                className="form-control"
                                id="gender"
                                placeholder="Gender"
                            />
                            </div>
                            <div className="col-12 col-md-6 my-2">
                            <input
                                disabled
                                type="date"
                                name="dob"
                                className="form-control"
                                id="dob"
                                placeholder="Date of Birth"
                            />
                            </div>
                            <div className="col-12 col-md-6 my-2">
                            <input
                                disabled
                                type="text"
                                name="religion"
                                className="form-control"
                                id="religion"
                                placeholder="Religion"
                            />
                            </div>
                            <div className="col-12 col-md-6 my-2">
                            <input
                                disabled
                                type="text"
                                name="caste"
                                className="form-control"
                                id="caste"
                                placeholder="Caste"
                            />
                            </div>
                            <div className="col-12 col-md-4 my-2">
                            <input
                                disabled
                                type="text"
                                name="photo"
                                className="form-control"
                                id="photo"
                                placeholder="Photo"
                            />
                            </div>
                            <div className="col-12 col-md-4 my-2">
                            <input
                                disabled
                                type="text"
                                name="aadhaar"
                                className="form-control"
                                id="aadhaar"
                                placeholder="Aadhaar Card"
                            />
                            </div>
                            <div className="col-12 col-md-4 my-2">
                            <input
                                disabled
                                type="text"
                                name="admission"
                                className="form-control"
                                id="admission"
                                placeholder="Admission Slip"
                            />
                            </div>
                            <div className="col-12 col-md-4 my-2">
                            <input
                                disabled
                                type="text"
                                name="castecert"
                                className="form-control"
                                id="castecert"
                                placeholder="Caste Certificate"
                            />
                            </div>

                            <div className="col-12 mb-2 d-flex justify-content-center">
                            <button
                                type="button"
                                className="btn btn-outline-primary mt-4 px-5"
                            >
                                Request More
                            </button>
                            </div>
                        </form>
                    </>
                  }

                {index === 5 && 
                    <ClassSetting 
                    changeIndex={show => setIndex(show)} 
                    classCode={ClassJoinCodeHandler} 
                    // deptData={deptData}
                    classData={classData}

                    />
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        <NavbarBottomUser />

    </>
  );
}

export default ClassTeacherSetting