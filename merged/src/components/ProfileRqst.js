import React from "react";
// import { useNavigate, useParams } from "react-router";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { requestURL } from "./ReqUrl";
const ProfileRqst = (props) => {
  // const navigate = useNavigate();
  // const params = useParams();

  const StaffApproveHandler = (id) => {
    axios
      .post(`${requestURL}/ins/${props.id}/staff/approve/${id}`, {
        status: "Approved",
      })
      .then((res) => {})
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  };

  const StaffRejectHandler = (id) => {
    axios
      .post(`${requestURL}/ins/${props.id}/staff/reject/${id}`, {
        status: "Rejected",
      })
      .then((res) => {})
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  };

  return (
    <>
      {/* {adminMsg.showMessages ? <Success msg={adminMsg.msg} /> : null} */}
      {props.reqData &&
        props.reqData.map((rt) => (
          <div className={` ${styles.dUser}`}>
            <div className="col-xl-9 col-lg-8 col-md-12 d-flex justify-content-between align-items-center">
              <div>
                <img
                  className={styles.insUserProfiles}
                  src={
                    rt.photoId === "1"
                      ? "/images/image-boy2.png"
                      : `${requestURL}/search/insdashboard/staffdata/photo/${rt.staffProfilePhoto}`
                  }
                />
                <span className="mt-3 mx-3">{`${rt.staffFirstName} ${
                  rt.staffMiddleName ? rt.staffMiddleName : ""
                } ${rt.staffLastName}`}</span>
              </div>
              <Link to={`/staffrequest/application/${rt._id}`} className="mx-3">
                View
              </Link>
            </div>
            <div
              id="btnGroup"
              className="btn-group col-xl-3 col-lg-4 col-md-6 mx-auto"
              role="group"
            >
              <button
                type="button"
                class={`btn btn-primary  `}
                onClick={() => {
                  StaffApproveHandler(rt._id);
                }}
              >
                {props.action1}
              </button>
              <button
                type="button"
                class={`btn btn-secondary`}
                onClick={() => {
                  StaffRejectHandler(rt._id);
                }}
              >
                {props.action2}
              </button>
            </div>
          </div>
        ))}
    </>
  );
};

ProfileRqst.defaultProps = {
  name: "Profile Name",
  imgSrc: "/images/image-boy2.png",
  linkTo: "/staffrequest/application",
  action1: "Accept",
  action2: "Reject",
};

export default ProfileRqst;
