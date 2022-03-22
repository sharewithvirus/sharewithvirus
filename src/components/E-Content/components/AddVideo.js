import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { requestURL } from "../../ReqUrl";
import axios from "axios";

const AddVideo = (props) => {
  const [paid, setPaid] = useState(false);
  const [addVideo, setAddVideo] = useState(false);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const myForm = document.getElementById("myForm");
    let formData = new FormData(myForm);
    // for (let [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }
    axios
      .post(`${requestURL}/topic/${props.tid}/upload`, formData)
      .then((res) => {
        // console.log(res.data.message);
        setAddVideo(false);
        props.videoFunction();
      })
      .catch(() => {
        console.log("Some thing went wrong");
      });
  };
  const selectHandler = (e) => {
    if (e.target.value === "Paid") {
      setPaid(true);
    } else {
      setPaid(false);
    }
  };

  const closeHandler = () => {
    setAddVideo(false);
  };
  return (
    <>
      <div
        onClick={() => setAddVideo(true)}
        className="col-12 col-md-3 offset-md-9 btn btn-secondary"
      >
        Add Video
      </div>
      {addVideo && (
        <Dialog open={addVideo}>
          <form
            id="myForm"
            onSubmit={formSubmitHandler}
            style={{ minWidth: "360px", maxWidth: "500px" }}
          >
            <DialogTitle>
              <div className="row">
                <div className="col-6">Upload Video</div>
                <div className="col-6 d-flex justify-content-end ">
                  <img
                    src="/images/close-icon.svg"
                    alt="user"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Close"
                    onClick={closeHandler}
                    style={{ width: "1.5rem", cursor: "pointer" }}
                  />
                </div>
              </div>
            </DialogTitle>
            <DialogContent>
              <input
                className="form-control mb-3"
                name="name"
                type="text"
                placeholder="Add video name"
                required
              />
              <select
                className="form-select mb-3"
                name="access"
                aria-label="Default select example"
                onChange={selectHandler}
              >
                <option defaultValue> Paid or Free</option>
                <option value="Paid">Paid</option>
                <option value="Free">Free</option>
              </select>
              {paid && (
                <input
                  className="form-control mb-3"
                  name="price"
                  type="number"
                  placeholder="Enter price"
                  required
                />
              )}

              <input
                className="form-control"
                id="video"
                name="file"
                type="file"
                accept="video/mp4,video/x-m4v,video/*"
              />
            </DialogContent>
            <DialogActions>
              <button type="submit" className="btn btn-secondary my-3 mx-3">
                Upload
              </button>
            </DialogActions>
          </form>
        </Dialog>
      )}
    </>
  );
};

export default AddVideo;
