import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Success, Danger } from "./SnackBar";
import { requestURL } from "./ReqUrl";

const NewComplaintCard = (props) => {
  const navigate = useNavigate();
  const params = useParams();

  const [complaintData, setComplaintData] = useState({
    complaintHead: '',
    complaintType: '',
    complaintContent: ''
  });

  const ComplaintDataHandler = (e) => {
    const { name, value } = e.target;
    setComplaintData({
      ...complaintData,
      [name]: value,
    });
  };

  const ComplaintDataHandlerChange = (e) => {
    e.preventDefault();    
    axios
      .post(
        `${requestURL}/student/${props.sid ? props.sid : ''}/complaint`, complaintData)
      .then( async (res) => {
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
        >
          <div
            className={styles.closePopupBtn}
            onClick={() => props.setAddClassFunction(false)}
          >
            <i class="fas fa-times"></i>
          </div>
          <h4>Add Incomes</h4>
          <form onSubmit={ComplaintDataHandlerChange}>
          <div className="row mt-2">
            <div className="col-md-6 my-2">
              <select
                name="complaintHead"
                className="form-control"
                onChange={ComplaintDataHandler}
                required
              >
                <option value="Select Head" selected disabled>
                  Select Head
                </option>
                <option value={props.data.department ? props.data.department._id :''}>To Department Head</option>
                <option value={props.data.studentClass ? props.data.studentClass._id : ''}>To Class Head</option>
              </select>
            </div>
            <div className="col-md-6 my-2">
            <select
                name="complaintType"
                className="form-control"
                onChange={ComplaintDataHandler}
                required
              >
                <option value="Select Type" selected disabled>
                  Select Type
                </option>
                <option value="Open">Open</option>
                <option value="Anonymous">Anonymous</option>
              </select>
            </div>
            <div className="col-md-12 my-2">
              <textarea
                type="text"
                name="complaintContent"
                className="form-control"
                rows='2'
                cols='30'
                onChange={ComplaintDataHandler}
                placeholder="Write something about complaint"
                required
              ></textarea>
            </div>
            <div className="col-12 mb-3">
              <button
                type="submit"
                className="btn btn-outline-primary mt-4 px-5 mx-auto"
              >
                Make Complaint
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

export default NewComplaintCard;
