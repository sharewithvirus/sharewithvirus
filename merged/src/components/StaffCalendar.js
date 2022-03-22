// import React, { useState, useEffect } from "react";
// import { useNavigate, useParams } from 'react-router-dom'
// import "./Calender.css";
// import axios from 'axios'

// const Calender = (props) => {

//   const [studentDate, setStudentDate] = useState([])

//   useEffect(() =>{
//     axios.get(`${requestURL}/student/${props.studentId}/attendence`)
//       .then((res) =>{
//         console.log(res)
//         setStudentDate(res.data.attendStudent.attendDate)
//       })
//       .catch((e) =>{
//         console.log("Something Went Wrong")
//       })
//   },[])


//   const td = document.getElementsByClassName('normal')[0]
//   // const thead = document.getElementsByTagName('td')[0]
//   td.onclick = function(){
//     console.log('o value')
//   }

//   const tds = document.getElementsByClassName('normal')[1]
//   tds.onclick = function(){
//     console.log('1 value')
//   }


//   // setTimeout(() =>{
//   //   const td = document.getElementsByClassName('normal')
//   //   const thead = document.getElementsByTagName('td')[0]
//   //   td.forEach(el => {
//   //     console.log(`${thead.textContent} - ${ct.textContent}`)
//   //   })
//   //   // console.log(td.textContent)
//   //   // console.log(thead.textContent)
//   // },4000)
  
//   // studentDate.map((st) =>(
//   //   console.log(`${new Date(st.attendDate).getDate()}`, `${console.log(new Date(st.attendDate).getMonth() + 1)}`)
    
//   // ))

//   var Cal = function (divId) {
//     //Store div id
//     this.divId = divId;

//     // Days of week, starting on Sunday
//     this.DaysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

//     // Months, stating on January
//     this.Months = [
//       "January",
//       "February",
//       "March",
//       "April",
//       "May",
//       "June",
//       "July",
//       "August",
//       "September",
//       "October",
//       "November",
//       "December",
//     ];

//     // Set the current month, year
//     var d = new Date();

//     this.currMonth = d.getMonth();
//     this.currYear = d.getFullYear();
//     this.currDay = d.getDate();
//   };

//   // Goes to next month
//   Cal.prototype.nextMonth = function () {
//     if (this.currMonth == 11) {
//       this.currMonth = 0;
//       this.currYear = this.currYear + 1;
//     } else {
//       this.currMonth = this.currMonth + 1;
//     }
//     this.showcurr();
//   };

//   // Goes to previous month
//   Cal.prototype.previousMonth = function () {
//     if (this.currMonth == 0) {
//       this.currMonth = 11;
//       this.currYear = this.currYear - 1;
//     } else {
//       this.currMonth = this.currMonth - 1;
//     }
//     this.showcurr();
//   };

//   // Show current month
//   Cal.prototype.showcurr = function () {
//     this.showMonth(this.currYear, this.currMonth);
//   };
  

//   // Show month (year, month)
//   Cal.prototype.showMonth = function (y, m) {
//     var d = new Date(),
//       // First day of the week in the selected month
//       firstDayOfMonth = new Date(y, m, 1).getDay(),
//       // Last day of the selected month
//       lastDateOfMonth = new Date(y, m + 1, 0).getDate(),
//       // Last day of the previous month
//       lastDayOfLastMonth =
//         m == 0 ? new Date(y - 1, 11, 0).getDate() : new Date(y, m, 0).getDate();

//     var html = "<table>";

//     // Write selected month and year
//     html += "<thead><tr>";
//     html += `<td colspan="7" class="monthyear" value='${y}-${m >=10 ? `${m+1}` : `0${m+1}`}'>` + this.Months[m] + " " + y + "</td>";
//     html += "</tr></thead>";

//     // Write the header of the days of the week
//     html += '<tr class="days">';
//     for (var i = 0; i < this.DaysOfWeek.length; i++) {
//       html += "<td>" + this.DaysOfWeek[i] + "</td>";
//     }
//     html += "</tr>";

//     // Write the days
//     var i = 1;
//     do {
//       var dow = new Date(y, m, i).getDay();

