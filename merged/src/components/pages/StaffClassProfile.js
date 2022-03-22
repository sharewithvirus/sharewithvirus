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
import InstituteRoleTab from '../InstituteRoleTab';

const StaffClassProfile = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [staffIns, setStaffIns] = useState("");

  const [classData, setClassData] = useState("");


  useEffect(() => {
    axios
      .get(`${requestURL}/staffdesignationdata/${params.sid}`)
      .then((res) => {
        const dStaff = res.data.staff;
        const institute = res.data.staff.institute;
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
  return (
    <>
        <NavbarTopUser uid={params.id} />
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
                <div className={styles.insTitle}></div>
                <div
                  className={` ${styles.outer2} ${styles.profileCreationPage}`}
                >
                  <ProfileDisplaySection
                    coverPicSrc={"/images/other-places-cover-photo.jpg"}
                    profilePicSrc={"/images/classroom-avatar.jpeg"}
                  />
                  <NewClassDetailBar
                    name={`${classData.className}-${classData.classTitle}`}
                    sFirst="Subjects"
                    cData={classData}
                    sFirstCount={12}
                    sSecond="Students"
                    SSecondCount={500}
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

                  <div className={` gx-0 mt-5  ${styles.cardContainer} `}>
                    <div
                      className={styles.ddetailInner}
                      onClick={() =>
                        navigate(
                          `/user/${params.id}/staff/${params.sid}/class/catalog/${params.cid}`
                        )
                      }
                    >
                      <img src="/images/icon-classcatelog.svg" alt="classes" />
                      <p className="my-2">Class - Catalog</p>
                    </div>
                    <div
                      className={styles.ddetailInner}
                      onClick={() =>
                        navigate(
                          `/user/${params.id}/staff/${params.sid}/class-request/${params.cid}`
                        )
                      }
                    >
                      <img src="/images/icon-functions.svg" alt="Request" />
                      <p className="my-2">Student Request</p>
                    </div>
                    <div className={styles.ddetailInner}>
                      <img
                        src="/images/icon-competition.svg"
                        alt="competition"
                      />
                      <p className="my-2">Competitions</p>
                    </div>
                    <div className={styles.ddetailInner}
                    onClick={() => navigate(`/user/${params.id}/staff/${params.sid}/class-setting/${params.cid}`)}
                    >
                      <img
                        src="/images/icon-gearsetting.svg"
                        alt="gearsetting"
                      />
                      <p className="my-2">Settings</p>
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

export default StaffClassProfile;
