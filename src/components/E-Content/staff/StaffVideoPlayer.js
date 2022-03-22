import styles from "../../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopUser from "../../NavbarTopUser";
import NavbarBottomUser from "../../NavbarBottomUser";
import SideBarUserWarpper from "./SideBarUserWrapper";
import { useParams, useSearchParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { requestURL } from "../../ReqUrl";
import PlaylistDetails from "../pages/PlaylistDetails";
import AddTopic from "../components/AddTopic";
import ReactPlayer from "react-player";
import AddResource from "./AddResource";
import { format } from "timeago.js";
import Comment from "../Users/Comment";
// import VideoPlay from "../custome-video/VideoPlay";
const StaffVideoPlayer = () => {
  const params = useParams();
  const [data, setData] = useState("");
  const [addTopic, setAddTopic] = useState(false);
  const [image, setImage] = useState("");
  const [effectRun, setEffectRun] = useState(true);
  const [addResource, setAddResource] = useState(false);
  const [showComment, setShowComment] = useState(false);

  useEffect(() => {
    axios
      .get(`${requestURL}/oneVideo/${params.vid}`)
      .then((res) => {
        setImage(res.data.video);
      })
      .catch(() => {
        console.log("Some thing went wrong");
      });

    axios
      .get(`${requestURL}/playlist/${params.pid}`)
      .then((res) => {
        setData(res.data.playlist);
      })
      .catch(() => {
        console.log("Something went wrong");
      });
  }, [params.vid]);

  const topicFunction = () => {
    setAddTopic(false);
    setEffectRun(true);
  };

  const resourceFunction = () => {
    setAddResource(false);
  };

  const runFunction = () => {
    setEffectRun(false);
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
              <div
                className={`${styles.about}`}
                style={{ marginTop: "24px", padding: "0px" }}
              >
                <div
                  className={` ${styles.outer2} ${styles.profileCreationPage}`}
                >
                  {/* <VideoPlay
                    url={image ? `${requestURL}/video/${image.video}` : ""}
                  /> */}
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
                        onClick={() => setAddResource(true)}
                      >
                        <img
                          src="/images/resource-icon.svg"
                          alt="user"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Resource"
                        />
                      </div>
                      <div className="mx-3">
                        <img
                          src="/images/liked-icon.svg"
                          alt="user"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Like"
                        />
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
                        <img
                          src="/images/saved-icon.svg"
                          alt="user"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Save"
                        />
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
                        sid={params.sid}
                        pid={params.pid}
                        effectRun={effectRun}
                        runFunction={runFunction}
                      />
                      {addResource && (
                        <AddResource
                          addResource={addResource}
                          vid={params.vid}
                          resourceFunction={resourceFunction}
                        />
                      )}
                    </div>
                  )}
                  {showComment && <Comment setShowComment={setShowComment} />}
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
