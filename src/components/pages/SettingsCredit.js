import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AboutSection from "../AboutSection";
import NavbarTopInstitute from "../NavbarTopInstitute";
import NavbarBottomInstitute from "../NavbarBottomInstitute";
import BackButton from "../BackButton";
import axios from "axios";
import { requestURL } from "../ReqUrl";
import { Success, Danger } from "../SnackBar";
import InstituteSettingBar from "../InstituteSettingBar";
import moment from "moment";

const SettingsCredit = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [date, setDate] = useState(new Date)
  const [rInstitute, setRInstitute] = useState([])

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
        setRInstitute(res.data.institute.instituteReferral)
      })
      .catch((e) => {
        setAdminMsg({ showMessages: true, msg: "Something Went Wrong" });
      });
  }, []);

  

  return (
    <>
      {adminMsg.showMessages ? <Success msg={adminMsg.msg} /> : null}
      <div className={styles.mainScreen}>
        <NavbarTopInstitute id={params.id} />
        <div className={`${styles.mainContent}`}>
          <div className="row">
            <div className={`col col-lg-4 col-xl-3 ${styles.leftside}`}>
              <div className={styles.leftBar}>
                <AboutSection id={params.id} />
                <div className={`${styles.about} ${styles.leftMenu}`}>
                  <InstituteSettingBar id={params.id}/>
                </div>
              </div>
            </div>
            <div className={`col col-lg-8 col-xl-9  mx-auto ${styles.midside}`}>
              <div className={`${styles.about}`} style={{ marginTop: "24px" }}>
                {/* <BackButton /> */}
                <div className={` ${styles.outer2}`}>
                  <form className="row">
                    <div className="col-12">
                      <h4>Credit Setting</h4>
                    </div>
                    <div className="col-12 col-md-6 mt-4">
                      <h5>Free Credits Till: {settingData ? settingData.insFreeLastDate : ''}</h5>
                    </div>
                    <div className="col-12 col-md-6 mt-4">
                      <h5>Yearly Payment Due Date: {settingData ? settingData.insPaymentLastDate : ''}</h5>
                    </div>
                    <div className="col-12 mt-4">
                      <label htmlFor="amiddlename" className="form-group mb-2">
                        Free Credits Used
                      </label>
                      {settingData.insType === 'College' ?
                      settingData && settingData.insFreeLastDate <= moment(date).format('YYYY-MM-DD') ? 
                      
                      <input
                        type="text"
                        name="staffMiddleName"
                        className="form-control"
                        id="amiddlename"
                        value={`${settingData.insFreeCredit ? settingData.insFreeCredit : 0} worth of Rs. ${settingData.insFreeCredit ? settingData.insFreeCredit * 85 : 0}`}
                        disabled
                        readOnly
                      />
                      
                      : 
                      <input
                        type="text"
                        name="staffMiddleName"
                        className="form-control"
                        id="amiddlename"
                        value={`${settingData.insFreeCredit ? settingData.insFreeCredit : 0} worth of Rs. ${settingData.insFreeCredit ? settingData.insFreeCredit * 85 : 0}`}
                        disabled
                        readOnly
                      />
                      : 
                      settingData.insType === 'School' ?
                      settingData && settingData.insFreeLastDate <= moment(date).format('YYYY-MM-DD') ? 
                      
                      <input
                        type="text"
                        name="staffMiddleName"
                        className="form-control"
                        id="amiddlename"
                        value={`${settingData.insFreeCredit ? settingData.insFreeCredit : 0} worth of Rs. ${settingData.insFreeCredit ? settingData.insFreeCredit * 85 : 0}`}
                        disabled
                        readOnly
                      />
                      
                      : 
                      <input
                        type="text"
                        name="staffMiddleName"
                        className="form-control"
                        id="amiddlename"
                        value={`${settingData.insFreeCredit ? settingData.insFreeCredit : 0} worth of Rs. ${settingData.insFreeCredit ? settingData.insFreeCredit * 85 : 0}`}
                        disabled
                        readOnly
                      />
                      : 
                      settingData.insType === 'Coaching' ?
                      settingData && settingData.insFreeLastDate <= moment(date).format('YYYY-MM-DD') ? 
                      
                      <input
                        type="text"
                        name="staffMiddleName"
                        className="form-control"
                        id="amiddlename"
                        value={`${settingData.insFreeCredit ? settingData.insFreeCredit : 0} worth of Rs. ${settingData.insFreeCredit ? settingData.insFreeCredit * 40 : 0}`}
                        disabled
                        readOnly
                      />
                      
                      : 
                      <input
                        type="text"
                        name="staffMiddleName"
                        className="form-control"
                        id="amiddlename"
                        value={`${settingData.insFreeCredit ? settingData.insFreeCredit : 0} worth of Rs. ${settingData.insFreeCredit ? settingData.insFreeCredit * 40 : 0}`}
                        disabled
                        readOnly
                      />
                      : ''}
                    </div>
                    <div className="col-12 col-md-6 mt-4">
                      <label htmlFor="alastname" className="form-group mb-2">
                        Due Amount (in Rs.)
                      </label>
                      {settingData.insType === 'College' ?
                      <input
                        type="text"
                        name="staffLastName"
                        className="form-control"
                        id="alastname"
                        value={
                          `${settingData.ApproveStudent && settingData.insFreeCredit ? settingData.ApproveStudent * 85 -  settingData.insFreeCredit * 85 : 0}`
                        }
                        readOnly
                        disabled
                      />
                      :
                      settingData.insType === 'School' ?
                      <input
                        type="text"
                        name="staffLastName"
                        className="form-control"
                        id="alastname"
                        value={
                          `${settingData.ApproveStudent && settingData.insFreeCredit ? settingData.ApproveStudent * 85 -  settingData.insFreeCredit * 85 : 0}`
                        }
                        readOnly
                        disabled
                      />
                      : 
                      settingData.insType === 'Coaching' ?
                      <input
                        type="text"
                        name="staffLastName"
                        className="form-control"
                        id="alastname"
                        value={
                          `${settingData.ApproveStudent && settingData.insFreeCredit ? settingData.ApproveStudent * 40 -  settingData.insFreeCredit * 40 : 0}`
                        }
                        readOnly
                        disabled
                      />
                      : ''}
                    </div>
                    <div className="col-12 col-md-6 mt-4">
                      <button type="submit" className="btn btn-primary px-5 mt-4 mx-auto">Pay now</button>
                    </div>
                    <div className="col-12 col-md-6 mt-4">
                      <label htmlFor="anational" className="form-group mb-2">
                        Unpaid Credits in Use
                      </label>
                      <input
                        type="text"
                        name="staffNationality"
                        className="form-control"
                        id="anational"
                        value={`${settingData.ApproveStudent ? settingData.ApproveStudent.length : 0}`}
                        readOnly
                        disabled
                      />
                    </div>

                    <div className="col-12 col-md-6 mt-4">
                      <label htmlFor="acast" className="form-group mb-2">
                        Select Plan 
                      </label>
                      <select
                      name="plan"
                      className="form-control"
                      id="acast"
                      >
                        <option value="Select Plan" selected disabled>Select Plan</option>
                        <option value="With Id Card">With Id Card</option>
                        <option value="Without Id Card">Without Id Card</option>
                      </select>
                    </div>
                    <div className="col-12 col-md-6 mt-4">
                      <label htmlFor="aCredits" className="form-group mb-2">
                        Total Referral Credits Earned
                      </label>
                      <input
                        type="text"
                        name="staffLastName"
                        className="form-control"
                        id="aCredits"
                        value={settingData ? settingData.referalPercentage + settingData.transferCredit : 0}
                        readOnly
                        disabled
                      />
                    </div>
                    <div className="col-12 col-md-6 mt-4">
                      <label htmlFor="aReferral" className="form-group mb-2">
                        Referred Institute 
                      </label>
                      <select
                      name="referrals"
                      className="form-control"
                      id="aReferral"
                      >
                        <option value="Referred Institute " selected disabled>Referred Institute </option>

                        {rInstitute && rInstitute.map((et) => (
                          <option value={et._id}>{et.insName}</option>
                        ))}
                      </select>
                    </div>
                    {settingData.rejectReason ? 
                    <div className="col-12 mt-4">
                      <label htmlFor="anational" className="form-group mb-2">
                        
                      </label>
                      <input
                        type="text"
                        name="staffNationality"
                        className="form-control text-danger"
                        id="anational"
                        value={settingData.rejectReason}
                        style={{ cursor: "not-allowed" }}
                        disabled
                        readOnly
                      />
                    </div>
                    : ''
                    }
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
        <NavbarBottomInstitute id={params.id}/>
      </div>
    </>
  );
};

export default SettingsCredit;
