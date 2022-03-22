import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { requestURL } from "../ReqUrl";

const SearchInstituteStaffCopy = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const [searchInsJoinData, setSearchInsJoinData] = useState("");
  const [searchStaffData, setSearchStaffData] = useState({
    staffCode: "",
  });

  const StaffDataHandler = (e) => {
    const { name, value } = e.target;
    setSearchStaffData({
      ...searchStaffData,
      [name]: value,
    });
  };

  const StaffDataHandlerChange = (e) => {
    e.preventDefault();
    if(searchInsJoinData.staffJoinCode === `${searchStaffData.staffCode}`){
      axios
        .post(
          `${requestURL}/search/${params.id}/insdashboard/data/${params.iid}`,
          searchStaffData
        )
        .then((res) => {
          // console.log(res.data.staffData._id)
          props.formDetailHandler(false);
          navigate(
            `/user/${params.id}/staffjoinform/${res.data.institute._id}/staff/${res.data.staffData._id}`
          );
        })
        .catch((e) => {
          console.log("Something Went Wrong");
        })
    }
      else{
        console.log('You have not correct code yet...')
      }
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
          className={`col col-sm-12 col-md-10 col-lg-9 col-xl-6  ${styles.popupScreenStaff} ${styles.about}`}
        >
          <div
            className={styles.closePopupBtn}
            onClick={() => props.formDetailHandler(false)}
          >
            <i class="fas fa-times"></i>
          </div>
          <h4>
            Join in <strong>({searchInsJoinData.insName})</strong>
          </h4>
          <form onSubmit={StaffDataHandlerChange}>
            <div className="col col-12 mb-3">
              <label htmlFor="dname" className="form-group mb-1">
                Join As
              </label>
              <input
                type="text"
                name="dName"
                className="form-control"
                value="Staff"
                disabled
                readonly
              />
            </div>
            <div className="col col-12 mb-3">
              <label htmlFor="dtitle" className="form-group mb-1">
                Staff Code (As Per Provide By Institute)
                <span className={styles.requireField}>*</span>
              </label>
              <input
                type="text"
                name="staffCode"
                className="form-control"
                placeholder="Enter StaffCode (INST-STA-*****)"
                onChange={StaffDataHandler}
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

export default SearchInstituteStaffCopy;
