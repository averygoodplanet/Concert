'use strict';

$("#reportingLeftContainer").hide();
$("#reportingRightContainer").hide();
$("#name").hide();

var gaPrice = 50;
var vipPrice = 100;

$(document).ready(initialize);

function initialize(fn, flag){
  if(!canRun(flag)) {return;}
  $(document).foundation();

  $('#create').click(clickCreate);
  $("#bottom").on("dblclick", ".seatinside", addName);
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
function clickCreate() {
  var section = $("#options").val();
  if(section === "ga"){
    createGA();
    $("#name").show();
    $("#gaOption").remove();
  } else if(section === "vip"){
    createVIP();
    $("#name").show();
    $("#vipOption").remove();
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
  var seatNumber = 0;

  //for number of full rows, add full rows to #ga
  for(var i = 0; i < numberFullRows; i++){
    var fullrow = '<div class = "seatRow"></div>';
    var $fullRow = $(fullrow);
    //add seats, where seats have class .seat to fullRow;
    for(var j = 0; j < seatsPerRow; j++){
      var seat = '<div class = "seat"></div>';
      var $seat = $(seat);
      //****************
      seatNumber += 1;
      $seat.text(seatNumber);
      var $text = $('<div>');
      $text.addClass('seatinside');
      $seat.append($text);
      //****************
      $fullRow.append($seat);
    }
    $('#ga').append($fullRow);
  }

  if(numberInUnfullRow > 0){
    var unfullrow = '<div class = "seatRow unfull"></div>';
    var $unfullrow = $(unfullrow);
    for(var k = 0; k < numberInUnfullRow; k++){
      seatNumber += 1;
      var newSeat = '<div class = "seat"></div>';
      var $newSeat = $(newSeat);
      var $newText = $('<div>');
      $newText.addClass('seatinside');
      $newSeat.text(seatNumber);
      $newSeat.append($newText);
      $unfullrow.append($newSeat);
    }
    $('#ga').append($unfullrow);
  }
}


function createVIP() {
  // debugger;
  console.log('in createVIP');
  var seatNum = parseFloat($('#numSeats').val());
  for(var i = 0; i < seatNum; i++){
    var $seat = $('<div>');
    $seat.addClass('seat');
    $seat.text(i + 1);
    var $text = $('<div>');
    $text.addClass('seatinside');
    $seat.append($text);
    $('#vip').append($seat);
  }
}

// ------------------------------------------------------[addName]----------------->

function addName(){
  //the oject that was clicked on
  var $this = $(this);
  var isGASection = $this.parent().parent().hasClass('seatRow');

  //if seat is not currently reserved
  if($this.text() === ''){
    var thisSeatNumber = parseInt($this.parent().text(), 10);
    //get the text for text input box
    var name = $('#name').val();
    //put this text into the jQuery object
    $this.text(name);
    //clear out the input box
    $('#name').val('');
    $("#reportingLeftContainer").show();
    $("#reportingRightContainer").show();
    updateSeatList(thisSeatNumber, name, isGASection);
  }else{
    var $name = $this.text();
    alert("Already assigned to: " + $name + ".");
  }
}

function updateSeatList(thisSeatNumber, name, isGASection) {
  var sectionLetter = '';
  var section = '';
  var sectionSelector = '';
  var mySectionAlreadyHasFirstRow, sectionClass;

  // isGASection --> sectionLetter and section
  if(isGASection){
    sectionLetter = 'G';
    section = 'GA:';
    sectionSelector = '.gaFirstRow';
    sectionClass = 'gaFirstRow';
    mySectionAlreadyHasFirstRow = $('#reportingRightBox').has(sectionSelector).length > 0;

    var startingGaPeople = parseFloat($("#totalGaPeople").text());
    var startingTotalPeople = parseFloat($("#totalPeople").text());
    var startingPriceGa = parseFloat($("#totalGaDollars").text());
    var startingGrandTotal = parseFloat($("#grandTotal").text());

    var people = startingGaPeople + 1;
    var totPeople = startingTotalPeople + 1;
    var priceGa = startingPriceGa + gaPrice;
    var ticketPrice = startingGrandTotal + gaPrice;

    $("#totalGaPeople").text(people);
    $("#totalPeople").text(totPeople);
    $("#totalGaDollars").text(priceGa + ".00");
    $("#grandTotal").text(ticketPrice + ".00");
  } else {
    sectionLetter = 'V';
    section = 'VIP:';
    sectionSelector = '.vipFirstRow';
    sectionClass = 'vipFirstRow';
    mySectionAlreadyHasFirstRow = $('#reportingRightBox').has(sectionSelector).length > 0;

    var startingVipPeople = parseFloat($("#totalVipPeople").text());
    var startingTotalPeople = parseFloat($("#totalPeople").text());
    var startingPriceVip = parseFloat($("#totalVipDollars").text());
    var startingGrandTotal = parseFloat($("#grandTotal").text());

    var people = startingVipPeople + 1;
    var totPeople = startingTotalPeople + 1;
    var priceVip = startingPriceVip + vipPrice;
    var ticketPrice = startingGrandTotal + vipPrice;

    $("#totalVipPeople").text(people);
    $("#totalPeople").text(totPeople);
    $("#totalVipDollars").text(priceVip + ".00");
    $("#grandTotal").text(ticketPrice + ".00");
  }

  var seat = sectionLetter + thisSeatNumber;
  var row = '<tr><td></td><td></td><td></td></tr>';
  var $row = $(row);
  $row.children().eq(1).text(seat);
  $row.children().eq(2).text(name);

  //if this is the first row for a section listing, add prefix, i.e. "VIP:", and append
  //the row to the table. If is the second row of a section, needs to be inserted after that table.
  if(mySectionAlreadyHasFirstRow){
    $(sectionSelector).after($row);
  } else {
    $row.children().eq(0).text(section);
    $row.addClass(sectionClass);
    $('#reportingRightBox table').append($row);
  }
}

// ------------------------------------------------------[End addName]----------------->

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
