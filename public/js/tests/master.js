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
  deepEqual($('#vip .seat').css('border'), '1px solid rgb(0, 0, 255)', 'check that all vip .seats have border divs');
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
  deepEqual($('#ga .seat').css('border'), '1px solid rgb(0, 0, 255)', 'check that all ga .seats have border divs');
  ok(_.every($('#ga > .seatRow'), function(row) {return $(row).children('div').length <= 15;}), 'check that each ga row only 15 seats wide');
});

test('Reserve an empty seat in each section, and reject reservation on occupied seat each section', function() {
  expect(3);

  //create #vip and #ga sections
  //--create #vip section with 22 seats
  $('#options').val('ga');
  $('#numSeats').val('22');
  $('#create').trigger('click');

  //--create #ga section with 42 seats
  $('#options').val('vip');
  $('#numSeats').val('42');
  $('#create').trigger('click');

  //add reservation on 2nd row, 2nd blank seat in #ga section for 'John'
  $('#name').val('John');
  $('#ga > .seatRow:nth-child(2) .seat:nth-child(2) .seatinside').trigger('dblclick');
  //try to add reservation on top of John's occupied seat (this should be rejected)
  $('#name').val('Ron');
  $('#ga > .seatRow:nth-child(2) .seat:nth-child(2) .seatinside').trigger('dblclick');

  //add reservation on 5th seat in #vip section for 'Fred' (requirements do not include row selection)
  $('#name').val('Fred');
  $('#vip > .seat:nth-child(5) .seatinside').trigger('dblclick');
  deepEqual($('#name').val(), '', 'name field should be clear');
  //try to add reservation on top of Fred's occuppied seat (this should be rejected)
  $('#name').val('Ned');
  $('#vip > .seat:nth-child(5) .seatinside').trigger('dblclick');

  //write assertions

  //--in GA section, 2nd row 2nd seat, text should be 'John'
  deepEqual($('#ga > .seatRow:nth-child(2) .seat:nth-child(2) .seatinside').text(), 'John', 'ga 2nd row 2nd seat should be John');
  //$('#ga .seatRow:nth-child(1) .seat:nth-child(5)')
  //--in VIP section, 5th seat, text should be 'Fred'
  deepEqual($('#vip .seat:nth-child(5) .seatinside').text(), 'Fred', 'vip 5th seat should be Fred');
});

test('Display reserved seats in #reportingRight', function () {
  expect(7);

  //create both sections
  //--create #vip section with 22 seats
  $('#options').val('ga');
  $('#numSeats').val('22');
  $('#create').trigger('click');

  //--create #ga section with 42 seats
  $('#options').val('vip');
  $('#numSeats').val('42');
  $('#create').trigger('click');

  //reserve two seats in general admission
  $('#name').val('Alan');
  $('#ga .seatRow:nth-child(1) .seat:nth-child(2) .seatinside').trigger('dblclick');
  $('#name').val('Ben');
  $('#ga .seatRow:nth-child(2) .seat:nth-child(3) .seatinside').trigger('dblclick');

  //reserve two seats in vip
  $('#name').val('Carl');
  $('#vip .seat:nth-child(3) .seatinside').trigger('dblclick');
  $('#name').val('Dan');
  $('#vip .seat:nth-child(25) .seatinside').trigger('dblclick');

  deepEqual($('#reportingRight table tr').length, 5, 'table should have 5 rows (header + 4 (Alan, Ben, Carl, Dan))');
  deepEqual($('#reportingRight table tr:nth-child(2) td:nth-child(1)').text(), 'GA:', 'first row cell "GA:"');
  deepEqual($('#reportingRight table tr:nth-child(3) td:nth-child(2)').text(), 'G18', 'second row 2nd cell "G18"');
  deepEqual($('#reportingRight table tr:nth-child(3) td:nth-child(3)').text(), 'Ben', 'second row 3rd cell "Ben"');
  deepEqual($('#reportingRight table tr:nth-child(4) td:nth-child(1)').text(), 'VIP:', 'third row 1st cell "VIP:"');
  deepEqual($('#reportingRight table tr:nth-child(5) td:nth-child(2)').text(), 'V25', 'fourth row 2nd cell "V25"');
  deepEqual($('#reportingRight table tr:nth-child(5) td:nth-child(3)').text(), 'Dan', 'fourth row 3rd cell "Dan"');
});