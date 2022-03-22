import React, { useState } from "react";
import styles from "../../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { requestURL } from "../../ReqUrl";
import axios from "axios";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
const Activate = (props) => {
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
      .post(`${requestURL}/insdashboard/${props.id}/library`, departmentData)
      .then((res) => {
        props.setDepartmentFunction(false);
        props.setrunEffect(true);
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
            <h1>Librarian</h1>
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
                  Select Library Head
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
    </>
  );
};

export default Activate;
