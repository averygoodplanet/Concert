'use strict';

module('Integration Testing', {setup: setupTest, teardown: teardownTest});

function setupTest(){
  initialize(null, true);
}

function teardownTest(){

}

test('create VIP section #vip', function(){
  expect(4);

  //set options to VIP Section
  $('#options').val('vip');
  //set number of seats to 20
  $('#numSeats').val('20');
  //click #create  ('Create Section')
  $('#create').trigger('click');

  //do checks to verify it was created;

  //--#vip exists
  ok($('#vip').length, 'checking that #vip exists');
  //--#vip contains number of divs == 20
  deepEqual($('#vip .seat').length, 20, 'checking that 20 seats created under #vip');
  //--#vip divs have border
  ok(_.every($('#vip div').css('border'), function(item) {return item === true;}), 'check that all vip divs have a border');
  ok(_.every($('#vip > .seatRow'), function(row) {return $(row).children('div').length <= 10;}), 'check that each vip row only 10 seats wide');
});


test('create General Admission section #ga', function(){
  expect(4);

  //set options to ga Section
  $('#options').val('ga');
  //set number of seats to 40
  $('#numSeats').val('20');
  //click #create  ('Create Section')
  $('#create').trigger('click');

  //do checks to verify it was created;

  //--#ga exists
  ok($('#ga').length, 'checking that #ga exists');
  //--#ga contains number of divs == 40
  deepEqual($('#ga .seat').length, 20, 'checking that 20 seats created under #ga');
  //--#ga divs have border
  ok(_.every($('#ga div').css('border'), function(item) {return item === true;}), 'check that all ga divs have a border');
  ok(_.every($('#ga > .seatRow'), function(row) {return $(row).children('div').length <= 15;}), 'check that each ga row only 15 seats wide');
});