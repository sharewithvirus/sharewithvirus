import React, { useState, useEffect } from 'react'
import styles from './Home.module.css'
import "bootstrap/dist/css/bootstrap.min.css";
import { requestURL } from './ReqUrl'
import axios from 'axios'

const StudentSearchResult = (props) =>{

    const [studentData, setStudentData] = useState([])
    const [first, setFirst] = useState(false)
    useEffect(() =>{
        axios.get(`${requestURL}/insdashboard/${props.insId ? props.insId : ''}`)
        .then((res) =>{
            setStudentData(res.data.institute.ApproveStudent)
            setFirst(true)
            // console.log(res.data.institute.ApproveStudent)
        })
      },[])

    const StudentAddHandler = (id) =>{
        axios.post(`${requestURL}/sport/class/${props.cid ? props.cid : ''}/student/${id}/add`)
        .then((res) =>{
            // alert(res.data.message)
        })
    }

    const StudentRemoveHandler = (id) =>{
        axios.post(`${requestURL}/sport/class/${props.cid ? props.cid : ''}/student/${id}/remove`)
        .then((res) =>{
            alert(res.data.message)
        })
    }

    return(
        <>
        <div className={`${styles.resultContainerStudent}`}>
                        {studentData &&
                        studentData
                            .filter((val) => {
                            if (props.value === "") {
                                return val;
                            } else if (
                                `${val.studentFirstName} ${val.studentMiddleName ? val.studentMiddleName : ''} ${val.studentLastName}`
                                .toLowerCase()
                                .includes(props.value.toLowerCase())
                            ) {
                                return val;
                            }
                            })
                            .map((val, i) => (
                            <>
                            <div
                                key={i}
                                className={styles.searchItem}
                            >
                                <>
                                    <img
                                    src={
                                        val.photoId === "1"
                                          ? "/images/image-boy2.png"
                                          : first
                                          ? `${requestURL}/search/insdashboard/studentdata/photo/${val.studentProfilePhoto}`
                                          : null
                                      }
                                    />
                                    <p>{`${val.studentFirstName} ${val.studentMiddleName ? val.studentMiddleName : ''} ${val.studentLastName}`} </p>
                                    {props.studentList && props.studentList.some((et) => et._id === val._id) ?
                                    <button type="button" className="btn btn-info px-5"
                                    onClick={() => {StudentRemoveHandler(val._id)}}
                                    >Remove</button>
                                    : 
                                    <button type="button" className="btn btn-primary px-5"
                                    onClick={() => {StudentAddHandler(val._id)}}
                                    >Add</button>
                                    }
                                </>
                            </div>
                            <hr/>
                            </>
                            ))}
                    </div>
        </>
    )
}

export default StudentSearchResult