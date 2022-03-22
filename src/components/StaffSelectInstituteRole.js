import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "./Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { requestURL } from "./ReqUrl";

const StaffSelectInstituteRole = (props) => {
  const navigate = useNavigate();

  const params = useParams();

  const [staffDepartmentData, setStaffDepartmentData] = useState([]);
  const [staffClassData, setStaffClassData] = useState([]);
  const [staffSubjectData, setStaffSubjectData] = useState([]);
  const [staffFinanceData, setStaffFinanceData] = useState([]);
  const [staffSportData, setStaffSportData] = useState([])
  const [staffSportClassData, setStaffSportClassData] = useState([])
  const [staffDesignation, setStaffDesignation] = useState('')

  useEffect(() => {
    axios
      .get(`${requestURL}/staffdesignationdata/${props.sid}`)
      .then((res) => {
        const department = res.data.staff.staffDepartment;
        const classes = res.data.staff.staffClass;
        const subject = res.data.staff.staffSubject;
        setStaffDesignation(res.data.staff)
        setStaffDepartmentData(department);
        setStaffClassData(classes);
        setStaffSubjectData(subject);
        setStaffFinanceData(res.data.staff.financeDepartment)
        setStaffSportData(res.data.staff.sportDepartment)
        setStaffSportClassData(res.data.staff.staffSportClass)
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  }, []);

  const selectChange = (value) => {
    navigate(`/${value}`);
  };

  return (
    <>
      <select
        className={`form-control-plaintext my-2 mx-2 ${styles.staffSelectWidth}`}
        name="usermembertitle"
        onChange={(e) => selectChange(e.target.value)}
        style={{backgroundColor: '#afafaf', cursor: "pointer", color: 'black' }}
      >
        <option value=" Select a designation " className="text-center">
        -------------------------- Select a Designation --------------------------
        </option>

        {staffDepartmentData &&
          staffDepartmentData.map((st) => (
            <option
              className="text-center"
              value={`user/${props.id}/staff/${props.sid}/department/${st._id}`}
            >{`${st.dName} Department Head - (${st.dTitle})`}</option>
          ))}
        {staffClassData &&
          staffClassData.map((st) => (
            <option
              className="text-center"
              value={`user/${props.id}/staff/${props.sid}/class/${st._id}`}
            >{`${st.className} - ${st.classTitle} - (${st.classHeadTitle}) ---- ${st.batch ? st.batch.batchName : ''}`}</option>
          ))}
        {staffSubjectData &&
          staffSubjectData.map((st) => (
            <option
              className="text-center"
              value={`user/${props.id}/staff/${props.sid}/subject/${st._id}`}
            >{`${st.subjectName} - ${st.class.className}-${st.class.classTitle} - (${st.subjectTitle}) ---- ${st.class.batch ? st.class.batch.batchName : ''}`}</option>
          ))}
        {staffFinanceData &&
          staffFinanceData.map((st) => (
            <option
              className="text-center"
              value={`user/${props.id}/staff/${props.sid}/finance/${st._id}`}
            >{`Head (Finance Department)`}</option>
          ))}
  
    {staffDesignation.elearning &&
          staffDesignation.elearning.map((st) => (
            <option
              className="text-center"
              value={`user/${props.id}/staff/${props.sid}/e-content/${st._id}`}
            >
              E-Content Operator Head
            </option>
          ))}
        {staffDesignation.library &&
          staffDesignation.library.map((st) => (
            <option
              className="text-center"
              value={`user/${props.id}/staff/${props.sid}/library/${st._id}`}
            >
              Library Operator Head
            </option>
          ))}
        
        {staffSportData &&
          staffSportData.map((st) => (
            <option
              className="text-center"
              value={`user/${props.id}/staff/${props.sid}/sport/${st._id}`}
            >{`Sports and Arts Head Coach (Sport Department)`}</option>
          ))}

        {staffSportClassData &&
          staffSportClassData.map((st) => (
            <option
              className="text-center"
              value={`user/${props.id}/staff/${props.sid}/sport/profile/class/${st._id}`}
            >{`Sports and Arts Class Coach (Sport Department)`}</option>
          ))}
      </select>
    </>
  );
};

export default StaffSelectInstituteRole;
