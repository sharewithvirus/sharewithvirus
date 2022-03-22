import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import styles from "../../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { requestURL } from "../../ReqUrl";

function UserAdmissionDetailsBar(props) {

  const [adAdminStaff, setAdAdminStaff] = useState("");


  useEffect(() => {
      axios
      .get(`${requestURL}/staffdesignationdata/${props.staffId}`)
      .then((res) => {
        setAdAdminStaff(res.data.staff)
      })
      .catch((e) => {
        console.log("Something went wrong");
      });
  }, []);
    return (
        <>
      <div className={` ${styles.bar} ${styles.newDetailsBar}`}>
        <div className={styles.barMainrow}>
          <div className={`col col-xl-4  ${styles.barOrder2} ${styles.barInner} `}>
                <p>Contact No:- {adAdminStaff.staffPhoneNumber}  &nbsp; &nbsp; &nbsp; &nbsp;</p>
                {/* <br /> */}
                {/* <p>Email:- {adAdminStaff.staffFirstName}</p> */}
          </div>
          <div className={`col col-xl-4   ${styles.barOrder1} ${styles.barInner} `} >
            <div className={`w-100 ${styles.barInnerCenter}`}>
              <p className={` ${styles.profileName}`}>Admission Department</p>
            </div>
          </div>
          <div className={`col col-xl-4 ${styles.barOrder3} ${styles.barInner}`}>
              <p>Head:- {adAdminStaff.staffFirstName} {adAdminStaff.staffMiddleName} {adAdminStaff.staffLastName}</p>
          </div>
        </div>
      </div>
    </>
    )
}

export default UserAdmissionDetailsBar
