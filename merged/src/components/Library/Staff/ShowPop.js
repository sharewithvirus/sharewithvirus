import React from "react";
import { Dialog, DialogContent, DialogTitle } from "@mui/material";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { requestURL } from "../../ReqUrl";
const ShowPop = ({ show, setShow, setEditBook, bid, lid, setRunEffect }) => {
  const deteletHandler = () => {
    console.log("click delete handeler");
    axios
      .delete(`${requestURL}/library/${lid}/book/${bid}`)
      .then((res) => {
        console.log(res.data.message);
        setRunEffect(true);
        setShow(false);
      })
      .catch(() => {
        console.log("Some thing went wrong");
      });
  };
  return (
    <Dialog open={show}>
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
                onClick={() => setShow(false)}
                style={{ width: "1.5rem", cursor: "pointer" }}
              />
            </div>
          </div>
        </DialogTitle>
        <DialogContent>
          <div className=" d-flex justify-content-around">
            <p
              onClick={() => setEditBook(true)}
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
              onClick={deteletHandler}
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
      </div>
    </Dialog>
  );
};

export default ShowPop;
