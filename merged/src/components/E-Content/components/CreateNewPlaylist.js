import React, { useState } from "react";
import styles from "../../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from "react-router";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { requestURL } from "../../ReqUrl";
import axios from "axios";

const CreateNewPlaylist = (props) => {
  const params = useParams();
  const [selectedImage, setSelectedImage] = useState("");
  const [open, setOpen] = useState(true);
  const [paid, setPaid] = useState(false);
  const [myColor, setMyColor] = useState("");
  const formSubmitHandler = (e) => {
    e.preventDefault();
    const myform = document.getElementById("myForm");
    const formData = new FormData(myform);
    // for (let [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }
    axios
      .post(`${requestURL}/${params.eid}/playlist/create`, formData)
      .then((res) => {
        // console.log(res.data.message, res.data.playlist);
        props.closeHandler(false);
        props.setRunEffect(true);
      })
      .catch(() => {
        console.log("Some thing went wrong!");
      });
  };

  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };

  const selectHandler = (e) => {
    if (e.target.value === "Paid") {
      setPaid(true);
    } else {
      setPaid(false);
    }
  };

  const colorHandler = (e) => {
    setMyColor(e.target.value);
  };
  const closeHandler = () => {
    props.closeHandler(false);
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open}>
        <form
          id="myForm"
          onSubmit={formSubmitHandler}
          style={{ width: "600px" }}
        >
          <DialogTitle>
            <div className="row">
              <div className="col-6">Create Playlist Profile</div>
              <div className="col-6 d-flex justify-content-end">
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
            <div className={styles.createplaylisttop}>
              <div className={styles.createplaylisttop1}>
                <label htmlFor="img">
                  <img
                    src={
                      selectedImage
                        ? URL.createObjectURL(selectedImage)
                        : "/images/department-avatar.jpeg"
                    }
                    className={`img-fluid `}
                    alt="thumbnail"
                    style={{ cursor: "pointer", borderRadius: "50%" }}
                  />
                </label>
                <input
                  id="img"
                  name="file"
                  onChange={imageChange}
                  type="file"
                  style={{ display: "none" }}
                  accept="image/gif, image/jpeg, image/png"
                  required
                />
              </div>
              <div className={styles.createplaylisttop2}>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  placeholder="Name"
                  required
                />
                <input
                  className="form-control"
                  type="text"
                  name="by"
                  placeholder="By: Name of Creator"
                  required
                />
              </div>
            </div>

            <div className={styles.createplaylistmid}>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                name="description"
                rows="2"
                placeholder="Description:"
                required
              ></textarea>
              <input
                className="form-control"
                type="text"
                name="language"
                placeholder="Language:"
                required
              ></input>
            </div>
            <div className="row">
              <div className="col-12 col-sm-6 mt-3">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="playtime"
                  required
                >
                  <option value="2">2x</option>
                  <option value="3">3x</option>
                  <option value="4">4x</option>
                </select>
              </div>
              <div className="col-12 col-sm-6 mt-3">
                <select
                  className="form-select "
                  aria-label="Default select example"
                  name="value"
                  onChange={selectHandler}
                  required
                >
                  <option defaultValue>Choose Paid or Free </option>
                  <option value="Paid">Paid</option>
                  <option value="Free">Free</option>
                </select>
              </div>
              {paid && (
                <div className="col-12 col-sm-6 mt-3">
                  <input
                    type="Number"
                    name="price"
                    className="form-control"
                    placeholder="Price of playlist"
                  />
                </div>
              )}
              <div className="col-12 col-sm-6 mt-3">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  name="access"
                  required
                >
                  <option defaultValue>Free Access No/Yes </option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div className="col-12 col-sm-6 mt-3">
                <select
                  className="form-select "
                  aria-label="Default select example"
                  name="class"
                  required
                >
                  <option defaultValue>Select Classes: </option>
                  {props.data &&
                    props.data.map((val) => (
                      <option value={val._id} key={val._id}>
                        {val.className}
                      </option>
                    ))}
                </select>
              </div>
              <div className="col-12 col-sm-6 mt-3">
                <label for="exampleColorInput" class="form-label"></label>
                <input
                  type="color"
                  class="form-control form-control-color"
                  id="exampleColorInput"
                  onChange={colorHandler}
                  name="color"
                  value={`${myColor}`}
                  title="Choose your color"
                />
              </div>
            </div>
            {selectedImage && props.data && (
              <div className="row">
                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-secondary my-3 px-5 "
                  >
                    Create New Playlist
                  </button>
                </div>
              </div>
            )}
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
};

export default CreateNewPlaylist;
