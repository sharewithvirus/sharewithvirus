import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { requestURL } from "../../ReqUrl";
import moment from "moment";
import axios from "axios";

const CollectBook = (props) => {
  const [date, setDate] = useState(Date.now());
  const [formData, setFormData] = useState({
    book: "",
    member: "",
  });
  const formSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .post(`${requestURL}/library/${props.lid}/collect`, formData)
      .then((res) => {
        props.issueFunction(false);
      })
      .catch(() => {
        console.log("Some thing went wrong");
      });
  };
  const closeHandler = () => {
    props.closeFunction(false);
  };
  const bookHandler = (id) => {
    setFormData({
      ...formData,
      book: id,
    });
  };
  const memberHandler = (id) => {
    setFormData({
      ...formData,
      member: id,
    });
  };
  return (
    <Dialog open={props.issueBook}>
      <form
        onSubmit={formSubmitHandler}
        id="myForm"
        style={{ minWidth: "380px", maxWidth: "550px" }}
      >
        <DialogTitle>
          <div className="row">
            <div className="col-6">Collect Book</div>
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
            <div className="col-12 mb-3">
              <select
                className={`form-control-plaintext my-2`}
                name="book"
                onChange={(e) => bookHandler(e.target.value)}
                style={{
                  backgroundColor: "#afafaf",
                  cursor: "pointer",
                  color: "black",
                }}
              >
                <option defaultValue=" Select a book " className="text-center">
                  -------------------------- Select a Book
                  --------------------------
                </option>
                {props.data &&
                  props.data.books &&
                  props.data.books.map((val) => (
                    <option
                      className="text-center"
                      key={val._id}
                      value={val._id}
                    >
                      {val.bookName}
                    </option>
                  ))}
              </select>
            </div>

            <div className="col-12 mb-3">
              <select
                className={`form-control-plaintext my-2 `}
                name="member"
                onChange={(e) => memberHandler(e.target.value)}
                // onChange={(e) => selectChangeMember(e.target.value)}
                style={{
                  backgroundColor: "#afafaf",
                  cursor: "pointer",
                  color: "black",
                }}
              >
                <option
                  defaultValue=" Select a member "
                  className="text-center"
                >
                  -------------------------- Select a Member
                  --------------------------
                </option>
                {props.data &&
                  props.data.institute &&
                  props.data.institute.ApproveStudent &&
                  props.data.institute.ApproveStudent.map((val) => (
                    <option
                      className="text-center"
                      key={val._id}
                      value={val._id}
                    >
                      {`${val.studentFirstName} ${
                        val.studentMiddleName ? val.studentMiddleName : ""
                      } ${val.studentLastName}`}
                    </option>
                  ))}
              </select>
            </div>

            <div className="col-12 mb-3">
              <input
                className="form-control"
                name="date"
                required
                defaultValue={moment(date).format("DD/MM/YYYY")}
              />
            </div>
          </div>
          <div className="row">
            <div className="d-flex justify-content-center">
              <button type="submit" className="btn btn-secondary my-3 px-5 ">
                Collect Book
              </button>
            </div>
          </div>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default CollectBook;
