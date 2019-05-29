var firebaseConfig = {
    apiKey: "AIzaSyBlIILw4vag0tJAESn0b4FE7wTa80CqSoc",
    authDomain: "test-project-8ecb1.firebaseapp.com",
    databaseURL: "https://test-project-8ecb1.firebaseio.com",
    projectId: "test-project-8ecb1",
    storageBucket: "test-project-8ecb1.appspot.com",
    messagingSenderId: "973484036922",
    appId: "1:973484036922:web:054c4987a9d2edd8"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

var database = firebase.database();

// 2. Button for adding TRains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDest = $("#destination-input").val().trim();
  var trainTime = moment($("#first-input").val().trim(), "MM/DD/YYYY").format("X");
  var trainFreq = $("#frequency-input").val().trim();

  // Creates local "temporary" object for holding train data
  var newTrain = {
    name: trainName,
    destination: trainDest,
    start: trainTime,
    frequency: trainFreq,
  };

  // Uploads train data to the database
  database.ref().push(newTrain);

  // Logs everything to console
  console.log(trainName);
  console.log(trainDest);
  console.log(trainTime);
  console.log(trainFreq);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#train-name-input").val("");
  $("#destination-input").val("");
  $("#first-input").val("");
  $("#frequency-input").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
  console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().first;
  var trainFreq = childSnapshot.val().frequency;

  // Employee Info
  console.log(trainName);
  console.log(trainDest);
  console.log(trainTime);
  console.log(trainFreq);

  // Prettify the employee start
//   var trainStartPretty = moment.unix(empStart).format("MM/DD/YYYY");

  // Calculate the months worked using hardcore math
  // To calculate the months worked
//   var empMonths = moment().diff(moment(empStart, "X"), "months");
//   console.log(empMonths);

  // Calculate the total billed rate
//   var empBilled = empMonths * empRate;
//   console.log(empBilled);

  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDest),
    $("<td>").text(trainFreq),
    $("<td>").text("TBD"),
    $("<td>").text("TBD"),
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});

// Example Time Math
// -----------------------------------------------------------------------------
// Assume Employee start date of January 1, 2015
// Assume current date is March 1, 2016

// We know that this is 15 months.
// Now we will create code in moment.js to confirm that any attempt we use meets this test case
