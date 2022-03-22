import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import SearchInstituteStaffCopy from "./SearchInstituteStaffCopy";
import SearchInstituteStudentCopy from "./SearchInstituteStudentCopy";
import { requestURL } from "../ReqUrl";

const SearchInstituteJoin = (props) => {
  // const navigate = useNavigate();
  const params = useParams();
  // const [studentAs, setStudentAs] = useState(false)
  const [detailHandler, setDetailHandler] = useState(false);
  const [detailHandler1, setDetailHandler1] = useState(false);
  const [searchInsJoinData, setSearchInsJoinData] = useState("");

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

  const formDetailHandler = () => {
    setDetailHandler(false);
    props.joinCloseHandler(false);
  };
  const formDetailHandler1 = () => {
    setDetailHandler(false);
    props.joinCloseHandler(false);
  };

  const staffHandler = () => {
    setDetailHandler(true);
  };
  const studentHandler = () => {
    setDetailHandler1(true);
  };
  return (
    <>
      <div className={styles.popupbg}>
        <div
          className={`col col-sm-12 col-md-10 col-lg-9 col-xl-6  ${styles.popupScreen} ${styles.about}`}
        >
          <div
            className={styles.closePopupBtn}
            onClick={() => props.joinCloseHandler(false)}
          >
            <i class="fas fa-times"></i>
          </div>
          <h4>
            Join in <strong>({searchInsJoinData.insName})</strong>
          </h4>
          <div className="row mt-3">
            <div className="col col-6 my-4 ">
              <button
                type="submit"
                className="btn btn-primary mx-5 px-3"
                onClick={staffHandler}
              >
                Proceed as Staff
              </button>
              {/* <button type="submit" className="btn btn-primary mx-5 px-3" onClick={() => navigate(`/user/${params.id}/insjoinstaff/${params.iid}`)}>Proceed as Staff</button> */}
            </div>
            <div className="col col-6 my-4 ">
              <button
                type="submit"
                className="btn btn-primary mx-5 px-3"
                onClick={studentHandler}
              >
                Proceed as Student
              </button>
              {/* <button type="submit" className="btn btn-primary mx-5 px-3" onClick={() => navigate(`/user/${params.id}/insjoinstudent/${params.iid}`)}>Proceed as Student</button> */}
            </div>
          </div>

          {detailHandler && (
            <SearchInstituteStaffCopy formDetailHandler={formDetailHandler} />
          )}
          {detailHandler1 && (
            <SearchInstituteStudentCopy
              formDetailHandler1={formDetailHandler1}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default SearchInstituteJoin;
