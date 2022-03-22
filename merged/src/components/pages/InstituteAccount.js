import React, { useState, useEffect } from "react";
import { setGlobal } from 'reactn'
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { requestURL } from "../ReqUrl";
import axios from "axios";
import NavbarTopInstitute from "../NavbarTopInstitute";
import AboutSection from "../AboutSection";
import NavbarBottomInstitute from "../NavbarBottomInstitute";
import InstituteSettingBar from "../InstituteSettingBar";
import { Success } from "../SnackBar";

const InstituteAccount = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [showPhone, setShowPhone] = useState(true)
  const [accountData, setAccountData] = useState("");
  const [switchUserData, setSwitchUserData] = useState([])
  const [switchInsData, setSwitchInsData] = useState([])
  const [insPhoneData, setInsPhoneData] = useState('')
  const [accountPopUp, setAccountPopUp] = useState({
    showMessages: false,
    showMessagesDanger: false,
    msg: "",
  });

  useEffect(() => {
    if(showPhone){
    axios.get(`${requestURL}/insdashboard/${params.id}`).then((res) => {
      setAccountData(res.data.institute);
      setSwitchUserData(res.data.institute.addInstituteUser)
      setSwitchInsData(res.data.institute.addInstitute)
    });
    }
  }, [showPhone]);

  const switchAccountHandler = (e) =>{
    var id = e.target.value
    axios.post(`${requestURL}/switchUser/${id}`)
      .then((res) =>{
        if(res.data.user){
          localStorage.removeItem('instituteId')
          localStorage.setItem('userId', res.data.user._id)
          navigate(`/userdashboard/${res.data.user._id}`)
        }
        else if(res.data.institute){
          localStorage.removeItem('instituteId')
          localStorage.setItem('instituteId', res.data.institute._id)
          navigate(`/insdashboard/${res.data.institute._id}`)
        }
    }).catch((e) =>{
      console.log('something went wrong')
    })
  }

  const InsInfoChange = (e) =>{
    if(insPhoneData.length >=10 ){
      axios.post(`${requestURL}/ins/phone/info/${params.id}`,
      {
        insPhoneNumber: insPhoneData
      })
      .then((res) =>{
        if(res.data.message === 'Mobile No Updated' && res.status === 200){
          setShowPhone(true)
          setAccountPopUp({ showMessages: true, msg: res.data.message });
        }
        else{

        }
      })
    }
    else{

    }
  }

  const AddAccountHandler = () =>{
    setGlobal({
      iid: `${accountData ? accountData._id : ''}`
    })
    navigate('/signup')
  }

  return (
    <>
        {accountPopUp.showMessages ? (
        <Success msg={accountPopUp.msg} />
      ) : null}
      <div className={styles.mainScreen}>
        <NavbarTopInstitute id={params.id} />
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
                <div className={` ${styles.outer2}`}>
                  <form className="row">
                    <div className="col-12">
                      <h4>Account Setting</h4>
                    </div>
                    <div className="col-12 mt-4">
                      <label htmlFor="afirstname" className="form-group mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        name="staffFirstName"
                        className="form-control"
                        id="afirstname"
                        value={
                          accountData.insName
                            ? accountData.insName
                            : "Place Name"
                        }
                        disabled
                        readonly
                        style={{ letterSpacing: "1px" }}
                      />
                    </div>
                    <div className="col-12 col-md-6 mt-4">
                      <label htmlFor="amiddlename" className="form-group mb-2">
                        Verification Status
                      </label>
                      <input
                        type="text"
                        name="staffMiddleName"
                        className="form-control text-success"
                        id="amiddlename"
                        value={
                          accountData.status
                            ? accountData.status
                            : "Place Status"
                        }
                        disabled
                        readonly
                        style={{ letterSpacing: "1px" }}
                      />
                    </div>
                    <div className="col-12 col-md-6 mt-4">
                      <p
                        className="mt-4 text-primary"
                        onClick={() => navigate("/forgot")}
                        style={{cursor: 'pointer'}}
                      >
                        Forgot Password?
                      </p>
                    </div>
                    <div className="col-12 col-md-6 mt-4">
                      <label htmlFor="amiddlename" className="form-group mb-2">
                        Switch Account
                      </label>
                      <select
                      className="form-control"
                      onChange={switchAccountHandler}
                      >
                        <option value="Switch Account" selected disabled>Switch Account</option>
                        {
                          switchUserData && switchUserData.map((et) => (
                          <option value={et._id}>{et.username}</option>
                          ))}

                        {
                          switchInsData && switchInsData.map((et) => (
                          <option value={et._id}>{et.insName}</option>
                          ))}
                      </select>
                    </div>
                    <div className="col-12 col-md-6 mt-4">
                      <button type="button" className="btn btn-secondary" onClick={AddAccountHandler}
                      style={{marginTop: '29px'}}
                      >Add Account</button>
                    </div>
                    <div className="col-12 col-md-6 mt-4">
                      <label htmlFor="amiddlename" className="form-group mb-2">
                        Change Mobile No. ({accountData.insPhoneNumber})
                      </label>
                      <input
                        type="text"
                        name="insPhoneNumber"
                        className="form-control"
                        id="amiddlename"
                        placeholder="Change Mobile Number"
                        onChange={(e) => {setInsPhoneData(e.target.value)}}
                      />
                    </div>
                    <div className="col-12 col-md-6 mt-4">
                      <button type="button" className="btn btn-secondary" onClick={InsInfoChange}
                      style={{marginTop: '29px'}}
                      >Change</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <NavbarBottomInstitute id={params.id} />
      </div>
    </>
  );
};

export default InstituteAccount;
