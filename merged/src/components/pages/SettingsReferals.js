import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import UserAboutSection from "../UserAboutSection";
import BackButton from "../BackButton";
import axios from "axios";
import { requestURL } from "../ReqUrl";
import NavbarTopUser from "../NavbarTopUser";
import NavbarBottomUser from "../NavbarBottomUser";
import UserSettingSideBar from "../UserSettingSideBar";

const SettingsReferals = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [referalData, setReferalData] = useState("");
  // const [referalDataText, setReferalDataText] = useState([]);
  const [rInstitute, setRInstitute] = useState([])

  useEffect(() => {
    axios.get(`${requestURL}/userdashboard/${params.id}`).then((res) => {
      const referal = res.data.user;
      setReferalData(referal);
      // setReferalDataText(res.data.user.InstituteReferals);
    });
    axios.get(`${requestURL}/insdashboard`)
    .then((res) =>{
      setRInstitute(res.data.institute)
    })
    .catch((e) =>{
      console.log('something went wrong')
    })
  }, [referalData]);

  const [transfer, setTransfer] = useState({
    transferCredit: '',
    transferIns: ''
  })

  const TransferHandler = (e) =>{
    const { name, value } = e.target
    setTransfer({
      ...transfer,
      [name]: value
    })
  }

  const TransferHandlerChange = (e) =>{
    e.preventDefault()
    if(transfer.transferCredit > referalData.referalPercentage){
        alert('no')
    }
    else if((referalData.referalPercentage - transfer.transferCredit) < 0){
      alert('not 0')
    }
    else{
    axios.post(`${requestURL}/user/${params.id}/credit/transfer`, transfer)
    .then((res) =>{

    })
    .catch((e) =>{
      console.log('something went wrong')
    })
    }
  }

  return (
    <>
      <div className={styles.mainScreen}>
        <NavbarTopUser uid={params.id} />
        <div className={`${styles.mainContent}`}>
          <div className="row">
            <div className={`col col-lg-4 col-xl-3 ${styles.leftside}`}>
              <div className={styles.leftBar}>
                <UserAboutSection uid={params.id} />
                <div className={`${styles.about} ${styles.leftMenu}`}>
                    <UserSettingSideBar id={params.id}/>
                </div>
              </div>
            </div>
            <div className={`col col-lg-8 col-xl-9  mx-auto ${styles.midside}`}>
              <div className={`${styles.about}`} style={{ marginTop: "24px" }}>
                <div className={` ${styles.outer2}`}>
                  <form className="row" onSubmit={TransferHandlerChange}>
                    <div className="col-12">
                      <h4>Setting Referrals</h4>
                    </div>
                    <div className="col-12 mt-4">
                      <label htmlFor="afirstname" className="form-group mb-2">
                        What Referrals
                      </label>
                      <textarea
                        type="text"
                        name="staffFirstName"
                        className="form-control text-success"
                        rows="3"
                        cols="40"
                        id="afirstname"
                        disabled
                        readonly
                        value="Institutes (Such as Schools, Colleges, Coaching Centers, Libraries or any king of educational Institutes) you refer will be shown here. Note: Referrals are assigned by the Regional Co-Ordinator/Sales Consultant while approving the institutes registration. Please contact him before approval. Once approval made, no changes can be done."
                      />
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
                        value={referalData ? referalData.referalPercentage : 0}
                        readOnly
                        disabled
                      />
                    </div>
                    <div className="col-12 col-md-6 mt-4">
                      <label htmlFor="aReferral" className="form-group mb-2">
                        Referred Institute <span className={styles.requireField}>*</span>
                      </label>
                      <select
                      name="transferIns"
                      className="form-control"
                      id="aReferral"
                      onChange={TransferHandler}
                      required
                      >
                        <option value="Referred Institute " selected disabled>Referred Institute </option>

                        {rInstitute && rInstitute.map((et) => (
                          et.insType === 'College' ?
                          <option value={et._id}>{et.insName} - Rs. worth 85 / Credit ({et.transferCredit ? et.transferCredit : 0})</option>
                          :
                          et.insType === 'School' ?
                          <option value={et._id}>{et.insName} - Rs. worth 85 / Credit ({et.transferCredit ? et.transferCredit : 0})</option>
                          : 
                          et.insType === 'Coaching' ?
                          <option value={et._id}>{et.insName} - Rs. worth 40 / Credit ({et.transferCredit ? et.transferCredit : 0})</option>
                          : ''
                          ))}
                      </select>
                    </div>
                    <div className="col-12 col-md-6 mt-4">
                      <label htmlFor="rCredit" className="form-group">Transfer Credit Count
                      <span className={styles.requireField}>*</span>
                      </label>
                      <input
                      type="number"
                      className="form-control"
                      name="transferCredit"
                      id="rCredit"
                      placeholder="Enter Credit Count"
                      onChange={TransferHandler}
                      required
                      />
                    </div>
                    {referalData && referalData.referalPercentage ?
                    <div className="col-12 col-md-6 mt-4">
                      <button type="submit" className="btn btn-primary px-5 mt-4 mx-auto">Transfer</button>
                    </div>
                    : ''}
                    {/* {referalDataText &&
                      referalDataText.map((ct) => (
                        <div className="col-12 col-md-6 mt-4">
                          <div
                            className="d-flex"
                            style={{ border: "1px solid green" }}
                          >
                            <p className="mx-2 my-2">{ct.insName}</p>
                            <p className="mx-2 my-2">
                              {ct.referalPercentage} %
                            </p>
                            <p
                              className={`${styles.pending} text-warning mx-4 my-2`}
                            >
                              {ct.referalStatus}
                            </p>
                          </div>
                        </div>
                      ))} */}
                  </form>
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

export default SettingsReferals;
