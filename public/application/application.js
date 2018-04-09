/**
 * Created by bhavyaagg on 01/04/18.
 */

$(function () {

  $('#add_application').click(function () {

    console.log($('#date').val())
    console.log($('#status').val())
    console.log($('#rno').val())
    console.log($('#aid').val())

    $.post('/api/application/add',
      {
        date: $('#date').val(),
        status: $('#status').val(),
        rno: $('#rno').val(),
        aid: $('#aid').val()

      },
      function (data) {
        console.log(data);
      })

  })


  $('#viewAllApplications').click(function () {
    $.get('/api/application/viewAll', function (data) {
      $('#listApplications').empty()

      data.forEach((application) => {
        console.log(application);
        $('#listApplications').append(`<li>
          Application ID: ${application.aid} |
          Date Submitted: ${application.datesubmitted} |
          Status: ${application.status} |
          Student Roll No: ${application.rollno}
        </li>`)
      })
    })
  })

})