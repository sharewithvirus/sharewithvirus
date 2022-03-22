import React, { useState } from "react";
import styles from "../../Home.module.css";
import BookPop from "../Institute/BookPop";
import moment from "moment";
export default function BookCard(props) {
  const [openPop, setOpenPop] = useState(false);
  return (
    <>
      <div className={styles.playsitCard}>
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
            src={props.image}
            style={{
              height: "100px",
              width: "100px",
              borderRadius: "50%",
            }}
          />
        </div>
        <div className={styles.marked}>
          <p>
            {props.index === "1"
              ? ""
              : props.borrow === "borrow"
              ? `Returned on Date - ${moment(props.date).format("DD/MM/YYYY")}`
              : `Returned - ${moment(props.date).format("DD/MM/YYYY")}`}
          </p>
        </div>
        <div className={styles.playlistCardFooter}>
          <h4 style={{ marginBottom: "8px" }}>{props.title}</h4>
          <h6>By: {props.author}</h6>
          <div className="d-flex justify-content-around mt-2">
            <p>Pages: {props.page}</p>
            <p>{props.language}</p>
          </div>
        </div>
        {openPop && (
          <BookPop data={props.val} openPop={openPop} setOpenPop={setOpenPop} />
        )}
      </div>
    </>
  );
}
