/**
 * Created by bhavyaagg on 01/04/18.
 */

$(function () {

  $.get('/api/applicant/viewAll', function (response) {
    if (response.success) {
      let applicants = response.data;

      let applicantsList = $('#applicantsList');

      for (let i = 0; i < applicants.length; i++) {

        applicantsList.append(`
      <li class="list-group-item">
        <div class="row text-center">
          <div class="col-3">${applicants[i].rollno}</div>
          <div class="col-6">${applicants[i].name}</div>
          <div class="col-3">E/X</div>
        </div>
      </li>`)
      }
    }
  })

  $('#submitApplicantBtn').click(function () {

    $.post('/api/applicant/add',
      {
        name: $('#name').val(),
        rollno: $('#rollno').val()
      },
      function (response) {
        if (response.success) {
          $('#addApplicantModal').modal('hide');
          window.location.reload();
        }
        else {
          console.log("could not add the applicant right now")
        }
      })

  })

  // $('#viewAllApplicants').click(function () {
  //   $.get('/api/applicant/viewAll', function (data) {
  //     $('#listApplicants').empty()
  //
  //     data.forEach((applicant) => {
  //       console.log(applicant);
  //       $('#listApplicants').append(`<li>Name: ${applicant.name} | RollNo: ${applicant.rollno}</li>`)
  //     })
  //   })
  // })

})