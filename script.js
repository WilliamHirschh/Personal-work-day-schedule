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
const closeHr = 17;
const openHr = 9;
const BEFORE = 0;
var opHours = 8;
var opening = 9;
var increment = 1;
var closing = 17;
var backGround = BEFORE;
const after = 1;

function getOperatingHours(hours) {
    var result;
    if (hours < 12) {
        result = hours.toString() + "AM";
    }
    else if (hours === 12 ){
        result = hours.toString() + "PM";
    }
    else {
        result = (hours-12).toString() + "PM";
    }
    return result;
};

function createHTML(hours){
    var stuff = $(
        "<div class='row'>" +
        "<div class='col-1 hour'>" + 
            hours +
        "</div>" +
        "<div class='col-10'>" +
            "<p class='description'></p>"+
        "</div>" +
        "<div class='col-1 saveBtn'>" +
            "<i class = 'oi oi-task'></i>" +
        "</div>" +
    "</div>"

    );
    stuff.appendTo(".container");
};


function makeTaskSheet (){
    for (opening; opening <= closing; opening++) {
        createHTML(getOperatingHours(opening));
    }
};
makeTaskSheet();



function startCountDown (start) {
    var AMPM = start.slice(-2);
    var numm = start.slice(0, -2);
    var result;

    if (start === "12PM") {
        result = 12;
    }
    else if (AMPM === "PM") {
        result = parseInt(numm) + 12;
    }
    else {
        result = parseInt(numm);
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
        $(".description").each(function( index ){
            if(thingsToDo[index]) {
                $( this ).text(thingsToDo[index]);
            }
        });
    }
};
load();

$(".row").on("click", ".col-10", function() {
    
var words = $(this).children(".description").text();

var wordsInput = $("<textarea>").addClass("form-control").val(words);

$(this).children(".description").replaceWith(wordsInput);

wordsInput.trigger("focus");
});
$(".saveBtn").on("click", "i", function() {
    var pick = $(this).parent().prev().children(".form-control")
    var savedText = pick.val();
    var savedIndex = pick.closest(".row").index();
    thingsToDo[savedIndex] = savedText;
    save();
    var paragraphTask = $("<p>").text(savedText);
    pick.closest(".form-control").replaceWith(paragraphTask);
});
getTime();