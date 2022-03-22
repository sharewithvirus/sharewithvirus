import React from "react";
// import { useNavigate } from "react-router";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NoticeBoard from "./NoticeBoard";

const AnnouncementSection = (props) => {
  // const navigate = useNavigate();

  return (
    <>
      <div className={`my-2 ${styles.shiftLeft}`}>
        {/* <p>
          <span>
            Announcement/Notice Board <i class="far fa-clipboard"></i>
          </span>
        </p> */}

        <NoticeBoard content={props.notice4} />
        <NoticeBoard content={props.notice3} />
        <NoticeBoard content={props.notice2} />
        <NoticeBoard content={props.notice1} />
      </div>
    </>
  );
};

export default AnnouncementSection;
