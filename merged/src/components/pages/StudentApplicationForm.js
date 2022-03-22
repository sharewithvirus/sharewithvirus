import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopInstitute from "../NavbarTopInstitute";
import AboutSection from "../AboutSection";
import NavbarBottomInstitute from "../NavbarBottomInstitute";
import BackButton from "../BackButton";
import axios from 'axios'
import { requestURL } from "../ReqUrl";

const StudentApplicationForm = () => {
  const navigate = useNavigate();
  const params = useParams()

  const [insData, setInsData] = useState('')
  useEffect(() =>{
    axios.get(`${requestURL}/insdashboard/${params.id}`)
    .then((res) =>{
       setInsData(res.data.institute)
    })
    .catch((e) =>{
      console.log("Something went wrong")
    })
  },[]) 
  return (
    <>
      <div className={styles.mainScreen}>
        <NavbarTopInstitute id={params.id}/>
        <div className={`${styles.mainContent} `}>
          <div className="row">
            <div className={`col col-lg-4 col-xl-3 ${styles.leftside}`}>
              <div className={styles.leftBar}>
              <AboutSection id={params.id}/>
                <div className={`pt-5 ${styles.about} ${styles.leftMenu}`}>
                  <div
                    className={`mt-5 ${styles.dabout} `}
                    onClick={() => navigate(`/allstaff/${params.id}`)}
                  >
                    <i class="fas fa-user-tie"></i> Staff
                  </div>
                  <div
                    className={`${styles.dabout} ${styles.active} mt-3 mb-2`}
                    onClick={() => navigate(`/allstudent/${params.id}`)}
                  >
                    <i class="fas fa-user-graduate"></i> Students
                  </div>
                </div>
              </div>
            </div>
            <div className={`col col-lg-8 col-xl-9  mx-auto ${styles.midside}`}>
              <div className={`${styles.about}`} style={{ marginTop: "24px" }}>
                {/* <BackButton /> */}
                <div className={` ${styles.outer2}`}>
                  <form className="row">
                    <div className="col-12">
                      <h4>Student Joining Form</h4>
                    </div>
                    <div className="col-12 d-flex justify-content-center">
                      <img
                        className={styles.appImages}
                        src="/images/blank-profile.png"
                      />
                      <img
                        className={styles.imageEdit}
                        src="/images/icon-imageEdit.svg"
                        alt="edit"
                      />
                    </div>
                    <div className="col-12 col-md-4 mt-4">
                      <label htmlFor="afirstname" className="form-group mb-2">
                        First Name
                      </label>
                      <input
                        type="text"
                        name="afirstname"
                        className="form-control"
                        id="afirstname"
                        placeholder="First Name"
                      />
                    </div>
                    <div className="col-12 col-md-4 mt-4">
                      <label htmlFor="amiddlename" className="form-group mb-2">
                        Middle Name
                      </label>
                      <input
                        type="text"
                        name="amiddlename"
                        className="form-control"
                        id="amiddlename"
                        placeholder="Middle Name"
                      />
                    </div>
                    <div className="col-12 col-md-4 mt-4">
                      <label htmlFor="alastname" className="form-group mb-2">
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="alastname"
                        className="form-control"
                        id="alastname"
                        placeholder="Last Name"
                      />
                    </div>
                    <div className="col-12 col-md-6 mt-4">
                      <label htmlFor="adob" className="form-group mb-2">
                        Date of Birth
                      </label>
                      <input
                        type="date"
                        name="adob"
                        className="form-control"
                        id="adob"
                        value="01-01-2001"
                      />
                    </div>
                    <div className="col-12 col-md-6 mt-4">
                      <label htmlFor="agender" className="form-group mb-2">
                        Gender
                      </label>
                      <select id="agender" className="form-control">
                        <option value="Male" selected>
                          Male
                        </option>
                        <option value="Female">Female</option>
                        <option value="Trans Gender">Trans Gender</option>
                      </select>
                    </div>
                    <div className="col-12 col-md-6 mt-4">
                      <label htmlFor="anational" className="form-group mb-2">
                        Nationality
                      </label>
                      <input
                        type="text"
                        name="anational"
                        className="form-control"
                        id="anational"
                        value="Nationality"
                      />
                    </div>
                    <div className="col-12 col-md-6 mt-4">
                      <label htmlFor="aspeak" className="form-group mb-2">
                        Mother Tongue
                      </label>
                      <select id="aspeak" className="form-control">
                        <option value="Hindi" selected>
                          Hindi
                        </option>
                        <option value="English">English</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="col-12 col-md-4 mt-4">
                      <label htmlFor="acast" className="form-group mb-2">
                        Cast
                      </label>
                      <input
                        type="text"
                        name="acast"
                        className="form-control"
                        id="acast"
                        value="Cast"
                      />
                    </div>
                    <div className="col-12 col-md-4 mt-4">
                      <label htmlFor="acastcat" className="form-group mb-2">
                        Cast Category
                      </label>
                      <input
                        type="text"
                        name="acastcat"
                        className="form-control"
                        id="acastcat"
                        value="Category"
                      />
                    </div>
                    <div className="col-12 col-md-4 mt-4">
                      <label htmlFor="arel" className="form-group mb-2">
                        Religion
                      </label>
                      <input
                        type="text"
                        name="arel"
                        className="form-control"
                        id="arel"
                        value="Religion"
                      />
                    </div>
                    <div className="col-12 col-md-4 mt-4">
                      <label htmlFor="abirth" className="form-group mb-2">
                        Birth Place
                      </label>
                      <input
                        type="text"
                        name="abirth"
                        className="form-control"
                        id="abirth"
                        value="Birth Place"
                      />
                    </div>
                    <div className="col-12 col-md-4 mt-4">
                      <label htmlFor="adistrict" className="form-group mb-2">
                        District
                      </label>
                      <input
                        type="text"
                        name="adistrict"
                        className="form-control"
                        id="adistrict"
                        value="District"
                      />
                    </div>
                    <div className="col-12 col-md-4 mt-4">
                      <label htmlFor="astate" className="form-group mb-2">
                        State
                      </label>
                      <input
                        type="text"
                        name="astate"
                        className="form-control"
                        id="astate"
                        value="State"
                      />
                    </div>
                    <div className="col-12 col-md-6 mt-4">
                      <label htmlFor="apname" className="form-group mb-2">
                        Parents / Guardian Name
                      </label>
                      <input
                        type="text"
                        name="apname"
                        className="form-control"
                        id="apname"
                        value="Parents name"
                      />
                    </div>
                    <div className="col-12 col-md-6 mt-4">
                      <label htmlFor="apphone" className="form-group mb-2">
                        Parents / Guardian Phone No.
                      </label>
                      <input
                        type="tel"
                        name="apphone"
                        className="form-control"
                        id="apphone"
                        value="Parents Phone No."
                      />
                    </div>
                    <div className="col-12 mt-4">
                      <label htmlFor="aaddress" className="form-group mb-2">
                        Address
                      </label>
                      <textarea
                        type="text"
                        name="aaddress"
                        className="form-control"
                        rows="2"
                        cols="40"
                        id="aaddress"
                        value="Write Your Full Address Here..."
                      ></textarea>
                    </div>
                    <div className="col-12 col-md-6 mt-4">
                      <label htmlFor="phone" className="form-group mb-2">
                        Mobile Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        className="form-control"
                        id="phone"
                        value="Mobile Number"
                      />
                    </div>
                    <div className="col-12 col-md-6 mt-4">
                      <label htmlFor="aadhar" className="form-group mb-2">
                        Aadhar Number
                      </label>
                      <input
                        type="tel"
                        name="aadhar"
                        className="form-control"
                        id="aadhar"
                        value="Aadhar Number"
                      />
                    </div>
                    <div className="col-12 col-md-4 mt-4">
                      <label htmlFor="attach" className="form-group mb-2">
                        Attach Documents
                      </label>
                      <input
                        type="text"
                        name="attach"
                        className="form-control"
                        id="attach"
                        value="Attach Documents"
                      />
                    </div>
                    <div className="col-12 col-md-4 mt-4">
                      <label htmlFor="aadharcard" className="form-group mb-2">
                        Aadhar Card
                      </label>
                      <input
                        type="tel"
                        name="aadharcard"
                        className="form-control"
                        id="aadharcard"
                        value="Aadhar Card"
                      />
                    </div>
                    <div className="col-12 col-md-4 mt-5">
                      <button
                        type="submit"
                        className="btn btn-outline-info px-4 ml-3 mt-2"
                      >
                        New
                      </button>
                    </div>
                    <div className="col-12 d-flex justify-content-center my-5">
                      <button
                        type="submit"
                        className="btn btn-outline-primary  px-5 "
                        onClick={() => navigate(`/allstudent/${params.id}`)}
                      >
                        Confirm Details
                      </button>
                    </div>
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

export default StudentApplicationForm;
