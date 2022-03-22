import React, { useState, useEffect } from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "bootstrap/dist/css/bootstrap.min.css";
import moment from "moment";
import axios from "axios";
import styles from "./Home.module.css";
import { requestURL } from "./ReqUrl";
import { Success } from "./SnackBar";
const DCalendar = (props) => {
  const [dateState, setDateState] = useState(new Date());
  // const [departmentStatus, setDepartmentStatus] = useState("");
  const [departmentData, setDepartmentData] = useState("");
  const [holidayData, setHolidayData] = useState([]);
  const [adminMsg, setAdminMsg] = useState({
    showMessages: false,
    showMessagesDanger: false,
    msg: "",
  });
  const [dateData, setDateData] = useState({
    dHolidayReason: "",
  });

  const changeDate = (e) => {
    const { name, value } = e.target;
    setDateData({
      ...dateData,
      [name]: value,
    });
  };

  const changeDateHandler = (e) => {
    // e.preventDefault()
    if (dateData.dHolidayReason === "") {
      setAdminMsg({ showMessages: true, msg: "Reason are required" });
    } else {
      axios
        .post(`${requestURL}/department/holiday/${props.departId}`, {
          dateData,
          dateStatus: moment(e).format("YYYY-MM-DD"),
        })
        .then((res) => {
          setAdminMsg({ showMessages: true, msg: res.data.message });
          // setDepartmentStatus(res.data.status);
        })
        .catch((e) => {
          console.log("Something Went Wrong");
        });
      setDateState(e);
    }
  };

  useEffect(() => {
    axios
      .get(`${requestURL}/holiday/${props.departId}`)
      .then((res) => {
        setHolidayData(res.data.depart.holiday);
        setDepartmentData(res.data.depart);
      })
      .catch((e) => {
        console.log("Something went wrong");
      });
  }, []);
  // }, [departmentData]);

  return (
    <>
      {adminMsg.showMessages ? <Success msg={adminMsg.msg} /> : null}
      <h4 className="my-2">({moment(dateState).format("Do MMMM YYYY")})</h4>
      <div className="row">
        <div className="col-11 col-md-7 my-4">
          <input
            type="text"
            name="dHolidayReason"
            id="reason"
            className="form-control mx-5"
            placeholder="Enter Holiday Reason"
            onChange={changeDate}
            required
          />
        </div>
      </div>
      <div className="mx-5 my-5">
        <div className="row">
          <div className="col-12 col-md-6">
            <Calendar value={dateState} onChange={changeDateHandler} required />
          </div>
          <div className="col-12 col-md-6">
            <div className="my-5">
              <h4>List of Holidays (Department)</h4>
              <ul>
                {holidayData &&
                  holidayData.map((at) => (
                    <li className={`${styles.dlogoText} text-success mt-2`}>
                      ( {moment(at.dDate).format("DD-MM-YYYY")} ){" "}
                      {at.dHolidayReason}
                    </li>
                  ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DCalendar;
