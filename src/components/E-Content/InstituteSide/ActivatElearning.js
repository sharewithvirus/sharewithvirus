import React, { useState } from "react";
// import styles from "../../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { requestURL } from "../../ReqUrl";
import axios from "axios";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
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
        props.setrunEffect(false);
        props.setDepartmentFunction(true);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  };

  return (
    <>
      <Dialog open={true}>
        <DialogTitle>
          <div className="d-flex justify-content-between">
            <h1>E-Learning</h1>
            <img
              src="/images/close-icon.svg"
              alt="user"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Close"
              style={{ width: "1.5rem", cursor: "pointer" }}
              onClick={() => props.setDepartmentFunction(false)}
            />
          </div>
        </DialogTitle>
        <DialogContent>
          <h5>Activate by assingin head</h5>
          <form onSubmit={departmentDataHandlerChange}>
            <div className="col m-4">
              <select
                name="sid"
                className="form-select"
                onChange={DepartmentDataHandler}
                required
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
        </DialogContent>
      </Dialog>
      {/* <div className={styles.popupbg}>
        <div className={` ${styles.popupScreen} ${styles.about}`}>
          <div
            className={styles.closePopupBtn}
            onClick={() => props.setDepartmentFunction(false)}
          >
            <i className="fas fa-times"></i>
          </div>
          <h1> E-Learning</h1>
          <h5>Activate by assingin head</h5>
          
        </div>
      </div> */}
    </>
  );
};

export default ActivatElearning;
