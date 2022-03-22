import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Success, Danger } from "../SnackBar";
import { requestURL } from "../ReqUrl";

const NewClass = (props) => {
  const navigate = useNavigate();
  const params = useParams();

  const [allStaffTextData, setAllStaffTextData] = useState([]);
  const [allClassMasterData, setAllClassMasterData] = useState([]);

  const [classData, setClassData] = useState({
    mcId: "",
    classTitle: "",
    className: "",
    classCode: "",
    classHeadTitle: "",
    sid: "",
    showMessages: false,
    showMessagesDanger: false,
    msg: "",
  });

  const ClassDataHandler = (e) => {
    const { name, value } = e.target;
    setClassData({
      ...classData,
      [name]: value,
    });
  };

  const ClassDataHandlerChange = (e) => {
    e.preventDefault();
    axios
      .post(
        `${requestURL}/ins/${params.id}/department/${params.did}/batch/${params.bid}`,
        classData
      )
      .then((res) => {
        if (
          res.data.message === "Successfully Created Class" &&
          res.status == 200
        ) {
          props.setAddClassFunction(false);
          setClassData({ showMessages: true, msg: res.data.message });
        }
        setTimeout(() => {
          // navigate(`/${params.id}/departmentclass/${params.did}/batch/${params.bid}`)
        }, 500);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  };

  useEffect(() => {
    axios
      .get(`${requestURL}/insdashboard/${params.id}`)
      .then((res) => {
        const staff = res.data.institute.ApproveStaff;
        setAllStaffTextData(staff);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${requestURL}/ins/${params.id}/departmentmasterclass/${params.did}`)
      .then((res) => {
        const classMaster = res.data.classMaster;
        setAllClassMasterData(classMaster);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  }, []);

  return props.trigger ? (
    <>
      {classData.showMessages ? <Success msg={classData.msg} /> : null}
      <div className={styles.popupbg}>
        <div
          className={`col col-sm-9 col-md-9 col-lg-7 col-xl-7  ${styles.popupScreen} ${styles.about}`}
        >
          <div
            className={styles.closePopupBtn}
            onClick={() => props.setAddClassFunction(false)}
          >
            <i class="fas fa-times"></i>
          </div>
          <h4 className="my-2">Add Standard /Labels /Grade</h4>
          <form onSubmit={ClassDataHandlerChange}>
            <div className="row">
            <div className="col-12 col-md-6 mb-2">
            <label htmlFor="scClasss" className="form-group mb-1">Select Master of Standard / Labels /Grade
            <span className={styles.requireField}>*</span>
            </label>
              <select
                name="mcId"
                className="form-control"
                id="scClass"
                onChange={ClassDataHandler}
                required
              >
                <option value="Select Classroom " selected disabled>Select Master of Standard /Labels /Grade</option>
                {allClassMasterData &&
                  allClassMasterData.map((st) => (
                    <option
                      value={st._id}
                    >{`${st.className} - ${st.classTitle}`}</option>
                  ))}
              </select>
            </div>
            <div className="col-12 col-md-6 mb-2">
            <label htmlFor="stClasss" className="form-group mb-1">Enter Standard / Labels / Grade Title
            <span className={styles.requireField}>*</span>
            </label>
              <input
                type="text"
                name="classTitle"
                id="stClass"
                className="form-control"
                placeholder="Enter Standard / Labels / Grade Title "
                onChange={ClassDataHandler}
                required
              />
            </div>
            <div className="col-12 col-md-6 mb-2">
            <label htmlFor="shClasss" className="form-group mb-1">Enter Classroom Head Title 
            <span className={styles.requireField}>*</span>
            </label>
              <input
                type="text"
                name="classHeadTitle"
                id="shClass"
                className="form-control"
                placeholder="Enter Classroom Head Title "
                onChange={ClassDataHandler}
                required
              />
            </div>
            <div className="col-12 col-md-6 mb-2">
            <label htmlFor="sCodeClasss" className="form-group mb-1">Enter Standard / Labels / Grade Code 
            <span className={styles.requireField}>*</span>
            </label>
              <input
                type="text"
                name="classCode"
                id="sCodeClass"
                className="form-control"
                placeholder="Enter Standard /Labels /Grade Code (Provided By Institute)"
                onChange={ClassDataHandler}
                required
              />
            </div>
            <div className="col-12 mb-2">
            <label htmlFor="sshClasss" className="form-group mb-1">Select Standard / Labels / Grade Head
            <span className={styles.requireField}>*</span>
            </label>
              <select
                name="sid"
                className="form-control"
                id="sshClass"
                onChange={ClassDataHandler}
                required
              >
                <option value="Select Classroom Head" selected disabled>
                  Select Standard /Labels /Grade Head
                </option>
                {allStaffTextData &&
                  allStaffTextData.map((st) => (
                    <option
                      value={st._id}
                    >{`${st.staffFirstName} ${st.staffLastName}`}</option>
                  ))}
              </select>
            </div>
            </div>
            <div className="col-12 mb-3">
              <button
                type="submit"
                className="btn btn-outline-primary mt-4 px-5 mx-auto"
              >
                <i class="fas fa-plus mt-1 mx-1"></i>Add New Class
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  ) : (
    ""
  );
};

export default NewClass;
