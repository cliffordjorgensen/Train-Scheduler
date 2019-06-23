$(document).ready(function() {
    var firebaseConfig = {
        apiKey: "AIzaSyCNMOAPCUF16y2WNonrSLyQeVEz_uP9PhA",
        authDomain: "train-scheduler-39a1f.firebaseapp.com",
        databaseURL: "https://train-scheduler-39a1f.firebaseio.com",
        projectId: "train-scheduler-39a1f",
        storageBucket: "",
        messagingSenderId: "748340301166",
        appId: "1:748340301166:web:f96217431a973585"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
    var database = firebase.database();
    // time display
    function publishTime() {
        var currentTimeFormat = "hh:mm:ss A";
        var currentTime = moment(moment(), currentTimeFormat);
        var currentTimeFormatted = currentTime.format(currentTimeFormat);
        $('#theTime').html('Current Time: ' + currentTimeFormatted)
    };
    setInterval(publishTime, 1000);
    //initial values
    var submitBtn = $("#searchButton");
    var cancelBtn = $("#clearResults");
    var name = "";
    var destination = "";
    var firstTrain = "";
    var frequency = 0;
    var nextArrival = 0;
    var minsAway = 0;
    // display stored fiebase data to table
    database.ref().on("child_added", function(childsnapshot) {
        var child = childsnapshot.val();
        var table = $("<tr class = 'table'>");
        $("#table").append(table);
        table.append("<td>" + child.dataName + "</td>");
        table.append("<td>" + child.dataDest + "</td>");
        table.append("<td>" + child.dataFreq + "</td>");
        table.append("<td>" + child.dataArriv + "</td>");
        table.append("<td>" + child.dataMins + "</td>");
    }, function(error) {
        console.log("error");
    });

    submitBtn.click(function() {
        event.preventDefault();
        // user input variables
        name = $("#train-name").val().trim();
        destination = $("#destination").val().trim();
        firstTrain = $("#train-time").val().trim();
        frequency = parseInt($("#train-freq").val().trim());
        // if any input in form is blank, alert and stop code:
        if (name === '' || destination === '' || firstTrain === '' || frequency === '') {
            return $('.addFormAlert').css('display', 'initial');
        } else { $('.addFormAlert').css('display', 'none') };
        // moment conversion
        var timeconvert = moment(firstTrain, "HH:mm").subtract(1, "years");
        var difference = moment().diff(moment(timeconvert), "minutes");
        var remain = difference % frequency;
        minsAway = frequency - remain;
        var nextTrain = moment().add(minsAway, "mins");
        nextArrival = moment(nextTrain).format("hh:mm");
        // push data to firebase
        database.ref().push({
                dataName: name,
                dataDest: destination,
                dataTime: firstTrain,
                dataFreq: frequency,
                dataMins: minsAway,
                dataArriv: nextArrival,
            })
            // clear form after submission
        for (var i = 0; i < $('form').length; i++) {
            $('form')[i].reset();
        };
    });
    cancelBtn.click(function() {
        var trainName = $("#train-name").val('');
        var trainDest = $("#destination").val('');
        var trainTime = $("#train-time").val('');
        var trainFreq = $('#train-freq').val('');
    });
});