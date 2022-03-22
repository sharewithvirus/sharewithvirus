function subWiseExamFilter(eL, subL) {
  const filterList = [];
  for (let i = 0; i < subL.length; i++) {
    // eslint-disable-next-line no-loop-func
    let newArray = eL.filter((ele) => {
      let d = [];
      return (d = ele.examId.subject._id === subL[i]);
    });
    filterList.push(newArray);
  }
  return filterList;
}

// Total Exam Marks Function Start Here

function examTotalObtainMarks(list) {
  // let totalMarks = [];
  let newList = [];
  for (let j = 0; j < list.length; j++) {
    let newArray2 = [];

    newList.push(newArray2);

    for (let i = 0; i < list[j].length; i++) {
      const b = list[j][i].examObtainMarks;

      newArray2.push(b);
    }
  }

  let total = [];
  for (let i = 0; i < newList.length; i++) {
    let sum = 0;
    if (!Array.isArray(newList)) return;
    newList[i].forEach((each) => {
      sum += each;
    });
    total.push(sum);
  }
  return total;
}

function examTotalMarks(list) {
  let newList = [];
  for (let j = 0; j < list.length; j++) {
    let newArray2 = [];
    newList.push(newArray2);

    for (let i = 0; i < list[j].length; i++) {
      const b = list[j][i].examTotalMarks;

      newArray2.push(b);
    }
  }

  let total = [];
  for (let i = 0; i < newList.length; i++) {
    let sum = 0;
    if (!Array.isArray(newList)) return;
    newList[i].forEach((each) => {
      sum += each;
    });
    total.push(sum);
  }
  return total;
}

// Total Exam Marks Function Ends Here

// Other Exam Marks Function Start Here

function otherExamTotalObtainMarks(list) {
  // let totalMarks = [];
  let newList = [];
  for (let j = 0; j < list.length; j++) {
    let newArray2 = [];

    newList.push(newArray2);

    for (let i = 0; i < list[j].length - 1; i++) {
      const b = list[j][i].examObtainMarks;

      newArray2.push(b);
    }
  }

  let total = [];
  for (let i = 0; i < newList.length; i++) {
    let sum = 0;
    if (!Array.isArray(newList)) return;
    newList[i].forEach((each) => {
      sum += each;
    });
    total.push(sum);
  }
  return total;
}

function otherExamTotalMarks(list) {
  let newList = [];
  for (let j = 0; j < list.length; j++) {
    let newArray2 = [];
    newList.push(newArray2);

    for (let i = 0; i < list[j].length - 1; i++) {
      const b = list[j][i].examTotalMarks;

      newArray2.push(b);
    }
  }

  let total = [];
  for (let i = 0; i < newList.length; i++) {
    let sum = 0;
    if (!Array.isArray(newList)) return;
    newList[i].forEach((each) => {
      sum += each;
    });
    total.push(sum);
  }
  return total;
}

// Other Exam Marks Function end Here

// Final Exam Marks Function Start Here

function finalExamTotalObtainMarks(list) {
  // let totalMarks = [];
  let newList = [];
  for (let j = 0; j < list.length; j++) {
    let newArray2 = [];

    newList.push(newArray2);

    for (let i = list[j].length - 1; i < list[j].length; i++) {
      const b = list[j][i].examObtainMarks;

      newArray2.push(b);
    }
  }

  let total = [];
  for (let i = 0; i < newList.length; i++) {
    let sum = 0;
    if (!Array.isArray(newList)) return;
    newList[i].forEach((each) => {
      sum += each;
    });
    total.push(sum);
  }
  return total;
}

function finalExamTotalMarks(list) {
  let newList = [];
  for (let j = 0; j < list.length; j++) {
    let newArray2 = [];
    newList.push(newArray2);

    for (let i = list[j].length - 1; i < list[j].length; i++) {
      const b = list[j][i].examTotalMarks;

      newArray2.push(b);
    }
  }

  let total = [];
  for (let i = 0; i < newList.length; i++) {
    let sum = 0;
    if (!Array.isArray(newList)) return;
    newList[i].forEach((each) => {
      sum += each;
    });
    total.push(sum);
  }
  return total;
}



// Final Exam Marks Function end Here

// Function For Arry Some

function arrySum(newList) {
  let total = [];

  let sum = 0;
  if (!Array.isArray(newList)) return;
  newList.forEach((each) => {
    sum += each;
  });
  total.push(sum);
  return total;
}

function arrSum(newList) {
  let total = [];

  let sum = 0;
  if (!Array.isArray(newList)) return;
  newList.forEach((each) => {
    sum += each;
  });
  total.push(sum);
  return total;
}
function round(value, precision) {
  var multiplier = Math.pow(10, precision || 0);
  return Math.round(value * multiplier) / multiplier;
}

function arrMacker(
  list,
  finalExamObtainList,
  finalExamTotalList,
  otherExamObtainMarksList,
  otherExamTotalMarksList
) {
  var arr = [];
  var len = list.length;
  for (var i = 0; i < len; i++) {
    let item = {
      examSubject: list[i][i].examId.subject.subjectName,
      finalExamMarks: `${finalExamObtainList[i]}/${finalExamTotalList[i]}`,
      otherExamFinalTotal: `${otherExamObtainMarksList[i]}/${otherExamTotalMarksList[i]}`,
      totalMarks: `${
        Number(finalExamObtainList[i]) + Number(otherExamObtainMarksList[i])
      }/${Number(finalExamTotalList[i]) + Number(otherExamTotalMarksList[i])}`,
    };
    arr.push(item);
  }
  return arr;
}

function passFailHandler(b) {
  let result;
 if (b >= 75) {
   result = "Passed With Distention";
 } else if( b >= 65 && b <= 74 ){
   result = "1st Class"
 } else if( b >= 50 && b <= 64 ) {
   result = "2nd Class";
 } else if( b >= 35 && b <= 50 ) {
   result = "Passing Grade";
 } else if( b <= 34 ) {
   result = "Fail";
 }
 return result
}


function getdepartmenttotalstudent(list, b) {
  let appStrArr = [];
  let row = b;

  for (let i = 0; i < row; i++) {
    let stNumber = list.length !== 0 ? list[i].ApproveStudent.length : 0;
    appStrArr.push(stNumber);
  }
  let studentCount = arrSum(appStrArr);

  return studentCount;
}

export {
  arrMacker,
  round,
  arrSum,
  subWiseExamFilter,
  examTotalObtainMarks,
  examTotalMarks,
  otherExamTotalObtainMarks,
  otherExamTotalMarks,
  finalExamTotalObtainMarks,
  finalExamTotalMarks,
  passFailHandler,
  getdepartmenttotalstudent,
};
