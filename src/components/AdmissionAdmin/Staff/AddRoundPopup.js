import React, { useState } from "react";
import styles from "../../Home.module.css";
import moment from 'moment';

import "bootstrap/dist/css/bootstrap.min.css";

const AddRoundPopup = (props) => {

    const [ formDetailsData, setFormDetailsData ] = useState({
            roundName: "",
            applicationFee: "",
            applicationStartDate: "",
            applicationLastDate: "",
            candidateSelectionLastDate: "",
            admissionFee: "",
            admissionLastDate: "",
        });

    const handleRoundInput = (e) => {
        setFormDetailsData({ ...formDetailsData, [e.target.name]: e.target.value });
    };

    const handleRoundDateInput = (e) => {
        setFormDetailsData({ ...formDetailsData, [e.target.name]: moment(e.target.value).format('DD/MM/YYYY') });
    };

    const saveHandler = (e) => {
        e.preventDefault();

        console.log(formDetailsData)
        props.popupClose(false)
        props.addRound(formDetailsData);
    };

    return (
    <>
        <div className={`${styles.popupbg}`}>
            <div
                className={`${styles.roundPopUpContainer}`}
                style={({ position: "fixed" })}
            >
            <div
                className={styles.closePopupBtn}
                onClick={()=>{props.popupClose(false)}}
            >
                <i class="fas fa-times"></i>
            </div>
            <div className="d-flex justify-content-center">
                <div
                    className="w-100  p-3"
                    style={{ background: "#fff", height: "580px" }}
                >
                    <div>
                        <h4>Add Rounds in Application Application</h4>
                    </div>
                    <div className="d-flex justify-content-center mt-5" >
                        <form onSubmit={saveHandler}>

                            <div className="col-12">
                                <input
                                    type="text"
                                    name="roundName"
                                    className="form-control mb-4"
                                    id="name"
                                    placeholder="Enter Round Name"
                                    onChange={handleRoundInput}
                                />
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <input
                                        type="Number"
                                        name="applicationFee"
                                        className="form-control mb-4"
                                        id="name"
                                        placeholder="Enter Application Fee"
                                        onChange={handleRoundInput}
                                    />
                                </div>
                                
                            </div>

                            <div className="row">
                                <div className="col-8">
                                    <lable>
                                        Enter Application Start Date.
                                    </lable>
                                </div>
                                <div className="col-4">
                                        <input
                                            type="Date"
                                            name="applicationStartDate"
                                            className="form-control mb-4"
                                            id="applicationStartDateID"
                                            placeholder="Enter Application Start Date"
                                            onChange={handleRoundInput}
                                        />
                                    </div>
                            </div>

                            <div className="row">
                                <div className="col-8">
                                    <lable>
                                        Enter Application Apply Last Date.
                                    </lable>
                                </div>
                                <div className="col-4">
                                        <input
                                            type="Date"
                                            name="applicationLastDate"
                                            className="form-control mb-4"
                                            id="name"
                                            placeholder="Enter Application Last Date"
                                            onChange={handleRoundInput}
                                        />
                                    </div>
                            </div>

                            <div className="row">
                                <div className="col-8">
                                    <lable>
                                        Enter Candidate Selection Last Date.
                                    </lable>
                                </div>
                                <div className="col-4">
                                    <input
                                        type="Date"
                                        name="candidateSelectionLastDate"
                                        className="form-control mb-4"
                                        id="name"
                                        placeholder="Enter Candidate Selection Last Date"
                                        onChange={handleRoundInput}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <input
                                        type="Number"
                                        name="admissionFee"
                                        className="form-control mb-4"
                                        id="name"
                                        placeholder="Enter Admission Fee"
                                        onChange={handleRoundInput}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-8">
                                    <lable>
                                        Enter Admission Last Date.
                                    </lable>
                                </div>
                                <div className="col-4">
                                    <input
                                        type="Date"
                                        name="admissionLastDate"
                                        className="form-control mb-4"
                                        id="name"
                                        placeholder="Enter Admission Last Date"
                                        onChange={handleRoundInput}
                                    />
                                </div>
                            </div>

                            <div className="col-12">
                                <button
                                type="submit"
                                className="btn btn-outline-success"
                                // onClick={saveHandler}
                                >
                                Add Round to Application
                                </button>
                            </div>
                        </form>
                    </div>
                    </div>
                </div>
            </div>
        </div>

    </>
);
};

export default AddRoundPopup;
