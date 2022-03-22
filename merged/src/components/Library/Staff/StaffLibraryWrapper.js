import styles from "../../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopUser from "../../NavbarTopUser";
import NavbarBottomUser from "../../NavbarBottomUser";
import SideBar from "./SideBar";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { requestURL } from "../../ReqUrl";
import LibraryForm from "./LibraryForm";
import Books from "./Books";
import Collect from "./Collect";
import Issue from "./Issue";
import Member from "./Member";
import LibraryImageUpload from "./LibraryImageUpload";
import FinanceCart from "./FinanceCart";
const StaffLibraryWrapper = () => {
  const params = useParams();
  const [data, setData] = useState("");
  const [first, setFirst] = useState(false);
  const [show, setShow] = useState(true);
  const [info, setInfo] = useState(false);
  const [allFunction, setAllFunction] = useState(true);
  const [book, setBook] = useState(false);
  const [issue, setIssue] = useState(false);
  const [collect, setCollect] = useState(false);
  const [member, setMember] = useState(false);
  const [cart, setCart] = useState(false);

  useEffect(() => {
    axios
      .get(`${requestURL}/library/${params.lid}`)
      .then((res) => {
        setData(res.data.library);
        setFirst(true);
      })
      .catch(() => {
        console.log("Something went wrong");
      });
  }, []);
  const showHandler = () => {
    setShow((prevState) => {
      return !prevState;
    });
  };
  return (
    <>
      <NavbarTopUser uid={params.id} />
      <div className={styles.mainScreen}>
        <div className={`${styles.mainContent} ${styles.dashboard}`}>
          <div className="row">
            <div className={`col col-lg-4 col-xl-3`}>
              <SideBar sid={params.sid} />
            </div>
            <div className={`col col-lg-8 col-xl-9  mx-auto ${styles.midside}`}>
              <div className={`${styles.about}`} style={{ marginTop: "24px" }}>
                <div
                  className={` ${styles.outer2} ${styles.profileCreationPage}`}
                >
                  {show && (
                    <>
                      <LibraryImageUpload
                        lid={params.lid}
                        profileImg={
                          data.photoId === "1"
                            ? "/images/department-avatar.jpeg"
                            : first
                            ? `${requestURL}/library/${data._id}/${data.photo}`
                            : null
                        }
                        coverImg={
                          data.coverId === "2"
                            ? "/images/other-places-cover-photo.jpg"
                            : first
                            ? `${requestURL}/library/${data._id}/${data.cover}`
                            : null
                        }
                      />
                      <div className="row" style={{ marginTop: "-9rem" }}>
                        <div className="col-4" style={{ marginTop: "-2rem" }}>
                          <div className="row">
                            <div className="col-4">
                              <p>{data.books ? data.books.length : 0}</p>
                              <p>Books</p>
                            </div>
                            <div className="col-4">
                              <p>{data.members ? data.members.length : 0}</p>
                              <p>Members</p>
                            </div>
                          </div>
                        </div>
                        <div className="col-4" style={{ marginTop: "10px" }}>
                          <h4>Librarian</h4>
                        </div>
                        <div className="col-4" style={{ marginTop: "-2rem" }}>
                          {data.about
                            ? data.about.length > 100
                              ? ` ${data.about.substr(0, 100)}...`
                              : data.about.substr(0, 100)
                            : "Department About ..."}
                        </div>
                      </div>
                      <div className={`${styles.ddetail}`}>
                        <div className="row">
                          <div className="col-4">
                            <div className={`${styles.dTab}`}>
                              <span
                                onClick={() => {
                                  setAllFunction(true);
                                  setCart(false);
                                  setInfo(false);
                                }}
                              >
                                <img
                                  src="/images/department-menu-icon.svg"
                                  alt="user"
                                  data-toggle="tooltip"
                                  data-placement="bottom"
                                  title="Menu"
                                />
                              </span>
                            </div>
                          </div>
                          <div className="col-4">
                            <div className={`${styles.dTab} ${styles.active}`}>
                              <span
                                onClick={() => {
                                  setInfo(true);
                                  setAllFunction(false);
                                  setCart(false);
                                }}
                              >
                                <img
                                  src="/images/info-circle-icon.svg"
                                  alt="user"
                                  data-toggle="tooltip"
                                  data-placement="bottom"
                                  title="Info"
                                />
                              </span>
                            </div>
                          </div>
                          <div className="col-4">
                            <div className={`${styles.dTab} ${styles.active}`}>
                              <span
                                onClick={() => {
                                  setCart(true);
                                  setAllFunction(false);
                                  setInfo(false);
                                }}
                              >
                                <img
                                  src="/images/cart-icon.svg"
                                  alt="user"
                                  data-toggle="tooltip"
                                  data-placement="bottom"
                                  title="Cart"
                                />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                  {show && (
                    <div
                      style={{ marginTop: "3.5rem", marginBottom: "1.5rem" }}
                    >
                      {allFunction && (
                        <div className={` gx-0 mt-5  ${styles.cardContainer} `}>
                          <div
                            className={styles.ddetailInner}
                            onClick={() => {
                              setBook(true);
                              setCollect(false);
                              setMember(false);
                              setIssue(false);
                              setShow(false);
                            }}
                          >
                            <img
                              src="/images/library-icon.svg"
                              alt="user"
                              data-toggle="tooltip"
                              data-placement="bottom"
                              title="Books"
                            />
                            <p className="my-2">Books</p>
                          </div>
                          <div
                            className={styles.ddetailInner}
                            onClick={() => {
                              setBook(false);
                              setCollect(false);
                              setIssue(true);
                              setMember(false);
                              setShow(false);
                            }}
                          >
                            <img
                              src="/images/issue-icon.svg"
                              alt="user"
                              data-toggle="tooltip"
                              data-placement="bottom"
                              title="Issue"
                            />
                            <p className="my-2">Issue</p>
                          </div>
                          <div
                            className={styles.ddetailInner}
                            onClick={() => {
                              setBook(false);
                              setCollect(true);
                              setMember(false);
                              setIssue(false);
                              setShow(false);
                            }}
                          >
                            <img
                              src="/images/collect-icon.svg"
                              alt="user"
                              data-toggle="tooltip"
                              data-placement="bottom"
                              title="Collect"
                            />
                            <p className="my-2">Collect</p>
                          </div>
                          <div
                            className={styles.ddetailInner}
                            onClick={() => {
                              setBook(false);
                              setCollect(false);
                              setIssue(false);
                              setShow(false);
                              setMember(true);
                            }}
                          >
                            <img
                              src="/images/member-icon.svg"
                              alt="user"
                              data-toggle="tooltip"
                              data-placement="bottom"
                              title="Members"
                            />
                            <p className="my-2">Members</p>
                          </div>
                        </div>
                      )}
                      {info && <LibraryForm data={data} />}
                      {cart && <FinanceCart />}
                    </div>
                  )}

                  {book && !show && <Books showHandler={showHandler} />}
                  {collect && !show && <Collect showHandler={showHandler} />}
                  {issue && !show && <Issue showHandler={showHandler} />}
                  {member && !show && <Member showHandler={showHandler} />}
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

export default StaffLibraryWrapper;
