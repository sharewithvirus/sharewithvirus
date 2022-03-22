import React,{useState} from 'react'
import styles from './Home.module.css';
import { Modal, Button } from 'react-bootstrap';

export function TestSetCard(props) {
    const [show, setShow] = useState(false);
    const [index, setIndex] = useState()
    return (
        <>
        <div className={styles.testSetCard}>
            <div className={styles.testSetCardHead}>
                <h5>Name of Set</h5>
                </div>
                <h6>Marks: 20</h6>
                <h6>Questions: 20</h6>
            <div className={styles.testSetCardFooter}>
            <button type="button" class="btn btn-outline-secondary" onClick={()=> setShow(true)}>Take Test</button>
            </div>
        </div>

        <div className={styles.mcqModal}>
            <Modal show={show} centered dialogClassName={styles.myModal}>
                <div className={styles.mcqModalInner}>
                    {/* <Modal.Header>
                        
                        </Modal.Header>
                        <Modal.Body>
                        
                        </Modal.Body>
                        <Modal.Footer>
                            <Button onClick={()=> setShow(false)}>Close</Button>
                        </Modal.Footer> */}
                        <>
                        <div className={styles.takeTest}>
                            <h5>Name: Test Name</h5>
                            <input type="date" class="form-control" id="usr"/>
                        </div>
                        <div className={styles.takeTest}>
                            <h5>Name: Test Name</h5>
                            <input type="time" class="form-control" id="usr"/>
                        </div>
                        </> 
                </div>
                <div className={styles.scoreGlobal}>
                 <button type="button" class="btn btn-outline-secondary" onClick={()=>props.changeIndex(1)}>Take Test</button>
            </div>
            </Modal>
        </div>
        </>
    )
}



export function TestSetCard2() {
    return (
        <>
        <div className={styles.testSetCard}>
        <div className={styles.testSetCardHead}>
                <h5>Exam Name</h5>
                </div>
                <h6>Class: 12th</h6>
                <h6>Stream: Science</h6>
                <h6>Subject: Chemistry</h6>
                <h6>Mode: Online</h6>
            <div className={styles.testSetCardFooter}>
            <button type="button" class="btn btn-outline-secondary" >Close</button>
        </div>
         </div>
        </>
    )
}
