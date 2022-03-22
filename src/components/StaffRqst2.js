import React from "react";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { requestURL } from "./ReqUrl";
// import { Link } from "react-router-dom";
const StaffRqst2 = (props) => {
  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };
  return (
    <>
      {props.approveData
        ? props.approveData &&
          props.approveData.map((at, index) => (
            <div className={` ${styles.dUser}`} key={index}>
              <div className="col-xl-12 col-lg-12 col-md-12 d-flex justify-content-between align-items-center">
                <div>
                  <img
                    className={styles.insUserProfiles}
                    src={
                      at.photoId === "1"
                        ? "/images/institute-avatar.jpeg"
                        : `${requestURL}/insprofileabout/photo/${at.insProfilePhoto}`
                    }
                  />
                  <span className="mt-3 mx-3">{at.insName}</span>
                </div>
                <div>
                  <span
                    className="mx-5 text-muted"
                    style={{ cursor: "pointer", textDecoration: "underline" }}
                    onClick={() =>
                      openInNewTab(
                        `${requestURL}/ins-register/doc/${at.insDocument}`
                      )
                    }
                  >
                    View Document
                  </span>
                  <span
                    className="mt-3 text-success"
                    style={{ textAlign: "right" }}
                  >
                    Approved By Super Admin
                  </span>
                </div>
              </div>
            </div>
          ))
        : props.rejectData &&
          props.rejectData.map((rt) => (
            <div className={` ${styles.dUser}`}>
              <div className="col-xl-12 col-lg-12 col-md-12 d-flex justify-content-between align-items-center">
                <div>
                  <img
                    className={styles.insUserProfiles}
                    src={
                      rt.photoId === "1"
                        ? "/images/institute-avatar.jpeg"
                        : `${requestURL}/insprofileabout/photo/${rt.insProfilePhoto}`
                    }
                  />
                  <span className="mt-3 mx-3">{rt.insName}</span>
                </div>
                <div>
                  <span
                    className="mx-5 text-muted"
                    onClick={() =>
                      openInNewTab(
                        `${requestURL}/ins-register/doc/${rt.insDocument}`
                      )
                    }
                    style={{ cursor: "pointer", textDecoration: "underline" }}
                  >
                    View Document
                  </span>
                  <span
                    className="mt-3 mx-3 text-success"
                    style={{ textAlign: "right" }}
                  >
                    Reject By Super Admin
                  </span>
                </div>
              </div>
            </div>
          ))}
    </>
  );
};

export default StaffRqst2;