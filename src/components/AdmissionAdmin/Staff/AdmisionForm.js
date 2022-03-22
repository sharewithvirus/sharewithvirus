import React, {useState} from 'react'
import { useNavigate } from "react-router";
import styles from "../../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import AddDocUploadAddForm from "./AddDocUploadAddForm"

function AdmissionForm(props) {
    const [ index, setIndex] = useState(0)
    const [ docUploadPopup, setDocUploadPopup ] = useState(false)

    const [ formDetailsData, setFormDetailsData ] = useState({

        studentProfilePhoto: true,
        studentFirstName: true,
        studentMiddleName: false,
        studentLastName: false,
        studentDOB: true,
        studentGender: true,
        studentNationality: false,
        studentMotherTongue: true,
        studentCast: false,
        studentCategory: false,
        studentReligion: false,
        studentBirthPlace: true,
        studentDistrict: false,
        studentState: false,
        studentParents_GuardianName: false,
        studentParents_GuardianContactNo: false,
        studentAddress: false,
        studentSelfContactNo: false,
        studentFilterField: false,
        studentFilterFieldName: "",
        studentAttachDocuments: [],
    });



    let firstbg, secondbg, thirdbg;
    {index === 0 ? firstbg = '#39C0ED' : index === 1 ? secondbg = '#39C0ED' : thirdbg = '#39C0ED'}

    function onAddDocUploadPopupHandler(d) {
        setDocUploadPopup(d);
        // setAddRoundPopup((prv) => {
        //   return !prv;
        // });
    }

    // 

    const addUploadDocFieldHandler = (data1) => {
        formDetailsData.studentAttachDocuments.push(data1);
        console.log(formDetailsData)
    };

    const handleADFormCheckInput = (e) => {
        setFormDetailsData({ ...formDetailsData, [e.target.name]: e.target.checked });
    };

    const handleADFormInput = (e) => {
        setFormDetailsData({ ...formDetailsData, [e.target.name]: e.target.value });
    };

    const saveHandler = (e) => {
        e.preventDefault();

        props.formSave(formDetailsData);
        props.changeShow(1)
    };


    
return (
    <div >
        <div className="d-flex justify-content-center">
            <div className={` ${styles.newAdmision}`}>
                <i class="fas fa-angle-left" onClick={(cl)=> props.changeShow(2)}></i>
                <div>
                    <h5>{props.formData.applicationTitle}</h5>
                </div>
                <div></div>
            </div>
        </div>
        <hr/>

                    <form onSubmit={saveHandler}>
                            <div className={styles.createplaylisttop}>
                                <div className={` row ${styles.createplaylisttop1}`}>
                                    <div className="col-12 d-flex justify-content-center">
                                        <img
                                            className={styles.appImages}
                                            src="/images/blank-profile.png"
                                            alt='avatar'
                                        />
                                        <img
                                            className={styles.imageEdit}
                                            src="/images/icon-imageEdit.svg"
                                            alt="edit"
                                        />
                                        </div>
                                     </div> {/* checked */}
                                    <input class="form-check-input" name="studentProfilePhoto" type="checkbox"  id="studentProfilePhotoCheck" onChange={handleADFormCheckInput} />
                                <div>
                                    <div className='d-flex justify-content-center'>
                                        <div className={`${styles.formtop} mt-3`}>
                                            <div className={styles.inputParent1}>
                                                <input className={`form-control ${styles.inputChild} `} style={{border: 'none'}} type="text" placeholder="First Name:"/>
                                                <input class="form-check-input" type="checkbox" name="studentFirstName"  id="studentFirstNameCheckBox" onChange={handleADFormCheckInput} />
                                            </div>
                                            <div className={styles.inputParent1}>
                                                
                                                <input className={`form-control ${styles.inputChild}`} style={{border: 'none'}} type="text" placeholder="Middle Name:"/>
                                                <input class="form-check-input" type="checkbox" name="studentMiddleName"  id="studentMiddleNameCheckBox" onChange={handleADFormCheckInput} />
                                            </div>
                                            <div className={styles.inputParent1}>
                                                
                                                <input className={`form-control ${styles.inputChild}`} style={{border: 'none'}} type="text" placeholder="Last Name:"/>
                                                <input class="form-check-input" type="checkbox" name="studentLastName"  id="studentLastNameCheckBox" onChange={handleADFormCheckInput} />
                                            </div>
                                        </div>
                                    </div>
                                    <div className='d-flex justify-content-center'>
                                        <div className={`${styles.formtop} mt-3`}>
                                            <div className={styles.inputParent1}>
                                                <input className={`form-control ${styles.inputChild} `} style={{border: 'none'}} type="text" placeholder="Birth Place:"/>
                                                <input class="form-check-input" type="checkbox" name="studentBirthPlace"  id="studentBirthPlaceCheckBox" onChange={handleADFormCheckInput} />
                                            </div>
                                            <div className={styles.inputParent1}>
                                                
                                                <input className={`form-control ${styles.inputChild}`} style={{border: 'none'}} type="text" placeholder="District:"/>
                                                <input class="form-check-input" type="checkbox" name="studentDistrict"  id="studentDistrictCheckBox" onChange={handleADFormCheckInput} />
                                            </div>
                                            <div className={styles.inputParent1}>
                                                
                                                <input className={`form-control ${styles.inputChild}`} style={{border: 'none'}} type="text" placeholder="State:"/>
                                                <input class="form-check-input" type="checkbox" name="studentState"  id="studentStateCheckBox" onChange={handleADFormCheckInput} />
                                            </div>
                                        </div>
                                    </div>

                                        <div className='d-flex justify-content-center'>
                                        <div className={`${styles.formtop} mt-3`}>
                                            <div className={styles.inputParent1}>
                                                <input className={`form-control ${styles.inputChild} `} style={{border: 'none'}} type="text" placeholder="DOB:"/>
                                                <input class="form-check-input" type="checkbox" name="studentDOB"  id="studentDOBCheckBox" onChange={handleADFormCheckInput} />
                                            </div>
                                            <div className={styles.inputParent1}>
                                                
                                                <input className={`form-control ${styles.inputChild}`} style={{border: 'none'}} type="text" placeholder="Gender:"/>
                                                <input class="form-check-input" type="checkbox" name="studentGender"  id="studentGenderCheckBox" onChange={handleADFormCheckInput} />
                                            </div>
                                            <div className={styles.inputParent1}>
                                                
                                                <input className={`form-control ${styles.inputChild}`} style={{border: 'none'}} type="text" placeholder="Mother Tongue:"/>
                                                <input class="form-check-input" type="checkbox" name="studentMotherTongue"  id="studentMotherTongueCheckBox" onChange={handleADFormCheckInput} />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className='d-flex justify-content-center'>
                                <div className={`${styles.formtop1} mt-3`}>
                                    <div className={styles.inputParent}>
                                        
                                        <input className={`form-control ${styles.inputChild}`} style={{border: 'none'}} type="text" placeholder="Caste:"/>
                                        <input class="form-check-input" type="checkbox" name="studentCast"  id="studentCastCheckBox" onChange={handleADFormCheckInput} />
                                    </div>
                                    <div className={styles.inputParent}>
                                        <input className={`form-control ${styles.inputChild}`} style={{border: 'none'}} type="text" placeholder="Caste Category:"/>
                                        <input class="form-check-input" type="checkbox" name="studentCategory"  id="studentCategoryCheckBox" onChange={handleADFormCheckInput} />
                                    </div>
                                    <div className={styles.inputParent}>
                                        
                                        <input className={`form-control ${styles.inputChild}`} style={{border: 'none'}} type="text" placeholder="Religion:"/>
                                        <input class="form-check-input" type="checkbox" name="studentReligion"  id="studentReligionCheckBox" onChange={handleADFormCheckInput} />
                                    </div>
                                    <div className={styles.inputParent}>
                                        
                                        <input className={`form-control ${styles.inputChild}`} style={{border: 'none'}} type="text" placeholder="Nationality:"/>
                                        <input class="form-check-input" type="checkbox" name="studentNationality"  id="studentNationalityCheckBox" onChange={handleADFormCheckInput} />
                                    </div>
                                </div>
                            </div>

                            <div className='d-flex justify-content-center'>
                                <div className={`${styles.formtop1} mt-3`}>
                                    <div className={styles.inputParent}>
                                        
                                        <input className={`form-control ${styles.inputChild}`} style={{border: 'none'}} type="text" placeholder="Parent Name:"/>
                                        <input class="form-check-input" type="checkbox" name="studentParents_GuardianName"  id="studentParents_GuardianNameCheckBox" onChange={handleADFormCheckInput} />
                                    </div>
                                    <div className={styles.inputParent}>
                                        
                                        <input className={`form-control ${styles.inputChild}`} style={{border: 'none'}} type="text" placeholder="Parent Contact No:"/>
                                        <input class="form-check-input" type="checkbox" name="studentParents_GuardianContactNo"  id="studentParents_GuardianContactNoCheckBox" onChange={handleADFormCheckInput} />
                                    </div>
                                    <div className={styles.inputParent}>
                                        
                                        <input className={`form-control ${styles.inputChild}`} style={{border: 'none'}} type="text" placeholder="Self Contact No:"/>
                                        <input class="form-check-input" type="checkbox" name="studentSelfContactNo"  id="studentSelfContactNoCheckBox" onChange={handleADFormCheckInput} />
                                    </div>
                                    <div className={styles.inputParent}>
                                        <input className={`form-control ${styles.inputChild}`} type="text" name="studentFilterFieldName" style={{border: 'none'}} placeholder="Filter Data Field" onChange={handleADFormInput} />
                                        <input class="form-check-input" type="checkbox" name="studentFilterField"  id="studentFilterFieldCheckBox" onChange={handleADFormCheckInput} />
                                    </div>
                                </div>
                            </div>
                            <div className='d-flex justify-content-center mt-3'>
                                <div className={`${styles.formtext}` }>
                                    <textarea
                                        rows='1'
                                        type="text"
                                        name="search"
                                        placeholder="Address..."
                                    />         
                                    <input class="form-check-input" type="checkbox" name="studentAddress"  id="studentAddressCheckBox" onChange={handleADFormCheckInput} />
                                </div>
                            </div>

                                    {formDetailsData &&
                                        formDetailsData.studentAttachDocuments.map((ct)=>(
                                            <>
                                                <div className=' mt-2 d-flex justify-content-center'>
                                                    <div className={`${styles.formtop1} mt-3`}>
                                                        <div className={styles.inputParent}>
                                                            
                                                            {/* <input className={`form-control ${styles.inputChild}`} style={{border: 'none'}} type="text" placeholder="Attach Document"/> */}
                                                            <label>{ct.fieldLabel}</label>
                                                        </div>
                                                        {ct.fileUploadField === true ? (
                                                        <div className={styles.inputParent}>
                                                            <input className={`form-control ${styles.inputChild}`} style={{border: 'none'}} type="text" placeholder={ct.fieldUploadPlaceHolder} />
                                                        </div>
                                                        ): ("")}
                                                        <div className={styles.inputParent}>
                                                        {ct.inputBox2 === true ? (
                                                            <input className={`form-control ${styles.inputChild}`} style={{border: 'none'}} type="text" placeholder={ct.inputBox2PlaceHolder} />
                                                            ): ("")}
                                                        </div>
                                                    </div>
                                                </div>
                                            </>
                                        ))
                                    }
                            <div className=' mt-2 d-flex justify-content-center'>
                                    <button type="button" onClick={()=>{onAddDocUploadPopupHandler(true)}} class="btn btn-primary">Add Upload Field</button>
                            </div>
                            <div className='d-flex justify-content-center mt-4 mb-4'>
                                    <button type="submit" class="btn btn-primary">Save Form</button>
                            </div>
                    </form>


    {docUploadPopup && 
    <AddDocUploadAddForm popupClose={onAddDocUploadPopupHandler} addUploadDocField={addUploadDocFieldHandler} />
    }
    </div>
)}

export default AdmissionForm