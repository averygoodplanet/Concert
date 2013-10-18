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
  var section = $('#options').val();
  if(section == 'ga'){
    createGA();
  } else if(section == 'vip'){
    createVIP();
  } else{
    alert('section value not equal to "ga" or "vip"');
  }
}

function createGA() {
  var seatStuff = seatMath(42, 20);
}

function createVIP() {
  console.log('in createVIP');
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
