import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios'
import { requestURL } from "../ReqUrl";
import MemberWrapper from "../MemberWrapper";

const StaffMemberDetail = () => {
  const navigate = useNavigate();
  
  const params = useParams()

  // const [userStaffMemberData, setUserStaffMemberData] = useState([])
  // const [userStudentData, setUserStudentData] = useState([])
  // const [staffDesignation, setStaffDesignation] = useState([])
  const [staffDepartmentData, setStaffDepartmentData] = useState([])
  const [staffClassData, setStaffClassData] = useState([])
  const [staffSubjectData, setStaffSubjectData] = useState([])

  useEffect(() =>{
      // axios.get(`${requestURL}/userdashboard/${params.id}`)
      // .then((res) =>{
      //     setUserStaffMemberData(res.data.user.staff)
      //     setUserStudentData(res.data.user.student)
      // })
      // .catch((e) =>{
      //     console.log("Something Went Wrong")
      // })
      axios.get(`${requestURL}/staffdesignationdata/${params.sid}`)
      .then((res) =>{
          // setStaffDesignation(res.data.staff)
          setStaffDepartmentData(res.data.staff.staffDepartment)
          setStaffClassData(res.data.staff.staffClass)
          setStaffSubjectData(res.data.staff.staffSubject)
      })
      .catch((e) =>{
          console.log("Something Went Wrong")
      })

  },[])

  return (
    <>
                  <MemberWrapper uid={params.id} sid={params.sid}>
                  {staffDepartmentData.length >=1 ? '' : 
                staffClassData.length >=1 ? '' 
                : staffSubjectData.length >=1 ? '' :
                  staffDepartmentData.length >=1 && staffClassData.length >=1 && staffSubjectData.length >=1 ? ''
                  : staffDepartmentData.length >=1 && staffClassData.length >=1 ? ''
                  : staffClassData.length >=1 && staffSubjectData.length >=1 ? ''
                  : staffSubjectData.length >=1 && staffDepartmentData.length >=1 ? '' 
                  : !(staffDepartmentData.length >=1 && staffClassData.length >=1 && staffSubjectData.length >=1) ? ''
                  : ''}
                </MemberWrapper>
    </>
  );
};

export default StaffMemberDetail;
