import React from "react";
// import { useNavigate, useParams } from "react-router";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { requestURL } from "./ReqUrl";
const LeaveRqst = (props) => {
  // const navigate = useNavigate();
  // const params = useParams();

  const StaffGrantHandler = (id) => {
    axios
      .post(`${requestURL}/ins/${props.id}/staff/leave/grant/${id}`, {
        status: "Granted",
      })
      .then((res) => {})
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  };

  const StaffNoGrantHandler = (id) => {
    axios
      .post(`${requestURL}/ins/${props.id}/staff/leave/reject/${id}`, {
        status: "Not Granted",
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
                    rt.staff.photoId === "1"
                      ? "/images/image-boy2.png"
                      : `${requestURL}/search/insdashboard/staffdata/photo/${rt.staff.staffProfilePhoto}`
                  }
                />
                <span className="mt-3 mx-3">{`${rt.staff.staffFirstName} ${
                  rt.staff.staffMiddleName ? rt.staff.staffMiddleName : ""
                } ${rt.staff.staffLastName}`}</span>
              </div>
              <Link to="" className="mx-3">
                {`${rt.leaveReason} - (${rt.leaveDateFrom} To ${rt.leaveDateTo})`}
              </Link>
            </div>
            { rt.leaveStatus === 'Granted' ? 
            <div id="btnGroup" className="btn-group col-xl-3 col-lg-4 col-md-6 mx-auto" role="group"
            >
              <button type="button" class={`btn btn-info`}>Granted</button>
            </div>
            : 
            rt.leaveStatus === 'Not Granted' ? 
            <div id="btnGroup" className="btn-group col-xl-3 col-lg-4 col-md-6 mx-auto" role="group"
            >
              <button type="button" class={`btn btn-danger`}>
                Rejected
              </button>
            </div>
            : 
            <div id="btnGroup" className="btn-group col-xl-3 col-lg-4 col-md-6 mx-auto" role="group"
            >
              <button type="button" class={`btn btn-primary  `} onClick={() => {StaffGrantHandler(rt._id)}}
              >
                {props.action1}
              </button>
              <button type="button" class={`btn btn-secondary`} onClick={() => {StaffNoGrantHandler(rt._id)}}
              >
                {props.action2}
              </button>
            </div>
            }
          </div>
        ))}
    </>
  );
};

LeaveRqst.defaultProps = {
  name: "Profile Name",
  imgSrc: "/images/image-boy2.png",
  linkTo: "/staffrequest/application",
  action1: "Grant",
  action2: "Don't Grant",
};

export default LeaveRqst;
