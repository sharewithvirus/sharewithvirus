import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopUser from "../NavbarTopUser";
import UserStaffAboutSection from "../UserStaffAboutSection";
import ProfileDisplaySection from "../ProfileDisplaySection";
import NewSportClassDetailBar from "../NewSportClassDetailBar";
import NavbarBottomUser from "../NavbarBottomUser";
import axios from "axios";
import { requestURL } from "../ReqUrl";
import UserStaffSideBar from "../UserStaffSideBar";
import { Success } from '../SnackBar'
import StaffSelectInstituteRole from "../StaffSelectInstituteRole";
import InstituteRoleTab from "../InstituteRoleTab";

const StaffSportClassCoachInfo = () => {
  const navigate = useNavigate();
  const [sportData, setSportData] = useState('')
  const params = useParams();

  useEffect(() => {
    axios.get(`${requestURL}/sport/class/detail/${params.scid}`)
      .then((res) => {
         setSportData(res.data.classes)
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  }, [params.scid]);


  const [sportInfoData, setSportInfoData] = useState({
    sportClassAbout: "",
    sportClassEmail: "",
    sportClassPhoneNumber: "",
    showMessages: false,
    showMessagesDanger: false,
    msg: "",
  });

  const SportClassInfoHandler = (e) => {
    const { name, value } = e.target;
    setSportInfoData({
      ...sportInfoData,
      [name]: value,
    });
  };

  const SportClassInfoHandlerChange = (e) => {
    e.preventDefault();
    axios
      .post(
        `${requestURL}/sport/class/info/${params.scid}`,
        sportInfoData
      )
      .then((res) => {
        setSportInfoData({ showMessages: true, msg: res.data.message });
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  };

  return (
    <>
    {sportInfoData.showMessages ? <Success msg={sportInfoData.msg} /> : null}
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
                  <UserStaffSideBar />
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
                  <ProfileDisplaySection />
                  <NewSportClassDetailBar
                    name={sportData.sportClassName}
                    cData={sportData ? sportData : ''}
                    body1={`${
                      sportData.sportClassAbout
                        ? sportData.sportClassAbout
                        : "About"
                    }`}
                  />
                  <div className={`my-4 ${styles.ddetail}`}>
                    <div className="row">
                      <div
                        className={`${styles.dhTab} ${styles.active}`}
                        onClick={() =>
                            navigate(
                              `/user/${params.id}/staff/${params.sid}/sport/profile/class/${params.scid}`
                            )
                          }
                      >
                        <span>
                        <img src="/images/department-menu-icon.svg" title="Menu" />{" "}
                        </span>
                      </div>
                      <div
                        className={`${styles.dhTab} `}
                      >
                        <span>
                        <img src="/images/info-icon.svg" title="Info" />{" "}
                        </span>
                      </div>
                      <div
                        className={`${styles.dhTab} ${styles.active}`}
                        onClick={() =>
                            navigate(
                              `/user/${params.id}/staff/${params.sid}/sport/class/team/${params.scid}`
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
                    onSubmit={SportClassInfoHandlerChange}
                  >
                    <div className="col-12 col-md-9 mb-2">
                      <label htmlFor="dhead" className="form-label">
                        Sport Class Head
                      </label>
                      <input
                        type="text"
                        name="dhead"
                        className="form-control"
                        id="dhead"
                        value={
                          sportData.sportClassHead
                            ? `${sportData.sportClassHead.staffFirstName} ${
                                sportData.sportClassHead.staffMiddleName
                                  ? sportData.sportClassHead.staffMiddleName
                                  : ""
                              } ${sportData.sportClassHead.staffLastName}`
                            : ""
                        }
                        readOnly
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-2">
                      <label htmlFor="dname" className="form-label">
                        Sport Class Name
                      </label>
                      <input
                        type="text"
                        name="sportName"
                        className="form-control"
                        id="dname"
                        value={sportData ? sportData.sportClassName : ''}
                        readOnly
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-2">
                      <label htmlFor="dabout" className="form-label">
                        About Sport Class
                      </label>
                      <input
                        type="text"
                        name="sportClassAbout"
                        className="form-control"
                        id="dabout"
                        placeholder="Enter Sport Class About"
                        onChange={SportClassInfoHandler}
                        required
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-2">
                      <label htmlFor="demail" className="form-label">
                        Sport Class Email
                      </label>
                      <input
                        type="email"
                        name="sportClassEmail"
                        className="form-control"
                        id="demail"
                        placeholder="Enter Sport Class Email"
                        onChange={SportClassInfoHandler}
                        required
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-2">
                      <label htmlFor="dnumber" className="form-label">
                        Sport Class Phone No.
                      </label>
                      <input
                        type="tel"
                        name="sportClassPhoneNumber"
                        className="form-control"
                        id="dnumber"
                        maxLength="10"
                        minLength="10"
                        placeholder="Enter Sport Class Phone No."
                        onChange={SportClassInfoHandler}
                        required
                      />
                    </div>
                    <div className=" d-flex col-10 flex-row justify-content-center  mt-5 mx-auto">
                      <button
                        type="submit"
                        className="btn btn-outline-primary mt-2 px-5 mx-2"
                      >
                        <i class="fas fa-save"> Update</i>
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

export default StaffSportClassCoachInfo;
