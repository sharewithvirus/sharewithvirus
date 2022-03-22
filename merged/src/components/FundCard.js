import React from 'react'
import styles from "./Home.module.css";
import axios from 'axios'
import { requestURL } from './ReqUrl'

export function FundCard(props) {

    const IncorrectFeeHandler = (id) =>{
        axios.post(`${requestURL}/finance/${props.id ? props.id : ''}/class/${id}/fee/incorrect`)
        .then((res) =>{
            console.log(res)
        })
    }

    const ReceievedFeeHandler = (cid, iid) =>{
        axios.post(`${requestURL}/finance/${props.id ? props.id : ''}/class/${cid}/fee/${iid}/submit`)
        .then((res) =>{
            alert(res.data.message)
        })
    }

    return (
        <>
        

        {props.data && props.data.map((dt) => (
            dt.receieveFee && dt.receieveFee.map((ft) => (
        <div className='d-flex justify-content-center'>
            <div className={styles.funn}>
                <div className={styles.funnInternal}>
                    <img className={styles.dlogoImages} src="https://png.pngtree.com/png-clipart/20190515/original/pngtree-announcement-icon-png-image_3660817.jpg"/>
                    <div className={styles.funflex}>
                        <div className={styles.funflexinternal}>
                            <p>{ft.feeName}</p>
                            <p>{dt.className}</p>
                            <p>Amt: {ft.offlineFee}</p>
                        </div>
                        <p >{dt.classTeacher ? 
                        `${dt.classTeacher.staffFirstName} 
                        ${dt.classTeacher.staffMiddleName ? dt.classTeacher.staffMiddleName : ''}
                         ${dt.classTeacher.staffLastName}`
                        : ''
                        }</p>
                    </div>
                </div >
                <div className={styles.funnbtn}>
                    <button type="button" className={`btn btn-outline-secondary `}
                    onClick={() => {IncorrectFeeHandler(dt._id)}}
                    >
                        Incorrect
                    </button>
                    <button type="button" className={`btn btn-outline-secondary `}
                    onClick={() => {ReceievedFeeHandler(dt._id, ft._id)}}
                    >
                        Received
                    </button>
                </div>
            </div>
        </div>
            ))
        ))}
    </>
    )
}


