import React from "react";
import styles from "../../Home.module.css";
import PlaylistCard from "./PlaylistCard";
import { requestURL } from "../../ReqUrl";
const AllPlaylist = (props) => {
  return (
    <div className={styles.playsitCardContainer}>
      {props.data.map((item) => (
        <PlaylistCard
          key={item._id}
          pid={item._id}
          src={`${requestURL}/playlist/thumbnail/${item.photo}`}
          item={item}
          id={props.id}
        />
      ))}
    </div>
  );
};

export default AllPlaylist;
