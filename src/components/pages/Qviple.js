import React, { useEffect, useRef, useState }  from 'react'
import { useNavigate } from "react-router";
import styles from "./Qviple.module.css"
// import background from "../images/qviple/homepage.jpeg"
// import qviplelogo from "../images/qviple/qviplelogo.png"
// import homeright from "../images/qviple/qviplehomeright.svg"
// import SlidingNav from '../components/SlidingNav'
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos"
import "aos/dist/aos.css" 
import { Link } from 'react-router-dom'
import { style } from '@mui/system'



function Qviple() {
    const [showPopup, setShowPopup] = useState(false);
    const [state, setState] = useState(false);
  
    

    useEffect(()=>{
        AOS.init({duration: 2000});
    },[])

    let barRef = useRef(0)

    const handleclick = ()=> {
        setShowPopup(true);
        // console.log(showPopup);
    }

        
    
  
  return (
    <>
        
        <div className={styles.qvipleContainer}>
            <section className={styles.homepage} id="home" style={{ backgroundImage: `url(/images/homepage.jpeg)` }}>
               { showPopup && 

                <div className={styles.animatedNav}>
                    <ul>
                        <li onClick={()=> setShowPopup(false)} id="nav-1" class="'slide1'"><a href="#home">Home</a></li>
                        <li onClick={()=> setShowPopup(false)} id="nav-2" class="slide2"><a href="#about_us">About Us</a></li>
                        <li onClick={()=> setShowPopup(false)} id="nav-3" class="slide3"><a href="#contact_us">Contact Us</a></li>
                        <li onClick={()=> setShowPopup(false)} id="nav-4" class="slide4"><a href="#faq">FAQ's</a></li>
                        
                    </ul>
                </div>

               }
                <div className={styles.homenav}>
                    <Link to={'/'}>
                <img src={`/images/qviplelogo.png`} />
                </Link>
                    <div className={styles.navleft}>
                        <h4><a href="#home">Home</a></h4>
                        <h4><a href="#about_us">About Us</a></h4>
                        <h4><a href="#contact_us">Contact Us</a></h4>
                        <h4><a href="#faq">FAQ's</a></h4>
                    </div>

                   
                        <div onClick={handleclick} className={`${styles.hamb} ${styles.animation}`} ref={barRef}  onClick={()=> setShowPopup(true)}>
                                <div className={styles.bar1}></div>
                                <div className={styles.bar1}></div>
                                <div className={styles.bar1}></div>
                        </div>
                </div>
                
                <div className={styles.homebody}>
                    <div className={styles.homebodyleft}>
                        <div data-aos="zoom-out" className={styles.homebodyleftinner}>
                            <h3>Welcome to Qviple</h3>
                            <h1>Qviple is about <br/> Embracing Everyone</h1>
                            <p>We believe in having equal opportunity to flourish 
                            <br className={styles.br1} />
                                
                            and grow.
                             <br className={styles.br2} />
                              Join us to claim your share of opportunities.</p>

                            <div className={styles.homebodyrighttfooter}>
                                <button   type="button" class="btn btn-success">
                                <Link to={`/login`} style={{textDecoration: 'none'}}>Login</Link></button>
                                <h6>OR</h6>
                                <button  type="button" class="btn btn-success">
                                <Link to={`/signup`} style={{textDecoration: 'none'}}>Signup</Link></button>
                        </div>
                        </div>
                        
                    </div>
                    <div className={styles.homebodyright}>
                    <img  src={`/images/qviplehomeright.svg`} />
                    </div>

                    <div className={styles.homebodysmall}>
                        <div className={styles.homebodysmallinner}>
                            <h3>Welcome to Qviple</h3>
                            <h1>Qviple is about <br/> Embracing Everyone</h1>
                            {/* <img src={homeright} />  */}

                            <div className={styles.homebodysmallfooter}>
                                <div className={styles.homebodysmallfooterinner}>
                                    <button type="button" class="btn btn-success">Login</button>
                                    <h6>OR</h6>
                                    <button type="button" class="btn btn-success">Signup</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.aboutus} style={{backgroundColor:'white'}}>
                    <div className={styles.aboutinner} >
                        <h3 data-aos="fade-up">We Provide Equal Grounds To Compete</h3>
                        <p data-aos="fade-up">Qviple is SaaS Platform that provides premium management features to Educational Institutions at very resonable cost.</p>
                        <div className={styles.aboutios} >
                            <div className={styles.android}>
                                <i class="fab fa-android"></i> 
                                <p className='mt-3'>Android</p>
                            </div >
                            <div className={styles.android}>
                                <i class="fa fa-apple" aria-hidden="true"></i>
                                <p className='mt-4'>IOS</p>
                            </div>
                        </div>

                        <div className='d-flex justify-content-center'>
                            <div div className={styles.aboutfootercard}>
                            
                            <div data-aos="fade-right" className={styles.card}>
                                <div className={styles.cardheader}>
                                <img src='/images/student.png' />
                                    <h5>Admision Management</h5>
                                </div>
                                <div className={styles.cardlist}>
                                    <ol>
                                        <li> 1. Student Application</li>
                                        <li> 2. Shortlisting Students</li> 
                                        <li>3. Online Admission Fees</li>
                                        <li>4.  Class Allotment</li>
                                        <li>5. Digital Document Records</li>
                                    </ol>
                                </div>
                            </div>

                            <div className={styles.card}>
                                <div className={styles.cardheader}>
                                    <img src='/images/loan.png' />
                                    <h5>Funds Management</h5>
                                </div>
                                <div className={styles.cardlist}>
                                    <ol>
                                        <li> 1. Total cash & Bank status</li>
                                        <li> 2. Online & Offline fees collection</li> 
                                        <li>3. Keeping tranx records</li>
                                        <li>4.  Class Allotment</li>
                                        <li>5. Keeping track of cash flows</li>
                                    </ol>
                                </div>
                            </div>

                            <div data-aos="fade-left" className={styles.card}>
                                <div className={styles.cardheader}>
                                    <img src='/images/department.png' />
                                    <h5>Customised Departments</h5>
                                </div>
                                <div className={styles.cardlist}>
                                    <ol>
                                        <li> 1. Yearly/Semester wise customised batches</li>
                                        <li> 2. Iot based attendance</li> 
                                        <li>3. Online Admission Fees</li>
                                        <li>4.  Online/Offline exams</li>
                                        <li>5. Digital Certificated</li>
                                    </ol>
                                </div>
                            </div>

                            <div data-aos="fade-right" className={styles.card}>
                                <div className={styles.cardheader}>
                                    <img src='/images/elearning.png' />
                                    <h5>Dedicated E-learning Platform</h5>
                                </div>
                                <div className={styles.cardlist}>
                                    <ol>
                                        <li> 1. Own E-learning plaform</li>
                                        <li> 2. Create paid content</li> 
                                        <li>3. Market your content</li>
                                        
                                    </ol>
                                </div>
                            </div>

                            <div data-aos="fade-left" className={styles.card}>
                                <div className={styles.cardheader}>
                                    <img src='/images/democracy.png' />
                                    <h5>Dedicated departments for library, Sports & Arts</h5>
                                </div>
                                <div className={styles.cardlist}>
                                    <ol>
                                        <li> 1. Digital books register</li>
                                        <li> 2. Record of issued books</li> 
                                        <li>3.Digital books</li>
                                        <li>4.  Sport & Art event creation</li>
                                        <li>5. Awards & Achievements</li>
                                    </ol>
                                </div>
                            </div>

                            
                            </div>
                        </div>
                    </div>

            </section>

            <section className={styles.anonymous}>
                
                <div className={styles.anonymous1}>
                    <img data-aos="flip-left" src='images/university.jpg' />
                    <iframe src="https://embed.lottiefiles.com/animation/67449"></iframe>
                </div>
                <div className={styles.anonymous2}>
                       
                    <h2>Transform you institution ready for this DIgital World</h2>
                    <div className={styles.anonymous2inner}>

                        <div className='d-flex align-items-center gap-3'>
                            <img src='/images/team.png' />
                            <p>Grow with us </p>
                        </div>
                        <div className='d-flex align-items-center gap-3'>
                            <img src='/images/share.png' />
                            <p>Claim your share</p>
                        </div>
                        
                    </div>
                </div>

                
            </section>

            <section className={styles.faqs} id="about_us">
                <img
                    data-aos="fade-zoom-in"
                    data-aos-easing="ease-in-back"
                    data-aos-delay="300"
                    data-aos-offset="0"
                    className={styles.aboutus2} src='/images/aboutus2.jpg'  />
                <img
                    data-aos="fade-zoom-in"
                    data-aos-easing="ease-in-back"
                    data-aos-delay="300"
                    data-aos-offset="0"
                    className={styles.building} src='/images/building.jpg'  />

                <div className={styles.overlay}> 
                    <div className={styles.overlayleft} data-aos="zoom-in-up">
                        <h1>About Us</h1>
                        <h5>
                            Qviple is Brand of Mithkal Minds Private Limited company based in Nashik,
                            Providing SaaS services primarily for education sector at very reasonable cost
                            compare to industry prices. We transform the old, offline systems into New age
                            Digital systems using latest technologies. Our enthusiastic team is always ready
                            to provide you with best solutions.
                        </h5>
                    </div>

                    <div className={styles.overlayright}></div>
                                
                </div>
            </section>

            <section className={styles.ourteam}>


                    {/* <div data-aos="zoom-out"  className={styles.aboutus1leftcard_mb} style={{backgroundImage:"images/aboutus.jpg"}}>

                       
                        <div className={styles.aboutus1lefttop}>
                            <h2>About Us</h2>
                        </div>

                        <div className={styles.aboutus1leftbottom}>
                            <p>
                                Qviple is Brand of Mithkal Minds Private Limited company based in Nashik,
                                Providing SaaS services primarily for education sector at very reasonable cost
                                compare to industry prices. We transform the old, offline systems into New age
                                Digital systems using latest technologies. Our enthusiastic team is always ready
                                to provide you with best solutions.
                            </p>
                        </div>
                        
                    </div>   */}

                
                <h1>Meet Our Enthusiastic Team </h1>
                <iframe src="https://embed.lottiefiles.com/animation/78246"></iframe>   
                <div data-aos="fade-down" className={styles.teamcardcontainer}>

                {/* <div className={styles.teamCard}>
                    <h2>Pankaj Phad</h2>
                    <h4>Founder & CEO</h4>
                </div>

                <div className={styles.teamCard}>
                    <h2>Pankaj Phad</h2>
                    <h4>Founder & CEO</h4>
                </div>

                <div className={styles.teamCard}>
                    <h2>Pankaj Phad</h2>
                    <h4>Founder & CEO</h4>
                </div>

                <div className={styles.teamCard}>
                    <h2>Pankaj Phad</h2>
                    <h4>Founder & CEO</h4>
                </div>

                <div className={styles.teamCard}>
                    <h2>Pankaj Phad</h2>
                    <h4>Founder & CEO</h4>
                </div>

                <div className={styles.teamCard}>
                    <h2>Pankaj Phad</h2>
                    <h4>Founder & CEO</h4>
                </div>

                <div className={styles.teamCard}>
                    <h2>Pankaj Phad</h2>
                    <h4>Founder & CEO</h4>
                </div>

                <div className={styles.teamCard}>
                    <h2>Pankaj Phad</h2>
                    <h4>Founder & CEO</h4>
                </div> */}

                    <div className={`${styles.teamcard}`}>
                        <h2>Pankaj Phad</h2>
                        <h4>Founder and CEO</h4>
                    </div>

                    <div className={`${styles.teamcard}`}>
                         <h2>Vikas Sanap</h2>
                         <h4>Director</h4>
                    </div>

                    <div className={`${styles.teamcard}`}>
                        <h2>Karamveer Singh</h2> 
                        <h4>COO</h4>
                    </div>

                    <div className={`${styles.teamcard}`}>
                        <h2>Abhimanyu Kumar</h2> 
                        <h4>CMO</h4> 
                    </div>

                    <div className={`${styles.teamcard}`}>
                        <h2>Abhishek Singh</h2>  
                        <h4>CTO</h4>
                    </div>

                    <div className={`${styles.teamcard}`}>
                        <h2>Ankush Singh</h2>
                        <h4>Product Lead</h4>
                    </div>

                    <div className={`${styles.teamcard}`}>
                        <h2>Birat Dhar</h2>
                        <h4>Ui Ux Developer</h4>
                    </div>

                    <div className={`${styles.teamcard}`}>
                        <h2>Vaibhav Pal</h2>
                        <h4>Backend Developer</h4>
                    </div>
                </div>

                <div id='contact_us' className={styles.footerr}>
                    <div className={styles.footerrleft}>
                        <h3>Qviple</h3>
                        <p>Want to know more about us and our product <br/> and services? We are always available.</p>
                        
                        <div className='d-flex align-items-center gap-2'>
                            <i class="fa fa-map-marker fa-sm" aria-hidden="true"></i>
                            <p className='mt-3'>
                            H.N. 1860, Udyog Bhavan, Sinnar Nashik-422103 MH.
                            </p>
                        </div>

                    </div>

                    <div className={styles.footerrright}>
                        <h4>Contact Us</h4>

                        <div className='d-flex align-items-center gap-3'>
                            <i class="fa fa-phone fa-sm" aria-hidden="true"></i>
                            <p style={{fontSize:"13px"}} className='mt-3'> +91 7276147751 </p>
                        </div>

                        <div className={`d-flex align-items-center gap-3 ${styles.ffoot}`}>
                            <i class="fa fa-envelope fa-sm" aria-hidden="true"></i>
                            <Link to={'/'}>
                            <p style={{fontSize:"14px"}} className='mt-3'>connect@qviple.com </p>
                            </Link>
                        </div>

                        <div className='d-flex align-items-center gap-3 mt-3'>
                            <i class="fa fa-facebook-square" aria-hidden="true"></i>                           
                            <i class="fa fa-twitter" aria-hidden="true"></i>   
                            <i class="fa fa-linkedin" aria-hidden="true"></i>
                        </div>

                    </div>

                </div>
            </section>
        </div>
        {/* {showPopup && <ProfileSetting2 changeShow={show => setShowPopup(show)} trigger={showPopup} setTrigger={setShowPopup}/>} */}

        
    </>
  )
}

export default Qviple