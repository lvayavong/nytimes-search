

$("#search-button").click(function(){

  
  //store the values the users gave us
  var recNum =$("#records").val().trim();
  var userSearch = $("#term").val();

  //genearte the API URL
  var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=fc044f51dbf74281a8dad3e5b46f8d2b&q=" + userSearch;

  //check if the value of start you is truthy... aka has a value
  if($('#start-year').val()){
    //takes the value which looks like yyyy-mm-dd and removes the - marks
    var startYear = $('#start-year').val().replace(/-/g, '');
    //adds the date to the query url
    queryURL += "&begin_date=" + startYear;
  }
  
  //same as above for end date
  if($('#end-year').val()){
    var endYear = $('#end-year').val().replace(/-/g, '');
    queryURL += "&end_date=" + endYear;
  }

  console.log(queryURL);  

  //call API using AJAX
  $.ajax({
    url:queryURL,
    method: 'GET'
  })
  .done(function(results) {

    //this variable holds the JSON dot notation to get to the correct spot in the object for the articles and content.
    var article = results.response.docs;
    console.log()
    //loops through each article and creates the content, I did a reverse loop because we are prerending the articles onto the page
    for (var i = recNum-1; i >= 0; i--) {
      //creates a link wrapper for each article
      var $articleLink = $("<a>").attr({class:'article-link', href: article[i].web_url, target:'_blank'});
      //creates a div to hold the article content
      var $articleDiv = $("<div>");
      //adds headline and snippet to the article div
      $articleDiv.addClass('article').html(
        '<h3>' + article[i].headline.main + '</h3>' +
        '<p>' + article[i].snippet + '</p>');
      //if the article has an image, append it to the articleDiv
      if(article[i].multimedia.length > 0){
        $articleDiv.append('<img src="http://www.nytimes.com/' + article[i].multimedia[0].url + '" style="max-height: 350px" />');
      }

      //puts the article div inside the link
      $($articleLink).append($articleDiv);
      //puts the link (with the article content) inside the HTML page
      $("#articles").prepend($articleLink);
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

//clears everything
$('#clear-btn').click(function(){
  $('#term, #start-year, #end-year').val('');
  $('#records').val(5);
  $('#articles').empty();
});
