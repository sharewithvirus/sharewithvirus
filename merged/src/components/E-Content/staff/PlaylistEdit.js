import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import axios from "axios";
import { requestURL } from "../../ReqUrl";
import styles from "../../Home.module.css";

const PlaylistEdit = (props) => {
  const [open, setOpen] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [formData, setFormData] = useState({
    name: props.data.name,
    by: props.data.by,
    photo: props.data.photo,
    price: props.data.price,
    language: props.data.language,
    playtime: props.data.playtime,
    description: props.data.description,
    value: props.data.value,
    access: props.data.access,
    class: "",
    color: props.data.color,
  });
  const [classData, setClassData] = useState("");
  useEffect(() => {
    if (props.data.class) {
      props.data.class.map(
        (cls) => (
          setClassData(cls.className),
          setFormData({ ...formData, class: cls._id })
        )
      );
    }
  }, []);
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (selectedImage) {
      const formData1 = new FormData();
      formData1.append("name", formData.name);
      formData1.append("by", formData.by);
      formData1.append("description", formData.description);
      formData1.append("language", formData.language);
      formData1.append("playtime", formData.playtime);
      formData1.append("value", formData.value);
      formData1.append("price", formData.price);
      formData1.append("access", formData.access);
      formData1.append("color", formData.color);
      formData1.append("class", formData.class);
      formData1.append("file", selectedImage);
      axios
        .put(`${requestURL}/playlist/${props.pid}/edit`, formData1)
        .then((res) => {
          setOpen(false);
          props.playEditFunction();
        })
        .catch(() => {
          console.log("Some thing went wrong");
        });
    } else {
      axios
        .patch(`${requestURL}/playlist/${props.pid}/edit`, formData)
        .then((res) => {
          setOpen(false);
          console.log(formData);
          props.playEditFunction();
        })
        .catch(() => {
          console.log("Some thing went wrong");
        });
    }
  };

  const changeHandler = (val) => {
    setFormData({ ...formData, class: val });
    props.data.class
      .filter((ser) => {
        if (ser._id.includes(val)) {
          return val;
        }
      })
      .map(
        (ser) => (
          setFormData({ ...formData, class: ser._id }),
          setClassData(ser.className)
        )
      );
  };
  const closeHandler = () => {
    props.playEditFunction();
    setOpen(false);
  };

  return (
    <>
      <Dialog open={open}>
        <form onSubmit={formSubmitHandler} id="myForm">
          <DialogTitle>
            <div className="row">
              <div className="col-6">Edit Playlist</div>
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
                        : `${requestURL}/playlist/thumbnail/${formData.photo}`
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
                />
              </div>
              <div className={styles.createplaylisttop2}>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
                <input
                  className="form-control"
                  type="text"
                  name="by"
                  value={formData.by}
                  onChange={(e) =>
                    setFormData({ ...formData, by: e.target.value })
                  }
                />
              </div>
            </div>

            <div className={styles.createplaylistmid}>
              <textarea
                className="form-control"
                id="exampleFormControlTextarea1"
                name="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              ></textarea>
              <input
                className="form-control"
                type="text"
                name="language"
                value={formData.language}
                onChange={(e) =>
                  setFormData({ ...formData, language: e.target.value })
                }
              ></input>
            </div>
            <div className="row">
              <div className="col-12 col-sm-6 mt-3">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={(e) =>
                    setFormData({ ...formData, playtime: e.target.value })
                  }
                >
                  <option defaultValue>{formData.playtime}x</option>
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
                  onChange={(e) =>
                    setFormData({ ...formData, value: e.target.value })
                  }
                >
                  <option defaultValue>{formData.value} </option>
                  <option value="Paid">Paid</option>
                  <option value="Free">Free</option>
                </select>
              </div>
              <div className="col-12 col-sm-6 mt-3">
                <input
                  type="Number"
                  name="price"
                  className="form-control"
                  value={formData.price}
                  onChange={(e) =>
                    setFormData({ ...formData, price: e.target.value })
                  }
                />
              </div>
              <div className="col-12 col-sm-6 mt-3">
                <select
                  className="form-select"
                  aria-label="Default select example"
                  onChange={(e) =>
                    setFormData({ ...formData, access: e.target.value })
                  }
                >
                  <option defaultValue>{formData.access}</option>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div className="col-12 col-sm-6 mt-3">
                <select
                  className="form-select "
                  aria-label="Default select example"
                  onChange={(e) => changeHandler(e.target.value)}
                >
                  <option value={formData.class}>
                    {classData ? classData : ""}
                  </option>
                  {props.data &&
                    props.data.elearning.institute.classRooms.map((val) => (
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
                  name="color"
                  value={formData.color}
                  onChange={(e) =>
                    setFormData({ ...formData, color: e.target.value })
                  }
                />
              </div>
            </div>
            <div className="row">
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-secondary my-3 px-5 ">
                  Create New Playlist
                </button>
              </div>
            </div>
          </DialogContent>
        </form>
      </Dialog>
    </>
  );
};

export default PlaylistEdit;
