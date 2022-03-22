import React, { useState, useEffect } from "react";
import axios from "axios";
import { requestURL } from "../../ReqUrl";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
const AddResource = ({ addResource, vid, resourceFunction }) => {
  const [data, setData] = useState("");
  // useEffect(() => {
  //   axios
  //     .get(`${requestURL}/video/${props.vid}/resource`)
  //     .then((res) => {
  //       setData(res.data.video);
  //     })
  //     .catch(() => {
  //       console.log("Some thing went wrong");
  //     });
  // }, []);

  const formSubmitHandler = (e) => {
    e.preventDefault();
    const myform = document.getElementById("myForm");
    const formData = new FormData(myform);

    // for (let [key, value] of formData.entries()) {
    //   console.log(key, value);
    // }
    axios
      .post(`${requestURL}/video/${vid}/resource`, formData)
      .then((res) => {
        resourceFunction();
      })
      .catch(() => {
        console.log("Some thing went wrong");
      });
  };

  const closeHandler = () => {
    resourceFunction();
  };
  return (
    <>
      <Dialog open={addResource}>
        <form
          onSubmit={formSubmitHandler}
          style={{ minWidth: "200px", maxWidth: "400px" }}
          id="myForm"
          encType="multipart/form-data"
        >
          <DialogTitle>
            <div className="row">
              <div className="col-6">Add Resource</div>
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
            <div className="row mb-3">
              <input
                className="form-control"
                name="file"
                type="file"
                placeholder="Add resources"
                multiple
                required
              />
            </div>
            <div className="row mb-3">
              <input
                className="form-control"
                name="name"
                type="text"
                placeholder="Resource Name"
                required
              />
            </div>
          </DialogContent>
          <DialogActions>
            <button type="submit" className="btn btn-primary my-3 mx-1">
              Add Resource
            </button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
};
export default AddResource;
