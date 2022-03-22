import React from "react";
// import { useNavigate, useParams } from "react-router";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import axios from "axios";
import moment from 'moment'
import { requestURL } from "./ReqUrl";
const ComplaintRqst = (props) => {

  return (
    <>
      {/* {adminMsg.showMessages ? <Success msg={adminMsg.msg} /> : null} */}
      {props.reqData &&
        props.reqData.map((rt) => (
          <div className={` ${styles.dUser}`}>
            <div className="col-xl-9 col-lg-8 col-md-12 d-flex justify-content-between align-items-center">
              <div>
                {rt.complaintType === 'Open' ? 
                <img
                  className={styles.insUserProfiles}
                  src={
                    rt.student.photoId === "1"
                      ? "/images/image-boy2.png"
                      : `${requestURL}/search/insdashboard/studentdata/photo/${rt.student.studentProfilePhoto}`
                    }
                />
                : ''
                }
                {rt.complaintType === 'Open' ?
                <span className="mt-3 mx-1">{`${rt.student.studentFirstName} ${
                  rt.student.studentMiddleName ? rt.student.studentMiddleName : ""
                } ${rt.student.studentLastName}`}</span>
                : `(${rt.complaintType})`
                }
              </div>
              <span className="text-muted">{`${rt.complaintContent.substr(0,70)} - ${rt.createdAt ? moment(rt.createdAt).format('DD/MM/YYYY') : ''}`}</span>
              {/* <Link to={`/staffrequest/application/${rt._id}`} className="mx-3">
                View
              </Link> */}
            </div>
            {/* <div
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
            </div> */}
          </div>
        ))}
    </>
  );
};

ComplaintRqst.defaultProps = {
  name: "Profile Name",
  imgSrc: "/images/image-boy2.png",
  linkTo: "/staffrequest/application",
  action1: "Accept",
  action2: "Reject",
};

export default ComplaintRqst;
