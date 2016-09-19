// Initialize Firebase
var config = {
	apiKey: "AIzaSyA7KbS_eT3Bg1Q2uqWqhPj_69CFd8ZLAVA",
	authDomain: "train-schedule-6d8ec.firebaseapp.com",
	databaseURL: "https://train-schedule-6d8ec.firebaseio.com",
	storageBucket: "train-schedule-6d8ec.appspot.com",
	messagingSenderId: "137285841656"
};
firebase.initializeApp(config);

var db = firebase.database();

$(document).on("click", "#submitBtn", function() {
	var trainName = $('#trainName').val().trim();
	var destination = $('#destination').val().trim();
	var firstTrain = $('#firstTrain').val().trim();
	var frequency = $('#frequency').val().trim();

	db.ref().push({
		name: trainName,
		destination: destination,
		first: firstTrain,
		frequency: frequency
	});
});

db.ref().on("child_added", function(childSnapshot) {
	var dbName = (childSnapshot.val().name);
	var dbDestination = (childSnapshot.val().destination);
	var dbFirst = (childSnapshot.val().first);
	var dbFrequency = (childSnapshot.val().frequency);
	var firstTimeConverted = moment(dbFirst,"hh:mm").subtract(1, "years");
	var currentTime = moment();
	var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
	var tRemainder = diffTime % dbFrequency;
	var tMinutesTillTrain = dbFrequency - tRemainder;
	var nextTrain = moment().add(tMinutesTillTrain, "minutes");
	nextTrain = moment(nextTrain).format("hh:mm");

	var newRow = $('<tr>');
	var td1 = $('<td>').html(dbName);
	var td2 = $('<td>').html(dbDestination)
	var td3 = $('<td>').html(dbFrequency);
	var td4 = $('<td>').html(nextTrain);
	var td5 = $('<td>').html(tMinutesTillTrain);

	newRow.append(td1, td2, td3, td4, td5);
	$('#my-table').append(newRow);

}, function(error) {
  console.log(error);
});

