import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import styles from "../../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { requestURL } from "../../ReqUrl";

function NewFinanceBar(props) {

  const [adAdminStaff, setAdAdminStaff] = useState("");


  useEffect(() => {
    if(props.insId){
    axios
      .get(`${requestURL}/insdashboard/${props.insId}`)
      .then((res) => {
        setAdAdminStaff(res.data.institute.insAdmissionAdmin.adAdminName)
      })
      .catch((e) => {
        console.log("Something went wrong");
      });
    }

    if(props.staffId){
      axios
      .get(`{requestURL}/staffdesignationdata/${props.sid}`)
      .then((res) => {
        setAdAdminStaff(res.data.user)
        console.log(res.data.user)
      })
      .catch((e) => {
        console.log("Something went wrong");
      });
    }
  }, []);
    return (
        <>
      <div className={` ${styles.bar} ${styles.newDetailsBar}`}>
        <div className={styles.barMainrow}>
          <div className={`col col-xl-4  ${styles.barOrder2} ${styles.barInner} `}>
                {/* <p>Contact No:- {adAdminStaff.staffPhoneNumber}  &nbsp; &nbsp; &nbsp; &nbsp;</p> */}
                {/* <br /> */}
                {/* <p>Email:- {adAdminStaff.adAdminName.staffFirstName}</p> */}
          </div>
          <div className={`col col-xl-4   ${styles.barOrder1} ${styles.barInner} `} >
            <div className={`w-100 ${styles.barInnerCenter}`}>
              <p className={` ${styles.profileName}`}>Admission Department</p>
            </div>
          </div>
          <div className={`col col-xl-4 ${styles.barOrder3} ${styles.barInner}`}>
              {/* <p>Head:- {adAdminStaff.staffFirstName} {adAdminStaff.staffMiddleName} {adAdminStaff.staffLastName}</p> */}
          </div>
        </div>
      </div>
    </>
    )
}

export default NewFinanceBar
