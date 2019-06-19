var startYear;
var endYear;
var searchTerm;
var numRecords;
var searchButton = $("#searchButton");
var clearResults = $("#clearResults");

searchButton.on("click", function () {
    searchTerm = $("#search-term");
    numRecords = $("#num-records").val();
    start = $("#start-year").val();
    end = $("#end-year").val();
    query1 = searchTerm;

    if (start !== "") {
        query1.append(`&begin_date=${start}`);
    }
    if (end !== "") {
        query1.append(`&end_date=${end}`);
    }
    let queryURL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?q=${query1}&api-key=GevTC67WTlBRpmBttQ4SDfrAxT6N0VRH`;

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);
        // console.log(response.reponse.meta.hits);
        for (let i = 0; i < numRecords; i++) {
            // debugger;
            let results = response.response.docs[i].web_url;
            $("#article-view").append(results);
        }
    });
});

clearResults.on("click", function () {
    $("#searchButton").val('');
    $("start").val('');
    $("end").val('');
});






