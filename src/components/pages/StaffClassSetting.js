import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopUser from "../NavbarTopUser";
import ProfileDisplaySection from "../ProfileDisplaySection";
import NewClassDetailBar from "../NewClassDetailBar";
import NavbarBottomUser from "../NavbarBottomUser";
import axios from "axios";
import { requestURL } from "../ReqUrl";
import UserStaffAboutSection from "../UserStaffAboutSection";
import UserStaffSideBar from "../UserStaffSideBar";
import StaffSelectInstituteRole from "../StaffSelectInstituteRole";
import InstituteRoleTab from "../InstituteRoleTab";

const StaffClassSetting = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [userStaffMemberData, setUserStaffMemberData] = useState([]);
  const [userStudentData, setUserStudentData] = useState([]);
  const [staffDesignation, setStaffDesignation] = useState([]);
  const [staffIns, setStaffIns] = useState("");
  const [randData, setRandData] = useState('')
  const [classData, setClassData] = useState("");

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
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  }, []);

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
                <div className={styles.insTitle}></div>
                <div
                  className={` ${styles.outer2} ${styles.profileCreationPage}`}
                >
                  <ProfileDisplaySection
                    coverPicSrc={"/images/other-places-cover-photo.jpg"}
                    profilePicSrc={"/images/classroom-avatar.jpeg"}
                  />
                  <NewClassDetailBar
                    name={classData.className}
                    sFirst="Subjects"
                    sFirstCount={12}
                    sSecond="Students"
                    SSecondCount={500}
                    head1="Class"
                    body1={
                      classData.classAbout
                        ? classData.classAbout
                        : "Description"
                    }
                  />
                  <div className={`my-4 ${styles.ddetail}`}>
                    <div className="row col-11 col-lg-12 col-xl-12 justify-item-center mx-auto">
                    <div className="col-4">
                      <div className={`${styles.dTab}`}>
                        <span>
                        <img src="/images/department-menu-icon.svg" title="Menu" />{" "}
                        </span>
                      </div>
                      </div>
                      <div className="col-4">
                      <div
                        className={`${styles.dTab} ${styles.active}`}
                        onClick={() =>
                          navigate(
                            `/user/${params.id}/staff/${params.sid}/class-info/${params.cid}`
                          )
                        }
                      >
                        <span>
                        <img src="/images/info-icon.svg" title="Info" />{" "}
                        </span>
                      </div>
                      </div>
                      <div className="col-4">
                      <div
                        className={`${styles.dTab} ${styles.active}`}
                        onClick={() =>
                          navigate(
                            `/user/${params.id}/staff/${params.sid}/class-subject/${params.cid}`
                          )
                        }
                      >
                        <span>
                        <img src="/images/subject-icon.svg" title="Subject" />{" "}
                        </span>
                      </div>
                      </div>
                    </div>
                  </div>


                  {/* <div className={` gx-0 mt-5  ${styles.cardContainer} `}> */}
                    <div className="row">
                        <div className="col-12 col-md-6 my-2">
                        <div>
                            <label htmlFor="ccode" className="form-label">Current Class Code</label>
                            <input type='text' className="form-control" id="ccode" value={classData.classCode}/>
                        </div>
                        </div>
                        <div className="col-12 col-md-6 my-2">
                            <div>
                                <label htmlFor="code" className="form-label">Class Code
                                <span onClick={RandomCodeHandler} style={{cursor: 'pointer', color: 'black'}}>
                                <i class="fas fa-sync mx-1 mt-1"></i>
                                </span>
                                </label>
                                <input type='text' className="form-control" id="code" value={`C-${randData}`}/>
                            </div>
                        </div>
                        <div className="col-12 col-md-6 my-2">
                        <button type="button" className="btn btn-primary mx-auto px-5 "
                        onClick={ClassJoinCodeHandler}
                        >Save</button>
                        </div>
                        <div className="col-12 col-md-6 mb-2">
                            <button type="button" className="btn btn-info mx-auto px-5 my-3" onClick={() => navigate(`/user/${params.id}/staff/${params.sid}/class-setting/complaint/${params.cid}`)}>Tab</button>
                      </div>
                    </div>
                    {/* </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <NavbarBottomUser uid={params.id} />
      </div>
    </>
  );
};

export default StaffClassSetting;
