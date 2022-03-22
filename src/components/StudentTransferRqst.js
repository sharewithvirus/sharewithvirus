import React, { useState } from "react";
// import { useNavigate, useParams } from "react-router";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { requestURL } from "./ReqUrl";
const StudentTransferRqst = (props) => {

  const StudentTransferGrantHandler = (sid, id) => {
    axios
      .post(`${requestURL}/class/${props.cid}/student/${sid}/transfer/grant/${id}/department/${props.did}/batch/${props.bid}`, {
        status: "Granted",
      })
      .then((res) => {
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  };

  const StudentTransferNoGrantHandler = (id) => {
    axios
      .post(`${requestURL}/class/${props.cid}/student/transfer/reject/${id}`, {
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
                    rt.student.photoId === "1"
                      ? "/images/image-boy2.png"
                      : `${requestURL}/search/insdashboard/studentdata/photo/${rt.student.studentProfilePhoto}`
                    }
                />
                <span className="mt-3 mx-3">{`${rt.student.studentFirstName} ${
                  rt.student.studentMiddleName ? rt.student.studentMiddleName : ""
                } ${rt.student.studentLastName}`}</span>
              </div>
              
            </div>
            {rt.transferStatus === 'Granted' ? 
            <div id="btnGroup" className="btn-group col-xl-3 col-lg-4 col-md-6 mx-auto" role="group">
              <button type="button" class={`btn btn-info  `}>
                Granted
              </button>
            </div>
            : 
            rt.transferStatus === 'Not Granted' ?
            <div id="btnGroup" className="btn-group col-xl-3 col-lg-4 col-md-6 mx-auto" role="group">
            <button type="button" class={`btn btn-danger  `}>
              Rejected
            </button>
          </div>
            :
            <div id="btnGroup" className="btn-group col-xl-3 col-lg-4 col-md-6 mx-auto" role="group">
              <button type="button" class={`btn btn-primary  `} onClick={() => {StudentTransferGrantHandler(rt.student._id, rt._id)}}>
                {props.action1}
              </button>
              <button type="button" class={`btn btn-secondary`} onClick={() => {StudentTransferNoGrantHandler(rt._id)}}>
                {props.action2}
              </button>
            </div>
            }
          </div>
        ))}
    </>
  );
};

StudentTransferRqst.defaultProps = {
  name: "Profile Name",
  imgSrc: "/images/image-boy2.png",
  linkTo: "/staffrequest/application",
  action1: "Grant",
  action2: "Don't Grant",
};

export default StudentTransferRqst;



// {rt.transferStatus === 'Granted' ? '' : 
//               rt.transferStatus === 'Not Granted' ? '' :
//               <select
//               name="staffReplace"
//               className="form-control mx-3"
//               onChange={(e) => {setValue(e.target.value)}}
//               required
//               style={{width: '50%'}}
//               >
//                   <option value="Select Replacement" selected disabled>Select Replacement</option>
//                   {props.studentDataList && props.studentDataList.map((st) => (
//                     rt.student._id === st._id ? '' :
//                   <option value={st._id}>{`${st.studentFirstName} ${
//                     st.studentMiddleName ? st.studentMiddleName : ""
//                   } ${st.studentLastName}`}</option>
//                   ))}
//               </select>
//               }