import React from "react";
const LibraryInfo = (props) => {
  return (
    <form className="row">
      <div className="col-12 col-md-4 mt-4">
        <label htmlFor="libraryHead" className="form-group mb-2">
          Library Head
        </label>
        <input
          type="text"
          className="form-control"
          id="libraryHead"
          readOnly
          disabled
          value={
            props.data
              ? `${props.data.libraryHead.staffFirstName} ${
                  props.data.libraryHead.staffMiddleName
                    ? props.data.libraryHead.staffMiddleName
                    : ""
                } ${props.data.libraryHead.staffLastName}`
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
    </form>
  );
};

export default LibraryInfo;
