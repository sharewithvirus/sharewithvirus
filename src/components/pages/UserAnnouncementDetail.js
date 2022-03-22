import React, {useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../Home.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import UserAboutSection from '../UserAboutSection'
import { requestURL } from '../ReqUrl'
import NavbarTopUser from '../NavbarTopUser';
import NavbarBottomUser from '../NavbarBottomUser';
import moment from 'moment'
import UserSideBar from '../UserSideBar'
import Pdf from "react-to-pdf";

const ref = React.createRef();


const UserAnnouncementDetail = () =>{
    const navigate = useNavigate()
    const params = useParams()
    const [userTextData, setUserTextData] = useState('')
    const [userDetailData, setUserDetailData] = useState('')

    useEffect(() =>{
        axios.get(`${requestURL}/ins-announcement-detail/${params.id}`)
        .then((res) =>{
            const data = res.data.announcement
            setUserDetailData(data)
            setUserTextData(res.data.announcement.user)
        }).catch((e) =>{
            console.log("Something Went Wrong")
        })
    },[])
    return (
      <>
        <div className={styles.mainScreen}>
          <NavbarTopUser uid={params.uid}/>
          <div className={`${styles.mainContent} mx-auto mt-5`}>
            <div className="row">
              <div className={`col-12 col-md-6 mx-auto`} >
                <div className={` ${styles.about}`} ref={ref}>
                  {/* <BackButton /> */}
                  <h4 className="my-5">{userDetailData.insAnnTitle}</h4>
                  
                  {/* <div className={` gx-0  ${styles.cardContainer}`}> */}
                  <div
                    className={` ${styles.dlogo}`}
                    >
                    <img className={styles.dlogoImages} src={'/images/institute-avatar.jpeg'} />
                    <p className={styles.dlogoText}>
                      <small>{userDetailData.insAnnDescription}</small>
                    </p>
                    <p className={styles.dlogoText}>
                      <small>At - {moment(userDetailData.createdAt).format('DD-MM-YYYY')}</small>
                    </p>
                  </div>
                  
                  </div>
                {/* </div> */}
              </div>
            </div>
          </div>
          <Pdf targetRef={ref} filename={`${userDetailData.insAnnTitle}.pdf`}>
                      {({ toPdf }) => (
                        <p> 

                        <span><i class="far fa-file-pdf my-5 mx-3" style={{fontSize: '25px', color:'black'}}
                        onClick={toPdf}
                        ></i></span>                       
                        </p>
                        
                      )}
                    </Pdf>
  
          <NavbarBottomUser uid={params.uid}/>
        </div>
      </>
    );
}

export default UserAnnouncementDetail

