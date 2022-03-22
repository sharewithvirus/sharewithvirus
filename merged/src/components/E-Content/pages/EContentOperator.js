import React, { useState, useEffect } from "react";
import styles from "../../Home.module.css";
import PlaylistCard from "../components/PlaylistCard";
import axios from "axios";
import { requestURL } from "../../ReqUrl";
import { useParams } from "react-router-dom";
import CreateNewPlaylist from "../components/CreateNewPlaylist";
const EContentOperator = (props) => {
  const [showPopup, setShowPopup] = useState(false);
  const [data, setData] = useState("");
  const [use, setUse] = useState(true);
  const params = useParams();
  useEffect(() => {
    if (use) {
      axios
        .get(`${requestURL}/${params.eid}/playlist`)
        .then((res) => {
          setData(res.data.elearning);
          setUse(false);
        })
        .catch(() => {
          console.log("Something went wrong");
        });
    }
  }, [use]);

  const closeHandler = () => {
    setShowPopup(false);
    setUse(true);
  };
  return (
    <>
      <div className={`row mt-3 mx-0`}>
        <p
          className="col-12 col-md-3 offset-md-9 btn btn-secondary py-2 btn-lg"
          onClick={() => setShowPopup(true)}
        >
          Create New Playlist
        </p>
      </div>
      <div className={styles.playsitCardContainer}>
        {data &&
          data.playlist.map((item) => (
            <PlaylistCard
              key={item._id}
              id={item._id}
              src={`${requestURL}/playlist/thumbnail/${item.photo}`}
              item={item}
              uid={props.id}
              sid={props.sid}
            />
          ))}
      </div>

      {showPopup && (
        <CreateNewPlaylist
          closeHandler={closeHandler}
          setRunEffect={props.setRunEffect}
          data={props.data}
        />
      )}
    </>
  );
};

export default EContentOperator;
