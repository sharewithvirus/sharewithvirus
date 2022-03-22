import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { requestURL } from "../../ReqUrl";
const BookPop = ({ data, openPop, popFunction }) => {
  const closeHandler = () => {
    popFunction();
  };
  return (
    <Dialog open={openPop}>
      <DialogTitle>
        <div className="row">
          <div className="col-6">Book Detail</div>
          <div className="col-6 d-flex justify-content-end">
            <i
              className="fa fa-times"
              aria-hidden="true"
              onClick={closeHandler}
            ></i>
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
              <img
                src={`${requestURL}/book/${data.photo}`}
                className={`img-fluid `}
                alt="thumbnail"
                style={{
                  cursor: "pointer",
                  borderRadius: "10%",
                  width: "100px",
                  height: "100px",
                }}
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
        {/* <div className="row">
          <div className="d-flex justify-content-center">
            <button type="submit" className="btn btn-secondary my-3 px-5 ">
              Edit Book
            </button>
          </div>
        </div> */}
      </DialogContent>
    </Dialog>
  );
};

export default BookPop;
