import React from "react";
const EcontentInfo = (props) => {
  return (
    <form className="row">
      <div className="col-12 col-md-4 mt-4">
        <label htmlFor="elearningHead" className="form-group mb-2">
          Elearning Head
        </label>
        <input
          type="text"
          className="form-control"
          id="elearningHead"
          readOnly
          disabled
          value={
            props.data
              ? `${props.data.elearningHead.staffFirstName} ${
                  props.data.elearningHead.staffMiddleName
                    ? props.data.elearningHead.staffMiddleName
                    : ""
                } ${props.data.elearningHead.staffLastName}`
              : ""
          }
        />
      </div>
      <div className="col-12 col-md-4 mt-4">
        <label htmlFor="emailId" className="form-group mb-2">
          Email
        </label>
        <input
          type="text"
          className="form-control"
          id="emailId"
          readOnly
          disabled
          value={props.data ? props.data.emailId : ""}
        />
      </div>
      <div className="col-12 col-md-4 mt-4">
        <label htmlFor="phoneNumber" className="form-group mb-2">
          Phone Number
        </label>
        <input
          type="text"
          className="form-control"
          id="phoneNumber"
          readOnly
          disabled
          value={props.data ? props.data.phoneNumber : ""}
        />
      </div>
      <div className="col-12 col-md-4 mt-4">
        <label htmlFor="vision" className="form-group mb-2">
          Vision
        </label>
        <input
          type="text"
          className="form-control"
          readOnly
          disabled
          id="vision"
          value={props.data ? props.data.vision : ""}
        />
      </div>
      <div className="col-12 col-md-4 mt-4">
        <label htmlFor="mission" className="form-group mb-2">
          Mission
        </label>
        <input
          type="text"
          className="form-control"
          id="mission"
          readOnly
          disabled
          value={props.data ? props.data.mission : ""}
        />
      </div>
      <div className="col-12 col-md-4 mt-4">
        <label htmlFor="about" className="form-group mb-2">
          About
        </label>
        <input
          type="text"
          className="form-control"
          id="about"
          readOnly
          disabled
          value={props.data ? props.data.about : ""}
        />
      </div>
      <div className="col-12 col-md-4 mt-4">
        <label htmlFor="award" className="form-group mb-2">
          Award
        </label>
        <input
          type="text"
          className="form-control"
          id="award"
          readOnly
          disabled
          value={props.data ? props.data.award : ""}
        />
      </div>
      <div className="col-12 col-md-4 mt-4">
        <label htmlFor="achievement" className="form-group mb-2">
          Achievement
        </label>
        <input
          type="text"
          className="form-control"
          id="achievement"
          readOnly
          disabled
          value={props.data ? props.data.achievement : ""}
        />
      </div>
      <div className="col-12 col-md-4 mt-4">
        <label htmlFor="activities" className="form-group mb-2">
          Activities
        </label>
        <input
          type="text"
          className="form-control"
          id="activities"
          readOnly
          disabled
          value={props.data ? props.data.activities : ""}
        />
      </div>
    </form>
  );
};

export default EcontentInfo;
