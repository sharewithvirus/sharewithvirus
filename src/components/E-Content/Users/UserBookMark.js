import React, { useState, useEffect } from "react";
import axios from "axios";
import { requestURL } from "../../ReqUrl";
import { useParams } from "react-router-dom";
const UserBookMark = (props) => {
  const [allBookmark, setAllBookmark] = useState([]);
  const [run, setRun] = useState(true);
  const params = useParams();
  useEffect(() => {
    if (run || params.vid) {
      // console.log("THis is UserBook mark ");
      axios
        .get(`${requestURL}/video/allbookmark/${params.vid}`)
        .then((res) => {
          setAllBookmark(res.data.bookmark);
          setRun(false);
        })
        .catch(() => {
          console.log("Some thing went wrong");
        });
    }
  }, [run, params.vid]);

  const bookmarkHandler = () => {
    axios
      .post(`${requestURL}/user/${props.id}/video/${params.vid}/bookmark`)
      .then((res) => {
        setRun(true);
      })
      .catch(() => {
        console.log("Some thing went wrong");
      });
  };
  const unBookmarkHandler = () => {
    axios
      .post(`${requestURL}/user/${props.id}/video/${params.vid}/unbookmark`)
      .then((res) => {
        setRun(true);
      })
      .catch(() => {
        console.log("Some thing went wrong");
      });
  };

  return (
    <div>
      {allBookmark && allBookmark.userSave ? (
        allBookmark.userSave.includes(`${props.id}`) ? (
          <div onClick={unBookmarkHandler}>
            <img
              src="/images/saved-icon.svg"
              alt="user"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Watch Later"
            />
          </div>
        ) : (
          <div onClick={bookmarkHandler}>
            <img
              src="/images/save-icon.svg"
              alt="user"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Watch Later"
            />
          </div>
        )
      ) : (
        <div onClick={bookmarkHandler}>
          <img
            src="/images/save-icon.svg"
            alt="user"
            data-toggle="tooltip"
            data-placement="bottom"
            title="Watch Later"
          />
        </div>
      )}
    </div>
  );
};

export default UserBookMark;
