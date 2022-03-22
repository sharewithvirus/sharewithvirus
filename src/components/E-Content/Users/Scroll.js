import React from "react";
import styles from "./Scroll.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import UserVideoCard from "./UserVideoCard";
import UserPlaylistCard from "./UserPlaylistCard";
import { requestURL } from "../../ReqUrl";
import { useParams } from "react-router-dom";
const Scroll = ({ data }) => {
  const params = useParams();
  const videoFunctionId = (data) => {};
  return (
    <div className={styles.scrollContainer}>
      <div className={styles.scrollInner}>
        {/* <Playlist/>
            <Playlist/> */}
        <div className={styles.eresourceContainer}>
          <div className={styles.eresource}>
            {data &&
              data.map((item) => (
                <UserPlaylistCard
                  item={item}
                  key={item._id}
                  pid={item._id}
                  id={params.id}
                  src={`${requestURL}/playlist/thumbnail/${item.photo}`}
                />
              ))}
          </div>
        </div>
        <hr />
        <div className={styles.randomVideo}>
          <div className={styles.randomVideoInner}>
            {data &&
              data.map((dt) =>
                dt.topic
                  ? dt.topic.map((tp) =>
                      tp.video
                        ? tp.video.map((vid) => (
                            <UserVideoCard
                              key={vid._id}
                              pid={dt._id}
                              tid={tp._id}
                              vid={vid._id}
                              name={vid.name}
                              image={vid.video}
                              access={vid.access}
                              time={vid.videoTime}
                              price={vid.price}
                              createdAt={vid.createdAt}
                              id={params.id}
                              videoFunctionId={videoFunctionId}
                            />
                          ))
                        : ""
                    )
                  : ""
              )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scroll;
