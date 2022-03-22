import React from "react";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const Comment = (props) => {
  return (
    <div>
      <article className={styles.commentItem}>
        <div className={styles.postUserImg}>
          <img className={styles.insUserProfile} src={props.cUserDP} />
        </div>
        <div>
          <div className={styles.postUserComment}>
            <div>
              <div className=" w-100 d-flex justify-content-between">
                <h6>{props.cUserName}</h6>
                <p>
                  {props.cTime} &nbsp; <i class="fas fa-ellipsis-h"></i>
                </p>
              </div>
              <small>{props.cUserIns}</small>
            </div>
            <div className={styles.commentBody}>
              <p>{props.cUserComment}</p>
            </div>
          </div>
          <div className={styles.commentReaction}>
            <p>
              {props.cLikeCounts} <Link to="#"> Like </Link>
            </p>
            &Iota;
            <p>
              {props.cReplyCount} <Link to="#"> Reply </Link>
            </p>
          </div>
          {props.includes}
        </div>
      </article>
    </div>
  );
};

Comment.defaultProps = {
  cUserDP: "/images/image-boy2.png",
  cUserName: "Profile Name",
  cUserIns: "Institute name and location",
  cTime: "2d",
  cUserComment:
    "Lorem ipsum dolor sit amet consectetur adipisicing elit. Qui reiciendis odio laboriosam aliquid! Fuga, dolores?",
  cLikeCounts: null,
  cReplyCount: null,
  includes: "",
};

export default Comment;
