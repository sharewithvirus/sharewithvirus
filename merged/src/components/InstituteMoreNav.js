import React from "react";
import { useNavigate } from "react-router";
import style from "./Navbar.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

const InstituteMoreNav = (props) => {
  const navigate = useNavigate();

  return (
    <>
      {props.id ? 
      <div className={style.moreNavtabs}>
        <div
          className={`row row-cols-2 row-cols-sm-3 row-cols-md-6  ${style.moreNavtab}`}
        >
          <div className="col" onClick={() => navigate(`/insdepartment/${props.id}`)}>
            <i
              class="fas fa-dollar-sign"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Finance"
            ></i>
          </div>
          <div className="col " onClick={() => navigate(`/insdashboard/${props.id}`)}>
            <i
              class="fas fa-book"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Librery"
            ></i>
          </div>
          <div
            E-Resources
            className="col "
            onClick={() => navigate(`/insdashboard/${props.id}`)}
          >
            <i
              class="fas fa-puzzle-piece "
              data-toggle="tooltip"
              data-placement="bottom"
              title="Curriculum"
            ></i>
          </div>
          <div className="col " onClick={() => navigate(`/insdashboard/${props.id}`)}>
            <i
              class="fas fa-globe"
              data-toggle="tooltip"
              data-placement="bottom"
              title="E- Resources"
            ></i>
          </div>
          <div className="col " onClick={() => navigate(`/allstaff/${props.id}`)}>
            <i
              class="fas fa-school"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Junior College"
            ></i>
          </div>
          <div className="col " onClick={() => navigate(`/allstudent/${props.id}`)}>
            <i
              class="fas fa-graduation-cap"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Senior College"
            ></i>
          </div>
        </div>
      </div>

      : 

      <div className={style.moreNavtabs}>
        <div
          className={`row row-cols-2 row-cols-sm-3 row-cols-md-6  ${style.moreNavtab}`}
        >
          <div className="col" onClick={() => navigate(`/all/user/${props.uid}/institute`)}>
            <i
              class="fas fa-dollar-sign"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Finance"
            ></i>
          </div>
          <div className="col " onClick={() => navigate(`/userdashboard/${props.uid}`)}>
            <i
              class="fas fa-book"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Librery"
            ></i>
          </div>
          <div
            E-Resources
            className="col "
            onClick={() => navigate(`/userdashboard/${props.uid}`)}
          >
            <i
              class="fas fa-puzzle-piece "
              data-toggle="tooltip"
              data-placement="bottom"
              title="Curriculum"
            ></i>
          </div>
          <div className="col " onClick={() => navigate(`/userdashboard/${props.uid}`)}>
            <i
              class="fas fa-globe"
              data-toggle="tooltip"
              data-placement="bottom"
              title="E- Resources"
            ></i>
          </div>
          <div className="col " onClick={() => navigate(`/all/user/${props.uid}/staff`)}>
            <i
              class="fas fa-school"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Junior College"
            ></i>
          </div>
          <div className="col " onClick={() => navigate(`/user/random/${props.uid}`)}>
            <i
              class="fas fa-graduation-cap"
              data-toggle="tooltip"
              data-placement="bottom"
              title="Senior College"
            ></i>
          </div>
        </div>
      </div>
      }
    </>
  );
};

export default InstituteMoreNav;
