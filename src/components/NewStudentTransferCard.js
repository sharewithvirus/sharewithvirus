import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Success, Danger } from "./SnackBar";
import { requestURL } from "./ReqUrl";

const NewStudentTransferCard = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const [classData, setClassData] = useState('')
  useEffect(() =>{
    axios.get(`${requestURL}/student/${props.sid ? props.sid : ''}/detail/leave`)
    .then((res) =>{
        setClassData(res.data.student.studentClass)
    })
  },[])

  const [transferData, setTransferData] = useState({
    transferReason: ''
  });

  const TransferDataHandler = (e) => {
    const { name, value } = e.target;
    setTransferData({
      ...transferData,
      [name]: value,
    });
  };

  const TransferDataHandlerChange = (e) => {
    e.preventDefault();    
    axios
      .post(
        `${requestURL}/student/${props.sid ? props.sid : ''}/transfer/${classData ? classData._id : ''}`, transferData)
      .then((res) => {
        if (res.data.message) {
          props.setAddTransferFunction(false)
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
            onClick={() => props.setAddTransferFunction(false)}
          >
            <i class="fas fa-times"></i>
          </div>
          <h4>Transfer</h4>
          <form onSubmit={TransferDataHandlerChange}>
          <div className="row mt-2">
            <div className="col-12 my-2">
                <label htmlFor="rLeave">Purpose / Reason</label>
              <textarea
                type="text"
                name="transferReason"
                className="form-control"
                rows='2'
                cols='30'
                id="rLeave"
                onChange={TransferDataHandler}
                placeholder="Purpose / Reason"
                required
              ></textarea>
            </div>
            <div className="col-12 mb-3">
              <button
                type="submit"
                className="btn btn-outline-primary mt-4 px-5 mx-auto"
              >
                Transfer
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

export default NewStudentTransferCard;
