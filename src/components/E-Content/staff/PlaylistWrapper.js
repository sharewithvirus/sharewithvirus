import styles from "../../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopUser from "../../NavbarTopUser";
import NavbarBottomUser from "../../NavbarBottomUser";
import SideBarUserWarpper from "./SideBarUserWrapper";
import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { requestURL } from "../../ReqUrl";
import PlaylistDetails from "../pages/PlaylistDetails";
import AddTopic from "../components/AddTopic";
import PlaylistEditPop from "./PlaylistEditPop";
const PlaylistWrapper = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState("");
  const [runEffect, setRunEffect] = useState(true);
  const [addEffect, setAddEffect] = useState(true);
  const [addTopic, setAddTopic] = useState(false);
  const [playEdit, setPlayEdit] = useState(false);

  useEffect(() => {
    if (addEffect) {
      axios
        .get(`${requestURL}/playlist/${params.pid}`)
        .then((res) => {
          setData(res.data.playlist);
          setAddEffect(false);
        })
        .catch(() => {
          console.log("Something went wrong");
        });
    }
  }, [addEffect]);

  const runFunction = () => {
    setRunEffect(false);
  };
  const topicFunction = () => {
    setAddTopic(false);
    setRunEffect(true);
  };
  const playEditFunction = () => {
    setPlayEdit(false);
    setAddEffect(true);
  };

  return (
    <>
      <NavbarTopUser uid={params.id} />
      <div className={styles.mainScreen}>
        <div className={`${styles.mainContent} ${styles.dashboard}`}>
          <div className="row">
            <div className={`col col-lg-4 col-xl-3`}>
              <SideBarUserWarpper sid={params.sid} />
            </div>
            <div className={`col col-lg-8 col-xl-9  mx-auto ${styles.midside}`}>
              <div className={`${styles.about}`} style={{ marginTop: "24px" }}>
                <div
                  className={` ${styles.outer2} ${styles.profileCreationPage}`}
                >
                  <div
                    className={styles.playlistDetails}
                    style={{ backgroundColor: `${data.color}CC` }}
                  >
                    <div className={styles.detailshead}>
                      <i
                        className="fa fa-arrow-left"
                        aria-hidden="true"
                        onClick={() => navigate(-1)}
                      ></i>

                      <img
                        src="/images/three-vertical-icon.svg"
                        alt="user"
                        data-toggle="tooltip"
                        data-placement="bottom"
                        title="Menu"
                        style={{
                          width: "2rem",
                          height: "3rem",
                          cursor: "Pointer",
                        }}
                        onClick={() => setPlayEdit(true)}
                      />

                      {playEdit && (
                        <PlaylistEditPop
                          pid={params.pid}
                          data={data}
                          playEditFunction={playEditFunction}
                          setPlayEdit={setPlayEdit}
                          playEdit={playEdit}
                        />
                      )}
                    </div>
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
                            {data.language ? `Language : ${data.language}` : ""}
                          </h5>
                        </div>
                      </div>
                      <div>
                        <h5>{data.price ? `Rs. ${data.price} only` : ""}</h5>
                        <h5>
                          {data.sales ? `Sales: ${data.sales}` : "Sales: 0"}
                        </h5>
                        <h5>
                          {data.elearning
                            ? data.elearning.institute.insName
                            : ""}
                        </h5>
                      </div>
                    </div>

                    <div
                      style={{
                        backgroundColor: `${data.color}`,
                        margin: "-1rem",
                        marginTop: "1rem",
                      }}
                    >
                      <div className={styles.detailsfooter}>
                        <h5 style={{ marginLeft: "1rem" }}>
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
                        <h5 style={{ marginRight: "1rem" }}>
                          {data.enroll
                            ? `Enrolled by: ${data.enroll}`
                            : "Enrolled by: 0"}
                        </h5>
                      </div>
                      <h5 className="mb-0 pb-4" style={{ paddingLeft: "1rem" }}>
                        {data.description
                          ? `Description of the playlist: ${data.description}`
                          : ""}
                      </h5>
                    </div>
                  </div>
                  <div className={`${styles.ddetail}`}>
                    <div className="row mt-3 mx-0">
                      <p
                        className=" col-12 col-md-3 offset-md-9 btn btn-secondary py-2 btn-lg"
                        onClick={() => setAddTopic(true)}
                      >
                        Add Topic
                      </p>
                      {addTopic && (
                        <AddTopic
                          addTopic={addTopic}
                          topicFunction={topicFunction}
                          pid={params.pid}
                        />
                      )}
                    </div>
                    <PlaylistDetails
                      id={params.id}
                      runEffect={runEffect}
                      runFunction={runFunction}
                      sid={params.sid}
                      pid={params.pid}
                    />
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

export default PlaylistWrapper;
