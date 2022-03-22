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
import TextField from '@mui/material/TextField';
import UserSettingSideBar from "../UserSettingSideBar";
import NewUserPersonalInfo from "./NewUserPersonalInfo";


const PersonalInfo = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [dataUser, setUserData] = useState(true);
  const [addUserClass, setAddUserClass] = useState(false);
  const [personalData, setPersonalData] = useState("");
  const [first, setFirst] = useState(false);
  const [showPost, setShowPost] = useState(true);

  useEffect(() => {
    if(showPost){
    axios.get(`${requestURL}/userdashboard/${params.id}`).then((res) => {
      const personal = res.data.user;
      setPersonalData(personal);
      setFirst(true);
      setShowPost(false)
    });
    }
  }, [showPost]);

  const setAddUserClassFunction = () => {
    setAddUserClass(false);
    setUserData(true);
  };

  const onShowPost = () => {
    setShowPost(true);
  };
  return (
    <>
        <NavbarTopUser uid={params.id} />
      <div className={styles.mainScreen}>
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
                  <form className="row">
                    <div className="col-md-10">
                      <h4>Personal Info</h4>
                    </div>
                    <div className="col-2"
                    onClick={() =>{
                      setAddUserClass(true)
                    }}
                    >Edit</div>
                    
                    <div className="col-12 col-md-6  mt-4">
                    <label htmlFor="adobs" className="form-group mb-2">
                        Name
                      </label>
                    <input
                    color="primary" 
                    name="userLegalName"
                    className="form-control mt-2 mb-3" 
                    id="adobs"
                    disabled
                    readonly
                    value={
                      personalData.userLegalName
                        ? personalData.userLegalName
                        : "Place Name"
                    }                    
                    />

                    </div>
                    <div className="col-12 col-md-6 mt-4">
                    <label htmlFor="adobss" className="form-group mb-2">
                        Email
                      </label>
                    <input 
                    name="userEmail"
                    className="form-control mt-2 mb-3" 
                    id="adobss"
                    disabled
                    readonly
                    value={
                      personalData.userEmail
                        ? personalData.userEmail
                        : "Place Email"
                    }
                  />                 
                    </div>
                    <div className="col-12 col-md-4 mt-4">
                      <label htmlFor="adob" className="form-group mb-2">
                        City
                      </label>
                      <input
                        type="text"
                        name="staffDOB"
                        className="form-control"
                        id="adob"
                        value={
                          personalData.userCity
                            ? personalData.userCity
                            : "Place City"
                        }
                        disabled
                        readonly
                      />
                    </div>
                    <div className="col-12 col-md-4 mt-4">
                      <label htmlFor="anational" className="form-group mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        name="staffNationality"
                        className="form-control"
                        id="anational"
                        value={
                          personalData.userState
                            ? personalData.userState
                            : "Place State"
                        }
                        disabled
                        readonly
                      />
                    </div>
                    <div className="col-12 col-md-4 mt-4">
                      <label htmlFor="national" className="form-group mb-2">
                        Country
                      </label>
                      <input
                        type="text"
                        name="staffNationality"
                        className="form-control"
                        id="national"
                        value={
                          personalData.userCountry
                            ? personalData.userCountry
                            : "Place Country"
                        }
                        disabled
                        readonly
                      />
                    </div>

                    <div className="col-12 col-md-4 mt-4">
                      <label htmlFor="acast" className="form-group mb-2">
                        Date of Birth
                      </label>
                      <input
                        type="text"
                        name="staffCast"
                        className="form-control"
                        id="acast"
                        value={
                          personalData.userDateOfBirth
                            ? personalData.userDateOfBirth
                            : "Place Date of Birth"
                        }
                        disabled
                        readonly
                      />
                    </div>
                    <div className="col-12 col-md-4 mt-4">
                      <label htmlFor="cast" className="form-group mb-2">
                        Mobile No.
                      </label>
                      <input
                        type="text"
                        name="staffCast"
                        className="form-control"
                        id="cast"
                        value={
                          personalData.userPhoneNumber
                            ? personalData.userPhoneNumber
                            : "Place Mobile Number"
                        }
                        disabled
                        readonly
                      />
                    </div>
                    <div className="col-12 col-md-4 mt-4">
                      <label htmlFor="casts" className="form-group mb-2">
                        Gender
                      </label>
                      <input
                        type="text"
                        name="staffCast"
                        className="form-control"
                        id="casts"
                        value={
                          personalData.userGender
                            ? personalData.userGender
                            : "Place Gender"
                        }
                        disabled
                        readonly
                      />
                    </div>
                    <div className="col-12 mt-4">
                      <label htmlFor="alastname" className="form-group mb-2">
                        Address
                      </label>
                      <input
                        type="text"
                        name="staffLastName"
                        className="form-control"
                        id="alastname"
                        value={
                          personalData.userAddress
                            ? personalData.userAddress
                            : "Place Address"
                        }
                        disabled
                        readonly
                      />
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        <NavbarBottomUser uid={params.id} />
        {
          personalData ? 
          <NewUserPersonalInfo
          setAddUserClassFunction={setAddUserClassFunction}
          trigger={addUserClass}
          setTrigger={setAddUserClass}
          uid={params.id} 
          onShowPersonalInfo={onShowPost}
          personal={personalData}
          />
        : ''}
    </>
  );
};

export default PersonalInfo;
