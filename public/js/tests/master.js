'use strict';

module('Integration Testing', {setup: setupTest, teardown: teardownTest});

function setupTest(){
  initialize(null, true);
}

function teardownTest(){

}

test("create VIP section #vip", function(){
  expect(3);

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
