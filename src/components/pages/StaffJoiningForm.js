import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "../Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import UserAboutSection from "../UserAboutSection";
import axios from "axios";
import { requestURL } from "../ReqUrl";
import { Success } from "../SnackBar";
import NavbarTopUser from "../NavbarTopUser";
import NavbarBottomUser from "../NavbarBottomUser";
import Loading from "../Loading";
import FormPhoto from "../CropFunctionality/FormPhoto";
const StaffJoiningForm = () => {
  const navigate = useNavigate();
  const params = useParams();
  const [searchInsJoinData, setSearchInsJoinData] = useState("");
  const [file1, setFile1] = useState("");
  const [fileName1, setFileName1] = useState("");
  const [file0, setFile0] = useState("");
  const [open, setOpen] = useState(false);
  const [staffJoinData, setStaffJoinData] = useState({
    staffFirstName: "",
    StaffMiddleName: "",
    staffLastName: "",
    staffDOB: "",
    staffGender: "",
    staffNationality: "",
    staffMTongue: "",
    staffCast: "",
    staffCastCategory: "",
    staffReligion: "",
    staffBirthPlace: "",
    staffDistrict: "",
    staffState: "",
    staffAddress: "",
    staffPhoneNumber: "",
    staffAadharNumber: "",
    staffQualification: "",
    staffDocuments: "",
    staffAadharCard: "",
    showMessages: false,
    msg: "",
  });

  const StaffJoinDataHandler = (e) => {
    const { name, value } = e.target;
    setStaffJoinData({
      ...staffJoinData,
      [name]: value,
    });
  };

  const saveFile0 = (myfile) => {
    setFile0(myfile);
  };
  const saveFile1 = (e) => {
    setFile1(() => e.target.files);
    setFileName1(() => e.target.files[0].name);
  };
  const StaffJoinDataHandlerChange = (e) => {
    e.preventDefault();
    setOpen(true);
    const formData0 = new FormData();
    formData0.append("file", file0);
    // const formData = new FormData();
    // formData.append("file", file[0]);
    // formData.append("fileName", fileName);
    const formData1 = new FormData();
    formData1.append("file", file1[0]);
    axios
      .post(
        `${requestURL}/search/insdashboard/staffdata/${params.sid}`,
        staffJoinData
      )
      .then(async (res) => {
        if (res.data.message) {
          const id = res.data.staff._id;
          if (file0) {
            await axios.post(
              `${requestURL}/search/insdashboard/staffdata/photo/${id}`,
              formData0
            );
          }
          // await axios.post(
          //   `${requestURL}/search/insdashboard/staffdata/doc/${id}`,
          //   formData
          // );
          await axios.post(
            `${requestURL}/search/insdashboard/staffdata/adh/${id}`,
            formData1
          );
          setOpen(false);
          setStaffJoinData({ showMessages: true, msg: res.data.message });
        }
        setTimeout(() => {
          navigate(`/userdashboard/${params.id}`);
        }, 100);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  };

  useEffect(() => {
    axios
      .get(`${requestURL}/insdashboard/${params.iid}`)
      .then((res) => {
        const textInsJoin = res.data.institute;
        setSearchInsJoinData(textInsJoin);
      })
      .catch((e) => {
        console.log("Something Went Wrong");
      });
  }, []);

  return (
    <>
      <Loading open={open} />
      {staffJoinData.showMessages ? <Success msg={staffJoinData.msg} /> : null}
      <div className={styles.mainScreen}>
        <NavbarTopUser uid={params.id} />
        <div className={`${styles.mainContent}`}>
          <div className="row">
            <div className={`col col-lg-4 col-xl-3 ${styles.leftside}`}>
              <div className={styles.leftBar}>
                <UserAboutSection uid={params.id} />
                <div className={`${styles.about} ${styles.leftMenu}`}>
                  <div className={`mt-5 ${styles.dabout} ${styles.active}`}>
                    <img
                      src="/images/staff-icon.svg"
                      // className={`${style.userimg} ${style.svgIcon}`}
                      alt="user"
                      data-toggle="tooltip"
                      data-placement="bottom"
                      title="Staff"
                    />{" "}
                    Staff
                  </div>
                </div>
              </div>
            </div>
            <div className={`col col-lg-8 col-xl-9  mx-auto ${styles.midside}`}>
              <div className={`${styles.about}`} style={{ marginTop: "24px" }}>
                {/* <BackButton /> */}
                <div className={` ${styles.outer2}`}>
                  <form className="row" onSubmit={StaffJoinDataHandlerChange}>
                    <div className="col-12">
                      <h4>Staff Joining Form</h4>
                    </div>
                    <div className="col-12 d-flex justify-content-center">
                      <div className={styles.profileImageHovering}>
                        <FormPhoto cropFile={saveFile0} />
                      </div>
                    </div>
                    <div className="col-12 col-md-4 mt-4">
                      <label htmlFor="afirstname" className="form-group mb-2">
                        First Name
                        <span className={styles.requireField}>*</span>
                      </label>
                      <input
                        type="text"
                        name="staffFirstName"
                        className="form-control"
                        id="afirstname"
                        placeholder="Enter First Name"
                        onChange={StaffJoinDataHandler}
                        required
                      />
                    </div>
                    <div className="col-12 col-md-4 mt-4">
                      <label htmlFor="amiddlename" className="form-group mb-2">
                        Middle Name
                        <span className={styles.requireField}>*</span>
                      </label>
                      <input
                        type="text"
                        name="staffMiddleName"
                        className="form-control"
                        id="amiddlename"
                        placeholder="Enter Middle Name"
                        onChange={StaffJoinDataHandler}
                      />
                    </div>
                    <div className="col-12 col-md-4 mt-4">
                      <label htmlFor="alastname" className="form-group mb-2">
                        Last Name
                        <span className={styles.requireField}>*</span>
                      </label>
                      <input
                        type="text"
                        name="staffLastName"
                        className="form-control"
                        id="alastname"
                        placeholder="Enter Last Name"
                        onChange={StaffJoinDataHandler}
                        required
                      />
                    </div>
                    <div className="col-12 col-md-6 mt-4">
                      <label htmlFor="adob" className="form-group mb-2">
                        Date of Birth
                        <span className={styles.requireField}>*</span>
                      </label>
                      <input
                        type="date"
                        name="staffDOB"
                        className="form-control"
                        id="adob"
                        placeholder="Enter Date of Birth"
                        onChange={StaffJoinDataHandler}
                        required
                      />
                    </div>
                    <div className="col-12 col-md-6 mt-4">
                      <label htmlFor="agender" className="form-group mb-2">
                        Gender
                        <span className={styles.requireField}>*</span>
                      </label>
                      <select
                        id="agender"
                        className="form-control"
                        name="staffGender"
                        onChange={StaffJoinDataHandler}
                        required
                      >
                        <option value="Select a gender">Select a gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Trans Gender">Trans Gender</option>
                      </select>
                    </div>
                    <div className="col-12 col-md-6 mt-4">
                      <label htmlFor="anational" className="form-group mb-2">
                        Nationality
                        <span className={styles.requireField}>*</span>
                      </label>
                      <input
                        type="text"
                        name="staffNationality"
                        className="form-control"
                        id="anational"
                        placeholder="Enter Nationality"
                        onChange={StaffJoinDataHandler}
                        required
                      />
                    </div>
                    <div className="col-12 col-md-6 mt-4">
                      <label htmlFor="aspeak" className="form-group mb-2">
                        Mother Tongue
                        <span className={styles.requireField}>*</span>
                      </label>
                      <select
                        id="aspeak"
                        className="form-control"
                        name="staffMTongue"
                        onChange={StaffJoinDataHandler}
                        required
                      >
                        <option value="Select Language">Select Language</option>
                        <option value="English">English</option>
                        <option value="Hindi">Hindi</option>
                        <option value="Marathi">Marathi</option>
                        <option value="Tamil">Tamil</option>
                        <option value="Telgu">Telgu</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="col-12 col-md-4 mt-4">
                      <label htmlFor="acastcat" className="form-group mb-2">
                        Cast Category
                        <span className={styles.requireField}>*</span>
                      </label>
                      <select
                        className="form-control"
                        id="acastcat"
                        name="staffCastCategory"
                        onChange={StaffJoinDataHandler}
                        required
                      >
                        <option value="Select Cast Category">
                          Select Cast Category
                        </option>
                        <option value="General">General </option>
                        <option value="SC">SC </option>
                        <option value="ST">ST </option>
                        <option value="OBC">OBC </option>
                      </select>
                    </div>
                    <div className="col-12 col-md-4 mt-4">
                      <label htmlFor="acast" className="form-group mb-2">
                        Cast
                        <span className={styles.requireField}>*</span>
                      </label>
                      <input
                        type="text"
                        name="staffCast"
                        className="form-control"
                        id="acast"
                        placeholder="Enter Cast"
                        onChange={StaffJoinDataHandler}
                        required
                      />
                    </div>

                    <div className="col-12 col-md-4 mt-4">
                      <label htmlFor="arel" className="form-group mb-2">
                        Religion
                        <span className={styles.requireField}>*</span>
                      </label>
                      <select
                        id="aspeak"
                        className="form-control"
                        name="staffReligion"
                        onChange={StaffJoinDataHandler}
                        required
                      >
                        <option value="Select Religion">Select Religion</option>
                        <option value="Hindu">Hindu</option>
                        <option value="Muslim">Muslim</option>
                        <option value="Sikhism">Sikhism</option>
                        <option value="Christian">Christian</option>
                        <option value="Jainism">Jainism</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                    <div className="col-12 col-md-4 mt-4">
                      <label htmlFor="abirth" className="form-group mb-2">
                        Birth Place
                        <span className={styles.requireField}>*</span>
                      </label>
                      <input
                        type="text"
                        name="staffBirthPlace"
                        className="form-control"
                        id="abirth"
                        placeholder="Enter Birth Place"
                        onChange={StaffJoinDataHandler}
                        required
                      />
                    </div>
                    <div className="col-12 col-md-4 mt-4">
                      <label htmlFor="adistrict" className="form-group mb-2">
                        District
                        <span className={styles.requireField}>*</span>
                      </label>
                      {/* <input
                        type="text"
                        name="staffDistrict"
                        className="form-control"
                        id="adistrict"
                        placeholder="Enter District"
                        onChange={StaffJoinDataHandler}
                        required
                      /> */}
                      <select
                        id="adistrict"
                        className="form-control"
                        name="staffDistrict"
                        onChange={StaffJoinDataHandler}
                        required
                      >
                        <option value="Select District">Select District</option>
                        <option value="Ananthapur">Ananthapur</option>
                        <option value="Chittoor">Chittoor</option>
                        <option value="Cuddapah">Cuddapah</option>
                        <option value="East_Godavari">East_Godavari</option>
                        <option value="Guntur">Guntur</option>
                        <option value="Krishna">Krishna</option>
                        <option value="Prakasam">Prakasam</option>
                        <option value="Srikakulam">Srikakulam</option>
                        <option value="West_Godavari">West_Godavari</option>
                        <option value="Araria">Araria</option>
                        <option value="Arwal">Arwal</option>
                        <option value="Aurangabad">Aurangabad</option>
                        <option value="Banka">Banka</option>
                        <option value="Begusarai">Begusarai</option>
                        <option value="Bhabua">Bhabua</option>
                        <option value="Bhagalpur">Bhagalpur</option>
                        <option value="Bhojpur">Bhojpur</option>
                        <option value="Buxar">Buxar</option>
                        <option value="Darbhanga">Darbhanga</option>
                        <option value="East_Champaran">East_Champaran</option>
                        <option value="Gaya">Gaya</option>
                        <option value="Gopalganj">Gopalganj</option>
                        <option value="Jamui">Jamui</option>
                        <option value="Jehanabad">Jehanabad</option>
                        <option value="Katihar">Katihar</option>
                        <option value="Khagaria">Khagaria</option>
                        <option value="Kishanganj">Kishanganj</option>
                        <option value="Lakhisarai">Lakhisarai</option>
                        <option value="Madhepura">Madhepura</option>
                        <option value="Madhubani">Madhubani</option>
                        <option value="Munger">Munger</option>
                        <option value="Muzaffarpur">Muzaffarpur</option>
                        <option value="Nalanda">Nalanda</option>
                        <option value="Nawada">Nawada</option>
                        <option value="Patna">Patna</option>
                        <option value="Purnia">Purnia</option>
                        <option value="Rohtas">Rohtas</option>
                        <option value="Saharsa">Saharsa</option>
                        <option value="Samastipur">Samastipur</option>
                        <option value="Saran">Saran</option>
                        <option value="Sheikhpura">Sheikhpura</option>
                        <option value="Sheohar">Sheohar</option>
                        <option value="Sitamarhi">Sitamarhi</option>
                        <option value="Siwan">Siwan</option>
                        <option value="Supaul">Supaul</option>
                        <option value="Vaishali">Vaishali</option>
                        <option value="West_Champaran">West_Champaran</option>
                        <option value="Balod">Balod</option>
                        <option value="Baloda_Bazar">Baloda_Bazar</option>
                        <option value="Balrampur">Balrampur</option>
                        <option value="Bastar">Bastar</option>
                        <option value="Bemetara">Bemetara</option>
                        <option value="Bijapur">Bijapur</option>
                        <option value="Bilaspur">Bilaspur</option>
                        <option value="Dantewada">Dantewada</option>
                        <option value="Dhamtari">Dhamtari</option>
                        <option value="Durg">Durg</option>
                        <option value="Gariyaband">Gariyaband</option>
                        <option value="Janjgir-champa">Janjgir-champa</option>
                        <option value="Jashpur">Jashpur</option>
                        <option value="Kabirdham">Kabirdham</option>
                        <option value="Kanker">Kanker</option>
                        <option value="Kondagaon">Kondagaon</option>
                        <option value="Korba">Korba</option>
                        <option value="Koriya">Koriya</option>
                        <option value="Mahasamund">Mahasamund</option>
                        <option value="Mungeli">Mungeli</option>
                        <option value="Narayanpur">Narayanpur</option>
                        <option value="Raigarh">Raigarh</option>
                        <option value="Raipur">Raipur</option>
                        <option value="Rajnandgaon">Rajnandgaon</option>
                        <option value="Sukma">Sukma</option>
                        <option value="Surajpur">Surajpur</option>
                        <option value="Surguja">Surguja</option>

                        <option value="Central_Delhi">Central_Delhi</option>
                        <option value="East_Delhi">East_Delhi</option>
                        <option value="New_Delhi">New_Delhi</option>
                        <option value="North_Delhi">North_Delhi</option>
                        <option value="North_East_Delhi">
                          North_East_Delhi
                        </option>
                        <option value="North_West_Delhi">
                          North_West_Delhi
                        </option>
                        <option value="Shahdara">Shahdara</option>
                        <option value="South East_Delhi">
                          South East_Delhi
                        </option>
                        <option value="South_Delhi">South_Delhi</option>
                        <option value="South_West_Delhi">
                          South_West_Delhi
                        </option>
                        <option value="West_Delhi">West_Delhi</option>
                        <option value="Ahmedabad">Ahmedabad</option>
                        <option value="Amreli">Amreli</option>
                        <option value="Anand">Anand</option>
                        <option value="Aravalli">Aravalli</option>
                        <option value="Banaskantha">Banaskantha</option>
                        <option value="Bharuch">Bharuch</option>
                        <option value="Bhavnagar">Bhavnagar</option>
                        <option value="Botad">Botad</option>
                        <option value="Chhotaudepur">Chhotaudepur</option>
                        <option value="Dahod">Dahod</option>
                        <option value="Devbhumi Dwarka">Devbhumi Dwarka</option>
                        <option value="Gandhinagar">Gandhinagar</option>
                        <option value="Gir Somnath">Gir Somnath</option>
                        <option value="Jamnagar">Jamnagar</option>
                        <option value="Junagadh">Junagadh</option>
                        <option value="Kachchh">Kachchh</option>
                        <option value="Kheda">Kheda</option>
                        <option value="Mahesana">Mahesana</option>
                        <option value="Mahisagar">Mahisagar</option>
                        <option value="Morbi">Morbi</option>
                        <option value="Narmada">Narmada</option>
                        <option value="Navsari">Navsari</option>
                        <option value="Panchmahals">Panchmahals</option>
                        <option value="Patan">Patan</option>
                        <option value="Porbandar">Porbandar</option>
                        <option value="Rajkot">Rajkot</option>
                        <option value="Sabarkantha">Sabarkantha</option>
                        <option value="Surat">Surat</option>
                        <option value="Surendra_Nagar">Surendra_Nagar</option>
                        <option value="Tapi">Tapi</option>
                        <option value="The_Dangs">The_Dangs</option>
                        <option value="Vadodara">Vadodara</option>
                        <option value="Valsad">Valsad</option>

                        <option value="Ambala">Ambala</option>
                        <option value="Bhiwani">Bhiwani</option>
                        <option value="Faridabad">Faridabad</option>
                        <option value="Fatehabad">Fatehabad</option>
                        <option value="Gurgaon">Gurgaon</option>
                        <option value="Hisar">Hisar</option>
                        <option value="Jhajjar">Jhajjar</option>
                        <option value="Jind">Jind</option>
                        <option value="Kaithal">Kaithal</option>
                        <option value="Karnal">Karnal</option>
                        <option value="Kurukshetra">Kurukshetra</option>
                        <option value="Mahendragarh">Mahendragarh</option>
                        <option value="Mewat">Mewat</option>
                        <option value="Palwal">Palwal</option>
                        <option value="Panchkula">Panchkula</option>
                        <option value="Panipat">Panipat</option>
                        <option value="Rewari">Rewari</option>
                        <option value="Rohtak">Rohtak</option>
                        <option value="Sirsa">Sirsa</option>
                        <option value="Sonipat">Sonipat</option>
                        <option value="Yamuna_Nagar">Yamuna_Nagar</option>

                        <option value="Kinnaur">Kinnaur</option>
                        <option value="Lahul_and_Spiti">Lahul_and_Spiti</option>

                        <option value="Anantnag">Anantnag</option>
                        <option value="Badgam">Badgam</option>
                        <option value="Bandipore">Bandipore</option>
                        <option value="Baramula">Baramula</option>
                        <option value="Doda">Doda</option>
                        <option value="Ganderbal">Ganderbal</option>
                        <option value="Jammu">Jammu</option>
                        <option value="Kargil">Kargil</option>
                        <option value="Kathua">Kathua</option>
                        <option value="Kishtwar">Kishtwar</option>
                        <option value="Kulgam">Kulgam</option>
                        <option value="Kupwara">Kupwara</option>
                        <option value="Leh">Leh</option>
                        <option value="Pulwama">Pulwama</option>
                        <option value="Punch">Punch</option>
                        <option value="Rajouri">Rajouri</option>
                        <option value="Ramban">Ramban</option>
                        <option value="Reasi">Reasi</option>
                        <option value="Samba">Samba</option>
                        <option value="Shupiyan">Shupiyan</option>
                        <option value="Srinagar">Srinagar</option>
                        <option value="Udhampur">Udhampur</option>

                        <option value="Bokaro">Bokaro</option>
                        <option value="Chatra">Chatra</option>
                        <option value="Deoghar">Deoghar</option>
                        <option value="Dhanbad">Dhanbad</option>
                        <option value="Dumka">Dumka</option>
                        <option value="East_Singhbhum">East_Singhbhum</option>
                        <option value="Garhwa">Garhwa</option>
                        <option value="Giridih">Giridih</option>
                        <option value="Godda">Godda</option>
                        <option value="Gumla">Gumla</option>
                        <option value="Hazaribagh">Hazaribagh</option>
                        <option value="Jamtara">Jamtara</option>
                        <option value="Khunti">Khunti</option>
                        <option value="Koderma">Koderma</option>
                        <option value="Latehar">Latehar</option>
                        <option value="Lohardaga">Lohardaga</option>
                        <option value="Pakur">Pakur</option>
                        <option value="Palamu">Palamu</option>
                        <option value="Ramgarh">Ramgarh</option>
                        <option value="Ranchi">Ranchi</option>
                        <option value="Sahebganj">Sahebganj</option>
                        <option value="Seraikela-Kharsawan">
                          Seraikela-Kharsawan
                        </option>
                        <option value="Simdega">Simdega</option>
                        <option value="West_Singhbhum">West_Singhbhum</option>

                        <option value="Bagalkot">Bagalkot</option>
                        <option value="Bangalore">Bangalore</option>
                        <option value="Bangalore_Rural">Bangalore_Rural</option>
                        <option value="Belgaum">Belgaum</option>
                        <option value="Bellary">Bellary</option>
                        <option value="Bidar">Bidar</option>
                        <option value="Chamrajanagar">Chamrajanagar</option>
                        <option value="Chickmagalur">Chickmagalur</option>
                        <option value="Chikkaballapur">Chikkaballapur</option>
                        <option value="Chitradurga">Chitradurga</option>
                        <option value="Dakshina_Kannada">
                          Dakshina_Kannada
                        </option>
                        <option value="Davangere">Davangere</option>
                        <option value="Dharwad">Dharwad</option>
                        <option value="Gadag">Gadag</option>
                        <option value="Gulbarga">Gulbarga</option>
                        <option value="Hassan">Hassan</option>
                        <option value="Haveri">Haveri</option>
                        <option value="Kodagu">Kodagu</option>
                        <option value="Kolar">Kolar</option>
                        <option value="Koppal">Koppal</option>
                        <option value="Mandya">Mandya</option>
                        <option value="Raichur">Raichur</option>
                        <option value="Ramanagar">Ramanagar</option>
                        <option value="Shimoga">Shimoga</option>
                        <option value="Udupi">Udupi</option>
                        <option value="Uttara_Kannada">Uttara_Kannada</option>
                        <option value="Yadgir">Yadgir</option>

                        <option value="Agar">Agar</option>
                        <option value="Alirajpur">Alirajpur</option>
                        <option value="Anuppur">Anuppur</option>
                        <option value="Ashok_Nagar">Ashok_Nagar</option>
                        <option value="Balaghat">Balaghat</option>
                        <option value="Barwani">Barwani</option>
                        <option value="Betul">Betul</option>
                        <option value="Bhind">Bhind</option>
                        <option value="Bhopal">Bhopal</option>
                        <option value="Chhatarpur">Chhatarpur</option>
                        <option value="Chhindwara">Chhindwara</option>
                        <option value="Damoh">Damoh</option>
                        <option value="Datia">Datia</option>
                        <option value="Dewas">Dewas</option>
                        <option value="Dhar">Dhar</option>
                        <option value="Dindori">Dindori</option>
                        <option value="Guna">Guna</option>
                        <option value="Gwalior">Gwalior</option>
                        <option value="Indore">Indore</option>
                        <option value="Jabalpur">Jabalpur</option>
                        <option value="Jhabua">Jhabua</option>
                        <option value="Katni">Katni</option>
                        <option value="Khargone">Khargone</option>
                        <option value="Mandla">Mandla</option>
                        <option value="Mandsaur">Mandsaur</option>
                        <option value="Morena">Morena</option>
                        <option value="Narsinghpur">Narsinghpur</option>
                        <option value="Neemuch">Neemuch</option>
                        <option value="Panna">Panna</option>
                        <option value="Raisen">Raisen</option>
                        <option value="Rajgarh">Rajgarh</option>
                        <option value="Ratlam">Ratlam</option>
                        <option value="Rewa">Rewa</option>
                        <option value="Sagar">Sagar</option>
                        <option value="Satna">Satna</option>
                        <option value="Sehore">Sehore</option>
                        <option value="Seoni">Seoni</option>
                        <option value="Shahdol">Shahdol</option>
                        <option value="Shajapur">Shajapur</option>
                        <option value="Sheopur">Sheopur</option>
                        <option value="Shivpuri">Shivpuri</option>
                        <option value="Sidhi">Sidhi</option>
                        <option value="Singrauli">Singrauli</option>
                        <option value="Tikamgarh">Tikamgarh</option>
                        <option value="Ujjain">Ujjain</option>
                        <option value="Umaria">Umaria</option>
                        <option value="Vidisha">Vidisha</option>

                        <option value="Ahmadnagar">Ahmadnagar</option>
                        <option value="Akola">Akola</option>
                        <option value="Aurangabad(MH)">Aurangabad(MH)</option>
                        <option value="Beed">Beed</option>
                        <option value="Bhandara">Bhandara</option>
                        <option value="Buldhana">Buldhana</option>
                        <option value="Chandrapur">Chandrapur</option>
                        <option value="Dhule">Dhule</option>
                        <option value="Gadchiroli">Gadchiroli</option>
                        <option value="Gondiya">Gondiya</option>
                        <option value="Hingoli">Hingoli</option>
                        <option value="Jalgaon">Jalgaon</option>
                        <option value="Jalna">Jalna</option>
                        <option value="Kolhapur">Kolhapur</option>
                        <option value="Latur">Latur</option>
                        <option value="Mumbai">Mumbai</option>
                        <option value="Mumbai Suburban">Mumbai Suburban</option>
                        <option value="Nagpur">Nagpur</option>
                        <option value="Nanded">Nanded</option>
                        <option value="Nandurbar">Nandurbar</option>
                        <option value="Nashik">Nashik</option>
                        <option value="Osmanabad">Osmanabad</option>
                        <option value="Palghar">Palghar</option>
                        <option value="Parbhani">Parbhani</option>
                        <option value="Pune">Pune</option>
                        <option value="Raigarh(MH)">Raigarh(MH)</option>
                        <option value="Ratnagiri">Ratnagiri</option>
                        <option value="Sangli">Sangli</option>
                        <option value="Satara">Satara</option>
                        <option value="Sindhudurg">Sindhudurg</option>
                        <option value="Solapur">Solapur</option>
                        <option value="Thane">Thane</option>
                        <option value="Washim">Washim</option>
                        <option value="Yavatmal">Yavatmal</option>

                        <option value="Bishnupur">Bishnupur</option>
                        <option value="Chandel">Chandel</option>
                        <option value="Churachandpur">Churachandpur</option>
                        <option value="Imphal_East">Imphal_East</option>
                        <option value="Imphal_West">Imphal_West</option>
                        <option value="Senapati">Senapati</option>
                        <option value="Tamenglong">Tamenglong</option>
                        <option value="Thoubal">Thoubal</option>
                        <option value="Ukhrul">Ukhrul</option>

                        <option value="East Jaintia Hills">
                          East Jaintia Hills
                        </option>
                        <option value="East_Garo_Hills">East_Garo_Hills</option>
                        <option value="East_Khasi_Hills">
                          East_Khasi_Hills
                        </option>
                        <option value="North Garo Hills">
                          North Garo Hills
                        </option>
                        <option value="Ri_Bhoi">Ri_Bhoi</option>
                        <option value="South West garo Hills">
                          South West garo Hills
                        </option>
                        <option value="South West Khasi Hills">
                          South West Khasi Hills
                        </option>
                        <option value="South_Garo_Hills">
                          South_Garo_Hills
                        </option>
                        <option value="West Jaintia_Hills">
                          West Jaintia_Hills
                        </option>
                        <option value="West_Garo_Hills">West_Garo_Hills</option>
                        <option value="West_Khasi_Hills">
                          West_Khasi_Hills
                        </option>

                        <option value="Aizawl">Aizawl</option>
                        <option value="Champhai">Champhai</option>
                        <option value="Kolasib">Kolasib</option>
                        <option value="Lawngtlai">Lawngtlai</option>
                        <option value="Lunglei">Lunglei</option>
                        <option value="Mammit">Mammit</option>
                        <option value="Saiha">Saiha</option>
                        <option value="Serchhip">Serchhip</option>

                        <option value="Dimapur">Dimapur</option>
                        <option value="Kiphire">Kiphire</option>
                        <option value="Kohima">Kohima</option>
                        <option value="Longleng">Longleng</option>
                        <option value="Mokokchung">Mokokchung</option>
                        <option value="Mon">Mon</option>
                        <option value="Peren">Peren</option>
                        <option value="Phek">Phek</option>
                        <option value="Tuensang">Tuensang</option>
                        <option value="Wokha">Wokha</option>
                        <option value="Zunheboto">Zunheboto</option>

                        <option value="Angul">Angul</option>
                        <option value="Balangir">Balangir</option>
                        <option value="Baleswar">Baleswar</option>
                        <option value="Bargarh">Bargarh</option>
                        <option value="Bhadrak">Bhadrak</option>
                        <option value="Boudh">Boudh</option>
                        <option value="Cuttack">Cuttack</option>
                        <option value="Debagarh">Debagarh</option>
                        <option value="Dhenkanal">Dhenkanal</option>
                        <option value="Gajapati">Gajapati</option>
                        <option value="Ganjam">Ganjam</option>
                        <option value="Jagatsinghapur">Jagatsinghapur</option>
                        <option value="Jajapur">Jajapur</option>
                        <option value="Jharsuguda">Jharsuguda</option>
                        <option value="Kalahandi">Kalahandi</option>
                        <option value="Kandhamal">Kandhamal</option>
                        <option value="Kendrapara">Kendrapara</option>
                        <option value="Kendujhar">Kendujhar</option>
                        <option value="Khorda">Khorda</option>
                        <option value="Koraput">Koraput</option>
                        <option value="Malkangiri">Malkangiri</option>
                        <option value="Mayurbhanj">Mayurbhanj</option>
                        <option value="Nabarangapur">Nabarangapur</option>
                        <option value="Nayagarh">Nayagarh</option>
                        <option value="Nuapada">Nuapada</option>
                        <option value="Puri">Puri</option>
                        <option value="Rayagada">Rayagada</option>
                        <option value="Sambalpur">Sambalpur</option>
                        <option value="Sonapur">Sonapur</option>
                        <option value="Sundergarh">Sundergarh</option>
                        <option value="Ajit Garh (SAS Nagar)">
                          Ajit Garh (SAS Nagar)
                        </option>
                        <option value="Amritsar">Amritsar</option>
                        <option value="Bathinda">Bathinda</option>
                        <option value="Fazilka">Fazilka</option>
                        <option value="Ferozepur">Ferozepur</option>
                        <option value="Gurdaspur">Gurdaspur</option>
                        <option value="Hoshiarpur">Hoshiarpur</option>
                        <option value="Kapurthala">Kapurthala</option>
                        <option value="Mansa">Mansa</option>
                        <option value="Moga">Moga</option>
                        <option value="Pathankot">Pathankot</option>
                        <option value="Patiala">Patiala</option>
                        <option value="Rupnagar">Rupnagar</option>
                        <option value="Sangrur">Sangrur</option>
                        <option value="Sri_Muktsar_Sahib">
                          Sri_Muktsar_Sahib
                        </option>
                        <option value="Tarn_Taran">Tarn_Taran</option>

                        <option value="Ajmer">Ajmer </option>
                        <option value="Alwar">Alwar </option>
                        <option value="Banswara">Banswara </option>
                        <option value="Baran">Baran </option>
                        <option value="Barmer">Barmer </option>
                        <option value="Bharatpur">Bharatpur </option>
                        <option value="Bhilwara">Bhilwara </option>
                        <option value="Bikaner">Bikaner </option>
                        <option value="Bundi">Bundi </option>
                        <option value="Chittorgarh">Chittorgarh </option>
                        <option value="Churu">Churu </option>
                        <option value="Dausa">Dausa </option>
                        <option value="Dholpur">Dholpur </option>
                        <option value="Dungarpur">Dungarpur </option>
                        <option value="Ganganagar">Ganganagar </option>
                        <option value="Hanumangarh">Hanumangarh </option>
                        <option value="Jaipur">Jaipur </option>
                        <option value="Jaisalmer">Jaisalmer </option>
                        <option value="Jalor">Jalor </option>
                        <option value="Jhalawar">Jhalawar </option>
                        <option value="Jhunjhunun">Jhunjhunun </option>
                        <option value="Jodhpur">Jodhpur </option>
                        <option value="Karauli">Karauli </option>
                        <option value="Kota">Kota </option>
                        <option value="Nagaur">Nagaur </option>
                        <option value="Pali">Pali </option>
                        <option value="Pratapgarh">Pratapgarh </option>
                        <option value="Rajsamand">Rajsamand </option>
                        <option value="Sawai_Madhopur">Sawai_Madhopur </option>
                        <option value="Sikar">Sikar </option>
                        <option value="Sirohi">Sirohi </option>
                        <option value="Tonk">Tonk </option>
                        <option value="Udaipur">Udaipur </option>

                        <option value="East_Sikkim">East_Sikkim</option>
                        <option value="North_Sikkim">North_Sikkim </option>
                        <option value="South_Sikkim">South_Sikkim </option>
                        <option value="West_Sikkim">West_Sikkim</option>

                        <option value="Ariyalur">Ariyalur </option>
                        <option value="Chennai">Chennai </option>
                        <option value="Coimbatore">Coimbatore </option>
                        <option value="Cuddalore">Cuddalore </option>
                        <option value="Dharmapuri">Dharmapuri </option>
                        <option value="Dindigul">Dindigul </option>
                        <option value="Erode">Erode </option>
                        <option value="Kancheepuram">Kancheepuram </option>
                        <option value="Kanyakumari">Kanyakumari </option>
                        <option value="Karur">Karur </option>
                        <option value="Krishnagiri">Krishnagiri </option>
                        <option value="Madurai">Madurai </option>
                        <option value="Nagapattinam">Nagapattinam </option>
                        <option value="Namakkal">Namakkal </option>
                        <option value="Nilgiris">Nilgiris </option>
                        <option value="Perambalur">Perambalur </option>
                        <option value="Pudukkottai">Pudukkottai </option>
                        <option value="Ramanathapuram">Ramanathapuram </option>
                        <option value="Salem">Salem </option>
                        <option value="Sivaganga">Sivaganga </option>
                        <option value="Thanjavur">Thanjavur </option>
                        <option value="Theni">Theni </option>
                        <option value="Thiruvarur">Thiruvarur </option>
                        <option value="Thoothukkudi">Thoothukkudi </option>
                        <option value="Tiruchirappalli">
                          Tiruchirappalli{" "}
                        </option>
                        <option value="Tirunelveli">Tirunelveli </option>
                        <option value="Tirupur">Tirupur </option>
                        <option value="Tiruvallur">Tiruvallur </option>
                        <option value="Tiruvannamalai">Tiruvannamalai </option>
                        <option value="Vellore">Vellore </option>
                        <option value="Villupuram">Villupuram </option>
                        <option value="Virudhunagar">Virudhunagar </option>

                        <option value="Karimnagar">Karimnagar </option>
                        <option value="Khammam">Khammam </option>
                        <option value="Mahbubnagar">Mahbubnagar </option>
                        <option value="Medak">Medak </option>
                        <option value="Nalgonda">Nalgonda </option>
                        <option value="Nizamabad">Nizamabad </option>
                        <option value="Warangal">Warangal </option>

                        <option value="Dhalai">Dhalai</option>
                        <option value="Gomati">Gomati</option>
                        <option value="Khowai">Khowai</option>
                        <option value="North_Tripura">North_Tripura</option>
                        <option value="Sepahijala">Sepahijala</option>
                        <option value="South_Tripura">South_Tripura</option>
                        <option value="Unakoti">Unakoti</option>
                        <option value="West_Tripura">West_Tripura</option>

                        <option value="Agra">Agra </option>
                        <option value="Aligarh">Aligarh </option>
                        <option value="Allahabad">Allahabad </option>
                        <option value="Ambedkar_Nagar">Ambedkar_Nagar </option>
                        <option value="Amethi">Amethi </option>
                        <option value="Amroha">Amroha </option>
                        <option value="Auraiya">Auraiya </option>
                        <option value="Azamgarh">Azamgarh </option>
                        <option value="Baghpat">Baghpat</option>
                        <option value="Bahraich">Bahraich </option>
                        <option value="Ballia">Ballia </option>
                        <option value="Balrampur(UP)">Balrampur(UP) </option>
                        <option value="Banda">Banda </option>
                        <option value="Bara_Banki">Bara_Banki </option>
                        <option value="Bareilly">Bareilly </option>
                        <option value="Basti">Basti </option>
                        <option value="Bijnor">Bijnor </option>
                        <option value="Budaun">Budaun </option>
                        <option value="Bulandshahr">Bulandshahr </option>
                        <option value="Chandauli">Chandauli </option>
                        <option value="Chitrakoot">Chitrakoot </option>
                        <option value="Deoria">Deoria </option>
                        <option value="Etah">Etah </option>
                        <option value="Etawah">Etawah </option>
                        <option value="Faizabad">Faizabad </option>
                        <option value="Farrukhabad">Farrukhabad </option>
                        <option value="Fatehpur">Fatehpur </option>
                        <option value="Firozabad">Firozabad </option>
                        <option value="Gautam_Buddha_Nagar">
                          Gautam_Buddha_Nagar{" "}
                        </option>
                        <option value="Ghaziabad">Ghaziabad </option>
                        <option value="Ghazipur">Ghazipur </option>
                        <option value="Gonda">Gonda </option>
                        <option value="Gorakhpur">Gorakhpur </option>
                        <option value="Hamirpur(UP)">Hamirpur(UP) </option>
                        <option value="Hapur">Hapur </option>
                        <option value="Hardoi">Hardoi </option>
                        <option value="Hathras">Hathras </option>
                        <option value="Jalaun">Jalaun </option>
                        <option value="Jaunpur">Jaunpur </option>
                        <option value="Jhansi">Jhansi </option>
                        <option value="Kannauj">Kannauj </option>
                        <option value="Kanpur_Dehat">Kanpur_Dehat </option>
                        <option value="Kanpur_Nagar">Kanpur_Nagar </option>
                        <option value="Kashiram Nagar">Kashiram Nagar </option>
                        <option value="Kaushambi">Kaushambi </option>
                        <option value="Kushinagar">Kushinagar </option>
                        <option value="Lakhimpur Kheri">
                          Lakhimpur Kheri{" "}
                        </option>
                        <option value="Lalitpur">Lalitpur </option>
                        <option value="Lucknow">Lucknow </option>
                        <option value="Maharajganj">Maharajganj </option>
                        <option value="Mahoba">Mahoba </option>
                        <option value="Mainpuri">Mainpuri </option>
                        <option value="Mathura">Mathura </option>
                        <option value="Mau">Mau </option>
                        <option value="Meerut">Meerut </option>
                        <option value="Mirzapur">Mirzapur </option>
                        <option value="Moradabad">Moradabad </option>
                        <option value="Muzaffarnagar">Muzaffarnagar </option>
                        <option value="Pilibhit">Pilibhit </option>
                        <option value="Pratapgarh(UP)">Pratapgarh(UP) </option>
                        <option value="Rae_Bareli">Rae_Bareli </option>
                        <option value="Rampur">Rampur </option>
                        <option value="Saharanpur">Saharanpur </option>
                        <option value="Sambhal">Sambhal </option>
                        <option value="Sant_Kabir_Nagar">
                          Sant_Kabir_Nagar{" "}
                        </option>
                        <option value="Sant_Ravidas_Nagar">
                          Sant_Ravidas_Nagar{" "}
                        </option>
                        <option value="Shahjahanpur">Shahjahanpur </option>
                        <option value="Shamli">Shamli </option>
                        <option value="Shrawasti">Shrawasti </option>
                        <option value="Siddharthnagar">Siddharthnagar </option>
                        <option value="Sitapur">Sitapur </option>
                        <option value="Sonbhadra">Sonbhadra </option>
                        <option value="Sultanpur">Sultanpur </option>
                        <option value="Unnao">Unnao </option>
                        <option value="Varanasi">Varanasi </option>

                        <option value="Almora">Almora</option>
                        <option value="Bageshwar">Bageshwar </option>
                        <option value="Chamoli">Chamoli </option>
                        <option value="Champawat">Champawat </option>
                        <option value="Dehradun">Dehradun </option>
                        <option value="Haridwar">Haridwar </option>
                        <option value="Nainital">Nainital </option>
                        <option value="Pauri_Garhwal">Pauri_Garhwal </option>
                        <option value="Pithoragarh">Pithoragarh </option>
                        <option value="Rudraprayag">Rudraprayag </option>
                        <option value="Tehri_Garhwal">Tehri_Garhwal </option>
                        <option value="Udham_Singh_Nagar">
                          Udham_Singh_Nagar{" "}
                        </option>
                        <option value="Uttarkashi">Uttarkashi </option>

                        <option value="Anatapur">Anatapur</option>
                        <option value="Chittoor">Chittoor</option>
                        <option value="East Godavari">East Godavari</option>
                        <option value="Guntur">Guntur</option>
                        <option value="Krishna">Krishna</option>
                        <option value="Kurnool">Kurnool</option>
                        <option value="Prakasam">Prakasam</option>
                        <option value="Nellore">Nellore</option>
                        <option value="Srikakulam">Srikakulam</option>
                        <option value="Visakhapatnam">Visakhapatnam</option>
                        <option value="Vizianagaram">Vizianagaram</option>
                        <option value="West Godavari">West Godavari</option>
                        <option value="YSR">YSR</option>
                        <option value="Anjaw">Anjaw</option>
                        <option value="Changlang">Changlang</option>
                        <option value="East Kameng">East Kameng</option>
                        <option value="Pasighat">Pasighat</option>
                        <option value="Lohit">Lohit</option>
                        <option value="Lower Subansiri">Lower Subansiri</option>
                        <option value="Papum Pare">Papum Pare</option>
                        <option value="Tawang Town">Tawang Town</option>
                        <option value="Tirap">Tirap</option>
                        <option value="Lower Dibang Valley">
                          Lower Dibang Valley
                        </option>
                        <option value="Upper Siang">Upper Siang</option>
                        <option value="Upper Subansiri">Upper Subansiri</option>
                        <option value="West Kameng">West Kameng</option>
                        <option value="West Siang">West Siang</option>
                        <option value="Upper Dibang Valley">
                          Upper Dibang Valley
                        </option>
                        <option value="Aligarh">Aligarh</option>
                        <option value="Aligarh">Aligarh</option>
                        <option value="Aligarh">Aligarh</option>

                        <option value="Aligarh">Aligarh</option>
                        <option value="Ambedkar Nagar">Ambedkar Nagar</option>
                        <option value="Amethi">Amethi</option>
                        <option value="Lucknow">Lucknow</option>
                        <option value="Prayagraj">Prayagraj</option>
                        <option value="Alipurduar">Alipurduar</option>
                        <option value="Bankura">Bankura </option>
                        <option value="Barddhaman">Barddhaman </option>
                        <option value="Birbhum">Birbhum </option>
                        <option value="Cooch_Behar">Cooch_Behar </option>
                        <option value="Dakshin_Dinajpur">
                          Dakshin_Dinajpur{" "}
                        </option>
                        <option value="Darjeeling">Darjeeling </option>
                        <option value="Hooghly">Hooghly </option>
                        <option value="Howrah">Howrah </option>
                        <option value="Jalpaiguri">Jalpaiguri </option>
                        <option value="Kolkata">Kolkata </option>
                        <option value="Malda">Malda </option>
                        <option value="Murshidabad">Murshidabad </option>
                        <option value="Nadia">Nadia </option>
                        <option value="North_24_Parganas">
                          North_24_Parganas{" "}
                        </option>
                        <option value="Paschim_Medinipur">
                          Paschim_Medinipur{" "}
                        </option>
                        <option value="Purba_Medinipur">
                          Purba_Medinipur{" "}
                        </option>
                        <option value="Puruliya">Puruliya </option>
                        <option value="South_24_Parg">South_24_Parg</option>
                      </select>
                    </div>
                    <div className="col-12 col-md-4 mt-4">
                      <label htmlFor="astate" className="form-group mb-2">
                        State
                        <span className={styles.requireField}>*</span>
                      </label>
                      {/* <input
                        type="text"
                        name="staffState"
                        className="form-control"
                        id="astate"
                        placeholder="Enter State"
                        onChange={StaffJoinDataHandler}
                        required
                      /> */}
                      <select
                        id="astate"
                        className="form-control"
                        name="staffState"
                        onChange={StaffJoinDataHandler}
                        required
                      >
                        <option value="Select State">Select State</option>
                        <option value="Andhra Pradesh">Andhra Pradesh</option>
                        <option value="Arunachal Pradesh">
                          Arunachal Pradesh
                        </option>
                        <option value="Assam">Assam</option>
                        <option value="Bihar">Bihar</option>
                        <option value="Chandigarh">Chandigarh</option>
                        <option value="Chhattisgarh">Chhattisgarh</option>
                        <option value="Delhi">Delhi</option>
                        <option value="Goa">Goa</option>
                        <option value="Gujrat">Gujrat</option>
                        <option value="Haryana">Haryana</option>
                        <option value="Himanchal Pradesh">
                          Himanchal Pradesh
                        </option>
                        <option value="Jammu and Kashmir">
                          Jammu and Kashmir
                        </option>
                        <option value="Jharkhand">Jharkhand</option>
                        <option value="Karnataka">Karnataka</option>
                        <option value="Kerela">Kerela</option>
                        <option value="Madhya Pradesh">Madhya Pradesh</option>
                        <option value="Maharashtra">Maharashtra</option>
                        <option value="Manipur">Manipur</option>
                        <option value="Meghalaya">Meghalaya</option>
                        <option value="Mizoram">Mizoram</option>
                        <option value="Nagaland">Nagaland</option>
                        <option value="Orissa">Orissa</option>
                        <option value="Punjab">Punjab</option>
                        <option value="Rajasthan">Rajasthan</option>
                        <option value="Sikkim">Sikkim</option>
                        <option value="TamilNadu">TamilNadu</option>
                        <option value="Telengana">Telengana</option>
                        <option value="Tripura">Tripura</option>
                        <option value="Uttar Pradesh">Uttar Pradesh</option>
                        <option value="Uttrakhand">Uttrakhand</option>
                        <option value="Uttrakhand">Uttrakhand</option>
                        <option value="West Bengal">West Bengal</option>
                      </select>
                    </div>
                    <div className="col-12 mt-4">
                      <label htmlFor="aaddress" className="form-group mb-2">
                        Address
                        <span className={styles.requireField}>*</span>
                      </label>
                      <textarea
                        type="text"
                        name="staffAddress"
                        className="form-control"
                        rows="2"
                        cols="40"
                        id="aaddress"
                        placeholder="Write Your Full Address Here..."
                        onChange={StaffJoinDataHandler}
                        required
                      ></textarea>
                    </div>
                    <div className="col-12 col-md-4 mt-4">
                      <label htmlFor="phone" className="form-group mb-2">
                        Mobile Number
                        <span className={styles.requireField}>*</span>
                      </label>
                      <input
                        type="tel"
                        name="staffPhoneNumber"
                        className="form-control"
                        id="phone"
                        maxLength="10"
                        minLength="10"
                        placeholder="Enter Mobile Number"
                        onChange={StaffJoinDataHandler}
                        required
                      />
                    </div>
                    <div className="col-12 col-md-4 mt-4">
                      <label htmlFor="aadhar" className="form-group mb-2">
                        Aadhar Number
                        <span className={styles.requireField}>*</span>
                      </label>
                      <input
                        type="tel"
                        name="staffAadharNumber"
                        className="form-control"
                        id="aadhar"
                        maxLength="12"
                        minLength="12"
                        placeholder="Enter Aadhar Number"
                        onChange={StaffJoinDataHandler}
                        required
                      />
                    </div>
                    <div className="col-12 mt-4">
                      <label htmlFor="aqual" className="form-group mb-2">
                        Qualification
                        <span className={styles.requireField}>*</span>
                      </label>
                      <textarea
                        type="text"
                        name="staffQualification"
                        className="form-control"
                        rows="2"
                        cols="40"
                        id="aqual"
                        placeholder="Enter your latest qualification here..."
                        onChange={StaffJoinDataHandler}
                        required
                      ></textarea>
                    </div>
                    {/* <div className="col-12 col-md-4 mt-4">
                      <label htmlFor="attach" className="form-group mb-2">
                        Attach Documents
                      </label>
                      <input
                        type="file"
                        accept="*"
                        multiple
                        name="staffDocuments"
                        className="form-control"
                        id="attach"
                        placeholder="Choose Document"
                        onChange={saveFile}
                        required
                      />
                    </div> */}
                    <div className="col-12 col-md-4 mt-4">
                      <label htmlFor="aadharcard" className="form-group mb-2">
                        Aadhar Card
                        <span className={styles.requireField}>*</span>
                      </label>
                      <input
                        type="file"
                        accept="image/png, image/jpg, image/jpeg, image/pdf"
                        multiple
                        name="staffAadharCard"
                        className="form-control"
                        id="aadharcard"
                        placeholder="Choose Aadhar Card"
                        onChange={saveFile1}
                        required
                      />
                    </div>

                    <div className="col-12 d-flex justify-content-center my-5">
                      <button
                        type="submit"
                        className="btn btn-outline-primary  px-5 "
                      >
                        Confirm Details
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
        <NavbarBottomUser uid={params.id} />
      </div>
    </>
  );
};

export default StaffJoiningForm;
