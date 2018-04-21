/**
 * Created by bhavyaagg on 01/04/18.
 */

$(function () {

  $('#date').datepicker();

  $.get('/api/application/viewAll', function (response) {
    if (response.success) {
      let applications = response.data;

      let applicationsList = $('#applicationsList');

      for (let i = 0; i < applications.length; i++) {

        applicationsList.append(`
      <li class="list-group-item">
        <div class="row text-center">
          <div class="col-3">${applications[i].rollno}</div>
          <div class="col-3">${applications[i].status}</div>
          <div class="col-3">${applications[i].dateSubmitted}</div>
          <div class="col-3">E/X</div>
        </div>
      </li>`)
      }
    }
  })

  $('#submitApplicationBtn').click(function () {

    $.post('/api/application/add',
      {
        date: $('#date').val(),
        status: $('#status').val(),
        rollno: $('#rollno').val(),
      },
      function (response) {
        if (response.success) {
          $('#addApplicationModal').modal('hide');
          window.location.reload();
        }
        else {
          console.log("could not add the Application right now")
        }
      })

  })


  // $('#viewAllApplications').click(function () {
  //   $.get('/api/application/viewAll', function (data) {
  //     $('#listApplications').empty()
  //
  //     data.forEach((application) => {
  //       console.log(application);
  //       $('#listApplications').append(`<li>
  //         Date Submitted: ${application.datesubmitted} |
  //         Status: ${application.status} |
  //         Student Roll No: ${application.rollno}
  //       </li>`)
  //     })
  //   })
  // })

})