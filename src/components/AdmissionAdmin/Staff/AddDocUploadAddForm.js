import React, { useState } from "react";
import styles from "../../Home.module.css";

import "bootstrap/dist/css/bootstrap.min.css";

const AddDocUploadAddForm = (props) => {

    const [ attchDoc, setAttchDoc ] = useState(
        
        {
            "fieldLabel": "",
            "fileUploadField": false,
            "fieldUploadPlaceHolder": "",
            "inputBox2": false,
            "inputBox2PlaceHolder": "", 
        }
    )

    const handleUploadInput = (e) => {
        setAttchDoc({ ...attchDoc, [e.target.name]: e.target.value });
    };
    const handleUploadCheckInput = (e) => {
        setAttchDoc({ ...attchDoc, [e.target.name]: e.target.checked });
    };

    const saveHandler = (e) => {
        e.preventDefault();
        props.popupClose(false)
        props.addUploadDocField(attchDoc);
    };

    return (
    <>
        <div className={`${styles.popupbg}`}>
            <div
                className={`${styles.createpostContainer}`}
                style={({ position: "fixed", top: "37%", width: "37%" })}
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
                    style={{ background: "#fff", height: "320px" }}
                >
                    <div>
                        <h4>Add Input Field in Doc Upload</h4>
                    </div>
                    <div className="d-flex justify-content-center mt-5" >
                        <form onSubmit={saveHandler}>

                                <div className="row">
                                    <div className="col-12">
                                    <input
                                            type="text"
                                            name="fieldLabel"
                                            className="form-control mb-4"
                                            id="fieldLabel"
                                            placeholder="Doc Upload Field Label"
                                            onChange={handleUploadInput}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <p>Upload Field Toggle</p>
                                    </div>
                                    <div className="col-1">
                                        <input class="form-check-input" name="fileUploadField" type="checkbox" value="" id="fileUploadFieldCheckBox" onChange={handleUploadCheckInput} />
                                    </div>
                                    <div className="col-7">
                                        <input
                                            type="text"
                                            name="fieldUploadPlaceHolder"
                                            className="form-control mb-4"
                                            id="fileUploadField"
                                            placeholder="Upload Tab Field Place Holder"
                                            onChange={handleUploadInput}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-4">
                                        <p>Input Field Toggle</p>
                                    </div>
                                    <div className="col-1">
                                        <input class="form-check-input" name="inputBox2" type="checkbox" value="" id="inputBox2CheckBox" onChange={handleUploadCheckInput} />
                                    </div>
                                    <div className="col-7">
                                        <input
                                            type="text"
                                            name="inputBox2PlaceHolder"
                                            className="form-control mb-4"
                                            id="inputBox2PlaceHolder"
                                            placeholder="Input Field Place Holder"
                                            onChange={handleUploadInput}
                                        />
                                    </div>
                                </div>
                            



                            <div className="col-12 d-flex justify-content-center" >
                                <button
                                type="submit"
                                className="btn btn-outline-success"
                                >
                                Add Fields
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

export default AddDocUploadAddForm;
