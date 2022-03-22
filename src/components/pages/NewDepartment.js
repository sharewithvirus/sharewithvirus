import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Success, Danger } from "../SnackBar";
import { requestURL } from "../ReqUrl";

const NewDepartment = (props) => {
  const navigate = useNavigate();
  const params = useParams();

  const [allStaffTextData, setAllStaffTextData] = useState([]);
  const [departmentData, setDepartmentData] = useState({
    dTitle: "",
    dName: "",
    sid: "",
    showMessages: false,
    showMessagesDanger: false,
    msg: "",
  });
  const DepartmentDataHandler = (e) => {
    const { name, value } = e.target;
    setDepartmentData({
      ...departmentData,
      [name]: value,
    });
  };

  const DepartmentDataHandlerChange = (e) => {
    e.preventDefault();
    axios
      .post(`${requestURL}/ins/${props.id}/new-department`, departmentData)
      .then((res) => {
        props.setDepartmentFunction(false);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  };

  useEffect(() => {
    axios
      .get(`${requestURL}/insdashboard/${props.id}`)
      .then((res) => {
        const staff = res.data.institute.ApproveStaff;
        setAllStaffTextData(staff);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  }, []);

  return (
    <>
      {departmentData.showMessages ? (
        <Success msg={departmentData.msg} />
      ) : null}
      <div className={styles.popupbg}>
        <div
          className={` ${styles.popupScreen} ${styles.about}`}
        >
          <div
            className={styles.closePopupBtn}
            onClick={() => props.setDepartmentFunction(false)}  
          >        
            <i class="fas fa-times"></i>
          </div>
          <h4 className="my-2">Add Department</h4>
            <form onSubmit={DepartmentDataHandlerChange}>
              <div className="row">
            <div className="col-12 col-md-6 mb-2">
            <label htmlFor="snDepartment" className="form-group mb-1">Enter Department Name 
            <span className={styles.requireField}>*</span>
            </label>
              <input
                type="text"
                name="dName"
                id="snDepartment"
                className="form-control"
                placeholder="Enter New Department Name"
                onChange={DepartmentDataHandler}
                required
                // className={styles.addDepartmentinpuit}
              />
            </div>
            <div className="col-12 col-md-6 mb-2">
            <label htmlFor="stDepartment" className="form-group mb-1">Enter Department Head Title 
            <span className={styles.requireField}>*</span>
            </label>
              <input
                type="text"
                name="dTitle"
                id="stDepartment"
                className="form-control"
                placeholder="Enter Department Head Title"
                onChange={DepartmentDataHandler}
                required
                // className={styles.addDepartmentinpuit}
              />
            </div>
            <div className="col-12 mb-2">
            <label htmlFor="shDepartment" className="form-group mb-1">Select Department Head 
            <span className={styles.requireField}>*</span>
            </label>
              <select
                name="sid"
                className="form-control"
                onChange={DepartmentDataHandler}
                id="shDepartment"
                required
                // className={styles.addDepartmentinpuit}
              >
                <option value="Select Department Head" selected disabled>
                  Select Department Head
                </option>
                {allStaffTextData &&
                  allStaffTextData.map((st) => (
                    <option
                      value={st._id}
                    >{`${st.staffFirstName} ${st.staffMiddleName ? st.staffMiddleName : ''} ${st.staffLastName}`}</option>
                  ))}
              </select>
            </div>
            </div>
            <div class="d-flex justify-content-center mb-2">
                <button 
                type="submit"
                className="btn btn-outline-primary px-5 mx-auto"
                // className={styles.addDepartment}
                >Add Department</button>
            </div>
            </form>
          
        </div>
      </div>
    </>
  );
};

export default NewDepartment;
