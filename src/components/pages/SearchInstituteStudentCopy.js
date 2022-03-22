import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { requestURL } from "../ReqUrl";

const SearchInstituteStudentCopy = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const [searchInsJoinData, setSearchInsJoinData] = useState("");

  const [searchStudentData, setSearchStudentData] = useState({
    studentCode: "",
  });

  const StudentDataHandler = (e) => {
    const { name, value } = e.target;
    setSearchStudentData({
      ...searchStudentData,
      [name]: value,
    });
  };

  const StudentDataHandlerChange = (e) => {
    e.preventDefault();
    axios
      .post(
        `${requestURL}/search/${params.id}/insdashboard/data/student/${params.iid}`,
        searchStudentData
      )
      .then((res) => {
        props.formDetailHandler1(false);
        navigate(
          `/user/${params.id}/studentjoinform/${res.data.institute._id}/student/${res.data.studentData._id}`
        );
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  };

  useEffect(() => {
    axios
      .get(`${requestURL}/insdashboard/${params.iid}`)
      .then((res) => {
        const textInsJoin = res.data.institute;
        setSearchInsJoinData(textInsJoin);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  }, []);

  return (
    <>
      <div className={styles.popupbg}>
        <div
          className={`col col-sm-12 col-md-10 col-lg-9 col-xl-6  ${styles.popupScreenStudent} ${styles.about}`}
        >
          <div
            className={styles.closePopupBtn}
            onClick={() => props.formDetailHandler1(false)}
          >
            <i class="fas fa-times"></i>
          </div>
          <h4>
            Join in <strong>({searchInsJoinData.insName})</strong>
          </h4>
          <form onSubmit={StudentDataHandlerChange}>
            <div className="col col-12 mb-3">
              <label htmlFor="dname" className="form-group mb-1">
                Join As
              </label>
              <input
                type="text"
                name="dName"
                className="form-control"
                value="Student"
              />
            </div>
            <div className="col col-12 mb-3">
              <label htmlFor="dtitle" className="form-group mb-1">
                Student Code (As Per Provide By Institute)
                <span className={styles.requireField}>*</span>
              </label>
              <input
                type="text"
                name="studentCode"
                className="form-control"
                placeholder="Enter Student Code (C-*****)"
                onChange={StudentDataHandler}
                required
              />
            </div>
            <div className="col-12 mb-3">
              <button
                type="submit"
                className="btn btn-outline-primary mt-4 px-5 mx-auto"
              >
                <i class="fas fa-plus mt-1 mx-1"></i>Join
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SearchInstituteStudentCopy;
