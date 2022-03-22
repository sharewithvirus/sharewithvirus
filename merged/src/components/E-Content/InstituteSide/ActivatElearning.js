import React, { useState } from "react";
import styles from "../../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { requestURL } from "../../ReqUrl";
import axios from "axios";
const ActivatElearning = (props) => {
  const [departmentData, setDepartmentData] = useState("");
  const DepartmentDataHandler = (e) => {
    const { name, value } = e.target;
    setDepartmentData({
      ...departmentData,
      [name]: value,
    });
  };

  const departmentDataHandlerChange = (e) => {
    e.preventDefault();
    axios
      .post(`${requestURL}/insdashboard/${props.id}/e-content`, departmentData)
      .then((res) => {
        props.setDepartmentFunction(false);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  };

  return (
    <>
      <div className={styles.popupbg}>
        <div className={` ${styles.popupScreen} ${styles.about}`}>
          <div
            className={styles.closePopupBtn}
            onClick={() => props.setDepartmentFunction(false)}
          >
            <i className="fas fa-times"></i>
          </div>
          <h1> E-Learning</h1>
          <h5>Activate by assingin head</h5>
          <form onSubmit={departmentDataHandlerChange}>
            <div className="col m-4">
              <select
                name="sid"
                className="form-control"
                onChange={DepartmentDataHandler}
                required
                className={styles.addDepartmentinpuit}
              >
                <option value="Select E-Learning Head">
                  Select E-Learning Head
                </option>
                {props.insdata.ApproveStaff.map((st) => (
                  <option value={st._id}>{`${st.staffFirstName} ${
                    st.staffMiddleName ? st.staffMiddleName : ""
                  } ${st.staffLastName}`}</option>
                ))}
              </select>
            </div>
            <div className="d-flex justify-content-center">
              <button className={`btn btn-primary btn-lg`}>Activate</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ActivatElearning;
