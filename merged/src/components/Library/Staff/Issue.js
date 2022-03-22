import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { requestURL } from "../../ReqUrl";
import { useParams } from "react-router-dom";
import IssueBook from "./IssueBook";
import styles from "../../Home.module.css";

const Issue = (props) => {
  const [data, setData] = useState([]);
  const [runEffect, setRunEffect] = useState(true);
  const [issueBook, setIssueBook] = useState(false);
  const params = useParams();
  useEffect(() => {
    if (runEffect) {
      console.log("This is issue effect");
      axios
        .get(`${requestURL}/library/${params.lid}`)
        .then((res) => {
          setData(res.data.library);
          setRunEffect(false);
        })
        .catch(() => {
          console.log("Some thing went wrong");
        });
    }
  }, [runEffect]);

  const issueFunction = () => {
    setRunEffect(true);
    setIssueBook(false);
  };
  const closeFunction = () => {
    setIssueBook(false);
  };

  const collectBookHandler = (val) => {
    axios
      .post(`${requestURL}/library/${params.lid}/collect/${val}`)
      .then((res) => {
        setRunEffect(true);
      })
      .catch(() => {
        console.log("Some thing went wrong");
      });
  };
  return (
    <>
      {issueBook && (
        <IssueBook
          issueBook={issueBook}
          lid={params.lid}
          issueFunction={issueFunction}
          closeFunction={closeFunction}
          data={data}
        />
      )}
      <div className={styles.backBtn}>
        <div onClick={() => props.showHandler()}>
          <img src="/images/icon-back.svg" alt="&lt;" />
          Back
        </div>
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
          <button
            className={styles.custombtn}
            onClick={() => setIssueBook(true)}
          >
            Issue Book
          </button>
        </div>
      </div>
      <div className={styles.playsitCardContainer}>
        {data &&
          data.issues &&
          data.issues.map((val) => (
            <div
              className={styles.playsitCard}
              style={{ width: "400px", height: "220px" }}
              key={val._id}
            >
              <div className="row">
                <div className="col-5 mt-4">
                  <div className={styles.playlistCardHeader}>
                    <img
                      src={`${requestURL}/book/${val.book.photo}`}
                      alt="not found"
                      style={{
                        height: "100px",
                        width: "100px",
                        borderRadius: "50%",
                      }}
                    />
                  </div>

                  <div className={styles.playlistCardFooter}>
                    <h6>{val.book.bookName}</h6>
                    <h6>{val.book.author}</h6>
                  </div>
                </div>
                <div className="col-2 mt-4">
                  <img
                    src="/images/between-icon.svg"
                    alt="user"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Transfer"
                    style={{ width: "4rem" }}
                    onClick={() => collectBookHandler(val._id)}
                  />
                </div>
                <div className="col-5 mt-4">
                  <div className={styles.playlistCardHeader}>
                    <img
                      src={`${requestURL}/search/insdashboard/staffdata/photo/${val.member.studentProfilePhoto}`}
                      alt="not found"
                      style={{
                        height: "100px",
                        width: "100px",
                        borderRadius: "50%",
                      }}
                    />
                  </div>
                  <div className={styles.playlistCardFooter}>
                    <h6>{`${val.member.studentFirstName} ${
                      val.member.studentMiddleName
                        ? val.member.studentMiddleName
                        : ""
                    } ${val.member.studentLastName}`}</h6>
                    <p>{val.member.studentGRNO}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
    </>
  );
};

export default Issue;
