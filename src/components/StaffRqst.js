import React from "react";
import { useNavigate } from "react-router";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
// import axios from 'axios'
import { requestURL } from "./ReqUrl";
const StaffRqst = (props) => {
  const navigate = useNavigate();
  // const params = useParams();
  const openInNewTab = (url) => {
    const newWindow = window.open(url, "_blank", "noopener,noreferrer");
    if (newWindow) newWindow.opener = null;
  };
  return (
    <>
      {props.requestData &&
        props.requestData.map((rt, index) =>
          rt.status === "Approved" ? (
            <div className={` ${styles.dUser}`} key={index}>
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
                    style={{ cursor: "pointer", textDecoration: "underline" }}
                    onClick={() =>
                      openInNewTab(
                        `${requestURL}/ins-register/doc/${rt.insDocument}`
                      )
                    }
                  >
                    View Document
                  </span>
                  <Link
                    to={`/${props.aid}/ins/application/${rt._id}`}
                    className="mx-3"
                  >
                    View Approved
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            <div className={` ${styles.dUser}`} key={index}>
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
                  <Link
                    to={`/${props.aid}/ins/application/${rt._id}`}
                    className="mx-3"
                  >
                    View
                  </Link>
                  <div
                    id="btnGroup"
                    className="btn-group  mx-auto"
                    role="group"
                  >
                    <button
                      type="button"
                      class={`btn btn-primary  `}
                      onClick={() =>
                        navigate(
                          `/admin/${props.aid}/view/detail/ins/${rt._id}`
                        )
                      }
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      class={`btn btn-secondary`}
                      onClick={() =>
                        navigate(
                          `/admin/${props.aid}/view/detail-reject/ins/${rt._id}`
                        )
                      }
                    >
                      Reject
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )
        )}
    </>
  );
};

export default StaffRqst;