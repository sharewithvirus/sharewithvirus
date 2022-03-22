import styles from "../../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopUser from "../../NavbarTopUser";
import NavbarBottomUser from "../../NavbarBottomUser";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { requestURL } from "../../ReqUrl";
import ReactPlayer from "react-player";
import UserPlaylistDetails from "./UserPlaylistDetails";
import UserSide from "./UserSide";
import UserLike from "./UserLike";
import { format } from "timeago.js";
import UserBookMark from "./UserBookMark";
import ShowResource from "./ShowResource";
import Comment from "./Comment";
import JoinedPlaylist from "./JoinedPlaylist";
import VideoLike from "./VideoLike";
import WatchLater from "./WatchLater";
const StaffVideoPlayer = () => {
  const params = useParams();
  const [data, setData] = useState("");
  const [image, setImage] = useState("");
  const [nextVideo, setNextVideo] = useState(true);
  const [vid, setVid] = useState(params.vid);
  const [showResource, setShowResource] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [scroll, setScroll] = useState(true);
  const [joined, setJoined] = useState(false);
  const [liked, setliked] = useState(false);
  const [watch, setWatch] = useState(false);
  useEffect(() => {
    if (nextVideo) {
      axios
        .get(`${requestURL}/oneVideo/${vid}`)
        .then((res) => {
          setImage(res.data.video);
          setNextVideo(false);
        })
        .catch(() => {
          console.log("Some thing went wrong");
        });
    }
    axios
      .get(`${requestURL}/playlist/${params.pid}`)
      .then((res) => {
        setData(res.data.playlist);
      })
      .catch(() => {
        console.log("Something went wrong");
      });
  }, [nextVideo]);

  const videoFunctionId = (data) => {
    setVid(data);
    setNextVideo(true);
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
              <div
                className={`${styles.about}`}
                style={{ marginTop: "24px", padding: "0px" }}
              >
                <div
                  className={` ${styles.outer2} ${styles.profileCreationPage}`}
                >
                  {scroll && (
                    <>
                      <ReactPlayer
                        url={image ? `${requestURL}/video/${image.video}` : ""}
                        controls={true}
                        width="100%"
                      />
                      <div className="d-flex justify-content-flex-start mt-2 mx-3">
                        <h3>{image ? image.name : ""}</h3>
                      </div>
                      <div className="d-flex justify-content-between px-2">
                        <p style={{ marginLeft: "9px" }}>
                          {image ? format(image.createdAt) : ""}
                        </p>
                        <div
                          className={` d-flex justify-content-evenly ${styles.videooicon}`}
                        >
                          <div
                            className="mx-3"
                            onClick={() => setShowResource(true)}
                          >
                            <img
                              src="/images/resource-icon.svg"
                              alt="user"
                              data-toggle="tooltip"
                              data-placement="bottom"
                              title={
                                image &&
                                image.resource &&
                                `${image.resource.name}`
                              }
                            />
                          </div>
                          <div className="mx-3">
                            <UserLike id={params.id} />
                          </div>
                          <div className="mx-3">
                            <img
                              src="/images/comment-video-icon.svg"
                              alt="user"
                              data-toggle="tooltip"
                              data-placement="bottom"
                              title="Comment"
                              onClick={() => setShowComment(true)}
                            />
                          </div>
                          <div className="mx-3">
                            <img
                              src="/images/cloud-download-icon.svg"
                              alt="user"
                              data-toggle="tooltip"
                              data-placement="bottom"
                              title="Download"
                            />
                          </div>
                          <div className="mx-3">
                            <img
                              src="/images/share-video-icon.svg"
                              alt="user"
                              data-toggle="tooltip"
                              data-placement="bottom"
                              title="Share"
                            />
                          </div>

                          <div className="mx-3">
                            <UserBookMark id={params.id} />
                          </div>
                        </div>
                      </div>
                      <hr />
                      <div className="d-flex justify-content-start align-items-center">
                        <div>
                          <img
                            src={
                              data
                                ? `${requestURL}/playlist/thumbnail/${data.photo}`
                                : ""
                            }
                            style={{
                              width: "100px",
                              height: "100px",
                              borderRadius: "50%",
                            }}
                            className="mx-3"
                            alt="not found"
                          />
                        </div>
                        <div className="mx-4">
                          <h3>{data ? data.name : ""}</h3>
                        </div>
                      </div>
                      {!showComment && (
                        <>
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
                          {showResource && image && image.resource && (
                            <ShowResource
                              data={image.resource}
                              showResource={showResource}
                              setShowResource={setShowResource}
                            />
                          )}
                        </>
                      )}
                      {showComment && (
                        <Comment setShowComment={setShowComment} />
                      )}
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

export default StaffVideoPlayer;
