import React, { useState, useEffect } from "react";
import axios from "axios";
import { requestURL } from "../../ReqUrl";
import { useParams } from "react-router-dom";
const UserLike = (props) => {
  const [allLike, setAllLike] = useState([]);
  const [run, setRun] = useState(true);
  const params = useParams();
  useEffect(() => {
    if (run || params.vid) {
      axios
        .get(`${requestURL}/video/alllike/${params.vid}`)
        .then((res) => {
          setAllLike(res.data.like);
          setRun(false);
        })
        .catch(() => {
          console.log("Some thing went wrong");
        });
    }
  }, [run, params.vid]);

  const likeHandler = () => {
    axios
      .post(`${requestURL}/user/${props.id}/video/${params.vid}/like`)
      .then((res) => {
        setRun(true);
      })
      .catch(() => {
        console.log("Some thing went wrong");
      });
  };
  const unLikeHandler = () => {
    axios
      .post(`${requestURL}/user/${props.id}/video/${params.vid}/unlike`)
      .then((res) => {
        setRun(true);
      })
      .catch(() => {
        console.log("Some thing went wrong");
      });
  };

  return (
    <div>
      {allLike && allLike.userLike ? (
        allLike.userLike.includes(`${props.id}`) ? (
          <div onClick={unLikeHandler}>
            <img
              src="/images/liked-icon.svg"
              alt="user"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Liked"
            />
          </div>
        ) : (
          <div onClick={likeHandler}>
            <img
              src="/images/like-icon.svg"
              alt="user"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Like"
            />
          </div>
        )
      ) : (
        <div onClick={likeHandler}>
          <img
            src="/images/like-icon.svg"
            alt="user"
            data-toggle="tooltip"
            data-placement="bottom"
            title="Like"
          />
        </div>
      )}
    </div>
  );
};

export default UserLike;
