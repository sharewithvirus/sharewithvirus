import React, { useState, useRef } from "react";
import styles from "../../Home.module.css";
import { Link, useNavigate } from "react-router-dom";
import { requestURL } from "../../ReqUrl";
import ReactPlayer from "react-player";
import axios from "axios";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
export default function PlaylistCard({
  id,
  sid,
  pid,
  tid,
  vid,
  name,
  image,
  time,
  price,
  setVideoFun,
}) {
  const [videoPop, setVideoPop] = useState(false);
  const [videoEdit, setVideoEdit] = useState(false);
  const [videoDelete, setVideoDelete] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    access: "",
    price: "",
    videoName: "",
  });
  const [file, setFile] = useState("");
  const videoHandler = (event) => {
    event.stopPropagation();
    setVideoPop(true);
  };

  const deleteHandler = () => {
    axios
      .delete(`${requestURL}/oneVideo/${vid}`)
      .then((res) => {
        console.log(res.data.message);
        setVideoFun(true);
        setVideoDelete(false);
        setVideoPop(false);
      })
      .catch(() => {
        console.log("some thing went wrong");
      });
  };

  const editSubmitHandler = (e) => {
    e.preventDefault();
    if (file) {
      const formData1 = new FormData();
      formData1.append("name", formData.name);
      formData1.append("access", formData.access);
      formData1.append("price", formData.price);
      formData1.append("file", file);
      axios
        .put(`${requestURL}/oneVideo/${vid}`, formData1)
        .then((res) => {
          console.log(res.data.message);
          setVideoEdit(false);
          setVideoPop(false);
          setVideoFun(true);
        })
        .catch(() => {
          console.log("some thing went wrong");
        });
    } else {
      axios
        .patch(`${requestURL}/oneVideo/${vid}`, { formData })
        .then((res) => {
          console.log(res.data.message);
          setVideoEdit(false);
          setVideoPop(false);
          setVideoFun(true);
        })
        .catch(() => {
          console.log("some thing went wrong");
        });
    }
  };

  const editHandler = () => {
    axios
      .get(`${requestURL}/oneVideo/${vid}`)
      .then((res) => {
        setFormData({
          ...formData,
          name: res.data.video.name,
          access: res.data.video.access,
          price: res.data.video.price,
          videoName: res.data.video.videoName,
        });
        setVideoEdit(true);
      })
      .catch(() => {
        console.log("some thing went wrong");
      });
  };

  const videoUpload = (e) => {
    setFile(e.target.files[0]);
    setFormData({ ...formData, videoName: e.target.files[0].name });
  };
  return (
    <>
      <div
        className={`mb-2 ${styles.playlistCard}`}
        onClick={() =>
          navigate(
            `/user/${id}/staff/${sid}/playlist/${pid}/topic/${tid}/video/${vid}`
          )
        }
      >
        <p onClick={videoHandler}>
          <img
            src="/images/three-vertical-icon.svg"
            alt="user"
            data-toggle="tooltip"
            data-placement="bottom"
            title="Menu"
            style={{
              width: "2rem",
              height: "3rem",
              position: "absolute",
              zIndex: "1000",
              cursor: "Pointer",
            }}
          />
        </p>
        <div style={{ marginTop: "-0.89rem" }}>
          <ReactPlayer
            url={`${requestURL}/video/${image}`}
            height="110px"
            width="200px"
          />
          <p
            className="row mx-1"
            style={{ marginTop: "-1.5rem", color: "white" }}
          >
            <p className="col-6 d-flex justify-content-start">{time}</p>
            <p className="col-6 d-flex justify-content-end">{price}</p>
          </p>
        </div>
        <div className={styles.videoPlaylistCard_overlay}>
          <h5>{name}</h5>
        </div>
      </div>

      {videoPop && (
        <Dialog open={videoPop}>
          <form style={{ width: "300px" }}>
            <DialogTitle>
              <div className="row">
                <div className="col-12 d-flex justify-content-end">
                  <img
                    src="/images/close-icon.svg"
                    alt="user"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Close"
                    onClick={() => setVideoPop(false)}
                    style={{ width: "1.5rem", cursor: "pointer" }}
                  />
                </div>
              </div>
            </DialogTitle>
            <DialogContent>
              <div className=" d-flex justify-content-around">
                <p
                  onClick={editHandler}
                  style={{ textAlign: "center", cursor: "pointer" }}
                >
                  <img
                    src="/images/edit-icon.svg"
                    alt="user"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Edit"
                    style={{ width: "2.5rem" }}
                  />
                  <p>Edit</p>
                </p>
                <p
                  onClick={() => {
                    setVideoDelete(true);
                  }}
                  style={{ textAlign: "center", cursor: "pointer" }}
                >
                  <img
                    src="/images/delete-icon.svg"
                    alt="user"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Edit"
                    style={{ width: "2.5rem" }}
                  />
                  <p>Delete</p>
                </p>
              </div>
            </DialogContent>
          </form>
        </Dialog>
      )}

      {videoEdit && formData && (
        <Dialog open={videoEdit}>
          <form
            id="myForm"
            onSubmit={editSubmitHandler}
            style={{ width: "400px" }}
          >
            <DialogTitle>
              <div className="row">
                <div className="col-12 d-flex justify-content-end">
                  <img
                    src="/images/close-icon.svg"
                    alt="user"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Close"
                    onClick={() => {
                      setVideoEdit(false);
                      setVideoPop(false);
                    }}
                    style={{ width: "1.5rem", cursor: "pointer" }}
                  />
                </div>
              </div>
            </DialogTitle>
            <DialogContent>
              <input
                className="form-control mb-3"
                name="name"
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                type="text"
                value={formData.name}
              />
              <select
                className="form-select mb-3"
                name="access"
                aria-label="Default select example"
                // onChange={selectHandler}
                onChange={(e) =>
                  setFormData({ ...formData, access: e.target.value })
                }
              >
                <option defaultValue>{formData.access}</option>
                <option value="Paid">Paid</option>
                <option value="Free">Free</option>
              </select>
              <input
                className="form-control mb-3"
                name="price"
                type="number"
                onChange={(e) =>
                  setFormData({ ...formData, price: e.target.value })
                }
                value={formData.price}
              />
              <div className="row mb-3">
                <label
                  className="form-label"
                  htmlFor="selectfile"
                  style={{ cursor: "pointer" }}
                >
                  {formData.videoName}
                </label>
                <input
                  id="selectfile"
                  className="form-control d-none"
                  name="file"
                  type="file"
                  onChange={videoUpload}
                  accept="video/mp4,video/x-m4v,video/*"
                />
              </div>
            </DialogContent>
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-secondary my-3 mx-1">
                Upload
              </button>
            </div>
          </form>
        </Dialog>
      )}

      {videoDelete && (
        <Dialog open={videoDelete}>
          <div style={{ width: "300px" }}>
            <DialogTitle>
              <div className="row">
                <div className="col-12 d-flex justify-content-end">
                  <img
                    src="/images/close-icon.svg"
                    alt="user"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Close"
                    onClick={() => {
                      setVideoDelete(false);
                      setVideoPop(false);
                    }}
                    style={{ width: "1.5rem", cursor: "pointer" }}
                  />
                </div>
              </div>
            </DialogTitle>
            <DialogContent>
              <p>Are you sure to delete Video ?</p>
            </DialogContent>
            <div className="d-flex justify-content-center">
              <button
                className="btn btn-danger my-3 mx-1"
                onClick={deleteHandler}
              >
                Delete
              </button>
            </div>
          </div>
        </Dialog>
      )}
    </>
  );
}
