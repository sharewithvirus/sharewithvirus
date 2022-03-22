import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { requestURL } from "../../ReqUrl";
import axios from "axios";

const AddTopic = (props) => {
  const [open, setOpen] = useState(props.addTopic);
  const [topic, setTopic] = useState({
    topicName: "",
  });
  const formSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .post(`${requestURL}/playlist/${props.pid}/topic`, topic)
      .then((res) => {
        // console.log(res.data.message);
        setOpen(false);
        props.topicFunction(false);
      })
      .catch(() => {
        console.log("Some thing went wrong");
      });
  };
  const closeHandler = () => {
    setOpen(false);
    props.topicFunction(false);
  };
  return (
    <Dialog open={open}>
      <form
        onSubmit={formSubmitHandler}
        style={{ minWidth: "360px", maxWidth: "460px" }}
      >
        <DialogTitle>
          <div className="row">
            <div className="col-6">Add Topic</div>
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
          <div className="row">
            <input
              className="form-control"
              name="topicName"
              type="text"
              placeholder="Add your topic"
              onChange={(e) =>
                setTopic({ ...topic, [e.target.name]: e.target.value })
              }
              required
            />
          </div>
        </DialogContent>
        <DialogActions>
          <button type="submit" className="btn btn-secondary my-3 mx-1">
            Add Topic
          </button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default AddTopic;
