import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Success, Danger } from "../SnackBar";
import { requestURL } from "../ReqUrl";

const NewExpenseCard = (props) => {
  const navigate = useNavigate();
  const params = useParams();
  const [file1, setFile1] = useState("");
  const [fileName1, setFileName1] = useState("");

  const saveFile1 = (e) => {
    setFile1(() => e.target.files);
    setFileName1(() => e.target.files[0].name);
    // console.log(file, fileName);
  };

  const [expenseData, setExpenseData] = useState({
    expenseAccount: '',
    expensePurpose: '',
    expenseAmount: '',
    expensePaid: '',
    expenseDesc: '',
    expenseAck: ''
  });

  const ExpenseDataHandler = (e) => {
    const { name, value } = e.target;
    setExpenseData({
      ...expenseData,
      [name]: value,
    });
  };

  const ExpenseDataHandlerChange = (e) => {
    e.preventDefault();    
    if(expenseData.expenseAmount >= props.amount){
      console.log('Amount will not greater than Total Balance')
    }
    else{
    const formData1 = new FormData();
    formData1.append("file", file1[0]);
    formData1.append("fileName", fileName1);
    axios
      .post(
        `${requestURL}/staff/${props.sid ? props.sid : ''}/finance/${props.fid ? props.fid : ''}/expense`, expenseData)
      .then( async (res) => {
        if (res.data.message) {
        const id = res.data.expenses._id
            await axios.post(
                `${requestURL}/finance/expense/${id}`,
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
          <h4 className="mb-2">Add Expenses</h4>
          <form onSubmit={ExpenseDataHandlerChange}>
          <div className="row mt-2">
            <div className="col-md-6 mb-2">
            <label htmlFor="expenseAccount" className="form-group mb-1">Select Account Type 
            <span className={styles.requireField}>*</span>
            </label>
              <select
                name="expenseAccount"
                className="form-control"
                id="expenseAccount"
                onChange={ExpenseDataHandler}
                required
              >
                <option value="Account Expense" selected disabled>
                  Account Expense
                </option>
                <option value="By Cash">By Cash</option>
                <option value="By Bank">By Bank</option>
              </select>
            </div>
            <div className="col-md-6 mb-2">
            <label htmlFor="expensePurpose" className="form-group mb-1">Purpose / Reason 
            <span className={styles.requireField}>*</span>
            </label>
              <input
                type="text"
                name="expensePurpose"
                className="form-control"
                id="expensePurpose"
                onChange={ExpenseDataHandler}
                placeholder="Purpose / Reason"
                required
              />
            </div>
            <div className="col-md-6 mb-2">
            <label htmlFor="expenseAmount" className="form-group mb-1">Enter Amount (in Rs.) 
            <span className={styles.requireField}>*</span>
            </label>
              <input
                type="tel"
                name="expenseAmount"
                className="form-control"
                id="expenseAmount"
                onChange={ExpenseDataHandler}
                placeholder="Amount"
                required
              />
            </div>
            <div className="col-md-6 mb-2">
            <label htmlFor="expensePaid" className="form-group mb-1">Paid / Third Party 
            <span className={styles.requireField}>*</span>
            </label>
              <input
                type="text"
                name="expensePaid"
                className="form-control"
                onChange={ExpenseDataHandler}
                id="expensePaid"
                placeholder="Paid To Third Party"
                required
              />
            </div>
            <div className="col-12 col-md-6 mb-2">
            <label htmlFor="expenseDesc" className="form-group mb-1">Expense Description 
            <span className={styles.requireField}>*</span>
            </label>
              <textarea
                type="text"
                name="expenseDesc"
                className="form-control"
                id="expenseDesc"
                rows="2"
                cols="30"
                onChange={ExpenseDataHandler}
                placeholder="Description"
                required
              ></textarea>
            </div>
            <div className="col-12 col-md-6 mb-2">
            <label htmlFor="expenseAck" className="form-group mb-1">Expense Acknowledgement 
            <span className={styles.requireField}>*</span>
            </label>
              <input
                type="file"
                accept="image/png, image/jpg, image/pdf"
                name="expenseAck"
                className="form-control"
                id="expenseAck"
                onChange={saveFile1}
                placeholder="Acknowledgement"
              />
            </div>
            <div className="col-12 mb-3">
              <button
                type="submit"
                className="btn btn-outline-primary mt-4 px-5 mx-auto"
              >
                Add Expense
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

export default NewExpenseCard;
