import React from "react";
import { useNavigate,useLocation, useNavigationType } from "react-router";
import styles from './Home.module.css'
import "./Modal.css";
import 'bootstrap/dist/css/bootstrap.min.css';


function Modal({ setOpenModal, setDepartmentModal }) {
  const navigate = useNavigate()
  const req = useLocation()
  if(req.pathname === '/announcement'){
  return (
    <div className="">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
        </div>
        {/* <div className="title">
          <h1>Are You Sure You Want to Continue?</h1>
        </div>
        <div className="body">
          <p>The next page looks amazing. Hope you want to go there!</p>
        </div> */}
                <h4 className={styles.home}>New Announcement / Notices</h4>
            <div className="row">
                <div className="col-6">
                    <label htmlFor="ntitle" className="form-group">Title</label>
                    <input type="text" name="ntitle" className="form-control" id="ntitle" placeholder="Title"/>
                </div>
                <div className="col-6">
                    <label htmlFor="nattach" className="form-group">Attach File</label>
                    <select name="nattach" className="form-control" id="nattach">
                        <option value="ABC">ABC</option>
                        <option value="XYZ">XYZ</option>
                    </select>
                </div>
                <div className="col-12">
                    <label htmlFor="ndesc" className="form-group">Description</label>
                    <textarea type="text" name="ndesc" className="form-control" id="ndesc" rows="4" cols="40" placeholder="Write Something Here..."/>
                </div>
                <div className="col-6">
                    <label htmlFor="nstatus" className="form-group">Visibility</label>
                    <select name="nstatus" className="form-control" id="nstatus">
                        <option value="Public">Public</option>
                        <option value="Private">Private</option>
                    </select>                </div>
                <div className="col-6 mt-2">
                    <button type="submit" className="btn btn-primary px-5 my-4">Post</button>
                </div>
            </div>
            </div>
        <div className="footer">
          {/* <button
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          > */}
          
        </div>
      </div>
  );
  }
  
  else if(req.pathname === '/insdepartment'){
    return (
      <div className="">
        <div className="modalContainer">
          <div className="titleCloseBtn">
            <button
              onClick={() => {
                setDepartmentModal(false);
              }}
            >
              X
            </button>
          </div>
          <div className="row">
                <h4 className={` text-center mb-4`}>Add Department</h4>
            <div className="col-6 mb-4">
              <label htmlFor="dname" className="form-group">Department Name</label>
                <input type="text" name="dname" className="form-control" placeholder="Department Name"/>
            </div>
            <div className="col-6">
              <label htmlFor="dtitle" className="form-group">Department Title</label>
                <input type="text" name="dtitle" className="form-control" placeholder="Department Title"/>
            </div>
            <div className="col-12 mb-4">
              <label htmlFor="ddhead" className="form-group">Select Department Head</label>
            <select name="ddhead" className="form-control" id="ddhead">
                    <option value="Select Department Head">Select Department Head</option>
                    <option value="ABC">ABC</option>
                    <option value="XYZ">XYZ</option>
                </select>
            </div>
            <div className="col-12 mt-4">
                <button type="submit" className="btn btn-outline-primary mx-auto px-5" onClick={() => navigate('/department')}>Create</button>
            </div>
            </div>
            </div>
          <div className="footer">
            
          </div>
        </div>
    );
  }
}

export default Modal;