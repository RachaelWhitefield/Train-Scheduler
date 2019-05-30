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

// 2. Button for adding Trains
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDest = $("#destination-input").val().trim();
  var trainTime = moment($("#first-input").val().trim(), "HH:mm").format("X");
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

// 3. Create Firebase event for adding train to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(childSnapshot) {
//   console.log(childSnapshot.val());

  // Store everything into a variable.
  var trainName = childSnapshot.val().name;
  var trainDest = childSnapshot.val().destination;
  var trainTime = childSnapshot.val().first;
  var trainFreq = childSnapshot.val().frequency;

  
  var trainTimeConverted = moment(trainTime, "HH:mm").subtract(1, "years");
  console.log(trainTimeConverted);

  var diffTime = moment().diff(moment(trainTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  var remainder = diffTime % trainFreq;
  console.log(remainder);

  var minutesTillTrain = trainFreq - remainder;
  console.log("MINUTES TILL TRAIN: " + minutesTillTrain);

  var nextTrain = moment().add(minutesTillTrain, "minutes");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  // Employee Info
  console.log(trainName);
  console.log(trainDest);
  console.log(trainTime);
  console.log(trainFreq);


  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDest),
    $("<td>").text(trainFreq),
    $("<td>").text(nextTrain),
    $("<td>").text(minutesTillTrain),
  );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});

// var currentTime = moment();
// console.log("CURRENT TIME: " + moment(currentTime).format("HH:mm"));

