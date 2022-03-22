import {useState,useEffect} from 'react';
import { useParams } from 'react-router-dom';
import styles from '../Home.module.css'
import axios from 'axios'
import { requestURL } from '../ReqUrl'
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
  
const ExcelSheetDownload = (props) => {
    const params = useParams()
    const[insData, setInsData]= useState('');
    const [adminData, setAdminData] = useState("");
    const [studentData, setStudentData] = useState([]);
    const [batchData, setBatchData] = useState('')
    useEffect(() => {
      axios.get(`${requestURL}/admindashboard/${params.aid}`).then((res) => {
        setAdminData(res.data.admin);
      });

      axios.get(`${requestURL}/batch-detail/${params.id}`).then((res) => {
          setBatchData(res.data.batch)
          setInsData(res.data.batch.institute)
          setStudentData(res.data.batch.ApproveStudent);
      });
    }, []);
 
        return (
            <>
             <div className="container">
                <h3 className="mt-3 text-success"><center>Students ID Card List</center></h3>
                <div className="row mt-4" style={{overflowX: 'scroll'}}>
                <ReactHTMLTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button btn btn-success mb-3"
                    table="table-to-xls"
                    filename={`${insData.insName} (${batchData.batchName})`}
                    sheet={`${insData.insName} (${batchData.batchName})`}
                    buttonText="Export Data to Excel Sheet"
                    style={{marginLeft: 'auto', width: '250px'}}
                    />
                   <table className="table" id="table-to-xls">
                    <thead className="thead-dark" style={{whiteSpace: 'nowrap'}}>
                    <tr>
                        <th>Institute Logo</th>
                        <th>Institute Name</th>
                        <th>Institute Email</th>
                        <th>Institute Address</th>
                        <th>Institute Principle</th>
                        <th>Institute Principle Sign.</th>
                        <th>Student Name</th>
                        <th>Student Department</th>
                        <th>Student Batch</th>
                        <th>Student Class</th>
                        <th>Student Roll No.</th>
                        <th>Student Photo</th>
                        <th>Student DOB</th>
                        <th>Student Address</th>
                        <th>Student Parents Name</th>
                        <th>Student Parents Contact No.</th>
                        <th>Student Gender</th>
                    </tr>
                    </thead>
                    <tbody style={{whiteSpace: 'nowrap'}}>
                   
                         { studentData && studentData.map((dt)=> (
                            <tr>
                            <td>
                            <img
                                className={styles.insUserProfiles}
                                src={
                                insData.photoId === "1"
                                    ? "/images/institute-avatar.jpeg"
                                    : `${requestURL}/insprofileabout/photo/${insData.insProfilePhoto}`
                                }
                            />
                            </td>
                            <td>{insData.insName}</td>
                            <td>{insData.insEmail}</td>
                            <td>{insData.insAddress}</td>
                            <td>{insData.insPrinciple ? insData.insPrinciple : 'Principle'}</td>
                            <td>{insData.insPrincipleSign ? insData.insPrincipleSign : 'Principle Sign'}</td>
                            <td>{`${dt.studentFirstName} ${dt.studentMiddleName ? dt.studentMiddleName : ''} ${dt.studentLastName}`}</td>
                            <td>{dt.department.dName}</td>
                            <td>{dt.batches.batchName}</td>
                            <td>{dt.studentClass.className}</td>
                            <td>{dt.studentROLLNO}</td>
                            <td>
                            <img
                                className={styles.insUserProfiles}
                                src={
                                    dt.photoId === "1"
                                    ? "/images/image-boy2.png"
                                    : `${requestURL}/search/insdashboard/studentdata/photo/${dt.studentProfilePhoto}`
                                }
                                alt="Profile"
                                />
                            </td>
                            <td>{dt.studentDOB}</td>
                            <td>{dt.studentAddress}</td>
                            <td>{dt.studentParentsName ? dt.studentParentsName : 'Parents Name'}</td>
                            <td>{dt.studentParentsPhoneNumber ? dt.studentParentsPhoneNumber : 'Mobile No.'}</td>
                            <td>{dt.studentPhoneNumber}</td>
                            </tr>
                          ))}   
                       
                    </tbody>   
                </table>
             </div>
            </div>
            </>
        )
}
  
export default ExcelSheetDownload