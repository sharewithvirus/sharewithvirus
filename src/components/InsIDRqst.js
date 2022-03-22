import React from "react";
import { useNavigate } from "react-router";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import { requestURL } from "./ReqUrl";
import axios from 'axios'

const InsIDRqst = (props) => {
  const navigate = useNavigate();

  const SendForPrintHandler = (bid, id) =>{
    axios.post(`${requestURL}/ins/${id}/id-card/${bid}/send/print`,{
      status: 'Printing'
    })
    .then((res) =>{
      console.log(res)
    })
  }

  const UnSendForPrintHandler = (bid, id) =>{
    axios.post(`${requestURL}/ins/${id}/id-card/${bid}/un-send/print`)
    .then((res) =>{
      console.log(res)
    })
  }

  const DoneHandler = (bid, id) =>{
    axios.post(`${requestURL}/ins/${id}/id-card/${bid}/done`,{
      status: 'Printed'
    })
    .then((res) =>{
      console.log(res)
    })
  }

  // const UnDoneHandler = (bid, id) =>{
  //   axios.post(`${requestURL}/ins/${id}/id-card/${bid}/un-done`)
  //   .then((res) =>{
  //     console.log(res)
  //   })
  // }

  return (
    <>
      {props.requestData &&
        props.requestData.map((rt, index) => (
            <div className={` ${styles.dUser}`} key={index}>
              <div className="col-xl-12 col-lg-12 col-md-12 d-flex justify-content-between align-items-center">
                <div>
                  <img
                    className={styles.insUserProfiles}
                    src={
                      rt.institute.photoId === "1"
                        ? "/images/institute-avatar.jpeg"
                        : `${requestURL}/insprofileabout/photo/${rt.institute.insProfilePhoto}`
                    }
                  />
                  <span className="mt-3 mx-3">{rt.institute.insName}</span>
                  <span className="text-muted">{rt.batchName}</span>
                </div>
                <div>
                
                  <div id="btnGroup" className="btn-group  mx-auto" role="group">
                  <button type="button" className="btn btn-info">
                  <Link to={`/admin/${props.aid}/idCard/${rt._id}/export/download`} style={{textDecoration: 'none', color: '#ffffff'}}>
                  View Data
                  </Link>
                  </button>
                    {rt.idCardStatus === 'Printed' ? 
                    <button type="button" className="btn btn-secondary">Printed</button>
                    :
                    props.data.idCardPrinting.length >=1 && props.data.idCardPrinting.some((et) => et._id === rt._id) ?
                    <button type="button" class={`btn btn-primary  `}
                    onClick={() => {UnSendForPrintHandler(rt._id, rt.institute._id)}}
                    >
                      UnSend for Print
                    </button>
                    : 
                    <button type="button" class={`btn btn-primary  `}
                    onClick={() => {SendForPrintHandler(rt._id, rt.institute._id)}}
                    >
                      Send for Print
                    </button>
                    }
                    {props.data.idCardPrinted.length >=1 && props.data.idCardPrinted.some((et) => et._id === rt._id) ? 
                    ''
                    :
                    <button type="button" class={`btn btn-secondary`}
                    onClick={() => {DoneHandler(rt._id, rt.institute._id)}}
                    >
                      Done
                    </button>
                    }
                    
                  </div>
                </div>
              </div>
            </div>
        ))}
    </>
  );
};

export default InsIDRqst;