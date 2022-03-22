import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Success, Danger } from "./SnackBar";
import { requestURL } from "./ReqUrl";

const UpdateBankDetails = (props) => {
  const navigate = useNavigate();
  const params = useParams();

  const [bankData, setBankData] = useState({
    bankAccountHolderName: props.data.bankAccountHolderName,
    bankAccountNumber:  props.data.bankAccountNumber,
    bankReAccountNumber:  props.data.bankAccountNumber,
    bankIfscCode:  props.data.bankIfscCode,
    bankAccountPhoneNumber:  props.data.bankAccountPhoneNumber
  });

  const BankDataHandlerChange = (e) => {
    e.preventDefault();    
    if(bankData.bankAccountNumber !== bankData.bankReAccountNumber){
        // alert('Enter valid bank account number')
    }
    else{
    axios
      .patch(
        `${requestURL}/finance/${props.fid ? props.fid : ''}/bank/details/${props.id ? props.id : ''}/update`, bankData)
      .then((res) => {
        if (res.data.message) {
          props.setAddUpdateFunction(false)
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
            onClick={() => props.setAddUpdateFunction(false)}
          >
            <i class="fas fa-times"></i>
          </div>
          <h4>Edit Bank Details</h4>
          <form onSubmit={BankDataHandlerChange}>
          <div className="row mt-2">
            <div className="col-md-6 my-2">
            <label htmlFor="bankAc" className="form-group mb-2">Account Holder Name <span className="text-danger mx-1" style={{fontSize: 'larger'}}>*</span></label>
              <input
                type="text"
                name="bankAccountHolderName"
                className="form-control"
                id="bankAc"
                value={bankData.bankAccountHolderName}
                onChange={(e) => setBankData({...bankData, bankAccountHolderName: e.target.value})}

              />
            </div>
            <div className="col-md-6 my-2">
            <label htmlFor="bankNumber" className="form-group mb-2">Enter Account Number <span className="text-danger mx-1" style={{fontSize: 'larger'}}>*</span></label>
              <input
                type="password"
                name="bankAccountNumber"
                className="form-control"
                maxLength="11"
                minLength="11"
                id="bankNumber"
                value={bankData.bankAccountNumber}
                onChange={(e) => setBankData({...bankData, bankAccountNumber: e.target.value})}

              />
            </div>
            <div className="col-md-6 my-2">
            <label htmlFor="bankReNumber" className="form-group mb-2">Re-Enter Account Number <span className="text-danger mx-1" style={{fontSize: 'larger'}}>*</span></label>
              <input
                type="tel"
                name="bankReAccountNumber"
                className="form-control"
                maxLength="11"
                minLength="11"
                id="bankReNumber"
                value={bankData.bankAccountNumber}
                onChange={(e) => setBankData({...bankData, bankReAccountNumber: e.target.value})}

              />
            </div>
            <div className="col-md-6 my-2">
            <label htmlFor="bankIFSC" className="form-group mb-2">IFSC Code <span className="text-danger mx-1" style={{fontSize: 'larger'}}>*</span></label>
              <input
                type="text"
                name="bankIfscCode"
                className="form-control"
                maxLength="11"
                minLength="11"
                id="bankIFSC"
                value={bankData.bankIfscCode}
                onChange={(e) => setBankData({...bankData, bankIfscCode: e.target.value})}

              />
            </div>
            <div className="col-md-6 my-2">
            <label htmlFor="bankPhoneNumber" className="form-group mb-2">Mobile Number (optional) </label>
              <input
                type="tel"
                name="bankAccountPhoneNumber"
                className="form-control"
                maxLength="10"
                minLength="10"
                id="bankPhoneNumber"
                value={bankData.bankAccountPhoneNumber}
                onChange={(e) => setBankData({...bankData, bankAccountPhoneNumber: e.target.value})}
              />
            </div>
            <div className="col-12 mb-3">
              <button
                type="submit"
                className="btn btn-outline-primary mt-4 px-5 mx-auto"
              >
                Edit Details
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

export default UpdateBankDetails;
