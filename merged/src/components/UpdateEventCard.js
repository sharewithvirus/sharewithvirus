import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { Dialog, DialogTitle, DialogContent } from "@mui/material";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { Success, Danger } from "./SnackBar";
import { requestURL } from "./ReqUrl";

const UpdateEventCard = (props) => {
  const navigate = useNavigate();
  const params = useParams();

  const [eventData, setEventData] = useState({
    sportEventName: props.data.sportEventName,
    sportEventCategory:  props.data.sportEventCategory,
    sportEventPlace:  props.data.sportEventPlace,
    sportEventDate:  props.data.sportEventDate,
    sportEventDescription:  props.data.sportEventDescription
  });

  const EventDataHandlerChange = (e) => {
    e.preventDefault();    
    axios
      .patch(
        `${requestURL}/sport/${props.sid ? props.sid : ''}/event/${props.eid ? props.eid : ''}/update`, eventData)
      .then((res) => {
        if (res.data.message) {
          props.playEditFunction(false)
        }
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  };


  return (
    <>
    <Dialog open={props.playEdit}>
        <DialogTitle>
        Edit {props.data.sportEventName}
        <div className="col-12 d-flex justify-content-end">
                <img
                  src="/images/close-icon.svg"
                  alt="user"
                  data-toggle="tooltip"
                  data-placement="bottom"
                  title="Close"
                  onClick={() => props.playEditFunction(false)}
                  style={{ width: "1.5rem", cursor: "pointer" }}
                />
              </div>
        </DialogTitle>
        <DialogContent>
        <form onSubmit={EventDataHandlerChange}>
          <div className="row mt-2">
            <div className="col-md-6 my-2">
            <label htmlFor="bankAc" className="form-group mb-2">Event Name <span className="text-danger mx-1" style={{fontSize: 'larger'}}>*</span></label>
              <input
                type="text"
                name="sportEventName"
                className="form-control"
                id="bankAc"
                value={eventData.sportEventName}
                onChange={(e) => setEventData({...eventData, sportEventName: e.target.value})}

              />
            </div>
            <div className="col-md-6 my-2">
            <label htmlFor="bankNumber" className="form-group mb-2">Event Category <span className="text-danger mx-1" style={{fontSize: 'larger'}}>*</span></label>
              <input
                type="text"
                name="sportEventCategory"
                className="form-control"
                id="bankNumber"
                value={eventData.sportEventCategory}
                onChange={(e) => setEventData({...eventData, sportEventCategory: e.target.value})}

              />
            </div>
            <div className="col-md-6 my-2">
            <label htmlFor="bankReNumber" className="form-group mb-2">Event Place <span className="text-danger mx-1" style={{fontSize: 'larger'}}>*</span></label>
              <input
                type="text"
                name="sportEventPlace"
                className="form-control"
                id="bankReNumber"
                value={eventData.sportEventPlace}
                onChange={(e) => setEventData({...eventData, sportEventPlace: e.target.value})}

              />
            </div>
            <div className="col-md-6 my-2">
            <label htmlFor="bankIFSC" className="form-group mb-2">Event Date <span className="text-danger mx-1" style={{fontSize: 'larger'}}>*</span></label>
              <input
                type="date"
                name="sportEventDate"
                className="form-control"
                id="bankIFSC"
                value={eventData.sportEventDate}
                onChange={(e) => setEventData({...eventData, sportEventDate: e.target.value})}

              />
            </div>
            <div className="col-md-6 my-2">
            <label htmlFor="bankPhoneNumber" className="form-group mb-2">Event Description </label>
              <input
                type="text"
                name="sportEventDescription"
                className="form-control"
                id="bankPhoneNumber"
                value={eventData.sportEventDescription}
                onChange={(e) => setEventData({...eventData, sportEventDescription: e.target.value})}
              />
            </div>
            <div className="col-12 mb-3">
              <button
                type="submit"
                className="btn btn-outline-primary mt-4 px-5 mx-auto"
              >
                Edit Details
              </button>
            </div>
            </div>
          </form>
        </DialogContent>
    </Dialog>
          
    </>
  )
};

export default UpdateEventCard;