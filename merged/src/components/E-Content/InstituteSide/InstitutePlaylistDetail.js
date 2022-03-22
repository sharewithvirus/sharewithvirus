import styles from "../../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopInstitute from "../../NavbarTopInstitute";
import NavbarBottomUser from "../../NavbarBottomUser";
import SideBarWarpper from "./SideBarWrapper";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { requestURL } from "../../ReqUrl";
import InstituteVideoCard from "./InstituteVideoCard";
const InstitutePlaylistDetail = (props) => {
  const [tdata, setTData] = useState([]);
  const [data, setData] = useState("");
  const [insdata, setInsData] = useState("");
  const params = useParams();
  useEffect(() => {
    axios
      .get(`${requestURL}/insdashboard/${params.id}`)
      .then((res) => setInsData(res.data.institute))
      .catch(() => {
        console.log("Something went wrong");
      });
    axios
      .get(`${requestURL}/playlist/${params.pid}/topic`)
      .then((res) => {
        setData(res.data.playlist);
        setTData(res.data.playlist.topic);
      })
      .catch(() => {
        console.log("Some thing Went wrong");
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
                >
                  {data && (
                    <div className={styles.playlistDetails}>
                      <div className={styles.detailsmid}>
                        <div className="d-flex gap-5">
                          <img
                            src={
                              data.photo
                                ? `${requestURL}/playlist/thumbnail/${data.photo}`
                                : ""
                            }
                            alt="not playlist"
                          />
                          <div className={styles.detailsmidinner}>
                            <h4>{data.name ? data.name : ""}</h4>
                            <h5>{data.by ? `By: ${data.by}` : ""}</h5>
                            <h5>
                              {data.language
                                ? `Language : ${data.language}`
                                : ""}
                            </h5>
                          </div>
                        </div>
                        <div>
                          <h5>{data.price ? `Rs. ${data.price} only` : ""}</h5>
                          <h5>
                            {data.sales ? `Sales: ${data.sales}` : "Sales: 0"}
                          </h5>
                          {/* <h5>
                            {data.elearning
                              ? data.elearning.institute.insName
                              : ""}
                          </h5> */}
                        </div>
                      </div>

                      <div className={styles.detailsfooter}>
                        <h5>
                          {data.lecture
                            ? `Lectures: ${data.lecture}`
                            : "Lectures: 0"}
                        </h5>
                        <h5>
                          {data.time
                            ? `Time: ${data.time.toFixed(2)} hrs`
                            : "Time: 0 hrs"}
                        </h5>
                        <h5>
                          {data.playtime ? `Playtime: ${data.playtime}x` : ""}
                        </h5>
                        <h5>
                          {data.enroll
                            ? `Enrolled by: ${data.enroll}`
                            : "Enrolled by: 0"}
                        </h5>
                      </div>
                      <h5>
                        {data.description
                          ? `Description of the playlist: ${data.description}`
                          : ""}
                      </h5>
                    </div>
                  )}
                  {tdata.map((dt, index) => (
                    <div className="my-2" key={index}>
                      <div>
                        <div className="row">
                          <h3
                            className="col-12 d-flex"
                            style={{ backgroundColor: "#e3e3e6" }}
                          >
                            {index + 1}. {dt.topicName}
                          </h3>
                        </div>
                      </div>
                      <div className={styles.playlistContainer}>
                        {dt.video &&
                          dt.video.map((vid) => (
                            <InstituteVideoCard
                              key={vid._id}
                              sid={vid._id}
                              id={vid._id}
                              name={vid.name}
                              image={vid.video}
                              access={vid.access}
                            />
                          ))}
                      </div>
                    </div>
                  ))}
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

export default InstitutePlaylistDetail;
