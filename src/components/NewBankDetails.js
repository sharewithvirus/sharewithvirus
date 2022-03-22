import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Success, Danger } from "./SnackBar";
import { requestURL } from "./ReqUrl";

const NewBankDetails = (props) => {
  const navigate = useNavigate();
  const params = useParams();

  const [bankData, setBankData] = useState({
    bankAccountHolderName: '',
    bankAccountNumber: '',
    bankReAccountNumber: '',
    bankIfscCode: '',
    bankAccountPhoneNumber: ''
  });

  const BankDataHandler = (e) => {
    const { name, value } = e.target;
    setBankData({
      ...bankData,
      [name]: value,
    });
  };

  const BankDataHandlerChange = (e) => {
    e.preventDefault();    
    if(bankData.bankAccountNumber !== bankData.bankReAccountNumber){
        alert('Enter valid bank account number')
    }
    else{
    axios
      .post(
        `${requestURL}/finance/${props.fid ? props.fid : ''}/add/bank/details/${props.id ? props.id : ''}`, bankData)
      .then((res) => {
        if (res.data.message) {
          props.setAddClassFunction(false)
        }
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
    }
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
          <h4>Add Bank Details</h4>
          <form onSubmit={BankDataHandlerChange}>
          <div className="row mt-2">
            <div className="col-md-6 my-2">
            <label htmlFor="bankAc" className="form-group mb-2">Account Holder Name <span className="text-danger mx-1" style={{fontSize: 'larger'}}>*</span></label>
              <input
                type="text"
                name="bankAccountHolderName"
                className="form-control"
                onChange={BankDataHandler}
                id="bankAc"
                placeholder="Enter A/c Holder Name"
                required
              />
            </div>
            <div className="col-md-6 my-2">
            <label htmlFor="bankNumber" className="form-group mb-2">Enter Account Number <span className="text-danger mx-1" style={{fontSize: 'larger'}}>*</span></label>
              <input
                type="password"
                name="bankAccountNumber"
                className="form-control"
                onChange={BankDataHandler}
                maxLength="11"
                minLength="11"
                id="bankNumber"
                placeholder="Enter 11 Digit A/c No."
                required
              />
            </div>
            <div className="col-md-6 my-2">
            <label htmlFor="bankReNumber" className="form-group mb-2">Re-Enter Account Number <span className="text-danger mx-1" style={{fontSize: 'larger'}}>*</span></label>
              <input
                type="tel"
                name="bankReAccountNumber"
                className="form-control"
                onChange={BankDataHandler}
                maxLength="11"
                minLength="11"
                id="bankReNumber"
                placeholder="Enter 11 Digit A/c No."
                required
              />
            </div>
            <div className="col-md-6 my-2">
            <label htmlFor="bankIFSC" className="form-group mb-2">IFSC Code <span className="text-danger mx-1" style={{fontSize: 'larger'}}>*</span></label>
              <input
                type="text"
                name="bankIfscCode"
                className="form-control"
                onChange={BankDataHandler}
                maxLength="11"
                minLength="11"
                id="bankIFSC"
                placeholder="Enter IFSC Code "
                required
              />
            </div>
            <div className="col-md-6 my-2">
            <label htmlFor="bankPhoneNumber" className="form-group mb-2">Mobile Number (optional) </label>
              <input
                type="tel"
                name="bankAccountPhoneNumber"
                className="form-control"
                onChange={BankDataHandler}
                maxLength="10"
                minLength="10"
                id="bankPhoneNumber"
                placeholder="Enter Mobile No."
              />
            </div>
            <div className="col-12 mb-3">
              <button
                type="submit"
                className="btn btn-outline-primary mt-4 px-5 mx-auto"
              >
                Add Details
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

export default NewBankDetails;
