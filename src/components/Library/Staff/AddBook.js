import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { requestURL } from "../../ReqUrl";
import axios from "axios";
const AddBook = (props) => {
  const [selectedImage, setSelectedImage] = useState("");
  const formSubmitHandler = (e) => {
    e.preventDefault();
    const myform = document.getElementById("myForm");
    const formData = new FormData(myform);
    // for (let [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }
    props.topicFunction(false);

    axios
      .post(`${requestURL}/library/${props.lid}/create-book`, formData)
      .then((res) => {
        props.topicFunction(false);
      })
      .catch(() => {
        console.log("Some thing went wrong");
      });
  };
  const closeHandler = () => {
    props.topicFunction(false);
  };
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };
  return (
    <Dialog open={props.addBook}>
      <form
        onSubmit={formSubmitHandler}
        id="myForm"
        style={{ minWidth: "380px", maxWidth: "550px" }}
      >
        <DialogTitle>
          <div className="row">
            <div className="col-6">Add Book</div>
            <div className="col-6 d-flex justify-content-end">
              <img
                src="/images/close-icon.svg"
                alt="user"
                data-toggle="tooltip"
                data-placement="bottom"
                title="Close"
                style={{ width: "1.5rem", cursor: "pointer" }}
                onClick={closeHandler}
              />
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <div className="row">
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="col-12  mb-3">
                  <input
                    className="form-control"
                    type="text"
                    name="bookName"
                    placeholder="Book name"
                    required
                  />
                </div>
                <div className="col-12  mb-3">
                  <input
                    className="form-control"
                    type="text"
                    name="author"
                    placeholder="Book author"
                    required
                  />
                </div>
              </div>
              <div className="col-12 col-md-6 d-flex justify-content-center mb-1">
                <label htmlFor="img">
                  <img
                    src={
                      selectedImage
                        ? URL.createObjectURL(selectedImage)
                        : "/images/image-boy2.png"
                    }
                    className={`img-fluid `}
                    alt="thumbnail"
                    style={{
                      cursor: "pointer",
                      borderRadius: "10%",
                      width: "100px",
                      height: "100px",
                    }}
                  />
                </label>
                <input
                  id="img"
                  name="file"
                  required
                  onChange={imageChange}
                  type="file"
                  style={{ display: "none" }}
                  accept="image/gif, image/jpeg, image/png"
                />
              </div>
            </div>

            <div className="col-12 col-md-6 mb-3">
              <input
                className="form-control"
                type="text"
                name="totalPage"
                placeholder="Total pages"
                required
              />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <input
                className="form-control"
                type="text"
                name="price"
                required
                placeholder="Price"
              />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <input
                className="form-control"
                type="text"
                name="language"
                required
                placeholder="Language"
              />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <input
                className="form-control"
                type="text"
                name="publication"
                placeholder="Publication"
                required
              />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <input
                className="form-control"
                type="text"
                name="totalCopies"
                placeholder="Total copies"
                required
              />
            </div>
            <div className="col-12 col-md-6 mb-3">
              <input
                className="form-control"
                type="text"
                name="shellNumber"
                placeholder="Shell number"
                required
              />
            </div>
          </div>
          <div className="row">
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-secondary my-3 px-5 ">
                Add Book
              </button>
            </div>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default AddBook;
