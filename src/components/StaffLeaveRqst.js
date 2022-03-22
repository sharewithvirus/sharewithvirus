import React from "react";
import { useNavigate } from "react-router";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const StaffLeaveRqst = (props) => {
  return (
    <>
      <div className={`col col-xl-6 col-lg-12 col-md-6 col-12`}>
        <div className={styles.leaveRqst}>
          <div
            className={`   d-flex justify-content-between align-items-center`}
          >
            <div>
              <img className={styles.insUserProfiles} src={props.imgSrc} />
              <span className="mt-3 mx-3">{props.name}</span>
            </div>
            <Link to={"/allstaff"} className="mx-3">
              View
            </Link>
          </div>
          <form>
            <div className="form-group">
              <label className="text-center" htmlFor="request">
                Request:
              </label>
              <input
                readOnly
                type="text"
                id="request"
                className="form-control-sm form-control-plaintext text-center"
                value={`${props.type} From ${props.from} to ${props.to}`}
              />
              <label className="text-center" htmlFor="replacement">
                Replacement:
              </label>
              <select
                id="request"
                className="form-control form-control-sm text-center"
              >
                <option>Select a staff</option>
              </select>
            </div>
            <div
              class="btn-group mx-auto mt-4"
              role="group"
              aria-label="Basic example"
            >
              <button
                type="button"
                class={`btn btn-sm btn-success px-4  ${styles.confirm}`}
              >
                Grant
              </button>
              <button
                type="button"
                class={`btn btn-sm btn-danger px-4  ${styles.confirm}`}
              >
                Decline
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

StaffLeaveRqst.defaultProps = {
  name: "Staff Name",
  imgSrc: "images/image-staff.png",
  type: "Leave",
  from: "15th Jan",
  to: "20th Jan",
};

export default StaffLeaveRqst;
