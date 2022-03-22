
import React, { useState } from "react";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router";

// className={styles.acountPopup}

function AccountPopup(props) {
    return props.trigger ? (
        <>
          <div className={`${styles.popupbg}`}>
            <div className={`${styles.createpostContainer}`} >
{/* 
                <div className={styles.acountPopup}> */}
                        <div className={styles.acountPopup}>
                            <select class="form-select " aria-label="Default select example">
                                <option selected>Account Incomes</option>
                                
                            </select>

                            <input
                                type="text"
                                name="purpose"
                                className="form-control"
                                id="purpose"
                                placeholder="Purpose/ For/ Reason"
                            /> 
                        </div>    

                        <div className={styles.acountPopup}>
                            <input
                                type="number"
                                name="amount"
                                className="form-control"
                                id="amount"
                                placeholder="Amount"
                            />  

                            <input
                                type="text"
                                name="from"
                                className="form-control"
                                id="from"
                                placeholder="From/ Third Party"
                            />
                        </div>

                        <div className={styles.acountPopup}>
                            <input
                                type="text"
                                name="from"
                                className="form-control"
                                id="from"
                                placeholder="Description"
                            />

                            <input
                                type="text"
                                name="from"
                                className="form-control"
                                id="from"
                                placeholder="Acknowledgement"
                            />
                        </div>

                        <div className="d-flex justify-content-center">
                            <button
                                type="button"
                                onClick={()=> props.changeShow(false)}
                                className="btn btn-outline-success mt-2 mx-2"  >
                                Account
                        </button> 
                        </div>     
                {/* </div> */}
                         
            </div>
          </div>
        </>
        
        
      ) : (
        ""
      );
}

export default AccountPopup