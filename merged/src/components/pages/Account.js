import React, { useState, useEffect } from "react";
import { setGlobal } from 'reactn'
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import UserAboutSection from "../UserAboutSection";
import { requestURL } from "../ReqUrl";
import axios from "axios";
import NavbarTopUser from "../NavbarTopUser";
import NavbarBottomUser from "../NavbarBottomUser";
import UserSettingSideBar from "../UserSettingSideBar";
import { Success } from "../SnackBar";

const Account = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [showPhone, setShowPhone] = useState(true)
  const [accountData, setAccountData] = useState("");
  const [switchUserData, setSwitchUserData] = useState([])
  const [switchInsData, setSwitchInsData] = useState([])
  const [userPhoneData, setUserPhoneData] = useState('')
  const [accountPopUp, setAccountPopUp] = useState({
    showMessages: false,
    showMessagesDanger: false,
    msg: "",
  });

  useEffect(() => {
    if(showPhone){
    axios.get(`${requestURL}/userdashboard/${params.id}`).then((res) => {
      setAccountData(res.data.user);
      setSwitchUserData(res.data.user.addUser)
      setSwitchInsData(res.data.user.addUserInstitute)
      setShowPhone(false)
    });
    }
  }, [showPhone]);

  const switchUserAccountHandler = (e) =>{
    var id = e.target.value
    axios.post(`${requestURL}/switchUser/ins/${id}`)
    .then((res) =>{
      if(res.data.user){
        localStorage.removeItem('userId')
        localStorage.setItem('userId', res.data.user._id)
        navigate(`/userdashboard/${res.data.user._id}`)
      }
      else if(res.data.institute){
        localStorage.removeItem('userId')
        localStorage.setItem('instituteId', res.data.institute._id)
        navigate(`/insdashboard/${res.data.institute._id}`)
      }
    }).catch((e) =>{
      console.log('something went wrong')
    })
  }

  const UserInfoChange = (e) =>{
    if(userPhoneData.length >=10 ){
      axios.post(`${requestURL}/user/phone/info/${params.id}`,
      {
        userPhoneNumber: userPhoneData
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
      id: `${accountData ? accountData._id : ''}`
    })
    navigate('/signup')
  }


  return (
    <>
    {accountPopUp.showMessages ? (
        <Success msg={accountPopUp.msg} />
      ) : null}
      <div className={styles.mainScreen}>
        <NavbarTopUser uid={params.id} />
        <div className={`${styles.mainContent}`}>
          <div className="row">
            <div className={`col col-lg-4 col-xl-3 ${styles.leftside}`}>
              <div className={styles.leftBar}>
                <UserAboutSection uid={params.id} />
                <div className={`${styles.about} ${styles.leftMenu}`}>
                  <UserSettingSideBar id={params.id} />
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
                        Email
                      </label>
                      <input
                        type="text"
                        name="staffFirstName"
                        className="form-control"
                        id="afirstname"
                        value={
                          accountData.userLegalName
                            ? accountData.userLegalName
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
                          accountData.userStatus
                            ? accountData.userStatus
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
                      onChange={switchUserAccountHandler}
                      >
                        <option value="Switch Account" selected disabled>Switch Account</option>
                        {
                          switchUserData && switchUserData.map((et) => (
                          <option value={et._id}>{et.username}</option>
                          ))}
                        {
                          switchInsData && switchInsData.map((et) => (
                          <option value={et._id}>{et.name}</option>
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
                        Change Mobile No. ({accountData.userPhoneNumber})
                      </label>
                      <input
                        type="text"
                        name="userPhoneNumber"
                        className="form-control"
                        id="amiddlename"
                        placeholder="Change Mobile Number"
                        onChange={(e) => {setUserPhoneData(e.target.value)}}
                      />
                    </div>
                    <div className="col-12 col-md-6 mt-4">
                      <button type="button" className="btn btn-secondary" onClick={UserInfoChange}
                      style={{marginTop: '29px'}}
                      >Change</button>
                    </div>
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

export default Account;
