import React from "react";
import { useNavigate } from "react-router";
import style from "./Navbar.module.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Navbars = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className={`${style.mainnavs} navbar-fixed`}>
        <ul>
          <li>
            <img
              className={style.logo}
              alt="logo"
              src="https://res.cloudinary.com/sqillionsabhishek/image/upload/c_scale,e_brightness:80,h_100,w_100,x_0/v1638519254/Product_Images/Qviple_yylsr5.jpg"
            />
          </li>
          <li className={style.input}>
            <i className="fas fa-search "></i>
            <input
              type="text"
              name="Search"
              placeholder="Search User"
              autoComplete="false"
            />
          </li>
          <div className="shiftable-menu">
            <ul>
              <li onClick={() => navigate("/userdashboard")}>
                <i className="fas fa-home "></i>
                <p>
                  <small>Home</small>
                </p>
              </li>
              <li>
                <i className="far fa-user-circle "></i>
                <p>
                  <small>Member</small>
                </p>
              </li>
              <li>
                <i className="fas fa-sms "></i>
                <p>
                  <small>E-resources</small>
                </p>
              </li>
              <li>
                <i className="fas fa-moon "></i>
                <p>
                  <small>Chat</small>
                </p>
              </li>
              <li>
                <i className="fas fa-bell "></i>
                <p>
                  <small>Notify</small>
                </p>
              </li>
            </ul>
          </div>
          <li>
            <div className="media account d-inline-flex">
              <div onClick={() => navigate("/userprofiles")}>
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKcULuY9F2Ezt8tDs5L35fj4oq1ezj4ew0hg&usqp=CAU"
                  className={style.userimg}
                  alt="user"
                />
                <span
                  className={`${style.availablestats}${style.online}`}
                ></span>
              </div>
              <div
                className={style.profile}
                onClick={() => navigate("/userprofiles")}
              >
                <h4 className={style.userprofile}>Peter Pettigrow</h4>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbars;
