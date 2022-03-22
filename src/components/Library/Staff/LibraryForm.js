import React, { useState } from "react";
import axios from "axios";
import { requestURL } from "../../ReqUrl";
const EcontentInfoForm = (props) => {
  const [formData, setFormData] = useState({
    emailId: "",
    phoneNumber: "",
    about: "",
  });
  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post(`${requestURL}/library/${props.data._id}/about`, formData)
      .then((res) => {})
      .catch(() => {
        console.log("Something went Wrong");
      });
  };

  return (
    <form className="row" onSubmit={submitHandler} id="myForm">
      <div className="col-12 col-md-4 mt-4">
        <label htmlFor="emailId" className="form-group mb-2">
          Email
        </label>
        <input
          placeholder="Enter Email"
          type="text"
          className="form-control"
          id="emailId"
          name="emailId"
          onChange={(e) =>
            setFormData({
              ...formData,
              emailId: e.target.value,
            })
          }
        />
      </div>
      <div className="col-12 col-md-4 mt-4">
        <label htmlFor="phoneNumber" className="form-group mb-2">
          Phone Number
        </label>
        <input
          placeholder="Enter Number"
          type="text"
          className="form-control"
          id="phoneNumber"
          name="phoneNumber"
          onChange={(e) =>
            setFormData({
              ...formData,
              phoneNumber: e.target.value,
            })
          }
        />
      </div>

      <div className="col-12 col-md-4 mt-4">
        <label htmlFor="about" className="form-group mb-2">
          About
        </label>
        <input
          placeholder="Enter About"
          type="text"
          className="form-control"
          id="about"
          name="about"
          onChange={(e) =>
            setFormData({
              ...formData,
              about: e.target.value,
            })
          }
        />
      </div>

      <div className="col-12 my-4 d-flex justify-content-center">
        <input type="submit" className="btn btn-primary btn-lg px-5" />
      </div>
    </form>
  );
};

export default EcontentInfoForm;
