'use strict';

$(document).ready(initialize);

function initialize(fn, flag){
  if(!canRun(flag)) {return;}
  $(document).foundation();

  $('#create').click(clickCreate);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
function clickCreate() {
  var section = $("#options").val();
  if(section === "ga"){
    createGA();
  } else if(section === "vip"){
    createVIP();
  } else{
    alert("Please select a section.");
  }
  if($("#vip div").length > 0 && $("#ga div").length > 0){
    $("#top").remove();
    var $padding = $("<div>");
    $padding.addClass("padding");
    $("body").prepend($padding);
  }
}

function createGA() {
  //Because this function was called, I already know that general admission section was selected.
  var numberOfSeats = parseInt($('#numSeats').val());
  var seatsPerRow = 15;
  var seatInfo = seatMath(numberOfSeats, seatsPerRow);
  // pass seatMath(numberOfSeats, seatsPerRow)
  // seatMath returns {fullrows: 2, unfullrow: 1}
  var numberFullRows = seatInfo.fullrows;
  var numberInUnfullRow = seatInfo.unfullrow;
  var fullrow = '<div class = "seatRow"></div>';
  var $fullRow = $(fullrow);
  //add seats, where seats have class .seat to fullRow;
  for(var i = 0; i < seatsPerRow; i++){
    var seat = '<div class = "seat"></div>';
    var $seat = $(seat);
    $fullRow.append($seat);
  }

  //for number of full rows, add full rows to #ga
  for(var i = 0; i < numberFullRows; i++){
    var $row = $fullRow;
    $('#ga').append($row);
  }

  if(numberInUnfullRow > 0){
    var unfullrow = '<div class = "seatRow unfull"></div>';
    var $unfullrow = $(unfullrow);
    for(var j = 0; j < numberInUnfullRow; j++){
      var newSeat = '<div class = "seat"></div>';
      var $newSeat = $(newSeat);
      $unfullrow.append($newSeat);
    }
    $('#ga').append($unfullrow);
  }
}


function createVIP() {
  // debugger;
  console.log("in createVIP");
  var seatNum = parseFloat($("#numSeats").val());
  for(var i = 0; i < seatNum; i++){
    var $seat = $("<div>");
    $seat.addClass("seat");
    $seat.text(i + 1);
    var $text = $("<div>");
    $text.addClass("seatinside");
    $seat.append($text);
    $("#vip").append($seat);
  }
}

function seatMath(numberOfSeats, seatsPerRow) {
  var evenNumber = (numberOfSeats % seatsPerRow === 0);
  var numberFullRows = 0;
  var numberSeatsUnfullRow = 0;

  if(evenNumber){
    numberFullRows = numberOfSeats / seatsPerRow;
    numberSeatsUnfullRow = 0;
  } else if(evenNumber === false){
    numberFullRows = parseInt(Math.floor(numberOfSeats / seatsPerRow), 10);
    numberSeatsUnfullRow = numberOfSeats % seatsPerRow;
  } else {
    console.log('evenNumber went to else statement');
  }

  var seatInfo = {fullrows: numberFullRows, unfullrow: numberSeatsUnfullRow};
  return seatInfo;
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function getValue(selector, fn){
  var value = $(selector).val();
  value = value.trim();
  $(selector).val('');

  if(fn){
    value = fn(value);
  }

  return value;
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function canRun(flag){
  var isQunit = $('#qunit').length > 0;
  var isFlag = flag !== undefined;
  var value = isQunit && isFlag || !isQunit;
  return value;
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
