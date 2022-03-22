import React from "react";
import styles from "../../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

const FinanceCart = () => {
  return (
    <div className={` ${styles.outer2}`}>
      <form className={`row mt-5 ${styles.funds}`}>
        <div className={`mt-3 ${styles.fundinternal}`}>
          <h4>This Month: 1,00,00,000</h4>
          <hr />
        </div>

        <div className="row">
          <div className="col">
            <h6 className={styles.fundinternaldiv}>Sales: 20,80,000</h6>
          </div>
          <div className="col">
            <h6 className={styles.fundinternaldiv}>Credited: 79,20,000</h6>
          </div>
        </div>
      </form>
    </div>
  );
};

export default FinanceCart;
