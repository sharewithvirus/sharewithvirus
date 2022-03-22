import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import styles from "../../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopUser from "../../NavbarTopUser";
import BackButton from "../../BackButton";
import BookCard from "./BookCard";
import NavbarBottomUser from "../../NavbarBottomUser";
import SideBar from "./SideBar";
import axios from "axios";
import { requestURL } from "../../ReqUrl";
const Library = () => {
  const [data, setData] = useState("");
  const [book, setBook] = useState("");
  const [index, setIndex] = useState(1);
  const params = useParams();
  // function handleChange(value) {
  //   navigate(`/${value}`);
  // }

  useEffect(() => {
    axios
      .get(`${requestURL}/library/allbook`)
      .then((res) => {
        setBook(res.data.library);
      })
      .catch(() => {
        console.log("some thing went wrong");
      });
    axios
      .get(`${requestURL}/user/${params.id}/borrow`)
      .then((res) => {
        const data = res.data.user;
        axios
          .get(`${requestURL}/student/${data.student[0]._id}/borrow`)
          .then((res) => {
            setData(res.data.student);
          })
          .catch(() => {
            console.log("some thing went wrong");
          });
      })
      .catch(() => {
        console.log("Some thing went wrong");
      });
  }, []);

  console.log("tis is book data", book);
  return (
    <>
      <NavbarTopUser uid={params.id} />
      <div className={styles.mainScreen}>
        <div className={`${styles.mainContent} ${styles.dashboard}`}>
          <div className="row">
            <SideBar id={params.id} />
            <div className={`col col-lg-8 col-xl-9  mx-auto ${styles.midside}`}>
              <div className={`${styles.about}`}>
                <BackButton />
                <div
                  className={` ${styles.outer2} ${styles.profileCreationPage}`}
                >
                  {index === 1 && (
                    <>
                      <div>
                        <div className="mt-5">
                          <h2>Library</h2>
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

                          <div
                            className={styles.custombtnContainer}
                            onClick={() => setIndex(2)}
                          >
                            <button className={styles.custombtn}>
                              Borrowed
                            </button>
                          </div>
                        </div>

                        <div className={styles.playsitCardContainer}>
                          {book &&
                            book.map((val) => (
                              <BookCard
                                key={val._id}
                                val={val}
                                title={val.bookName}
                                language={val.language}
                                author={val.author}
                                image={`${requestURL}/book/${val.photo}`}
                                page={val.totalPage}
                                // date={}
                                index="1"
                                price={val.price}
                              />
                            ))}
                        </div>
                      </div>
                    </>
                  )}

                  {index === 2 && (
                    <>
                      <div>
                        <div className="mt-5">
                          <h2>Borrowed Books</h2>
                        </div>

                        <div className={styles.playsitCardContainer}>
                          {data &&
                            data.borrow &&
                            data.borrow.map((val) => (
                              <BookCard
                                key={val._id}
                                val={val}
                                title={val.book.bookName}
                                language={val.book.language}
                                author={val.book.author}
                                image={`${requestURL}/book/${val.book.photo}`}
                                page={val.book.totalPage}
                                index="2"
                                borrow="borrow"
                                date={val.createdAt}
                                price={val.book.price}
                              />
                            ))}
                          {data &&
                            data.deposite &&
                            data.deposite.map((val) => (
                              <BookCard
                                key={val._id}
                                title={val.book.bookName}
                                language={val.book.language}
                                author={val.book.author}
                                image={`${requestURL}/book/${val.book.photo}`}
                                page={val.book.totalPage}
                                val={val}
                                date={val.createdAt}
                                index="2"
                                borrow="deposite"
                                price={val.book.price}
                              />
                            ))}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <NavbarBottomUser />
    </>
  );
};

export default Library;
