import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopUser from "../NavbarTopUser";
import AboutSection from "../AboutSection";
import BackButton from "../BackButton";
import ProfileDisplaySection from "../ProfileDisplaySection";
import NewClassDetailBar from "../NewClassDetailBar";
import NavbarBottomUser from "../NavbarBottomUser";
import axios from "axios";
import { requestURL } from "../ReqUrl";
import { Success, Danger } from "../SnackBar";
import UserStaffAboutSection from "../UserStaffAboutSection";
import UserStaffSideBar from "../UserStaffSideBar";
import StaffSelectInstituteRole from "../StaffSelectInstituteRole";
import InstituteRoleTab from '../InstituteRoleTab';

const StaffClassProfileInfo = () => {
  const navigate = useNavigate();

  const params = useParams();
  const [staffIns, setStaffIns] = useState("");

  const [classData, setClassData] = useState("");
  const [adminMsg, setAdminMsg] = useState({
    showMessages: false,
    showMessagesDanger: false,
    msg: "",
  });
  useEffect(() => {
    axios
      .get(`${requestURL}/userdashboard/${params.id}`)
      .then((res) => {
        const userstaff = res.data.user.staff;
        const userstudent = res.data.user.student;
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
    axios
      .get(`${requestURL}/staffdesignationdata/${params.sid}`)
      .then((res) => {
        const dStaff = res.data.staff;
        const institute = res.data.staff.institute;
        // setStaffDesignation(dStaff);
        setStaffIns(institute);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });

    axios
      .get(`${requestURL}/staffclass/${params.cid}`)
      .then((res) => {
        const Cdata = res.data.classes;
        const text = res.data.classes.subject;
        setClassData(Cdata);
        // setClassSubject(text);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  }, []);

  const [classInfoData, setClassInfoData] = useState({
    classAbout: "",
    classDisplayPerson: "",
    classStudentTotal: "",
  });

  const ClassInfoHandler = (e) => {
    const { name, value } = e.target;
    setClassInfoData({
      ...classInfoData,
      [name]: value,
    });
  };

  const ClassInfoHandlerChange = (e) => {
    e.preventDefault();
    axios
      .post(`${requestURL}/staff/class-info/${params.cid}`, classInfoData)
      .then((res) => {
        setAdminMsg({ showMessages: true, msg: res.data.message });

        setTimeout(() => {
          navigate(
            `/user/${params.id}/staff/${params.sid}/class/${params.cid}`
          );
        }, 2000);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  };
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
                      <div
                        className={`${styles.dTab}  ${styles.active}`}
                        onClick={() =>
                          navigate(
                            `/user/${params.id}/staff/${params.sid}/class/${params.cid}`
                          )
                        }
                      >
                        <span>
                        <img src="/images/department-menu-icon.svg" title="Menu" />{" "}
                        </span>
                      </div>
</div>
                      <div className="col-4">
                      <div className={`${styles.dTab}`}>
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

                  <form className="row mt-3" onSubmit={ClassInfoHandlerChange}>
                    <div className="col-12 col-md-9 mb-2">
                      <label for="dhead" className="form-label">
                        Class Head
                      </label>
                      <input
                        type="text"
                        name="dhead"
                        className="form-control"
                        id="dhead"
                        value={
                          classData.classTeacher
                            ? `${classData.classTeacher.staffFirstName} ${
                                classData.classTeacher.staffMiddleName
                                  ? classData.classTeacher.staffMiddleName
                                  : ""
                              } ${classData.classTeacher.staffLastName}`
                            : ""
                        }
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-2">
                      <label for="cname" className="form-label">
                        Class Name
                      </label>
                      <input
                        type="text"
                        name="cname"
                        className="form-control"
                        id="cname"
                        value={classData.className}
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-2">
                      <label for="dabout" className="form-label">
                        About Class
                      </label>
                      <input
                        type="text"
                        name="classAbout"
                        className="form-control"
                        id="cabout"
                        placeholder="Enter Class About"
                        onChange={ClassInfoHandler}
                        required
                      />
                    </div>

                    <div className="col-12 col-md-6 mb-2">
                      <label for="dstudent" className="form-label">
                        Class Representative
                      </label>
                      <input
                        type="text"
                        name="classDisplayPerson"
                        className="form-control"
                        id="cstudent"
                        placeholder="Enter Class Display Person"
                        onChange={ClassInfoHandler}
                        required
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-2">
                      <label for="cadmin" className="form-label">
                        Class Strength
                      </label>
                      <input
                        type="tel"
                        name="classStudentTotal"
                        className="form-control"
                        id="cadmin"
                        placeholder="Enter Class Strength"
                        onChange={ClassInfoHandler}
                        required
                      />
                    </div>
                    <div className=" d-flex col-10 flex-row justify-content-center  mt-5 mx-auto">
                      <button
                        type="submit"
                        className="btn btn-outline-primary mt-2 px-5 mx-2"
                      >
                        <i class="fas fa-save"> &nbsp; Save</i>
                      </button>
                    </div>
                  </form>
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

export default StaffClassProfileInfo;
