import React from "react";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { requestURL } from "../components/ReqUrl";
const StaffUserRqst = (props) => {
  return (
    <>
      {props.requestData &&
        props.requestData.map((rt) => (
          <div className={` ${styles.dUser}`}>
            <div className="col-xl-9 col-lg-8 col-md-12 d-flex justify-content-between align-items-center">
              <div>
                <img
                  className={styles.insUserProfiles}
                  src={
                    rt.photoId === "1"
                      ? "/images/image-boy2.png"
                      : `${requestURL}/userprofileabout/coverphoto/${rt.profilePhoto}`
                  }
                  alt="Profile"
                />
                <span className="mt-3 mx-3">{rt.username}</span>
              </div>
              {/* <Link to={`/${props.aid}/ins/application/${rt._id}`} className="mx-3">
            View
          </Link> */}
            </div>
            <div
              id="btnGroup"
              className="btn-group col-xl-3 col-lg-4 col-md-6 mx-auto"
              role="group"
            >
              <button
                type="button"
                class={`btn btn-primary`}
                //   onClick={() => navigate(`/admin/${props.aid}/view/detail-reject/ins/${rt._id}`)}
              >
                Blocked
              </button>
            </div>
          </div>
        ))}
    </>
  );
};

export default StaffUserRqst;