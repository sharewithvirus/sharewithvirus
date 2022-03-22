import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { requestURL } from "../../ReqUrl";
import { useParams } from "react-router-dom";
import AddBook from "./AddBook";
import styles from "../../Home.module.css";
import EditBook from "./EditBook";
import BookPop from "../Institute/BookPop";
import ShowPop from "./ShowPop";
const Books = (props) => {
  const [data, setData] = useState([]);
  const [runEffect, setRunEffect] = useState(true);
  const [addBook, setAddBook] = useState(false);
  const [editBook, setEditBook] = useState(false);
  const [openPop, setOpenPop] = useState(false);
  const [bid, setBid] = useState("");
  const [show, setShow] = useState(false);
  const params = useParams();
  useEffect(() => {
    if (runEffect) {
      console.log("This is book effect");
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

  const topicFunction = () => {
    setRunEffect(true);
    setAddBook(false);
    setEditBook(false);
  };
  const editHandler = (bid) => {
    setShow(true);
    setBid(bid);
    // setEditBook(true);
  };
  const popFunction = () => {
    setOpenPop(false);
  };
  return (
    <>
      {addBook && (
        <AddBook
          addBook={addBook}
          lid={params.lid}
          topicFunction={topicFunction}
        />
      )}
      {editBook && bid && (
        <EditBook
          lid={params.lid}
          editBook={editBook}
          bid={bid}
          topicFunction={topicFunction}
          setShow={setShow}
        />
      )}
      {show && (
        <ShowPop
          show={show}
          setShow={setShow}
          setEditBook={setEditBook}
          bid={bid}
          lid={params.lid}
          setRunEffect={setRunEffect}
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
          <button className={styles.custombtn} onClick={() => setAddBook(true)}>
            Add Book
          </button>
        </div>
      </div>
      <div className={styles.playsitCardContainer}>
        {data &&
          data.books &&
          data.books.map((val) => (
            <div className={styles.playsitCard} key={val._id}>
              <p className="d-flex justify-content-end mx-2 mt-2">
                <img
                  src="/images/three-vertical-icon.svg"
                  alt="user"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Menu"
                  style={{ width: "1.5rem", cursor: "pointer" }}
                  onClick={() => editHandler(val._id)}
                />
              </p>
              <div onClick={() => setOpenPop(true)}>
                <div className={styles.playlistCardHeader}>
                  <img
                    src={`${requestURL}/book/${val.photo}`}
                    alt="not found"
                    style={{
                      height: "100px",
                      width: "100px",
                      borderRadius: "50%",
                    }}
                  />
                </div>
                <div
                  className={styles.playlistCardFooter}
                  style={{ marginTop: "2rem" }}
                >
                  <h5>{val.bookName}</h5>
                  <h5>{`By: ${val.author}`}</h5>
                  <div className="d-flex justify-content-around mt-2">
                    {val.totalCopies > 0 ? (
                      <div>{`Pages: ${val.totalPage}`}</div>
                    ) : (
                      "Unavailable"
                    )}

                    <div>{val.language}</div>
                  </div>
                </div>
              </div>
              {openPop && (
                <BookPop
                  data={val}
                  openPop={openPop}
                  popFunction={popFunction}
                />
              )}
            </div>
          ))}
      </div>
    </>
  );
};

export default Books;
