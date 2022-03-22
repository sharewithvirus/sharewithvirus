import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Success, Danger } from "./SnackBar";
import { requestURL } from "./ReqUrl";

const NewLeaveCard = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const [insData, setInsData] = useState('')
  useEffect(() =>{
    axios.get(`${requestURL}/staff/${props.sid ? props.sid : ''}/detail/leave`)
    .then((res) =>{
        setInsData(res.data.staff.institute)
    })
  },[])

  const [leaveData, setLeaveData] = useState({
    leaveDateFrom: '',
    leaveDateTo: '',
    leaveReason: ''
  });

  const LeaveDataHandler = (e) => {
    const { name, value } = e.target;
    setLeaveData({
      ...leaveData,
      [name]: value,
    });
  };

  const LeaveDataHandlerChange = (e) => {
    e.preventDefault();    
    axios
      .post(
        `${requestURL}/staff/${props.sid ? props.sid : ''}/leave/${insData ? insData._id : ''}`, leaveData)
      .then((res) => {
        if (res.data.message) {
          props.setAddClassFunction(false)
        }
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  };


  return props.trigger ? (
    <>
      <div className={styles.popupbg}>
        <div
          className={`col col-sm-7 col-md-6 my-2 col-lg-6 col-xl-6  ${styles.popupScreen} ${styles.about}`}
          style={{margin: '0px'}}
        >
          <div
            className={styles.closePopupBtn}
            onClick={() => props.setAddClassFunction(false)}
          >
            <i class="fas fa-times"></i>
          </div>
          <h4>Request To Leave</h4>
          <form onSubmit={LeaveDataHandlerChange}>
          <div className="row mt-2">
            <div className="col-md-6 my-2">
                <label htmlFor="fLeave">From</label>
              <input
                type="date"
                name="leaveDateFrom"
                className="form-control"
                id="fLeave"
                onChange={LeaveDataHandler}
                placeholder="Date"
                required
              />
            </div>
            <div className="col-md-6 my-2">
            <label htmlFor="tLeave">To</label>
              <input
                type="date"
                name="leaveDateTo"
                id="tLeave"
                className="form-control"
                onChange={LeaveDataHandler}
                placeholder="Date"
                required
              />
            </div>
            <div className="col-12 my-2">
                <label htmlFor="rLeave">Purpose / Reason</label>
              <textarea
                type="text"
                name="leaveReason"
                className="form-control"
                rows='2'
                cols='30'
                id="rLeave"
                onChange={LeaveDataHandler}
                placeholder="Purpose / Reason"
                required
              ></textarea>
            </div>
            <div className="col-12 mb-3">
              <button
                type="submit"
                className="btn btn-outline-primary mt-4 px-5 mx-auto"
              >
                Request
              </button>
            </div>
            </div>
          </form>
        </div>
      </div>
    </>
  ) : (
    ""
  );
};

export default NewLeaveCard;
