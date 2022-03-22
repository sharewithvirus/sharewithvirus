import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AboutSection from "../AboutSection";
import NavbarTopInstitute from "../NavbarTopInstitute";
import NavbarBottomInstitute from "../NavbarBottomInstitute";
import axios from "axios";
import { requestURL } from "../ReqUrl";
import { Success, Danger } from "../SnackBar";
import moment from "moment";
import InstituteSettingBar from "../InstituteSettingBar";
import NewInsPersonalInfo from "./NewInsPersonalInfo";

const SettingPersonalInfo = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [addInsClass, setAddInsClass] = useState(false);

  const [adminMsg, setAdminMsg] = useState({
    showMessages: false,
    showMessagesDanger: false,
    msg: "",
  });
  const [settingData, setSettingData] = useState("");
  useEffect(() => {
    axios
      .get(`${requestURL}/insdashboard/${params.id}`)
      .then((res) => {
        setSettingData(res.data.institute);
      })
      .catch((e) => {
        setAdminMsg({ showMessages: true, msg: "Something Went Wrong" });
      });
  }, [settingData]);

  const setAddInsClassFunction = () => {
    setAddInsClass(false);
  };

  return (
    <>
        <NavbarTopInstitute id={params.id} />
      {adminMsg.showMessages ? <Success msg={adminMsg.msg} /> : null}
      {/* {console.log("THis is about : instittute: ", settingData)} */}
      <div className={styles.mainScreen}>
        <div className={`${styles.mainContent}`}>
          <div className="row">
            <div className={`col col-lg-4 col-xl-3 ${styles.leftside}`}>
              <div className={styles.leftBar}>
                <AboutSection id={params.id} />
                <div className={`${styles.about} ${styles.leftMenu}`}>
                  <InstituteSettingBar id={params.id} />
                </div>
              </div>
            </div>
            <div className={`col col-lg-8 col-xl-9  mx-auto ${styles.midside}`}>
              <div className={`${styles.about}`} style={{ marginTop: "24px" }}>
                {/* <BackButton /> */}
                <div className={` ${styles.outer2}`}>
                  <form className="row">
                    <div className="col-10">
                      <h4>Personal Info</h4>
                    </div>
                    <div className="col-2"
                    onClick={() =>{
                      setAddInsClass(true)
                    }}
                    >
                      <img src="/images/s-edit-icon.svg" title="Edit"/>
                    </div>
                    <div className="col-12 col-md-4 mt-4">
                      <label htmlFor="afirstname" className="form-group mb-2">
                        Description / About
                      </label>
                      <input
                        type="text"
                        name="staffFirstName"
                        className="form-control"
                        id="afirstname"
                        value={
                          settingData.insAbout
                            ? settingData.insAbout
                            : "Place Description / About"
                        }
                        disabled
                        readOnly
                      />
                    </div>
                    <div className="col-12 col-md-4 mt-4">
                      <label htmlFor="amiddlename" className="form-group mb-2">
                        Email
                      </label>
                      <input
                        type="text"
                        name="staffMiddleName"
                        className="form-control"
                        id="amiddlename"
                        value={
                          settingData.insEmail
                            ? settingData.insEmail
                            : "Place Email"
                        }
                        disabled
                        readOnly
                      />
                    </div>
                    <div className="col-12 col-md-4 mt-4">
                      <label htmlFor="alastname" className="form-group mb-2">
                        Mobile No.
                      </label>
                      <input
                        type="text"
                        name="staffLastName"
                        className="form-control"
                        id="alastname"
                        value={
                          settingData.insPhoneNumber
                            ? settingData.insPhoneNumber
                            : "Place Mobile Number"
                        }
                        disabled
                        readOnly
                      />
                    </div>
                    <div className="col-12 col-md-6 mt-4">
                      <label htmlFor="adob" className="form-group mb-2">
                        Institute Establishment Date
                      </label>
                      <input
                        type="text"
                        name="staffDOB"
                        className="form-control"
                        id="adob"
                        value={
                          settingData.insEstdDate
                            ? moment(settingData.insEstdDate).format(
                                "DD-MM-YYYY"
                              )
                            : "Place Inst Estd. Date"
                        }
                        disabled
                        readOnly
                      />
                    </div>
                    <div className="col-12 col-md-6 mt-4">
                      <label htmlFor="anational" className="form-group mb-2">
                        Institute Registered Date
                      </label>
                      <input
                        type="text"
                        name="staffNationality"
                        className="form-control"
                        id="anational"
                        value={
                          settingData.createdAt
                            ? moment(settingData.createdAt).format("DD-MM-YYYY")
                            : "Place Inst Reg. Date"
                        }
                        disabled
                        readOnly
                      />
                    </div>

                    <div className="col-12 col-md-6 mt-4">
                      <label htmlFor="acast" className="form-group mb-2">
                        Affiliated University
                      </label>
                      <input
                        type="text"
                        name="staffCast"
                        className="form-control"
                        id="acast"
                        value={
                          settingData.insAffiliated
                            ? settingData.insAffiliated
                            : "Place Inst Affiliated "
                        }
                        disabled
                        readOnly
                      />
                    </div>
                    <div className="col-12 col-md-6 mt-4">
                      <label htmlFor="abirth" className="form-group mb-2">
                        Mode of Teaching
                      </label>
                      <input
                        type="text"
                        name="staffBirthPlace"
                        className="form-control"
                        id="abirth"
                        value={
                          settingData.insMode
                            ? settingData.insMode
                            : "Place Mode of Teaching"
                        }
                        disabled
                        readOnly
                      />
                    </div>
                    <div className="col-12 col-md-6 mt-4">
                      <label htmlFor="acast" className="form-group mb-2">
                        Institute Type
                      </label>
                      <input
                        type="text"
                        name="staffCast"
                        className="form-control"
                        id="acast"
                        value={
                          settingData.insType
                            ? settingData.insType
                            : "Place Institute Type "
                        }
                        disabled
                        readOnly
                      />
                    </div>
                    <div className="col-12 col-md-6 mt-4">
                      <label htmlFor="astate" className="form-group mb-2">
                        Institute Achievements
                      </label>
                      <input
                        type="text"
                        name="staffState"
                        className="form-control"
                        id="astate"
                        value={
                          settingData.insAchievement
                            ? settingData.insAchievement
                            : "Place Inst Achievement"
                        }
                        disabled
                        readOnly
                      />
                    </div>
                    <div className="col-12 mt-4">
                      <label htmlFor="aaddress" className="form-group mb-2">
                        Institute Address
                      </label>
                      <textarea
                        type="text"
                        name="staffAddress"
                        className="form-control"
                        rows="2"
                        cols="40"
                        id="aaddress"
                        value={
                          settingData.insAddress
                            ? settingData.insAddress
                            : "Place Address"
                        }
                        disabled
                        readOnly
                      ></textarea>
                    </div>
                    {/* <div className="col-12 d-flex justify-content-center my-5">
                      <button
                        type="submit"
                        className="btn btn-outline-primary  px-5 "
                      >
                        Edit 
                      </button>
                    </div> */}
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        <NavbarBottomInstitute id={params.id} />
        {
          settingData ?
          <NewInsPersonalInfo
          setAddInsClassFunction={setAddInsClassFunction}
          trigger={addInsClass}
          setTrigger={setAddInsClass}
          id={params.id} 
          data={settingData}
          />
        : ''}
    </>
  );
};

export default SettingPersonalInfo;
