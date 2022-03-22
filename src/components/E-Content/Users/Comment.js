import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { requestURL } from "../../ReqUrl";
import { useParams } from "react-router-dom";
import { format } from "timeago.js";
const Comment = ({ setShowComment }) => {
  const [allComment, setAllComment] = useState([]);
  const [run, setRun] = useState(true);
  const [comment, setComment] = useState({
    comment: "",
  });
  const [data, setData] = useState("");
  const params = useParams();
  useEffect(() => {
    if (run) {
      axios
        .get(`${requestURL}/user/${params.id}`)
        .then((res) => {
          setData(res.data.user);
        })
        .catch(() => {
          console.log("some thing went wrong");
        });
      axios
        .get(`${requestURL}/video/${params.vid}/comment`)
        .then((res) => {
          res.data.comment.userComment.reverse();
          setAllComment(res.data.comment.userComment);
          setRun(false);
        })
        .catch(() => {
          console.log("Some thing went wrong");
        });
    }
  }, [run]);

  const commentHandler = (e) => {
    e.preventDefault();
    axios
      .post(`${requestURL}/${params.id}/video/${params.vid}/comment`, comment)
      .then((res) => {
        setRun(true);
        setComment({ comment: "" });
      })
      .catch(() => {
        console.log("Some thing went wrong");
      });
  };
  return (
    <div className="mb-5">
      <div className="row mb-5">
        <h5 className="col-7 d-flex justify-content-end">Comments</h5>
        <p className="col-5 d-flex justify-content-end">
          <img
            src="/images/close-icon.svg"
            alt="user"
            data-toggle="tooltip"
            data-placement="bottom"
            title="Close"
            onClick={() => setShowComment(false)}
            style={{ width: "1.5rem", cursor: "pointer", marginRight: "1rem" }}
          />
        </p>
      </div>
      <form>
        <div
          className="row"
          style={{
            display: "flex",
            alignContent: "center",
            alignItems: "center",
          }}
        >
          {data && (
            <div className="col-2">
              <img
                src={
                  data.photoId === "1"
                    ? "/images/image-boy2.png"
                    : `${requestURL}/userprofileabout/photo/${data.profilePhoto}`
                }
                alt="not found"
                className="img-fluid"
                style={{ width: "80px", height: "80px", borderRadius: "50%" }}
              />
            </div>
          )}
          <div className="col-9">
            <textarea
              className="form-control"
              type="text"
              value={comment.comment}
              onChange={(e) => setComment({ comment: e.target.value })}
              placeholder="Add a comment..."
              required
              style={{ border: "none" }}
            />
          </div>
          {comment && (
            <div
              className="col-1 d-flex justify-content-end"
              onClick={commentHandler}
            >
              <img
                src="/images/video-comment-icon.svg"
                alt="user"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Sent"
                style={{ marginRight: "1rem" }}
              />
            </div>
          )}
        </div>
      </form>
      {allComment &&
        allComment.map((com) => (
          <div className="row mt-3 pb-2" key={com._id}>
            <div className="col-2 d-flex justify-content-center">
              <img
                src={
                  com.user.photoId === "1"
                    ? "/images/image-boy2.png"
                    : `${requestURL}/userprofileabout/photo/${com.user.profilePhoto}`
                }
                style={{ width: "80px", height: "80px", borderRadius: "50%" }}
                alt="not found"
              />
            </div>
            <div className="col-10">
              <div className=" d-flex justify-content-between">
                <div className="d-flex justify-content-between">
                  <p>{com.user.username}</p>
                  <p className="mx-5">{format(com.createdAt)}</p>
                </div>
                <img
                  src="/images/three-vertical-icon.svg"
                  alt="user"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Menu"
                  style={{ width: "2rem", marginRight: "0.5rem" }}
                />
              </div>
              <div className="d-flex justify-content-start">
                <p>{com.comment}</p>
              </div>
            </div>
          </div>
        ))}
      {!allComment && <p>Not any comment till now</p>}
    </div>
  );
};

export default Comment;
