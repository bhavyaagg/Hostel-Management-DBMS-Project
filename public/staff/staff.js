/**
 * Created by bhavyaagg on 01/04/18.
 */

$(function () {

  $('#add_staff').click(function () {

    console.log($('#hid').val())
    console.log($('#sid').val())
    console.log($('#tenure').val())
    console.log($('#salary').val())

    $.post('/api/staff/add', {
        hid: $('#hid').val(),
        sid: $('#sid').val(),
        tenure: $('#tenure').val(),
        salary: $('#salary').val(),
        name: $('#name').val()

      },
      function (data) {
        console.log(data);
      })

  })

  $('#viewAllStaffs').click(function () {
    $.get('/api/staff/viewAll', function (data) {
      $('#listStaffs').empty()

      data.forEach((staff) => {
        console.log(staff);
        $('#listStaffs').append(`<li>
          Staff ID: ${staff.sid} |
          Name: ${staff.name} |
          Tenure: ${staff.tenure} days |
          Salary: ${staff.salary} |
          Hostel ID: ${staff.hid}
        </li>`)
      })
    })

  })
});