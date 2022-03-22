import styles from "../../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopInstitute from "../../NavbarTopInstitute";
import NavbarBottomUser from "../../NavbarBottomUser";
import SideBarWarpper from "./SideBarWrapper";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import ProfileDisplaySection from "../../ProfileDisplaySection";
import axios from "axios";
import { requestURL } from "../../ReqUrl";
import EcontentInfo from "./EcontentInfo";
import EContentCart from "../pages/EContentCart";
import AllPlaylist from "./AllPlaylist";
const Wrapper = () => {
  const params = useParams();
  const [insdata, setInsData] = useState("");
  const [data, setData] = useState("");
  const [first, setFirst] = useState(false);
  const [info, setInfo] = useState(false);
  const [playlist, setPlaylist] = useState(true);
  const [cart, setCart] = useState(false);

  useEffect(() => {
    axios
      .get(`${requestURL}/insdashboard/${params.id}`)
      .then((res) => setInsData(res.data.institute))
      .catch(() => {
        console.log("Something went wrong");
      });
    axios
      .get(`${requestURL}/insdashboard/${params.id}/e-content/info`)
      .then((res) => {
        setData(res.data.elearning);
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
              <SideBarWarpper id={params.id} />
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
                        ? `${requestURL}/e-content/${data._id}/${data.photo}`
                        : null
                    }
                    coverPicSrc={
                      data.coverId === "2"
                        ? "/images/other-places-cover-photo.jpg"
                        : first
                        ? `${requestURL}/e-content/${data._id}/${data.cover}`
                        : null
                    }
                  />
                  <div className="row" style={{ marginTop: "-9rem" }}>
                    <div className="col-4" style={{ marginTop: "-2rem" }}>
                      <p>{data.playlist ? data.playlist.length : 0}</p>
                      <p>Total Playlists</p>
                    </div>
                    <div className="col-4" style={{ marginTop: "10px" }}>
                      <h4>Learnings</h4>
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
                              setCart(false);
                              setInfo(false);
                            }}
                          >
                            <i className="fas fa-play"></i>
                          </span>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className={`${styles.dTab} ${styles.active}`}>
                          <span
                            onClick={() => {
                              setInfo(true);
                              setPlaylist(false);
                              setCart(false);
                            }}
                          >
                            <i className="fas fa-info-circle "></i>
                          </span>
                        </div>
                      </div>
                      <div className="col-4">
                        <div className={`${styles.dTab} ${styles.active}`}>
                          <span
                            onClick={() => {
                              setCart(true);
                              setPlaylist(false);
                              setInfo(false);
                            }}
                          >
                            <i className="fas fa-shopping-cart"></i>
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div style={{ marginTop: "3.5rem", marginBottom: "1.5rem" }}>
                    {info && <EcontentInfo data={data} />}
                    {playlist && data && (
                      <AllPlaylist data={data.playlist} id={params.id} />
                    )}
                    {cart && <EContentCart />}
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

export default Wrapper;
