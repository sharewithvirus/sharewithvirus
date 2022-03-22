import React, {useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import styles from '../Home.module.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios'
import NavbarTopInstitute from '../NavbarTopInstitute'
import NavbarBottomInstitute from '../NavbarBottomInstitute'
import BackButton from '../BackButton'
import InstituteStatsSection from '../InstituteStatsSection'
import AboutSection from '../AboutSection'
import InstituteSidebar from '../InstituteSidebar'
import { requestURL } from '../ReqUrl'
import moment from 'moment'


const AnnouncementDetail = () =>{
    const navigate = useNavigate()
    const params = useParams()
    const [insTextData, setInsTextData] = useState('')
    const [insDetailData, setInsDetailData] = useState('')

    useEffect(() =>{
        axios.get(`${requestURL}/ins-announcement-detail/${params.id}`)
        .then((res) =>{
            const data = res.data.announcement
            setInsDetailData(data)
            setInsTextData(res.data.announcement.institute)
        }).catch((e) =>{
            console.log("Something Went Wrong")
        })
    },[])
    return (
      <>
        <div className={styles.mainScreen}>
          <NavbarTopInstitute id={params.iid}/>
          <div className={`${styles.mainContent} `}>
            <div className="row">
              <div className={`col col-lg-4 col-xl-3 ${styles.leftside}`}>
                <div className={styles.leftBar}>
                <AboutSection id={params.iid}/>  
                  <InstituteSidebar id={params.iid}/>
                  <div className={styles.rightCols}>
                    <InstituteStatsSection id={params.iid}/>
                  </div>
                </div>
              </div>
              <div className={`col col-lg-8 col-xl-9  mx-auto ${styles.midside}`}>
                <div className={` h-100 ${styles.about}`} style={{ marginTop: "24px" }}>
                  {/* <BackButton /> */}
                  <h4 className="my-5">{insDetailData.insAnnTitle}</h4>
                  
                  <div className={` gx-0  ${styles.cardContainer}`}>
                  <div
                    className={` ${styles.dlogo}`}
                    >
                    <img className={styles.dlogoImages} src={insTextData.insProfilePhoto ? insTextData.insProfilePhoto : '/images/institute-avatar.jpeg'} />
                    <p className={styles.dlogoText}>
                      <small>{insDetailData.insAnnDescription}</small>
                    </p>
                    <p className={styles.dlogoText}>
                      <small>At - {moment(insDetailData.createdAt).format('DD-MM-YYYY')}</small>
                    </p>
                        <p className={styles.dlogoText}> 
       
                        </p>
                  </div>
                  
                  </div>
                </div>
              </div>
            </div>
          </div>
  
          <NavbarBottomInstitute id={params.iid}/>
        </div>
      </>
    );
}

export default AnnouncementDetail

