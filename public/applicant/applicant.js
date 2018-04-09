/**
 * Created by bhavyaagg on 01/04/18.
 */

$(function () {

  $('#add_applicant').click(function () {

    console.log($('#name').val())
    console.log($('#rno').val())

    $.post('/api/applicant/add',
      {
        name: $('#name').val(),
        rno: $('#rno').val()
      },
      function (data) {
        console.log(data);
      })

  })

  $('#viewAllApplicants').click(function () {
    $.get('/api/applicant/viewAll', function (data) {
      $('#listApplicants').empty()

      data.forEach((applicant) => {
        console.log(applicant);
        $('#listApplicants').append(`<li>Name: ${applicant.name} | RollNo: ${applicant.rollNo}</li>`)
      })
    })
  })

})