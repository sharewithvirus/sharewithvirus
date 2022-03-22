import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import styles from "../../Home.module.css";
import { requestURL } from "../../ReqUrl";
import BookPop from "./BookPop";

const AllBooks = () => {
  const [data, setData] = useState("");
  const [openPop, setOpenPop] = useState(false);

  useEffect(() => {
    axios
      .get(`${requestURL}/library/allbook`)
      .then((res) => {
        setData(res.data.library);
      })
      .catch(() => {
        console.log("Some thing went wrong");
      });
  }, []);

  return (
    <div className={styles.playsitCardContainer}>
      {data &&
        data.map((val) => (
          <>
            <div
              className={styles.playsitCard}
              style={{ width: "240px", height: "250px" }}
              key={val._id}
              onClick={() => setOpenPop(true)}
            >
              <div
                className={styles.checked}
                style={{
                  display: "flex",
                  justifyContent: "end",
                  marginRight: "2rem",
                  marginTop: "1rem",
                  // boxShadow: "0px 0px 0px 10px white, 0px 0px 0px 14px black",
                }}
              >
                <img
                  src="/images/check-icon.svg"
                  alt="user"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Ok"
                  style={{ width: "2rem" }}
                />
              </div>
              <div
                className={styles.playlistCardHeader}
                style={{ marginTop: "-2.3rem" }}
              >
                <img
                  src={`${requestURL}/book/${val.photo}`}
                  style={{
                    height: "100px",
                    width: "100px",
                    borderRadius: "50%",
                  }}
                />
              </div>
              <div className={styles.playlistCardFooter}>
                <h4>{val.bookName}</h4>
                <h6>{`By: ${val.author}`}</h6>
                <div className="d-flex justify-content-around mt-2">
                  <p>{`Pages: ${val.totalPage}`}</p>
                  <p>{val.language}</p>
                </div>
              </div>
            </div>
            {openPop && (
              <BookPop data={val} openPop={openPop} setOpenPop={setOpenPop} />
            )}
          </>
        ))}
    </div>
  );
};
export default AllBooks;
