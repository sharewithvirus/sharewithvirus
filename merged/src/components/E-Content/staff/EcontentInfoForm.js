import React, { useState } from "react";
import axios from "axios";
import { requestURL } from "../../ReqUrl";
const EcontentInfoForm = (props) => {
  const [data, setData] = useState({
    emailId: "",
    phoneNumber: "",
    photoId: "",
    photo: "",
    coverId: "",
    cover: "",
    vision: "",
    mission: "",
    about: "",
    playlist: "",
    susbcriber: "",
    award: "",
    achievement: "",
    activities: "",
  });

  const [infoData, setInfoData] = useState("");
  const dataHandler = (e) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post(`${requestURL}/e-content/${props.data._id}`, data)
      .then((res) => {
        setInfoData(res.data.elearning);
      })
      .catch(() => {
        console.log("Something went Wrong");
      });
  };

  return (
    <form className="row" onSubmit={submitHandler}>
      <div className="col-12 col-md-4 mt-4">
        <label htmlFor="emailId" className="form-group mb-2">
          Email
        </label>
        <input
          onChange={dataHandler}
          placeholder="Enter Email"
          type="text"
          className="form-control"
          id="emailId"
          name="emailId"
          // value={props.data.emailId ? props.data.emailId : ""}
        />
      </div>
      <div className="col-12 col-md-4 mt-4">
        <label htmlFor="phoneNumber" className="form-group mb-2">
          Phone Number
        </label>
        <input
          onChange={dataHandler}
          placeholder="Enter Number"
          type="text"
          className="form-control"
          id="phoneNumber"
          name="phoneNumber"
          // value={props.data.phoneNumber ? props.data.phoneNumber : ""}
        />
      </div>
      <div className="col-12 col-md-4 mt-4">
        <label htmlFor="vision" className="form-group mb-2">
          Vision
        </label>
        <input
          onChange={dataHandler}
          placeholder="Enter Vision"
          type="text"
          className="form-control"
          name="vision"
          id="vision"
          // value={props.data.vision ? props.data.vision : ""}
        />
      </div>
      <div className="col-12 col-md-4 mt-4">
        <label htmlFor="mission" className="form-group mb-2">
          Mission
        </label>
        <input
          onChange={dataHandler}
          placeholder="Enter Mission"
          type="text"
          className="form-control"
          id="mission"
          name="mission"
          // value={props.data.mission ? props.data.mission : ""}
        />
      </div>
      <div className="col-12 col-md-4 mt-4">
        <label htmlFor="about" className="form-group mb-2">
          About
        </label>
        <input
          onChange={dataHandler}
          placeholder="Enter About"
          type="text"
          className="form-control"
          id="about"
          name="about"
          // value={props.data.about ? props.data.about : ""}
        />
      </div>
      <div className="col-12 col-md-4 mt-4">
        <label htmlFor="award" className="form-group mb-2">
          Award
        </label>
        <input
          onChange={dataHandler}
          placeholder="Enter Award"
          type="text"
          className="form-control"
          id="award"
          name="award"
          // value={props.data.award ? props.data.award : ""}
        />
      </div>
      <div className="col-12 col-md-4 mt-4">
        <label htmlFor="achievement" className="form-group mb-2">
          Achievement
        </label>
        <input
          onChange={dataHandler}
          placeholder="Enter Achievement"
          type="text"
          className="form-control"
          id="achievement"
          name="achievement"
          // value={props.data.achievement ? props.data.achievement : ""}
        />
      </div>
      <div className="col-12 col-md-4 mt-4">
        <label htmlFor="activities" className="form-group mb-2">
          Activities
        </label>
        <input
          onChange={dataHandler}
          placeholder="Enter Activities"
          type="text"
          className="form-control"
          id="activities"
          name="activities"
          // value={props.data.activities ? props.data.activities : ""}
        />
      </div>
      <div className="col-12 my-4 d-flex justify-content-center">
        <input type="submit" className="btn btn-primary btn-lg px-5" />
      </div>
    </form>
  );
};

export default EcontentInfoForm;
