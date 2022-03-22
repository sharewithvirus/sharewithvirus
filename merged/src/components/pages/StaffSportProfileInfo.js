import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopUser from "../NavbarTopUser";
import UserStaffAboutSection from "../UserStaffAboutSection";
import ProfileDisplaySection from "../ProfileDisplaySection";
import NewSportHeadDetailBar from "../NewSportHeadDetailBar";
import NavbarBottomUser from "../NavbarBottomUser";
import axios from "axios";
import { requestURL } from "../ReqUrl";
import UserStaffSideBar from "../UserStaffSideBar";
import { Success } from '../SnackBar'
import StaffSelectInstituteRole from "../StaffSelectInstituteRole";
import InstituteRoleTab from "../InstituteRoleTab";

const StaffSportProfileInfo = () => {
  const navigate = useNavigate();
  const [sportData, setSportData] = useState('')
  const params = useParams();

  useEffect(() => {
    axios.get(`${requestURL}/sport/detail/${params.ssid}`)
      .then((res) => {
         setSportData(res.data.sport)
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  }, [params.ssid]);


  const [sportInfoData, setSportInfoData] = useState({
    sportName: '',
    sportAbout: "",
    sportEmail: "",
    sportPhoneNumber: "",
    showMessages: false,
    showMessagesDanger: false,
    msg: "",
  });

  const SportDepartmentInfoHandler = (e) => {
    const { name, value } = e.target;
    setSportInfoData({
      ...sportInfoData,
      [name]: value,
    });
  };

  const SportDepartmentInfoHandlerChange = (e) => {
    e.preventDefault();
    axios
      .post(
        `${requestURL}/sport/info/${params.ssid}`,
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
                  <NewSportHeadDetailBar
                    name={sportData.sportName}
                    eData={sportData ? sportData.sportClass :''}
                    body1={`${
                      sportData.sportAbout
                        ? sportData.sportAbout
                        : ""
                    }`}
                  />
                  <div className={`my-4 ${styles.ddetail}`}>
                    <div className="row">
                      <div
                        className={`${styles.dhTab} ${styles.active}`}
                        onClick={() =>
                            navigate(
                              `/user/${params.id}/staff/${params.sid}/sport/${params.ssid}`
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
                              `/user/${params.id}/staff/${params.sid}/sport/class/${params.ssid}`
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
                    onSubmit={SportDepartmentInfoHandlerChange}
                  >
                    <div className="col-12 col-md-9 mb-2">
                      <label htmlFor="dhead" className="form-label">
                        Sport Head
                      </label>
                      <input
                        type="text"
                        name="dhead"
                        className="form-control"
                        id="dhead"
                        value={
                          sportData.sportHead
                            ? `${sportData.sportHead.staffFirstName} ${
                                sportData.sportHead.staffMiddleName
                                  ? sportData.sportHead.staffMiddleName
                                  : ""
                              } ${sportData.sportHead.staffLastName}`
                            : ""
                        }
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-2">
                      <label htmlFor="dname" className="form-label">
                        Sport Department Name
                      </label>
                      <input
                        type="text"
                        name="sportName"
                        className="form-control"
                        id="dname"
                        placeholder="Enter Sport Department Name"
                        onChange={SportDepartmentInfoHandler}
                        required
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-2">
                      <label htmlFor="dabout" className="form-label">
                        About Sport
                      </label>
                      <input
                        type="text"
                        name="sportAbout"
                        className="form-control"
                        id="dabout"
                        placeholder="Enter Sport About"
                        onChange={SportDepartmentInfoHandler}
                        required
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-2">
                      <label htmlFor="demail" className="form-label">
                        Sport Department Email
                      </label>
                      <input
                        type="email"
                        name="sportEmail"
                        className="form-control"
                        id="demail"
                        placeholder="Enter Sport Department Email"
                        onChange={SportDepartmentInfoHandler}
                        required
                      />
                    </div>
                    <div className="col-12 col-md-6 mb-2">
                      <label htmlFor="dnumber" className="form-label">
                        Sport Department Phone No.
                      </label>
                      <input
                        type="tel"
                        name="sportPhoneNumber"
                        className="form-control"
                        id="dnumber"
                        maxLength="10"
                        minLength="10"
                        placeholder="Enter Sport Department Phone No."
                        onChange={SportDepartmentInfoHandler}
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

export default StaffSportProfileInfo;
