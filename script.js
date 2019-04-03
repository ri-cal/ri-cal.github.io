//highlight Navi
function hash_changed() {
	$("a").removeClass("active");
	$("a[href*='" + window.location.hash + "']").addClass("active");
}
window.onhashchange = function () {
	hash_changed();
};
//responsive Navi
function colapseNavi() {
	var nav = $(".menu li:not(.colapseButton)");
	var i = 0;
	for (i = 0; i < nav.length; i++) {
		if (nav[i].className === "show") {
			nav[i].className = "hide";
		} else {
			nav[i].className = "show";
		}
	}
}
//Suche
$(document).ready(function(){
  $("#search").on("keyup", function() {
	var value = $(this).val().toLowerCase();
	$("#events .event").filter(function() {
	  $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
	});
  });
});
	$.ajax({
		type: 'GET',
		url: 'https://raw.githubusercontent.com/ri-cal/ri-cal.github.io/master/data.json',
		dataType: 'json',
		success: function (response) {
			var i = 0;
			for (i = 0; i < response.events.length; i++) {
				var summary = "<h3 class='summary'>" +response.events[i].headline + "</h3>";
				var link = "<a href='" +response.events[i].url + "'>Weiter Informationen</a>";
				var description = "<div class='description'>" +response.events[i].text + "<br/>" + link + "</div>";
				var location = "<div class='location'><i class='fas fa-map-marked-alt'></i> " +response.events[i].location+ "</div>";
				var format = new Date(response.events[i].timestamp);
				var date = "<div class='date'><i class='fas fa-calendar-alt'></i> " +format.toLocaleString()+ "</div>";
				var event = $("<div class='event'>" +summary +description +location +date+ "</div>");
				$('#events').append(event);
			}
		},
		error: function (response) {
			//tell that an error has occurred
		}
	});
