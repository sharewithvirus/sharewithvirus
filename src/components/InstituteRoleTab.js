import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css'
import "bootstrap/dist/css/bootstrap.min.css";
import axios from 'axios'
import { requestURL } from './ReqUrl';

const InstituteRoleTab = (props) =>{
    const navigate = useNavigate()
    const [userStaffMemberData, setUserStaffMemberData] = useState([])
    const [userStudentData, setUserStudentData] = useState([])
    const [staffDepartmentData, setStaffDepartmentData] = useState([])
    const [staffClassData, setStaffClassData] = useState([])
    const [staffSubjectData, setStaffSubjectData] = useState([])
    const [staffAdmissionAdminData, setStaffAdmissionAdminData] = useState([])

    useEffect(() =>{
        axios.get(`${requestURL}/userdashboard/${props.uid ? props.uid : ''}`)
        .then((res) =>{
            setUserStaffMemberData(res.data.user.staff)
            setUserStudentData(res.data.user.student)
            setStaffDepartmentData(res.data.user.staff[0].staffDepartment)
            setStaffClassData(res.data.user.staff[0].staffClass)
            setStaffSubjectData(res.data.user.staff[0].staffSubject)
        })
        .catch((e) =>{
            console.log("Something Went Wrong")
        })
    },[])

    const InstituteRoleHandler = (e) =>{
        const role = e.target.value
        axios.get(`${requestURL}/${props.uid ? props.uid :''}/roleData/${role}`)
        .then((res) =>{
          if(res.data.student){
            navigate(`/user/${props.uid ? props.uid : ''}/studentdetail/${res.data.student._id}`)
          }
          else if(res.data.staff){
            if(staffDepartmentData.length >=1){
              navigate(`/user/${props.uid ? props.uid : ''}/staff/${res.data.staff._id}/department/${userStaffMemberData[0].staffDepartment[0]._id}`)
            } 
            else if(staffClassData.length >=1){
              navigate(`/user/${props.uid ? props.uid : ''}/staff/${res.data.staff._id}/department/${userStaffMemberData[0].staffClass[0]._id}`)
            }
            else if(staffSubjectData.length >=1){
              navigate(`/user/${props.uid ? props.uid : ''}/staff/${res.data.staff._id}/department/${userStaffMemberData[0].staffSubject[0]._id}`)
            }
            else if(staffDepartmentData.length >=1 && staffClassData.length >=1 && staffSubjectData.length >=1){
              navigate(`/user/${props.uid ? props.uid : ''}/staff/${res.data.staff._id}/department/${userStaffMemberData[0].staffDepartment[0]._id}`)
            }
            else if(staffDepartmentData.length >=1 && staffClassData.length >=1){
              navigate(`/user/${props.uid ? props.uid : ''}/staff/${res.data.staff._id}/department/${userStaffMemberData[0].staffDepartment[0]._id}`)
            }
            else if(staffClassData.length >=1 && staffSubjectData.length >=1){
              navigate(`/user/${props.uid ? props.uid : ''}/staff/${res.data.staff._id}/department/${userStaffMemberData[0].staffClass[0]._id}`)
            }
            else if(staffSubjectData.length >=1 && staffDepartmentData.length >=1){
              navigate(`/user/${props.uid ? props.uid : ''}/staff/${res.data.staff._id}/department/${userStaffMemberData[0].staffSubject[0]._id}`)
            }
            else if(!(staffDepartmentData.length >=1 && staffClassData.length >=1 && staffSubjectData.length >=1)){
              navigate(`/userdashboard/${props.uid ? props.uid : ''}`)
            }
            else{

            }
          }
          else{
    
          }
        })
        .catch((e) =>{
            console.log("Something Went Wrong")
        })
      }

    return (
        <>
        {userStaffMemberData || userStudentData ? 
        <select className="form-control" style={{backgroundColor: '#afafaf', color: 'black'}}
        onChange={InstituteRoleHandler}
        >     
                  <option value="Select Institute Role">Select Institute Role</option>                         
                  {userStaffMemberData && userStaffMemberData.map((st) =>(
                        st.staffStatus === 'Not Approved' ?
                        <option value={st._id} disabled>{st.institute.insName} Staff</option>
                        :
                        st.staffStatus === 'Rejected' ? '' :
                        <option value={st._id}>{st.institute.insName} Staff</option>
                          ))}
                        {userStudentData && userStudentData.map((st) =>(
                        st.studentStatus === 'Not Approved' ?
                          <option value={st._id} disabled>{st.institute.insName} Student</option>
                        :
                        st.studentStatus === 'Rejected' ? '' :
                          <option value={st._id}>{st.institute.insName} Student</option>
                        ))}  
                        </select>
                        : ''}
        </>
    )
}

export default InstituteRoleTab