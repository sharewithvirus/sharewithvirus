import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Success, Danger } from "./SnackBar";
import { requestURL } from "./ReqUrl";

const NewFieldCard = (props) => {
  const navigate = useNavigate();
  const params = useParams();

  const [fieldData, setFieldData] = useState({
    fieldName: ''
  });

  const FieldDataHandler = (e) => {
    const { name, value } = e.target;
    setFieldData({
      ...fieldData,
      [name]: value,
    });
  };

  const FieldDataHandlerChange = (e) => {
    e.preventDefault();    
    axios
      .post(
        `${requestURL}/ins/${props.id ? props.id : ''}/add/field`, fieldData)
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
        >
          <div
            className={styles.closePopupBtn}
            onClick={() => props.setAddClassFunction(false)}
          >
            <i class="fas fa-times"></i>
          </div>
          <h4>New Field</h4>
          <form onSubmit={FieldDataHandlerChange}>
          <div className="row mt-2">
            <div className="col-12 my-2">
            <label htmlFor="bankAc" className="form-group mb-2">Field Name <span className="text-danger mx-1" style={{fontSize: 'larger'}}>*</span></label>
              <input
                type="text"
                name="fieldName"
                className="form-control"
                onChange={FieldDataHandler}
                id="bankAc"
                placeholder="Enter Field Name"
                required
              />
            </div>
            <div className="col-12 mb-3">
              <button
                type="submit"
                className="btn btn-outline-primary mt-4 px-5 mx-auto"
              >
                Add Field
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

export default NewFieldCard;