//       // If Sunday, start new row
//       if (dow == 0) {
//         html += "<tr>";
//       }
//       // If not Sunday but first day of the month
//       // it will write the last days from the previous month
//       else if (i == 1) {
//         html += "<tr>";
//         var k = lastDayOfLastMonth - firstDayOfMonth + 1;
//         for (var j = 0; j < firstDayOfMonth; j++) {
//           html += '<td class="not-current">' + k + "</td>";
//           k++;
//         }
//       }

//       // Write the current day in the loop
//       var chk = new Date();
//       var chkY = chk.getFullYear();
//       var chkM = chk.getMonth();
//       if (
//         chkY == this.currYear &&
//         chkM == this.currMonth &&
//         i == this.currDay
//       ) {
//         html += `<td class="today" value='${i}'>` + i + "</td>";
//       }
//        else {
//         html += `<td class="normal" value='${i}'>` + i + "</td>";
//       }
//       // If Saturday, closes the row
//       if (dow == 6) {
//         html += "</tr>";
//       }
//       // If not Saturday, but last day of the selected month
//       // it will write the next few days from the next month
//       else if (i == lastDateOfMonth) {
//         var k = 1;
//         for (dow; dow < 6; dow++) {
//           html += '<td class="not-current">' + k + "</td>";
//           k++;
//         }
//       }

//       i++;
//     } while (i <= lastDateOfMonth);

//     // Closes table
//     html += "</table>";

//     // Write HTML to the div
//     document.getElementById(this.divId).innerHTML = html;
//   };


//   // On Load of the window
//   window.onload = function () {
//     // Start calendar
//     setTimeout(() =>{
//     var c = new Cal("divCal");
//     c.showcurr();
    
//     // Bind next and previous button clicks
//     getId("btnNext").onclick = function () {
//       c.nextMonth();
//     };
//     getId("btnPrev").onclick = function () {
//       c.previousMonth();
//     };
//   }, 2000)
//   };

//   // Get element by id
//   function getId(id) {
//     return document.getElementById(id);
//   }
//   return (
//     <>
//       <div className="calendar-wrapper" id="calender">
//         <button id="btnPrev" type="button">
//           Prev
//         </button>
//         <button id="btnNext" type="button">
//           Next
//         </button>
//         <div id="divCal"></div>
//       </div>
//     </>
//   );
// };

// export default Calender;


import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import "bootstrap/dist/css/bootstrap.min.css";
import moment from 'moment'
import axios from 'axios'
import { requestURL } from './ReqUrl';

const StaffCalendar = (props) =>{
  const [dateState, setDateState] = useState(new Date())
  const [studentStatus, setStudentStatus] = useState('')
  const changeDate = (e) => {
    axios.post(`${requestURL}/attendence/status/staff/${props.staffId}`, 
    {
      dateStatus: moment(e).format('YYYY-MM-DD')
    })
    .then((res) =>{
      console.log(res)
      setStudentStatus(res.data.status)
    })
    .catch((e) =>{
      console.log("Something Went Wrong")
    })
    setDateState(e)
    console.log(moment(e).format('YYYY-MM-DD'))
  }

  useEffect(() =>{
      axios.post(`${requestURL}/attendence/status/staff/${props.staffId}`,
      {
        dateStatus: moment(Date.now()).format('YYYY-MM-DD')
      })
      .then((res) =>{
        // setStudentStatus(res.data.status)
      })
      .catch((e) =>{
        console.log("Something went wrong")
      })
  },[studentStatus])
  // console.log(moment(Date.now()).format('YYYY-MM-DD'))
  return (
    <>
      <h4 className='my-2'>({moment(dateState).format('Do MMMM YYYY')})</h4>
    <div className="mx-5 my-5">
      <div className='row'>
          <div className='col-12 col-md-6'>
          <Calendar 
          value={dateState}
          onChange={changeDate}
          />
          </div>
          <div className='col-12 col-md-6'>
            <div className='my-5'>
          { studentStatus === 'Not Marking' ?
          <h4>Attendence is <b>not marked</b> on that day</h4>
          :
          studentStatus === 'Present' ? 
          <h4>You will be marked as <b className='text-primary'>Present</b></h4>
          : 
          !studentStatus ? 
          <h4>Their will be no attendence</h4> : 
          <h4>You will be marked as <b className='text-danger'>Absent</b></h4>
          }
          </div>
          </div>
      </div>
    </div>
    
    </>
  )
}

export default StaffCalendar

