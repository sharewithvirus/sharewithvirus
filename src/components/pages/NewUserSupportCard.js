import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Success, Danger } from "../SnackBar";
import { requestURL } from "../ReqUrl";

const NewUserSupportCard = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const [supportData, setSupportData] = useState({
    rating: '',
    body: ''
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
    axios
      .post(
        `${requestURL}/user/${props.uid ? props.uid : ''}/support`, supportData)
      .then((res) => {
        if (
          res.data.message === "Successfully Updated" &&
          res.status == 200
        ) {
          props.setAddClassFunction(false);
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
          className={`col col-sm-6 col-md-5 col-lg-5 col-xl-5  ${styles.popupScreen} ${styles.about}`}
        >
          <div
            className={styles.closePopupBtn}
            onClick={() => props.setAddClassFunction(false)}
          >
            <i class="fas fa-times"></i>
          </div>
          <h4>Support</h4>
          <form onSubmit={SupportHandlerChange}>
            <div className="row">
               <div className="col-12 mt-2">
                  <label htmlFor="radio" className="form-label">
                  Rating
                  </label>
                  <input type="range" name="rating" min="1" max="5" step="1" id="radio" placeholder="Enter Something here..." onChange={SupportHandler} required/>
               </div>
               <div className="col-12 mt-2">
                  <label htmlFor="support" className="form-label">
                   Body
                  </label>
                  <textarea type="text" name="body" 
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
                <i class="fas fa-plus mt-1 mx-1"></i>Save
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

export default NewUserSupportCard;
