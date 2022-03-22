import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import NavbarTopInstitute from "../NavbarTopInstitute";
import AboutSection from "../AboutSection";
import NavbarBottomInstitute from "../NavbarBottomInstitute";
import BackButton from "../BackButton";
import axios from "axios";
import { requestURL } from "../ReqUrl";
import { Success, Danger } from "../SnackBar";
import NewFieldCard from '../NewFieldCard'
import { Multiselect } from "multiselect-react-dropdown";

const InstituteStudentIDCard = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [insData, setInsData] = useState("");
  const [departmentData, setDepartmentData] = useState([]);
  // const [options, setOptions] = useState();
  const [addClass, setAddClass] = useState(false);

  const setAddClassFunction = () => {
    setAddClass(false);
  };

  useEffect(() => {
    axios
      .get(`${requestURL}/insdashboard/${params.id}`)
      .then((res) => {
        setInsData(res.data.institute);
        setDepartmentData(res.data.institute.depart);
        // let data = res.data.institute.idCardField
        //   const ListData = [];
  
        //   for (let i = 0; i < data.length; i++) {
        //     let field = {
        //       fieldname: `${data[i].fieldName}`,
        //       fieldId: `${data[i]._id}`
        //     };
        //     ListData.push(field);
        //   }
        //   setOptions(ListData);
      })
      .catch((e) => {
        console.log("Something went wrong");
      });
  }, []);

  // const [fieldData, setFieldData] = useState([])

  // function onSelect(selectedList, selectedItem) {
  //   setFieldData(selectedList);
  // }

  // function onRemove(selectedList, removedItem) {
  //   setFieldData(selectedList);

  // }

  const [batchData, setBatchData] = useState([])

  const DepartmentBatchDataHandler = (e) =>{
      var id = e.target.value
      axios.get(`${requestURL}/department/${id}`)
      .then((res) =>{
          setBatchData(res.data.department.batches)
      })
      .catch((e) =>{
          console.log('something went wrong')
      })
  }


  const [batch, setBatch] = useState({
      batchId: '',
      // fieldText: ''
  })

  const BatchDataHandler = (e) =>{
    const { name, value } = e.target
    setBatch({
        ...batch,
        [name]: value
    })
  }

  const BatchDataHandlerChange = (e) =>{
      e.preventDefault()
      // batch.fieldText = fieldData
      if(batch.batchId === ''){
          alert('must be filled')
      }
      else{
      axios.post(`${requestURL}/ins/${params.id}/id-card/export`, batch)
      .then((res) =>{
      })
      .catch((e) =>{
          console.log('something went wrong')
      })
    }
  }




  return (
    <>
      <div className={styles.mainScreen}>
        <NavbarTopInstitute id={params.id} />
        <div className={`${styles.mainContent} `}>
          <div className="row">
            <div className={`col col-lg-4 col-xl-3 ${styles.leftside}`}>
              <div className={styles.leftBar}>
                <AboutSection id={params.id} />
                <div className={` ${styles.about} ${styles.leftMenu}`}>
                <div
                    className={`mt-5 ${styles.dabout} ${styles.active}`}
                    onClick={() => navigate(`/allstaff/${params.id}`)}
                  >
                    <img
                    src="/images/staff-icon.svg"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Staff"
                  /> Staff
                  </div>
                  <div
                    className={`${styles.dabout} mt-3 mb-2`}
                    onClick={() => navigate(`/allstudent/${params.id}`)}
                  >
                    <img
                    src="/images/student-icon.svg"
                    data-toggle="tooltip"
                    data-placement="bottom"
                    title="Student"
                  /> Students
                  </div>
                </div>
              </div>
            </div>
            <div className={`col col-lg-8 col-xl-9  mx-auto ${styles.midside}`}>
              <div className={`${styles.about}`} style={{ marginTop: "24px" }}>
                <div className={` ${styles.outer2}`}>
                  <form className="row" onSubmit={BatchDataHandlerChange}>
                    <h4>
                      ID Card
                      <span
                        className={styles.staffForm}
                        onClick={() => navigate(`/studentform/${params.id}`)}
                      >
                        <img
                          src="/images/s-three-icon.svg"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Menu"
                        />
                      </span>
                    </h4>
                    <div className={`mb-5 ${styles.ddetail}`}>
                    <div className="row col-11 col-lg-12 col-xl-12 justify-item-center mx-auto">
                      <div className="col-12 col-md-3"> 
                        <div className={`${styles.dTab} ${styles.active}`}
                          onClick={() => navigate(`/allstudent/${params.id}`)}
                        >
                          <span>
                          <img
                          src="/images/student-icon.svg"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Student"
                        /> Students
                          </span>
                        </div>
                      </div>
                      <div className="col-12 col-md-3"> 
                        <div className={`${styles.dTab} ${styles.active} `}
                        onClick={() => navigate(`/studentcertificates/${params.id}`)}
                        >
                          <span>
                          <img
                          src="/images/s-certificate-icon.svg"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Certificate"
                        /> Certificate
                          </span>
                        </div>
                        </div>
                      <div className="col-12 col-md-3"> 
                        <div
                          className={`${styles.dTab} ${styles.active} `}
                          onClick={() => navigate(`/studentcomplaints/${params.id}`)}
                        >
                          <span>
                            <img
                          src="/images/s-complaint-icon.svg"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Complaints"
                        /> Complaints
                          </span>
                        </div>
                        </div>
                        <div className="col-12 col-md-3">
                        <div
                          className={`${styles.dTab} `}
                        >
                          <span>
                          <img
                          src="/images/s-complaint-icon.svg"
                          data-toggle="tooltip"
                          data-placement="bottom"
                          title="Id Card"
                        /> Id Card
                          </span>
                        </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-12 col-md-6 mb-2">
                      <label htmlFor="stsearch" className="form-group mb-2">
                        Select Department
                      </label>
                      <select
                      name="departId"
                      className="form-control"
                      id="stsearch"
                      onChange={DepartmentBatchDataHandler}
                      >     
                      <option value="Select Department" selected disabled>Select Department</option>
                      {departmentData && departmentData.map((dt, i) => (
                          <option value={dt._id}>{dt.dName}</option>
                      ))}
                      </select>
                    </div>
                    {/* <div className="col-12 col-md-6 mb-2">
                      <button type="button" className="btn btn-primary px-5 mt-4 mx-auto" onClick={() => {setAddClass(true)}}>
                          Add Field
                      </button>
                    </div> */}
                    {batchData.length >=1  ? 
                    <>
                    <div className="col-12 col-md-6 mb-2">
                      <label htmlFor="batch" className="form-group mb-2">
                        Select Batch
                      </label>
                      <select
                      name="batchId"
                      className="form-control"
                      id="batch"
                      onChange={BatchDataHandler}
                      >     
                      <option value="Select Batch" selected disbaled>Select Batch</option>
                      {batchData && batchData.map((dt, i) => (
                          <option value={dt._id}>{dt.batchName}</option>
                      ))}
                      </select>
                    </div>
                    {/* <div className="col-12 my-2">
                      <label htmlFor="sres" className="form-group mb-2">
                        Select ID Card Field
                      </label>
                      <Multiselect
                        options={options}
                        displayValue="fieldname"
                        placeholder="Select Fields"
                        closeIcon="circle"
                        onSelect={onSelect}
                        onRemove={onRemove}
                    />
                    </div> */}

                    <div className="col-12 d-flex justify-content-around my-5">
                      <button type="submit" className="btn btn-primary  px-5">
                        Export For Printing
                      </button>
                    
                    </div>
                    </>
                    : '' }
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <NavbarBottomInstitute id={params.id}/>
      </div>
      <NewFieldCard
        setAddClassFunction={setAddClassFunction}
        trigger={addClass}
        setTrigger={setAddClass}
        id={params.id}
      />
    </>
  );
};

export default InstituteStudentIDCard;
