var datetime = null,
        date = null;
        

var update = function () {
    date = moment(new Date())
    datetime.html(date.format('dddd, MMMM Do YYYY, h:mm:ss a'));
};

$(document).ready(function(){
    datetime = $('#currentDay')
    update();
    setInterval(update, 1000);
});

var thingsToDo = {};
var opHours = 8;
var opening = 9;
var increment = 1;
var closing = 17;
const closeHr = 17;
const openHr = 9;
const BEFORE = 0;
var backGround = BEFORE;
const after = 1;
function createHTML(hours){
    var stuff = $(
        "<div class='row'>" +
        "<div class='column1 hour'>" + 
            hours +
        "</div>" +
        "<div class='column10'>" +
            "<p class='description'></p>"+
        "</div>" +
        "<div class='column1 saveBtn'>" +
            "<i class = 'oi oi-task'></i>" +
        "</div>" +
    "</div>"

    );
    stuff.appendTo(".container");
};






function convertTime(hours) {
    var result;
    if (hours < 12) {
        result = hours.toString() + "AM";
    }
    else if (hours === 12) {
        result = hours.toString() + "PM";
    }
    else {
        result = (hours-12).toString() + "pm";
    }
return result;

};
function makeTaskSheet () {
    for (opening; opening <= opening; opening++) {
        createHTML(convertTime(opening));
    }
};
makeTaskSheet();

function startCountDown (start) {
    var AMPM = start.sliice(-2);
    var num = start.slice(0, -2);
    var result;

    if (start === "12PM") {
        result = 12;
    }
    else if (AMPM === "PM") {
        result = parseInt(num) + 12;
    }
    else {
        result = parseInt(num);
    }
    return result;
};
function getTime() {
    var currentTime = moment(). format("hA");
    var currentColor = startCountDown(currentTime);

$(".hour").each(function( i ) {
    var eTime = $( this ).text().trim();
    if (currentColor < openHr) {
           $( this ).next().addClass("future").removeClass("present").removeClass("past");
        }
    else if (currentColor > closeHr ) {
        $( this ).next().addClass("past").removeClass("present").removeClass("future");
    }
    else {
        if (eTime === currentTime) {
            $( this ).next().addClass("present").removeClass("past").removeClass("future")
            backGround = AFTER;    
        }
    else {
        switch(backGround) {
            case BEFORE:
                $( this ).next().addClass("future").removeClass("present").removeClass("past");
                break;
            case AFTER:
                $( this ).next().addClass("past").removeClass("present").removeClass("future");
                break;
            default:
                break;
        }
        }
    }
});
};

var save = function() {
localStorage.setItem("thingsToDo", JSON.stringify(thingsToDo));
};
var load = function() {
    thingsToDo = JSON.parse(localStorage.getItem("thingsToDo"));
    if (!thingsToDo) {
        thingsToDo = {};
    }
    if (thingsToDo) {
        $(".details").each(function( index ){
            if(thingsToDo[index]) {
                $( this ).text(thingsToDo[index]);
            }
        });
    }
};
load();
$(".row").on("click", "column10", function(){
var words = $(this).children(".details").text();
var wordsInput = $("<textarea>").addClass("form-control").val(words);
$(this).children(".details").replaceWith(wordsInput);
wordsInput.trigger("focus");
});
$(".saveBtn").on("click", "i", function(){
    var prevent = $(this).parent().prev().children(".form-control")
    var savedText = prevent.val();
    var savedIndex = prevent.closest(".row").index();
    thingsToDo[savedIndex] = savedText;
    save();
    var paragraphTask = $("<p>").text(savedText);
    prevent.closest(".form-control").replaceWith(paragraphTask);
});