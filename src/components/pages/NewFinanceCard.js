import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { requestURL } from "../ReqUrl";

const NewFinanceCard = (props) => {
  const navigate = useNavigate();
  const params = useParams();

  const [allStaffTextData, setAllStaffTextData] = useState([]);

  const [financeData, setFinanceData] = useState({
    sid: "",
  });

  const FinanceDataHandler = (e) => {
    const { name, value } = e.target;
    setFinanceData({
      ...financeData,
      [name]: value,
    });
  };

  const FinanceDataHandlerChange = (e) => {
    e.preventDefault();
    axios
      .post(
        `${requestURL}/ins/${params.id}/staff/${financeData.sid}/finance`)
      .then((res) => {
        if (
          res.data.message === "Successfully Assigned Staff" &&
          res.status == 200
        ) {
          props.setAddClassFunction(false);
        }
        setTimeout(() => {
          navigate(`/ins/${params.id}/finance/profile/${res.data.finance._id}`)
        }, 100);
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
      <div className={styles.popupbg}>
        <div
          className={`col col-sm-6 col-md-5 col-lg-5 col-xl-5  ${styles.popupScreen} ${styles.about}`}
        >
          <div
            className={styles.closePopupBtn}
            onClick={() => props.setAddClassFunction(false)}
          >
            <i class="fas fa-times"></i>
          </div>
          <h4>Finance</h4>
          <h5>Activate By Assigning Head</h5>
          <form onSubmit={FinanceDataHandlerChange}>
            <div className="col m-4">
              <select
                name="sid"
                className="form-control"
                onChange={FinanceDataHandler}
                required
              >
                <option value="Make a Selection">
                  Make a Selection
                </option>
                {allStaffTextData &&
                  allStaffTextData.map((st) => (
                    <option
                      value={st._id}
                    >{`${st.staffFirstName} ${st.staffMiddleName ? st.staffMiddleName : ''} ${st.staffLastName}`}</option>
                  ))}
              </select>
            </div>
            <div className="col-12 mb-3">
              <button
                type="submit"
                className="btn btn-outline-primary mt-4 px-5 mx-auto"
              >
                <i class="fas fa-plus mt-1 mx-1"></i>Activate
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

export default NewFinanceCard;
