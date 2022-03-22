import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Success, Danger } from "../SnackBar";
import { requestURL } from "../ReqUrl";

const NewIncomeCard = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const [file1, setFile1] = useState("");
  const [fileName1, setFileName1] = useState("");

  const saveFile1 = (e) => {
    setFile1(() => e.target.files);
    setFileName1(() => e.target.files[0].name);
    // console.log(file, fileName);
  };

  const [incomeData, setIncomeData] = useState({
    incomeAccount: '',
    incomePurpose: '',
    incomeAmount: '',
    incomeFrom: '',
    incomeDesc: '',
    incomeAck: ''
  });

  const IncomeDataHandler = (e) => {
    const { name, value } = e.target;
    setIncomeData({
      ...incomeData,
      [name]: value,
    });
  };

  const IncomeDataHandlerChange = (e) => {
    e.preventDefault();    
    const formData1 = new FormData();
    formData1.append("file", file1[0]);
    formData1.append("fileName", fileName1);
    axios
      .post(
        `${requestURL}/staff/${props.sid ? props.sid : ''}/finance/${props.fid ? props.fid : ''}/income`, incomeData)
      .then( async (res) => {
        if (res.data.message) {
        const id = res.data.incomes._id
            await axios.post(
                `${requestURL}/finance/income/${id}`,
                formData1
              );
          props.onShowPost(true);
          props.setAddClassFunction(false)
        //   setIncomeData({ showMessages: true, msg: res.data.message });
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
          className={`col col-sm-7 col-md-6 mb-2 col-lg-6 col-xl-6  ${styles.popupScreen} ${styles.about}`}
        >
          <div
            className={styles.closePopupBtn}
            onClick={() => props.setAddClassFunction(false)}
          >
            <i class="fas fa-times"></i>
          </div>
          <h4 className="mb-2">Add Income</h4>
          <form onSubmit={IncomeDataHandlerChange}>
          <div className="row mt-2">
            <div className="col-md-6 mb-2">
            <label htmlFor="incomeAccount" className="form-group mb-1">Select Account Type 
            <span className={styles.requireField}>*</span>
            </label>
              <select
                name="incomeAccount"
                className="form-control"
                id="incomeAccount"
                onChange={IncomeDataHandler}
                required
              >
                <option value="Account Incomes" selected disabled>
                  Account Incomes
                </option>
                <option value="By Cash">By Cash</option>
                <option value="By Bank">By Bank</option>
              </select>
            </div>
            <div className="col-md-6 mb-2">
            <label htmlFor="incomePurpose" className="form-group mb-1">Purpose / Reason 
            <span className={styles.requireField}>*</span>
            </label>
              <input
                type="text"
                name="incomePurpose"
                className="form-control"
                id="incomePurpose"
                onChange={IncomeDataHandler}
                placeholder="Purpose / Reason"
                required
              />
            </div>
            <div className="col-md-6 mb-2">
            <label htmlFor="incomeAmount" className="form-group mb-1">Enter Amount (in Rs.) 
            <span className={styles.requireField}>*</span>
            </label>
              <input
                type="tel"
                name="incomeAmount"
                className="form-control"
                id="incomeAmount"
                onChange={IncomeDataHandler}
                placeholder="Amount"
                required
              />
            </div>
            <div className="col-md-6 mb-2">
            <label htmlFor="incomeFrom" className="form-group mb-1">From / Third Party 
            <span className={styles.requireField}>*</span>
            </label>
              <input
                type="text"
                name="incomeFrom"
                id="incomeFrom"
                className="form-control"
                onChange={IncomeDataHandler}
                placeholder="From Third Party"
                required
              />
            </div>
            <div className="col-12 col-md-6 mb-2">
            <label htmlFor="incomeDesc" className="form-group mb-1">Income Description 
            <span className={styles.requireField}>*</span>
            </label>
              <textarea
                type="text"
                name="incomeDesc"
                className="form-control"
                id="incomeDesc"
                rows='2'
                cols='30'
                onChange={IncomeDataHandler}
                placeholder="Description"
                required
              ></textarea>
            </div>
            <div className="col-12 col-md-6 mb-2">
            <label htmlFor="incomeAck" className="form-group mb-1">Income Acknowledgement 
            <span className={styles.requireField}>*</span>
            </label>
              <input
                type="file"
                accept="image/png, image/jpg, image/pdf"
                name="incomeAck"
                className="form-control"
                id="incomeAck"
                onChange={saveFile1}
                placeholder="Acknowledgement"
              />
            </div>
            <div className="col-12 mb-2">
              <button
                type="submit"
                className="btn btn-outline-primary mt-4 px-5 mx-auto"
              >
                Add Income
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

export default NewIncomeCard;
