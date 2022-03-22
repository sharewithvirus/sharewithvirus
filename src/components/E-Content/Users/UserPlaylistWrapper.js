import styles from "../../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopUser from "../../NavbarTopUser";
import NavbarBottomUser from "../../NavbarBottomUser";
import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { requestURL } from "../../ReqUrl";
import UserPlaylistDetails from "./UserPlaylistDetails";
import UserSide from "./UserSide";
import JoinedPlaylist from "./JoinedPlaylist";
import VideoLike from "./VideoLike";
import WatchLater from "./WatchLater";

const PlaylistWrapper = () => {
  const params = useParams();
  const [data, setData] = useState("");
  const [runEffect, setRunEffect] = useState(true);
  const [scroll, setScroll] = useState(true);
  const [joined, setJoined] = useState(false);
  const [liked, setliked] = useState(false);
  const [watch, setWatch] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (runEffect) {
      axios
        .get(`${requestURL}/playlist/${params.pid}`)
        .then((res) => {
          setData(res.data.playlist);
          setRunEffect(false);
        })
        .catch(() => {
          console.log("Something went wrong");
        });
    }
  }, [runEffect]);

  const videoFunctionId = (data) => {};

  const joinNowHandler = () => {
    if (data.joinNow) {
      if (data.joinNow.includes(`${params.id}`)) {
      } else {
        axios
          .post(`${requestURL}/user/${params.id}/playlist/${params.pid}/join`)
          .then((res) => {
            // console.log(res.data.message);
            setRunEffect(true);
          })
          .catch(() => {
            console.log("Some thing went wrong");
          });
      }
    } else {
      axios
        .post(`${requestURL}/user/${params.id}/playlist/${params.pid}/join`)
        .then((res) => {
          // console.log(res.data.message);
          setRunEffect(true);
        })
        .catch(() => {
          console.log("Some thing went wrong");
        });
    }
  };

  const joinedHandler = () => {
    setJoined(true);
    setScroll(false);
    setWatch(false);
    setliked(false);
  };
  const likeHandler = () => {
    setJoined(false);
    setScroll(false);
    setWatch(false);
    setliked(true);
  };
  const watchHandler = () => {
    setJoined(false);
    setScroll(false);
    setWatch(true);
    setliked(false);
  };
  return (
    <>
      <NavbarTopUser uid={params.id} />
      <div className={styles.mainScreen}>
        <div className={`${styles.mainContent} ${styles.dashboard}`}>
          <div className="row">
            <div className={`col col-lg-4 col-xl-3`}>
              <UserSide
                id={params.id}
                joinedHandler={joinedHandler}
                likeHandler={likeHandler}
                watchHandler={watchHandler}
              />
            </div>
            <div className={`col col-lg-8 col-xl-9  mx-auto ${styles.midside}`}>
              <div className={`${styles.about}`} style={{ marginTop: "24px" }}>
                <div
                  className={` ${styles.outer2} ${styles.profileCreationPage}`}
                >
                  {scroll && (
                    <>
                      <div
                        className={styles.playlistDetails}
                        style={{ backgroundColor: `${data.color}CC` }}
                      >
                        <div
                          className={styles.detailshead}
                          style={{ marginBottom: "0" }}
                        >
                          <i
                            className="fa fa-arrow-left"
                            aria-hidden="true"
                            onClick={() => navigate(-1)}
                          ></i>
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
                                {data.language
                                  ? `Language : ${data.language}`
                                  : ""}
                              </h5>
                            </div>
                          </div>
                          <div>
                            <h5>
                              {data.price ? `Rs. ${data.price} only` : ""}
                            </h5>
                            <div
                              className="btn btn-secondary px-4 py-2"
                              style={{
                                letterSpacing: "1px",
                                borderRadius: "13px",
                                backgroundColor: "#323232",
                              }}
                              onClick={joinNowHandler}
                            >
                              {data
                                ? data.joinNow
                                  ? data.joinNow.includes(`${params.id}`)
                                    ? "Joined"
                                    : "Join Now"
                                  : "Join Now"
                                : ""}
                            </div>
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
                              {data.playtime
                                ? `Playtime: ${data.playtime}x`
                                : ""}
                            </h5>
                            <h5 style={{ marginRight: "1rem" }}>
                              {data.enroll
                                ? `Enrolled by: ${data.enroll}`
                                : "Enrolled by: 0"}
                            </h5>
                          </div>
                          <h5
                            className="mb-0 pb-4"
                            style={{ paddingLeft: "1rem" }}
                          >
                            {data.description
                              ? `Description of the playlist: ${data.description}`
                              : ""}
                          </h5>
                        </div>
                      </div>
                      <div
                        className={`${styles.ddetail}`}
                        style={{ justifyContent: "flex-start" }}
                      >
                        <UserPlaylistDetails
                          id={params.id}
                          pid={params.pid}
                          videoFunctionId={videoFunctionId}
                        />
                      </div>
                    </>
                  )}
                  {joined && <JoinedPlaylist />}
                  {liked && <VideoLike />}
                  {watch && <WatchLater />}
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
