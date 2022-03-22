import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Success, Danger } from "../SnackBar";
import { requestURL } from "../ReqUrl";

const NewSportClass = (props) => {
  const navigate = useNavigate();
  const params = useParams();

  const [allStaffTextData, setAllStaffTextData] = useState([]);

  const [classData, setClassData] = useState({
    sportClassName: "",
    staffId: "",
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
        `${requestURL}/ins/${params.id}/sport/${props.sid ? props.sid : ''}/class`,
        classData
      )
      .then((res) => {
        if (
          res.data.message === "Successfully Created Sport Class" &&
          res.status == 200
        ) {
          props.onShowPost(true)
          props.setAddClassFunction(false);
        }
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


  return props.trigger ? (
    <>
      {classData.showMessages ? <Success msg={classData.msg} /> : null}
      <div className={styles.popupbg}>
        <div
          className={`col col-sm-8 col-md-7 col-lg-6 col-xl-6  ${styles.popupScreen} ${styles.about}`}
        >
          <div
            className={styles.closePopupBtn}
            onClick={() => props.setAddClassFunction(false)}
          >
            <i class="fas fa-times"></i>
          </div>
          <h4 className="my-2">Add Sport Class</h4>
          <form onSubmit={ClassDataHandlerChange}>
            <div className="row">
            <div className="col-12 col-md-6 mb-2">
            <label htmlFor="scClass" className="form-group mb-1">Enter Sport Class Name 
            <span className={styles.requireField}>*</span>
            </label>
              <input
                type="text"
                name="sportClassName"
                id="scClass"
                className="form-control"
                placeholder="Enter Sports Class Name " 
                onChange={ClassDataHandler}
                required
              />
            </div>
            <div className="col-12 col-md-6 mb-2">
            <label htmlFor="sshClass" className="form-group mb-1">Select Sport Class Head 
            <span className={styles.requireField}>*</span>
            </label>
              <select
                name="staffId"
                className="form-control"
                id="sshClass"
                onChange={ClassDataHandler}
                required
              >
                <option value="Select Sport Class Head" selected disabled>
                  Select Sport Class Head
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
                <i class="fas fa-plus mt-1 mx-1"></i>Add Sport Class
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

export default NewSportClass;
