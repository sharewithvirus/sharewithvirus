import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Success, Danger } from "../SnackBar";
import { requestURL } from "../ReqUrl";

const NewSupportReply = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const [supportData, setSupportData] = useState({
    queryReply: ''
  });

  const SupportHandler = (e) => {
    const { name, value } = e.target;
    setSupportData({
      ...supportData,
      [name]: value,
    });
  };

  const SupportHandlerChange = (e) => {
    e.preventDefault();
    if(props.urid){
    axios.post(`${requestURL}/user/${props.uid ? props.uid : ''}/support/${props.urid ? props.urid : ''}/reply`, supportData)
      .then((res) => {
        if (
          res.data.message === "reply" &&
          res.status == 200
        ) {
          props.setAddClassFunction(false);
        }
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
    }
    else if(props.irid){
        axios.post(`${requestURL}/ins/${props.id ? props.id : ''}/support/${props.irid ? props.irid : ''}/reply`, supportData)
      .then((res) => {
        if (
          res.data.message === "reply" &&
          res.status == 200
        ) {
          props.setAddClassFunction(false);
        }
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
    }
    else{

    }
  };



  return props.trigger ? (
    <>
      <div className={styles.popupbg}>
        <div
          className={`col col-sm-6 col-md-5 col-lg-5 col-xl-5 ${styles.popupScreen} ${styles.about}`}
        >
          <div
            className={styles.closePopupBtn}
            onClick={() => props.setAddClassFunction(false)}
          >
            <i class="fas fa-times"></i>
          </div>
          <h4>Reply</h4>
          <form onSubmit={SupportHandlerChange}>
            <div className="row">
               <div className="col-12 mt-2">
                  <label htmlFor="support" className="form-label">
                   Reply
                  </label>
                  <textarea 
                  type="text" 
                  name="queryReply" 
                  className="form-control" 
                  id="support" 
                  rows="2"
                  cols="30"
                  placeholder="Enter Something here..." 
                  onChange={SupportHandler} 
                  required
                  
                  />
               </div>
            </div>
            <div className="col-12 mb-3">
              <button
                type="submit"
                className="btn btn-outline-primary mt-4 px-5 mx-auto"
              >
                <i class="fas fa-plus mt-1 mx-1"></i>Reply
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

export default NewSupportReply;
