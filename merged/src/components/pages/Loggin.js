import React, { useState, useRef } from "react";
import { useNavigate } from "react-router";
import styles from "./login.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Modal from "react-modal";
import UserLoginForm from "./User/UserLoginForm";
import InsLoginForm from "./Ins/InsLoginForm";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    padding: "0",
  },
  overlay: {
    background: "rgba(0, 0, 0, 0.7 )",
  },
};

function Loggin() {
  const navigate = useNavigate();

  let subtitle;
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [isOpenModal, setOpenModal] = React.useState(false);
  const [show, setShow] = React.useState(false);
  const [showPass, setShowPass] = React.useState(false);
  const [showForm, setShowForm] = React.useState(false);
  const [showNav, setShowNav] = React.useState(false);

  const signupRef = useRef(0);
  const loginRef = useRef(0);
  const mobileVerify = useRef(0);
  const otpRef = useRef(0);
  const userLoginForm = useRef(0);
  const loginnbody = useRef(0);
  const loginnbodyleft = useRef(0);
  const createPassRef = useRef(0);
  const loginnav = useRef(0);
  const hi = useRef(0);

  const loginClick = () => {
    loginRef.current.style.display = "none";
    signupRef.current.style.display = "block";
  };
  const signupClick = () => {
    signupRef.current.style.display = "none";
    mobileVerify.current.style.display = "block";
  };
  const signinClick = () => {
    signupRef.current.style.display = "none";
    loginRef.current.style.display = "block";
  };
  const submitMobile = () => {
    mobileVerify.current.style.display = "none";
    otpRef.current.style.display = "block";
  };
  const otpverified = () => {
    otpRef.current.style.display = "none";
    loginnbody.current.style.display = "block";
    loginnbodyleft.current.style.display = "none";
    loginnbody.current.style.padding = "0";
    loginnav.current.style.display = "none";
    hi.current.style.display = "block";
    setShow(true);
  };
  if (showPass && window.innerWidth <= 600) {
    createPassRef.current.style.display = "block";
    loginnbody.current.style.display = "block";
    loginnbodyleft.current.style.display = "grid";
    // loginnbodyleft.current.style.justifyContent="center";
  } else if (showPass && window.innerWidth > 600) {
    createPassRef.current.style.display = "block";
    loginnbody.current.style.display = "flex";
    loginnbodyleft.current.style.display = "grid";
  }
  const insClick = () => {
    signupRef.current.style.display = "none";
    loginnav.current.style.display = "none";
    loginnbody.current.style.display = "block";

    loginnbodyleft.current.style.display = "none";
    setShowForm(true);
  };
  // loginRef.current.style.display="none";

  // const loginRef= useRef(0);
  // const signupRef= useRef(0);
  // const passRef = useRef(0);
  // const userLoginline = useRef(0);
  // const userSignupline = useRef(0);
  // const insPassine = useRef(0)

  // signupRef.current.style.display = "none";
  // passRef.current.style.display = "none";

  // function openUser() {
  //     setIsOpen(true);
  // }

  // function openIns() {
  //     setOpenModal(true);
  // }

  // function afterOpenModal() {
  //     // references are now sync'd and can be accessed.

  // }

  // function closeUser() {
  //     setIsOpen(false);
  // }

  // function closeIns() {
  //     setOpenModal(false);
  // }

  // const userSignupClick = () => {
  //     // signupRef.current.style.display = "none";
  //     // loginRef.current.style.display = "none";
  //     passRef.current.style.display = "block";
  // }

  // const signupClick = (e) => {
  //     e.preventDefault();
  //     signupRef.current.style.display = "none";
  //     loginRef.current.style.display = "none";
  //     passRef.current.style.display = "block";
  //     insPassine.current.style.display = "block"
  //     userSignupline.current.style.display = "none";

  //     console.log("hi");
  // }
  // const loginClick = () => {
  //     signupRef.current.style.display = "block";
  //     loginRef.current.style.display = "none";
  //     passRef.current.style.display = "none";
  //     userLoginline.current.style.display = "none";
  //     userSignupline.current.style.display = "block";
  // }

  return (
    <>
      <div ref={loginnav} className={styles.loginnav}>
        <img src="images/preview.png" />
        <div className="d-flex mt-3">
          <h4>Hindi&nbsp;|</h4>
          <h4> &nbsp; Marathi</h4>
        </div>
      </div>
      <div ref={hi} className={styles.hi}>
        <label for="img">
          <img src="images/blank.png" />
        </label>
        <input
          className={styles.upload}
          id="img"
          type="file"
          accept="image/gif, image/jpeg, image/png"
        />
      </div>

      <div className={styles.loginnContainer}>
        <div ref={loginnbody} className={styles.loginnbody}>
          <div ref={loginnbodyleft} className={styles.loginnbodyleft}>
            <img src="images/casual.png" />
          </div>
          <div className={styles.loginnbodyright}>
            <div className={styles.loginRef} ref={loginRef}>
              <h2 className="mb-5">Login</h2>
              <h5>Welcome to Qviple! Please login to your account</h5>

              <form className={styles.logginform}>
                <label for="loginid">UserName</label>
                <input type="text" id="loginid" />
                <label className="mt-3" for="loginid">
                  Password
                </label>
                <input type="text" id="loginid" />
                <button
                  type="button"
                  className="btn btn-primary btn-md mt-5 w-100"
                >
                  Login
                </button>
              </form>

              <div className={styles.modalRightFooter}>
                <p> Don't have an ID? </p>
                <h6 onClick={loginClick}>Register your account</h6>
              </div>
              <p id="emailHelp" className={`form-text ${styles.agreed}`}>
                By signing up you agree to our <b>terms and conditions</b>
              </p>
            </div>

            {/* -----------------------SignUp------------------------ */}
            <div className={styles.signupRef} ref={signupRef}>
              <h2 className="mb-5">SignUP</h2>

              <div onClick={insClick} className={styles.choice}>
                <img
                  className={styles.polygon}
                  src="images/login/Polygon.png"
                />
                <img className={styles.vector} src="images/login/Vector.png" />
                <h5 className={styles.asIns}>As Institution</h5>
                <p className={styles.asInsP}>Continue as Institution</p>
                <img
                  className={styles.arrow}
                  src="https://img.icons8.com/material-sharp/48/4a90e2/right--v2.png"
                />
              </div>
              <div onClick={signupClick} className={`${styles.choice}`}>
                <img
                  className={styles.polygon}
                  src="images/login/Polygon 2.png"
                />
                <img
                  className={styles.user}
                  src="https://img.icons8.com/external-kmg-design-basic-outline-kmg-design/32/4a90e2/external-user-back-to-school-kmg-design-basic-outline-kmg-design.png"
                />
                {/* <img className={styles.user} src="https://img.icons8.com/material-sharp/24/4a90e2/user.png"/> */}
                <h5 className={styles.asIns}>As User</h5>
                <p className={styles.asInsP}>Continue as User</p>
                <img
                  className={styles.arrow}
                  src="https://img.icons8.com/material-sharp/48/4a90e2/right--v2.png"
                />
              </div>
              <div className={styles.modalRightFooter}>
                <p> Already have an account? </p>
                <h6 onClick={signinClick}>Sign in</h6>
              </div>
              <p id="emailHelp" className={`form-text ${styles.agreed}`}>
                By signing up you agree to our <b>User Agreement</b> and{" "}
                <b>Policy</b>
              </p>
            </div>

            {/* -----------------------Enter Mobile No.------------------------ */}
            <div className={styles.mobileVerify} ref={mobileVerify}>
              <h2 className="mb-5">OTP Verification</h2>
              <h5>Enter your mobile no. for otp verification</h5>

              <form className={styles.logginform}>
                <label for="loginid">Mobile No.</label>
                <input
                  type="number"
                  id="loginid"
                  maxlength="10"
                  minLength="10"
                  required
                />
                <button
                  type="button"
                  onClick={submitMobile}
                  className="btn btn-primary btn-md mt-5 w-100"
                >
                  Submit
                </button>
              </form>
            </div>

            {/* -----------------------OTP Verify.------------------------ */}
            <div className={styles.otpVerify} ref={otpRef}>
              <h2 className="mb-5">OTP Verification</h2>
              <h5>Your account will be verified by OTP authentication</h5>

              <form className={styles.logginform}>
                <label for="loginid">Enter OTP.</label>
                <input type="number" id="loginid" maxlength="6" minLength="6" />
                <button
                  type="button"
                  onClick={otpverified}
                  className="btn btn-primary btn-md mt-5 w-100"
                >
                  Submit
                </button>
              </form>
            </div>

            {/* ---------------------UserLoginForm----------------------------------- */}
            {show && (
              <UserLoginForm
                changeShow={(show) => setShow(show)}
                changeShowPass={(show) => setShowPass(show)}
              />
            )}
            {/* --------------------------Create Password------------------------------- */}
            <div className={`mt-3 ${styles.createPass}`} ref={createPassRef}>
              <h2 className="mb-5">Create Login Password</h2>
              <form className={styles.logginform}>
                <label for="loginid">Create Password</label>
                <input type="password" id="loginid" />
                <label className="mt-3" for="loginid">
                  Confirm Password
                </label>
                <input type="password" id="loginid" />

                <button
                  type="button"
                  className="btn btn-primary btn-md mt-5 w-100"
                >
                  Create
                </button>
              </form>

              <div className={styles.modalRightFooter}>
                <p>
                  At least 8 characters , One special , Uppercase , Lowercase.
                </p>
              </div>
            </div>

            {/* ---------------------------------Ins Login Form--------------------------------------- */}

            {showForm && <InsLoginForm />}

            {/* <div ref={userLoginForm} className={styles.userLoginForm}>
                <div className={styles.formUpper}></div>
                 <h4>User Registration Form</h4>
                    <form className={styles.loginnform}>  
                        <div class="row">
                            <div className={styles.cols}>
                                <label for="fullName">Full Name</label>
                                <input style={{backgroundColor: "#fff"}} type="text" id='fullName' />
                            </div>
                            <div className={styles.cols}>
                            <label for="email">Email</label>
                                <input style={{backgroundColor: "#fff"}} type="email" id='email' />
                            </div>
                            <div className={styles.cols}>
                                <label for="mobile">Mobile No.</label>
                                <input style={{backgroundColor: "#fff"}} type="number" id='mobile'/>
                            </div>
                            <div className={styles.cols}>
                            <label for="dob">Date of Birth</label>
                                <input style={{backgroundColor: "#fff"}} type="text" id='dob' />
                            </div>
                            <div className={styles.cols}>
                                <label for="gender">Gender</label>
                                <input  style={{backgroundColor: "#fff"}} type="text" id='gender' />
                            </div>
                            <div className={styles.cols}>
                            <label for="address">Addres</label>
                                <input style={{backgroundColor: "#fff"}} type="text" id='address' />
                            </div>
                            <div className={styles.cols}>
                            <label for="bio">Bio</label>
                                <input style={{height:"55px", backgroundColor: "#fff"}}type="text" id='bio'/>
                            </div>
                            <div className={`${styles.cols}`}>
                                <label for="formFile" class="form-label">Upload Photo</label>
                                <input className={`form-control py-2`} type="file" id="formFile"/>
                            </div>
                        </div>
                    <button class="btn btn-primary">Submit</button>
                    </form>
                 </div> */}

            {/* <iframe src="https://embed.lottiefiles.com/animation/63787"></iframe>
                    <div className={styles.access}>
                        <div>
                            <div className={styles.getarrow} onClick={openIns}>
                                <h3 className='mt-1'>Institution</h3>
                                <i class="fas fa-arrow-right"></i>
                            </div>
                            <div className={styles.dash}></div>

                        </div>

                        <div>
                            <div className={styles.getarrow} onClick={openUser}>
                                <h3 className='mt-1'>User</h3>
                                <i class="fas fa-arrow-right"></i>
                            </div>
                            <div className={styles.dash}></div>
                        </div>
                    </div> */}
          </div>
        </div>

        {/* <Modal
                isOpen={isOpenModal}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeIns}
                style={customStyles}
                styles={{background: "#FFFF00"}}
                contentLabel="Example Modal"
            >


                    <div className={`${styles.modalContainer}`}>
                        <div className={styles.modalLeft}>
                            <h3>Welcome to Qviple</h3>
                            <div className={styles.linee}></div>
                            <p ref={userLoginline} className={styles.userLoginline}>Sign in to continue to your account</p>
                            <p ref={userSignupline} className={styles.userSignupline}>Your account will be verified by OTP authentication</p>
                            <p ref={insPassine} className={styles.insPassine}>Create password for your account</p>
                        </div>
                        <div className={styles.modalRight}>
                            <div  className={styles.insLogin} ref={loginRef}>
                                <form>
                                    <div className={`form-group mb-4`}>
                                        <label for="exampleInputEmail1">UserName</label>
                                        <input type="text" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                                        <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                                    </div>
                                    <div class="form-group">
                                        <label for="exampleInputPassword1">Password</label>
                                        <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
                                    </div>
                                    
                                    <button type="submit" className={`btn btn-primary mt-3 w-100 ${styles.loginbtn}`}>Sign In</button>
                                </form>

                                <div className={styles.modalRightFooter}>
                                    <p> Not a member yet?  </p>
                                    <h6 onClick={()=> loginClick()}>Sign Up</h6>
                                </div>
                            </div>

                            <div className={styles.insSignup} ref={signupRef}>
                                 <h2 className='mb-5'>SignUp</h2>
                                 

                                 <form>
                                        <div className={`form-group mb-4`}>
                                            <label for="exampleInputEmail1">Mobile No./Email</label>
                                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"/>
                                            <div className='d-flex justify-content-between'>
                                                <small id="emailHelp" class="form-text text-muted">Send otp to mobile</small>
                                                <small id="emailHelp" class="form-text text-muted">Send otp to email</small>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleInputPassword1">Enter OTP</label>
                                            <input type="number" class="form-control"  placeholder="OTP"/>
                                        </div>
                                        
                                        <button type="submit" className={`btn btn-primary mt-3 w-100 ${styles.loginbtn}`} onClick={signupClick}>Continue</button>
                                        <small id="emailHelp" class="form-text">By signing up you agree <b>terms and conditions</b></small>
                                </form>
                            </div>

                            <div className={styles.insPass} ref={passRef}>
                                <h2 className='mb-5'>Create Password</h2>
                                

                                <form>
                                        <div className={`form-group mb-4`}>
                                            <label for="exampleInputEmail1">Enter New Password</label>
                                            <input type="password" class="form-control" aria-describedby="emailHelp" placeholder="New Password"/>
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleInputPassword1">Confirm Password</label>
                                            <input type="passworrd" class="form-control"  placeholder="Confirm Password"/>
                                        </div>
                                        
                                        <button type="submit" className={`btn btn-primary mt-3 w-100 ${styles.loginbtn}`} onClick={() => navigate("/insloginform")}>Continue</button>
                                        <small id="emailHelp" class="form-text text-muted">Don’t use the same password for multiple accounts </small>
                                </form>
                            </div>
                        </div>
                    </div>  
            </Modal>

            <Modal
                isOpen={modalIsOpen}
                onAfterOpen={afterOpenModal}
                onRequestClose={closeUser}
                style={customStyles}s
                styles={{background: "#FFFF00"}}
                contentLabel="Example Modal"
            >
                    <div className={`${styles.modalContainer}`}>
                        <div className={styles.modalLeft}>
                            <h3>Welcome to Qviple</h3>
                            <div className={styles.linee}></div>
                            <p ref={userLoginline} className={styles.userLoginline}>Sign in to continue to your account</p>
                            <p ref={userSignupline} className={styles.userSignupline}>Your account will be verified by OTP authentication</p>
                            <p ref={insPassine} className={styles.insPassine}>Create password for your account</p>
                        </div>
                        <div className={styles.modalRight}>
                            <div className={styles.userLogin}  ref={loginRef}>
                                <form>
                                        <div className={`form-group mb-4`}>
                                            <label for="exampleInputEmail1">UserName</label>
                                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email/Mobile No."/>
                                            <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleInputPassword1">Password</label>
                                            <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
                                        </div>
                                        
                                        <button type="submit" className={`btn btn-primary mt-3 w-100 ${styles.loginbtn}`}>Sign In</button>
                                </form>

                                <div className={styles.modalRightFooter}>
                                        <p> Not a member yet?  </p>
                                        <h6 onClick={()=> loginClick()}>Sign Up</h6>
                                </div>
                            </div>

                            <div className={styles.userSignup} ref={signupRef}>
                                <h2 className='mb-5'>SignUp</h2>
                                

                                <form>
                                        <div className={`form-group mb-4`}>
                                            <label for="exampleInputEmail1">Mobile No./Email</label>
                                            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email/Mobile No."/>
                                            <div className='d-flex justify-content-between'>
                                                <small id="emailHelp" class="form-text">Send otp to mobile</small>
                                                <small id="emailHelp" class="form-text">Send otp to email</small>
                                            </div>
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleInputPassword1">Enter OTP</label>
                                            <input type="number" class="form-control"  placeholder="OTP"/>
                                        </div>
                                        
                                        <button type="submit" className={`btn btn-primary mt-3 w-100 ${styles.loginbtn}`} onClick={signupClick}>Continue</button>
                                        <small id="emailHelp" class="form-text text-muted">By signing up you agree all <b>terms and conditions</b></small>
                                </form>
                            </div>

                            <div className={styles.userPass} ref={passRef} >
                                <h2 className='mb-5'>Create Password</h2>
                                

                                <form>
                                        <div className={`form-group mb-4`}>
                                            <label for="exampleInputEmail1">Enter New Password</label>
                                            <input type="password" class="form-control" aria-describedby="emailHelp" placeholder="New Password"/>
                                        </div>
                                        <div class="form-group">
                                            <label for="exampleInputPassword1">Confirm Password</label>
                                            <input type="passworrd" class="form-control"  placeholder="Confirm Password"/>
                                        </div>
                                        
                                        <button type="submit" className={`btn btn-primary mt-3 w-100 ${styles.loginbtn}`} onClick={() => navigate("/userloginform")}>Continue</button>
                                        <small id="emailHelp" class="form-text text-muted">Don’t use the same password for multiple accounts</small>
                                </form>
                            </div>


                        </div>
                    </div>             
            </Modal> */}
      </div>
    </>
  );
}

export default Loggin;
