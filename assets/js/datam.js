const firebaseConfig = {
  apiKey: "AIzaSyDrCY6F7oVyghrYT_QAPE-oycFzUriCvOU",
  authDomain: "dashboard-2ed10.firebaseapp.com",
  databaseURL: "https://dashboard-2ed10-default-rtdb.firebaseio.com",
  projectId: "dashboard-2ed10",
  storageBucket: "dashboard-2ed10.appspot.com",
  messagingSenderId: "303994675790",
  appId: "1:303994675790:web:29a145cb8c843852e7591f",
  measurementId: "G-7NL5K9DM4V",
};

firebase.initializeApp(firebaseConfig);

const database = firebase.database();
const dataRef = database.ref("Data");

// Read data from database
const values = [];
database
  .ref("Data")
  .once("value")
  .then((snapshot) => {
    snapshot.forEach((childSnapshot) => {
      let data = childSnapshot.val();
      values.push(data);
    });

    DisplayData(values);
  })
  .catch((error) => {
    console.error("Error retrieving values:", error);
  }); // End read Data

function readAllData(ref) {
  return new Promise((resolve, reject) => {
    ref
      .once("value")
      .then((snapshot) => {
        const userData = [];
        snapshot.forEach((childSnapshot) => {
          userData.push(childSnapshot.val());
        });
        resolve(userData);
      })
      .catch((error) => {
        console.error("Error retrieving values:", error);;
      });
  });
}

readAllData(database.ref("Data/chart"))
.then((userData) => {
    h = userData});

  
// Line Chart
document.addEventListener("DOMContentLoaded", () => {
  new ApexCharts(document.querySelector("#reportsChart"), {
    series: [
      {
        name: "teachers",
        data: [11, 52, 25, 32, 44, 42, 31],
      },
      {
        name: "Revenue",
        data: [11, 32, 45, 32, 34, 52, 41],
      },
      {
        name: "Students",
        data: [15, 11, 32, 18, 9, 24, 11],
      },
    ],
    chart: {
      height: 350,
      type: "area",
      toolbar: { show: false },
    },
    markers: {
      size: 4,
    },
    colors: ["#4154f1", "#2eca6a", "#ff771d"],
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.3,
        opacityTo: 0.4,
        stops: [0, 90, 100],
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "smooth",
      width: 2,
    },
    xaxis: {
      type: "datetime",
      categories: ["2018-09-19T00:00:00.000Z","2018-09-19T01:30:00.000Z","2018-09-19T02:30:00.000Z","2018-09-19T03:30:00.000Z","2018-09-19T04:30:00.000Z","2018-09-19T05:30:00.000Z","2018-09-19T06:30:00.000Z",
      ],
    },
    tooltip: {
      x: {
        format: "dd/MM/yy HH:mm",
      },
    },
  }).render();
});
// End Line Chart

// function readAllData() {
//   dataRef.once("value", (snapshot) => {
//     snapshot.forEach((childSnapshot) => {
//       let userData = childSnapshot.val();
//       console.log(userData);
//     });
//   });
// }

function DisplayData(value) {
  document.getElementById("revenue").innerHTML = value[0];
  document.getElementById("students").innerHTML = value[1];
  document.getElementById("teachers").innerHTML = value[2];
}








// function saveData(){
//   usersRef.push().set({
//     name: userName,
//     email: email
//   })
//   .then(() => {
//     console.log("Data successfully sent to Firebase!");
//   })
//   .catch((error) => {
//     console.error("Error sending data to Firebase: ", error);
//   });

// }

// // Read data from Firebase
// function readAllData(){
//   usersRef.once('value', (snapshot) => {
//     snapshot.forEach((childSnapshot) => {
//       let userData = snapshot.val();
//       console.log(userData);

//     });
//   }, (error) => {
//     console.error("Error reading data: ", error);
//   });
// }

// function basicData(ref) {
//   let values = [];
//   ref
//     .once("value")
//     .then((snapshot) => {
//       snapshot.forEach((childSnapshot) => {
//         let data = childSnapshot.val();
//         values.push(data);
//       }); // End read Data
//       return values;
//       document.getElementById("revenue").innerHTML = values[0];
//       document.getElementById("students").innerHTML = values[1];
//       document.getElementById("teachers").innerHTML = values[2];
//     })
//     .catch((error) => {
//       console.error("Error retrieving values:", error);
//     });
// }

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const db = getDatabase(app);

// set(ref(db, "user/" + userName),
//   {
//     username : userName,
//     Email  : email,
//     Password : password,

//   });
//   alert("logo Done !")