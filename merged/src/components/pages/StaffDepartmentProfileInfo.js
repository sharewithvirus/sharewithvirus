import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopUser from "../NavbarTopUser";

import ProfileDisplaySection from "../ProfileDisplaySection";
import NewDepartmentDetailBar from "../NewDepartmentDetailBar";
import NavbarBottomUser from "../NavbarBottomUser";
import UserStaffAboutSection from "../UserStaffAboutSection";
import axios from "axios";
import { requestURL } from "../ReqUrl";
import { Success } from "../SnackBar";
import UserStaffSideBar from "../UserStaffSideBar";
import StaffSelectInstituteRole from "../StaffSelectInstituteRole";
import InstituteRoleTab from "../InstituteRoleTab";

const StaffDepartmentProfileInfo = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [staffIns, setStaffIns] = useState("");

  const [departmentData, setDepartmentData] = useState("");
  const [departHead, setDepartHead] = useState("");
  const [userBatchData, setUserBatchData] = useState("");
  const [userClassData, setUserClassData] = useState("");

  const [adminMsg, setAdminMsg] = useState({
    showMessages: false,
    showMessagesDanger: false,
    msg: "",
  });
  useEffect(() => {
    axios
      .get(`${requestURL}/staffdesignationdata/${params.sid}`)
      .then((res) => {
        const institute = res.data.staff.institute;
        setStaffIns(institute);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });

    axios
      .get(`${requestURL}/staffdepartment/${params.did}`)
      .then((res) => {
        const ddata = res.data.department;
        setDepartmentData(ddata);
        setUserBatchData(res.data.department.userBatch);
        setUserClassData(res.data.department.userBatch.classroom);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });

    axios
      .get(`${requestURL}/department/${params.did}`)
      .then((res) => {
        setDepartHead(res.data.department);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  }, [params.did, params.id, params.sid]);

  const [departmentInfoData, setDepartmentInfoData] = useState({
    dAbout: "",
    dStudentPresident: "",
    dEmail: "",
    dPhoneNumber: "",
    dAdminClerk: "",
    dVicePrinciple: "",
    dSpeaker: "",
  });

  const DepartmentInfoHandler = (e) => {
    const { name, value } = e.target;
    setDepartmentInfoData({
      ...departmentInfoData,
      [name]: value,
    });
  };

  const DepartmentInfoHandlerChange = (e) => {
    e.preventDefault();
    axios
      .post(
        `${requestURL}/staff/department-info/${params.did}`,
        departmentInfoData
      )
      .then((res) => {
        setAdminMsg({ showMessages: true, msg: res.data.message });

        navigate(
          `/user/${params.id}/staff/${params.sid}/department/${params.did}`
        );
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  };
  return (
    <>
      {adminMsg.showMessages ? <Success msg={adminMsg.msg} /> : null}
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
                    profilePicSrc={"/images/department-avatar.jpeg"}
                  />
                  <NewDepartmentDetailBar
                    name={departmentData.dName}
                    sFirst="Class"
                    sFirstCount={12}
                    batchData={userBatchData}
                    classList={userClassData}
                    sSecond="Students"
                    SSecondCount={500}
                    body1={`${
                      departmentData.dAbout
                        ? departmentData.dAbout
                        : "Description"
                    }`}
                  />
                  <div className={`my-4 ${styles.ddetail}`}>
                    <div className="row">
                      <div
                        className={`${styles.dhTab} ${styles.active}`}
                        onClick={() =>
                          navigate(
                            `/user/${params.id}/staff/${params.sid}/department/${params.did}`
                          )
                        }
                      >
                        <span>
                        <img src="/images/department-menu-icon.svg" title="Menu" />{" "}
                        </span>
                      </div>
                      <div
                        className={`${styles.dhTab} `}
                        onClick={() => navigate("/departmentInfo")}
                      >
                        <span>
                        <img src="/images/info-icon.svg" title="Info" />{" "}
                        </span>
                      </div>
                      <div
                        className={`${styles.dhTab} ${styles.active}`}
                        onClick={() =>
                          navigate(
                            `/user/${params.id}/staff/${params.sid}/department-class/${params.did}/batch/${params.bid}`
                          )
                        }
                      >
                        <span>
                        <img src="/images/class-icon.svg" title="Class" />{" "}
                        </span>
                      </div>
                    </div>
                  </div>

                  <form
                    className="row mt-3 mx-2"
                    onSubmit={DepartmentInfoHandlerChange}
                  >
                    <div className="col-12 col-md-9 mb-2">
                      <label for="dhead" className="form-label">
                        Department Head
                      </label>
                      <input
                        type="text"
                        name="dhead"
                        className="form-control"
                        id="dhead"
                        value={
                          departHead.dHead
                            ? `${departHead.dHead.staffFirstName} ${
                                departHead.dHead.staffMiddleName
                                  ? departHead.dHead.staffMiddleName
                                  : ""
                              } ${departHead.dHead.staffLastName}`
                            : ""
                        }
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-2">
                      <label for="dname" className="form-label">
                        Department Name
                      </label>
                      <input
                        type="text"
                        name="dname"
                        className="form-control"
                        id="dname"
                        value={departmentData ? departmentData.dName : ""}
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-2">
                      <label for="dabout" className="form-label">
                        About Department
                      </label>
                      <input
                        type="text"
                        name="dAbout"
                        className="form-control"
                        id="dabout"
                        placeholder="Enter Department About"
                        onChange={DepartmentInfoHandler}
                        required
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-2">
                      <label for="demail" className="form-label">
                        Department Email
                      </label>
                      <input
                        type="email"
                        name="dEmail"
                        className="form-control"
                        id="demail"
                        placeholder="Enter Department Email"
                        onChange={DepartmentInfoHandler}
                        required
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-2">
                      <label for="dnumber" className="form-label">
                        Department Phone No.
                      </label>
                      <input
                        type="tel"
                        name="dPhoneNumber"
                        className="form-control"
                        id="dnumber"
                        placeholder="Enter Department Phone No."
                        onChange={DepartmentInfoHandler}
                        required
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-2">
                      <label for="dvice" className="form-label">
                        Vice Principle Name
                      </label>
                      <input
                        type="tel"
                        name="dVicePrinciple"
                        className="form-control"
                        id="dvice"
                        placeholder="Enter Department Vice Principle"
                        onChange={DepartmentInfoHandler}
                        required
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-2">
                      <label for="dspeaker" className="form-label">
                        Department Speaker
                      </label>
                      <input
                        type="tel"
                        name="dSpeaker"
                        className="form-control"
                        id="dspeaker"
                        placeholder="Enter Department Speaker"
                        onChange={DepartmentInfoHandler}
                        required
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-2">
                      <label for="dstudent" className="form-label">
                        Student President Name
                      </label>
                      <input
                        type="tel"
                        name="dStudentPresident"
                        className="form-control"
                        id="dstudent"
                        placeholder="Enter Student President"
                        onChange={DepartmentInfoHandler}
                        required
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-2">
                      <label for="dadmin" className="form-label">
                        Admin / Clerk Name
                      </label>
                      <input
                        type="tel"
                        name="dAdminClerk"
                        className="form-control"
                        id="dadmin"
                        placeholder="Enter Admin Clerk"
                        onChange={DepartmentInfoHandler}
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

export default StaffDepartmentProfileInfo;
