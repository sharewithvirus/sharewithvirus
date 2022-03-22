import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
// import { Link } from "react-router-dom";
import axios from "axios";
import { requestURL } from "../ReqUrl";

const StaffFormDetails = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [first, setFirst] = useState(false);
  const [staffDetails, setStaffDetails] = useState("");

  useEffect(() => {
    axios
      .get(`${requestURL}/staff/${params.id}`)
      .then((res) => {
        setStaffDetails(res.data.staff);
        setFirst(true);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  }, []);
  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };

  return (
    <>
      <div className={`col col-md-10 col-sm-12 mx-auto`}>
        <div
          className={` ${styles.outer2} 
            ${styles.formStyle} `}
        >
          <h4>Staff Joining Application </h4>
          <form className="px-5">
            <div className={`row justify-content-center`}>
              <img
                src={
                  staffDetails.photoId === "1"
                    ? "/images/image-boy2.png"
                    : first
                    ? `${requestURL}/search/insdashboard/staffdata/photo/${staffDetails.staffProfilePhoto}`
                    : null
                }
                className={`img-fluid my-2`}
                style={{
                  height: "150px",
                  width: "180px",
                  borderRadius: "50%",
                }}
                alt="Profile"
              />
            </div>
            <div className="form-group row">
              <label htmlFor="afirstname" className="col-sm-4 col-form-label">
                First Name
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  readonly
                  className="form-control-plaintext"
                  id="afirstname"
                  name="afirstname"
                  value={staffDetails.staffFirstName}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="amiddlename" className="col-sm-4 col-form-label">
                Middle Name
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  readonly
                  className="form-control-plaintext"
                  id="amiddlename"
                  name="amiddlename"
                  value={
                    staffDetails.staffMiddleName
                      ? staffDetails.staffMiddleName
                      : "NA"
                  }
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="alastname" className="col-sm-4 col-form-label">
                Last Name
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  readonly
                  className="form-control-plaintext"
                  id="alastname"
                  name="alastname"
                  value={staffDetails.staffLastName}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="adob" className="col-sm-4 col-form-label">
                Date of Birth
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  readonly
                  className="form-control-plaintext"
                  id="adob"
                  name="adob"
                  value={staffDetails.staffDOB}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="agender" className="col-sm-4 col-form-label">
                Gender{" "}
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  readonly
                  className="form-control-plaintext"
                  id="agender"
                  name="agender"
                  value={staffDetails.staffGender}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="anational" className="col-sm-4 col-form-label">
                Nationality
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  readonly
                  className="form-control-plaintext"
                  id="anational"
                  name="anational"
                  value={staffDetails.staffNationality}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="aspeak" className="col-sm-4 col-form-label">
                Mother Tongue{" "}
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  readonly
                  className="form-control-plaintext"
                  id="aspeak"
                  name="aspeak"
                  value={staffDetails.staffMTongue}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="acastcat" className="col-sm-4 col-form-label">
                Caste Category{" "}
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  readonly
                  className="form-control-plaintext"
                  id="acastcat"
                  name="acastcat"
                  value={staffDetails.staffCastCategory}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="acast" className="col-sm-4 col-form-label">
                Caste{" "}
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  readonly
                  className="form-control-plaintext"
                  id="acast"
                  name="acast"
                  value={staffDetails.staffCast}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="arel" className="col-sm-4 col-form-label">
                Religion
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  readonly
                  className="form-control-plaintext"
                  id="arel"
                  name="arel"
                  value={staffDetails.staffReligion}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="abirth" className="col-sm-4 col-form-label">
                Birth Place
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  readonly
                  className="form-control-plaintext"
                  id="abirth"
                  name="abirth"
                  value={staffDetails.staffBirthPlace}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="adistrict" className="col-sm-4 col-form-label">
                District Name
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  readonly
                  className="form-control-plaintext"
                  id="adistrict"
                  name="adistrict"
                  value={staffDetails.staffDistrict}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="astate" className="col-sm-4 col-form-label">
                State Name
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  readonly
                  className="form-control-plaintext"
                  id="astate"
                  name="astate"
                  value={staffDetails.staffState}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="aaddress" className="col-sm-4 col-form-label">
                Address{" "}
              </label>
              <div className="col-sm-8">
                <textarea
                  type="text"
                  readonly
                  className="form-control-plaintext"
                  rows="1"
                  cols="30"
                  id="aaddress"
                  name="aaddress"
                  value={staffDetails.staffAddress}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="phone" className="col-sm-4 col-form-label">
                Mobile Number{" "}
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  readonly
                  className="form-control-plaintext"
                  id="phone"
                  name="phone"
                  value={`+91 ${staffDetails.staffPhoneNumber}`}
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="aadhar" className="col-sm-4 col-form-label">
                AADHAR No.{" "}
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  readonly
                  className="form-control-plaintext"
                  id="aadhar"
                  name="aadhar"
                  value={`${
                    staffDetails.staffAadharNumber
                      ? staffDetails.staffAadharNumber
                      : ""
                  }`}
                />
              </div>
            </div>

            <div className="form-group row">
              <label htmlFor="aqual" className="col-sm-4 col-form-label">
                Qualification
              </label>
              <div className="col-sm-8">
                <input
                  type="text"
                  readonly
                  className="form-control-plaintext"
                  id="aqual"
                  name="aqual"
                  value={
                    staffDetails.staffQualification
                      ? staffDetails.staffQualification
                      : ""
                  }
                />
              </div>
            </div>
            {/* <div className="form-group row">
              <label htmlFor="aattach" className="col-sm-4 col-form-label">
                Aadhar Document
              </label>
              <div className="col-5">
                <input
                  type="text"
                  readonly
                  className="form-control-plaintext"
                  id="aattach"
                  name="aattach"
                  value={`${staffDetails.staffDocuments} (uploaded)`}
                />
              </div> */}
            {/* <Link className="col-3" to="/download">
                Download
              </Link> */}
            {/* </div> */}
            {/* <div className="form-group row">
              <label htmlFor="qattach" className="col-sm-4 col-form-label">
                Qualificational Document
              </label>
              <div className="col-5">
                <input
                  type="text"
                  readonly
                  className="form-control-plaintext"
                  id="qattach"
                  name="qattach"
                  value={`Uploaded`}
                />
              </div>
              {/* <Link className="col-3" to="/download">
                Download
              </Link> 
            </div> */}
            <div className="row">
              <div className="col-6 d-flex my-4 justify-content-center">
                <div
                  className="btn btn-outline-primary mx-auto px-5 "
                  onClick={() =>
                    openInNewTab(
                      `${requestURL}/search/insdashboard/staffdata/adh/${staffDetails.staffAadharCard}`
                    )
                  }
                >
                  View Addhar
                </div>
              </div>

              <div className="col-6 d-flex my-4 justify-content-center">
                <button
                  type="button"
                  className="btn btn-info px-5 mx-3"
                  onClick={() => navigate(-1)}
                >
                  Close
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default StaffFormDetails;
