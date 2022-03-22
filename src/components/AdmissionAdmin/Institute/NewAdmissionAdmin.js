import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Success, Danger } from "../../SnackBar";
import { requestURL } from "../../ReqUrl";

const NewAdmissionAdmin = (props) => {
  const navigate = useNavigate();
  const params = useParams();

  const [allStaffTextData, setAllStaffTextData] = useState([]);
  const [admissionAdminData, setAdmissionAdminData] = useState({
    sid: "",
    showMessages: false,
    showMessagesDanger: false,
    msg: "",
  });
  const admissionAdminDataHandler = (e) => {
    const { name, value } = e.target;
    setAdmissionAdminData({
      ...admissionAdminData,
      [name]: value,
    });
  };

  const admissionAdminHandlerChange = (e) => {

    e.preventDefault();
    axios
      .post(`${requestURL}/ins/${props.insData._id}/new-admission-admin`, admissionAdminData)
      .then((res) => {

        props.popup()

      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  };

  useEffect(() => {
    axios
      .get(`${requestURL}/insdashboard/${props.insData._id}`)
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
      {admissionAdminData.showMessages ? (
        <Success msg={admissionAdminData.msg} />
      ) : null}
      <div className={styles.popupbg}>
        <div
          className={` ${styles.popupScreen} ${styles.about}`}
        >
          <div
            className={styles.closePopupBtn}
            onClick={props.popup}
          >        
            <i class="fas fa-times"></i>
          </div>
          <h4>Assign Admission Admin </h4>
            <form onSubmit={admissionAdminHandlerChange}>
            <div className="col m-4">
              <select
                name="sid"
                className={`form-control ${styles.addDepartmentinpuit}`}
                onChange={admissionAdminDataHandler}
                required
              >
                <option value="Select Department Head">
                Select and Assign Admission Admin
                </option>
                {allStaffTextData &&
                  allStaffTextData.map((st) => (
                    <option
                      value={st._id}
                    >{`${st.staffFirstName} ${st.staffMiddleName ? st.staffMiddleName : ''} ${st.staffLastName}`}</option>
                  ))}
              </select>
            </div>
            <div class="d-flex justify-content-center">
                <button className={styles.addDepartment}>Create</button>
            </div>
            </form>
          
        </div>
      </div>
    </>
  );
};

export default NewAdmissionAdmin;
