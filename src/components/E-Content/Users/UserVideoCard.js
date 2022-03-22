import React from "react";
import styles from "../../Home.module.css";
import { Link } from "react-router-dom";
import { requestURL } from "../../ReqUrl";
import ReactPlayer from "react-player";
import { format } from "timeago.js";
export default function UserVideoCard({
  id,
  pid,
  tid,
  vid,
  name,
  createdAt,
  image,
  time,
  price,
  videoFunctionId,
}) {
  const videoFunctionIdHandler = (vid) => {
    videoFunctionId(vid);
  };
  return (
    <div className={`my-1 mx-1 ${styles.playlistCard}`}>
      <Link to={`/user/${id}/playlist/${pid}/topic/${tid}/video/${vid}`}>
        <div
          className={styles.randomVideoCard}
          onClick={() => videoFunctionIdHandler(vid)}
        >
          <div className={styles.randomheader}>
            {/* <i className={`fas fa-play-circle fa-lg ${styles.ricon}`}></i> */}
            <ReactPlayer
              url={`${requestURL}/video/${image}`}
              height="110px"
              width="200px"
            />
            <div
              className="row mx-1"
              style={{ marginTop: "-1.5rem", color: "white" }}
            >
              <div className="col-6 d-flex justify-content-start">{time}</div>
              <div className="col-6 d-flex justify-content-end">{price}</div>
            </div>
          </div>
          <div className={styles.randomfooter}>
            <div className="row">
              <div className="col-12 col-md-8">
                <p style={{ fontSize: "12px" }} className="mt-1">
                  {name}
                </p>
              </div>
              <div className={`col-12 col-md-4`}>
                <p style={{ fontSize: "10px" }}>{format(createdAt)}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
