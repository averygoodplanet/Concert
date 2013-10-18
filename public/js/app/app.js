"use strict";

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
}

function createVIP() {
  // debugger;
  console.log("in createVIP");
  var seatNum = parseFloat($("#numSeats").val());
  for(var i = 0; i < seatNum; i++){
    var $seat = $("<div>");
    $seat.addClass("seat");
    $("#vip").append($seat);
  }
}


// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function getValue(selector, fn){
  var value = $(selector).val();
  value = value.trim();
  $(selector).val("");

  if(fn){
    value = fn(value);
  }

  return value;
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //

function canRun(flag){
  var isQunit = $("#qunit").length > 0;
  var isFlag = flag !== undefined;
  var value = isQunit && isFlag || !isQunit;
  return value;
}

// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
// -------------------------------------------------------------------- //
