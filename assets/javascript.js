// var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
// url += '?' + $.param({
//   'api-key': "fc044f51dbf74281a8dad3e5b46f8d2b",
//   'q': "sandwich maker",
//   'begin_date': "19900101",
//   'end_date': "20171118",
// });



// $.ajax({
//   url: url,
//   method: 'GET',
// }).done(function(result) {
// $("#info").text()
// }).fail(function(err) {
//   throw err;
// });

$("#search-button").click(function(){
var recNum =$("#records").val();
var userSearch = $("#term").val();
console.log(userSearch);
var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=fc044f51dbf74281a8dad3e5b46f8d2b&q="
+ userSearch;

  $.ajax({
    url:queryURL,
    method: 'GET'
  })
  .done(function(results) {

    var article = results.response.docs;
    console.log(article[0]);
    for (var i = 0; i < recNum; i++) {
      var articleDiv = $("<div>");
      articleDiv.text(article[i].headline.main);
      $("#articles").append(articleDiv)
    }
  });

  /*
take the value of the textbox term and set it to api 'q'
take the value of the records textbox and set it something
if there is a value in start year and end year set it to begin date and
end date
possibly put ajax in own function

attach empty to clear results button

attach ajax to the search button


  */
});
