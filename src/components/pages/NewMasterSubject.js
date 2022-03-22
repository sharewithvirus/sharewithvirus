import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { requestURL } from "../ReqUrl";

const NewSubject = (props) => {
  const navigate = useNavigate();
  const params = useParams();

  const [subjectMasterData, setsubjectMasterData] = useState({
    subjectName: "",
  });

  const ClassDataHandler = (e) => {
    const { name, value } = e.target;
    setsubjectMasterData({
      ...subjectMasterData,
      [name]: value,
    });
  };

  const ClassDataHandlerChange = (e) => {
    e.preventDefault();
    axios
      .post(
        `${requestURL}/ins/${params.id}/departmentmastersubject/${params.did}/batch/${params.bid}`,
        subjectMasterData
      )
      .then((res) => {
        if (
          res.data.message === "Successfully Created Master Subject" &&
          res.status == 200
        ) {
          // props.setTrigger(false);
          props.setMasterSubjectFunction(false);
          navigate(
            `/${params.id}/departmentmastersubject/${params.did}/batch/${params.bid}`
          );
        } else {
          alert("something went wrong");
        }
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  };
  //

  //
  return props.trigger ? (
    <>
      <div className={styles.popupbg}>
        <div
          className={`col col-sm-8 col-md-8 col-lg-6 col-xl-6  ${styles.popupScreen} ${styles.about}`}
        >
          <div
            className={styles.closePopupBtn}
            onClick={() => props.setMasterSubjectFunction(false)}
          >
            <i class="fas fa-times"></i>
          </div>
          <h4>Add Subject Master</h4>
          <form onSubmit={ClassDataHandlerChange}>
            <div className="col m-4">
            <label htmlFor="sgSubject" className="form-group mb-1">Enter Subject Master Name
            <span className={styles.requireField}>*</span>
            </label>
              <input
                type="text"
                name="subjectName"
                id="sgSubject"
                className="form-control"
                placeholder="Enter Subject Master Name"
                onChange={ClassDataHandler}
                required
              />
            </div>
            <div className="d-flex justify-content-center">
              <button
                type="submit"
                className="btn btn-outline-primary mt-4 px-5 mx-auto"
              >
                <i class="fas fa-plus mt-1 mx-1"></i>Add Subject Master
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

export default NewSubject;
