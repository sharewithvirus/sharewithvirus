import styles from "../../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopInstitute from "../../NavbarTopInstitute";
import NavbarBottomUser from "../../NavbarBottomUser";
import SideBar from "./SideBar";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ProfileDisplaySection from "../../ProfileDisplaySection";
import axios from "axios";
import { requestURL } from "../../ReqUrl";
import LibraryInfo from "./LibraryInfo";
// import FinanceCart from "./FinanceCart";
import AllBooks from "./AllBooks";
const LibraryWrapper = () => {
  const params = useParams();
  const [insdata, setInsData] = useState("");
  const [data, setData] = useState("");
  const [first, setFirst] = useState(false);
  const [info, setInfo] = useState(false);
  const [playlist, setPlaylist] = useState(true);
  // const [cart, setCart] = useState(false);

  useEffect(() => {
    axios
      .get(`${requestURL}/insdashboard/${params.id}`)
      .then((res) => setInsData(res.data.institute))
      .catch(() => {
        console.log("Something went wrong");
      });
    axios
      .get(`${requestURL}/insdashboard/${params.id}/library/info`)
      .then((res) => {
        setData(res.data.library);
        setFirst(true);
      })
      .catch(() => {
        console.log("Something went wrong");
      });
  }, []);

  return (
    <>
      <NavbarTopInstitute id={params.id} insdata={insdata} />
      <div className={styles.mainScreen}>
        <div className={`${styles.mainContent} ${styles.dashboard}`}>
          <div className="row">
            <div className={`col col-lg-4 col-xl-3`}>
              <SideBar id={params.id} />
            </div>
            <div className={`col col-lg-8 col-xl-9  mx-auto ${styles.midside}`}>
              <div className={`${styles.about}`} style={{ marginTop: "24px" }}>
                <div
                  className={` ${styles.outer2} ${styles.profileCreationPage}`}
                  style={{ marginTop: "-1.5rem" }}
                >
                  <ProfileDisplaySection
                    profilePicSrc={
                      data.photoId === "1"
                        ? "/images/department-avatar.jpeg"
                        : first
                        ? `${requestURL}/library/${data._id}/${data.photo}`
                        : null
                    }
                    coverPicSrc={
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
                              setPlaylist(true);
                              // setCart(false);
                              setInfo(false);
                            }}
                          >
                            <img
                              src="/images/library-icon.svg"
                              alt="user"
                              data-toggle="tooltip"
                              data-placement="bottom"
                              title="Books"
                            />
                          </span>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className={`${styles.dTab} ${styles.active}`}>
                          <span
                            onClick={() => {
                              setInfo(true);
                              setPlaylist(false);
                              // setCart(false);
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
                      {/* <div className="col-4">
                        <div className={`${styles.dTab} ${styles.active}`}>
                          <span
                            onClick={() => {
                              // setCart(true);
                              setPlaylist(false);
                              setInfo(false);
                            }}
                          >
                            <i className="fas fa-shopping-cart"></i>
                          </span>
                        </div>
                      </div> */}
                    </div>
                  </div>
                  <div style={{ marginTop: "3.5rem", marginBottom: "1.5rem" }}>
                    {info && <LibraryInfo data={data} />}
                    {playlist && data && (
                      <AllBooks data={data.books} id={params.id} />
                    )}
                    {/* {cart && <FinanceCart />} */}
                  </div>
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

export default LibraryWrapper;
