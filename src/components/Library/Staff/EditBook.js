import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { requestURL } from "../../ReqUrl";
import axios from "axios";
const EditBook = (props) => {
  const [selectedImage, setSelectedImage] = useState("");
  const [data, setData] = useState("");

  useEffect(() => {
    axios
      .get(`${requestURL}/onebook/${props.bid}`)
      .then((res) => {
        setData(res.data.book);
      })
      .catch(() => {
        console.log("some thing went wrong");
      });
  }, []);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const myform = document.getElementById("myForm");
    const formData = new FormData(myform);
    axios
      .post(
        `${requestURL}/library/${props.lid}/edit-book/${props.bid}`,
        formData
      )
      .then((res) => {
        props.setShow(false);
        props.topicFunction(false);
      })
      .catch(() => {
        console.log("Some thing went wrong");
      });
  };
  const closeHandler = () => {
    props.setShow(false);
    props.topicFunction(false);
  };
  const imageChange = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedImage(e.target.files[0]);
    }
  };
  // console.log(data);
  return (
    <Dialog open={props.editBook}>
      <form
        onSubmit={formSubmitHandler}
        id="myForm"
        style={{ minWidth: "380px", maxWidth: "550px" }}
      >
        <DialogTitle>
          <div className="row">
            <div className="col-6">Edit Book</div>
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
        {data && (
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
                      defaultValue={data.bookName}
                      required
                    />
                  </div>
                  <div className="col-12  mb-3">
                    <input
                      className="form-control"
                      type="text"
                      name="author"
                      placeholder="Book author"
                      defaultValue={data.author}
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
                          : `${requestURL}/book/${data.photo}`
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
                  name="totalPages"
                  placeholder="Total pages"
                  defaultValue={data.totalPage}
                />
              </div>
              <div className="col-12 col-md-6 mb-3">
                <input
                  className="form-control"
                  type="text"
                  name="price"
                  required
                  placeholder="Price"
                  defaultValue={data.price}
                />
              </div>
              <div className="col-12 col-md-6 mb-3">
                <input
                  className="form-control"
                  type="text"
                  name="language"
                  required
                  placeholder="Language"
                  defaultValue={data.language}
                />
              </div>
              <div className="col-12 col-md-6 mb-3">
                <input
                  className="form-control"
                  type="text"
                  name="publication"
                  placeholder="Publication"
                  defaultValue={data.publication}
                />
              </div>
              <div className="col-12 col-md-6 mb-3">
                <input
                  className="form-control"
                  type="text"
                  name="totalCopies"
                  placeholder="Total copies"
                  defaultValue={data.totalCopies}
                />
              </div>
              <div className="col-12 col-md-6 mb-3">
                <input
                  className="form-control"
                  type="text"
                  name="shellNumber"
                  placeholder="Shell number"
                  defaultValue={data.shellNumber}
                />
              </div>
            </div>
            <div className="row">
              <div className="d-flex justify-content-center">
                <button type="submit" className="btn btn-secondary my-3 px-5 ">
                  Save
                </button>
              </div>
            </div>
          </DialogContent>
        )}
      </form>
    </Dialog>
  );
};

export default EditBook;
