import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { requestURL } from "../../ReqUrl";
import { useParams } from "react-router-dom";
import styles from "../../Home.module.css";

const Member = (props) => {
  const [data, setData] = useState([]);
  const params = useParams();
  useEffect(() => {
    axios
      .get(`${requestURL}/library/${params.lid}`)
      .then((res) => {
        setData(res.data.library);
      })
      .catch(() => {
        console.log("Some thing went wrong");
      });
  }, []);
  return (
    <>
      <div className={styles.backBtn}>
        <div onClick={() => props.showHandler()}>
          <img src="/images/icon-back.svg" alt="&lt;" />
          Back
        </div>
        {/* <p>Members</p> */}
      </div>
      <div className={styles.evsearch}>
        <div className="w-30">
          <input
            type="text"
            name="search"
            className="form-control"
            placeholder="search Event..."
          />
        </div>
        <div className={styles.custombtnContainer}>
          <button className={styles.custombtn}>Member</button>
        </div>
      </div>
      <div className={styles.playsitCardContainer}>
        {data &&
          data.institute &&
          data.institute.ApproveStudent &&
          data.institute.ApproveStudent.map((val) => (
            <div
              className={styles.playsitCard}
              style={{ width: "200px", height: "200px" }}
              key={val._id}
            >
              <h5
                style={{
                  display: "flex",
                  marginLeft: "20px",
                  marginTop: "10px",
                }}
              >
                {val.studentGRNO}
              </h5>
              <div
                className={styles.playlistCardHeader}
                style={{ marginTop: "0.5rem" }}
              >
                <img
                  src={`${requestURL}/search/insdashboard/staffdata/photo/${val.studentProfilePhoto}`}
                  alt="not found"
                  style={{
                    height: "100px",
                    width: "100px",
                    borderRadius: "50%",
                  }}
                />
              </div>
              <div className={styles.playlistCardFooter}>
                <h5>{`${val.studentFirstName} ${
                  val.studentMiddleName ? val.studentMiddleName : ""
                } ${val.studentLastName}`}</h5>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Member;
