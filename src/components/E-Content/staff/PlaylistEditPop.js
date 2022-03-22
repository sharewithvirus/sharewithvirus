import React, { useState } from "react";
import PlaylistEdit from "./PlaylistEdit";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import { requestURL } from "../../ReqUrl";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const PlaylistEditPop = (props) => {
  const [videoEdit, setVideoEdit] = useState(false);
  const [videoDelete, setVideoDelete] = useState(false);
  const navigate = useNavigate();
  const deleteHandler = () => {
    axios
      .delete(`${requestURL}/playlist/${props.pid}`)
      .then((res) => {
        console.log(res.data.message);
        setVideoDelete(false);
        props.setPlayEdit(false);
        navigate(-1);
      })
      .catch(() => {
        console.log("some thing went wrong");
      });
  };

  return (
    <>
      <Dialog open={props.playEdit}>
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
                  onClick={() => props.setPlayEdit(false)}
                  style={{ width: "1.5rem", cursor: "pointer" }}
                />
              </div>
            </div>
          </DialogTitle>
          <DialogContent>
            <div className=" d-flex justify-content-around">
              <p
                onClick={() => setVideoEdit(true)}
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

      {videoEdit && (
        <PlaylistEdit
          pid={props.pid}
          data={props.data}
          playEditFunction={props.playEditFunction}
        />
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
                      props.setPlayEdit(false);
                    }}
                    style={{ width: "1.5rem", cursor: "pointer" }}
                  />
                </div>
              </div>
            </DialogTitle>
            <DialogContent>
              <p>Are you sure to delete Playlist ?</p>
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
};

export default PlaylistEditPop;
