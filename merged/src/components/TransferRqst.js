import React, { useState } from "react";
// import { useNavigate, useParams } from "react-router";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { requestURL } from "./ReqUrl";
const TransferRqst = (props) => {
  // const navigate = useNavigate();
  // const params = useParams();
  const [value, setValue] = useState('')

  const StaffTransferGrantHandler = (sid, id) => {
    if(value === ''){
    }
    else{
    axios
      .post(`${requestURL}/ins/${props.id}/staff/${value}/transfer/${sid}/grant/${id}`, {
        status: "Granted",
      })
      .then((res) => {
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
    }
  };

  const StaffTransferNoGrantHandler = (id) => {
    axios
      .post(`${requestURL}/ins/${props.id}/staff/transfer/reject/${id}`, {
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
              {rt.transferStatus === 'Granted' ? '' : 
              rt.transferStatus === 'Not Granted' ? '' :
              <select
              name="staffReplace"
              className="form-control mx-3"
              onChange={(e) => {setValue(e.target.value)}}
              required
              style={{width: '50%'}}
              >
                  <option value="Select Replacement" selected disabled>Select Replacement</option>
                  {props.staffDataList && props.staffDataList.map((st) => (
                    rt.staff._id === st._id ? '' :
                  <option value={st._id}>{`${st.staffFirstName} ${
                    st.staffMiddleName ? st.staffMiddleName : ""
                  } ${st.staffLastName}`}</option>
                  ))}
              </select>
              }
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
              <button type="button" class={`btn btn-primary  `} onClick={() => {StaffTransferGrantHandler(rt.staff._id, rt._id)}}>
                {props.action1}
              </button>
              <button type="button" class={`btn btn-secondary`} onClick={() => {StaffTransferNoGrantHandler(rt._id)}}>
                {props.action2}
              </button>
            </div>
            }
          </div>
        ))}
    </>
  );
};

TransferRqst.defaultProps = {
  name: "Profile Name",
  imgSrc: "/images/image-boy2.png",
  linkTo: "/staffrequest/application",
  action1: "Grant",
  action2: "Don't Grant",
};

export default TransferRqst;
