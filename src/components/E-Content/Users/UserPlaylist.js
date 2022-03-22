import styles from "../../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopUser from "../../NavbarTopUser";
import NavbarBottomUser from "../../NavbarBottomUser";
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { requestURL } from "../../ReqUrl";
import UserSide from "./UserSide";
import JoinedPlaylist from "./JoinedPlaylist";
import VideoLike from "./VideoLike";
import Scroll from "./Scroll";
import WatchLater from "./WatchLater";
const UserPlaylist = () => {
  const params = useParams();
  const [data, setData] = useState("");
  const [scroll, setScroll] = useState(true);
  const [joined, setJoined] = useState(false);
  const [liked, setliked] = useState(false);
  const [watch, setWatch] = useState(false);
  useEffect(() => {
    axios
      .get(`${requestURL}/playlist`)
      .then((res) => {
        setData(res.data.playlist);
      })
      .catch(() => {
        console.log("Something went wrong");
      });
  }, []);

  // console.log("This is the UserPlaylits data :", data);
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
            <div
              className={`col-12 col-lg-8 col-xl-9  mx-auto ${styles.midside}`}
            >
              <div className={`${styles.about}`} style={{ marginTop: "24px" }}>
                <div
                  className={` ${styles.outer2} ${styles.profileCreationPage}`}
                >
                  {data && scroll && <Scroll data={data} />}
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

export default UserPlaylist;
