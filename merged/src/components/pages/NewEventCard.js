import React, { useState } from "react";
import { useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { requestURL } from "../ReqUrl";

const NewEventCard = (props) => {
  const params = useParams();
  const [eventData, setEventData] = useState({
    sportEventName: '',
    sportEventCategory: '',
    sportEventPlace: '',
    sportEventDate: '',
    sportEventDescription: ''
  });

  const EventDataHandler = (e) => {
    const { name, value } = e.target;
    setEventData({
      ...eventData,
      [name]: value,
    });
  };

  const EventDataHandlerChange = (e) => {
    e.preventDefault();
    axios
      .post(
        `${requestURL}/sport/${props.sid ? props.sid : ''}/event`,
        eventData
      )
      .then((res) => {
        if (
          res.data.message
        ) {
          props.setAddClassFunction(false);
        }
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  };

  return props.trigger ? (
    <>
      <div className={styles.popupbg}>
        <div
          className={`col col-sm-8 col-md-8 col-lg-6 col-xl-6  ${styles.popupScreen} ${styles.about}`}
        >
          <div
            className={styles.closePopupBtn}
            onClick={() => props.setAddClassFunction(false)}
          >
            <i class="fas fa-times"></i>
          </div>
          <h4 className="mb-2">Add Event</h4>
          <form onSubmit={EventDataHandlerChange}>
            <div className="row my-2">
            <div className="col-12 col-md-6 mt-2">
            <label htmlFor="eventName" className="form-group mb-1">Enter Event Name 
            <span className={styles.requireField}>*</span>
            </label>
              <input
                type="text"
                name="sportEventName"
                id="eventName"
                className="form-control"
                placeholder="Enter Event Name " 
                onChange={EventDataHandler}
                required
              />
            </div>
            <div className="col-12 col-md-6 mt-2">
            <label htmlFor="eventCategory" className="form-group mb-1">Select Event Category 
            <span className={styles.requireField}>*</span>
            </label>
              <select
                name="sportEventCategory"
                className="form-control"
                id="eventCategory"
                onChange={EventDataHandler}
                required
              >
                <option value="Select Event Category" selected disabled>
                  Select Event Category
                </option>
                <option value="Intra">
                  Intra
                </option>
                <option value="Inter/State/National">
                  Inter/State/National
                </option>
              </select>
            </div>
            <div className="col-12 col-md-6 mt-2">
            <label htmlFor="eventPlace" className="form-group mb-1">Enter Event Place
            <span className={styles.requireField}>*</span>
            </label>
              <input
                type="text"
                name="sportEventPlace"
                className="form-control"
                id="eventPlace"
                placeholder="Enter Event Place " 
                onChange={EventDataHandler}
                required
              />
            </div>
            <div className="col-12 col-md-6 mt-2">
            <label htmlFor="eventDate" className="form-group mb-1">Enter Event Date 
            <span className={styles.requireField}>*</span>
            </label>
              <input
                type="date"
                name="sportEventDate"
                id="eventDate"
                className="form-control"
                placeholder="Enter Event Date " 
                onChange={EventDataHandler}
                required
              />
            </div>
            <div className="col-12 mt-2">
            <label htmlFor="eventDescription" className="form-group mb-1">Enter Event Description 
            <span className={styles.requireField}>*</span>
            </label>
              <textarea
                type="text"
                name="sportEventDescription"
                className="form-control"
                id="eventDescription"
                rows="2"
                cols="20"
                placeholder="Write Something About Event " 
                onChange={EventDataHandler}
                required
              ></textarea>
            </div>
            </div>
            <div className="col-12 mb-2">
              <button
                type="submit"
                className="btn btn-outline-primary mt-4 px-5 mx-auto"
              >
                <i class="fas fa-plus mt-1 mx-1"></i>Add Event
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  ) : (
    ""
  );
};

export default NewEventCard;
