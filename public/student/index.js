/**
 * Created by bhavyaagg on 01/04/18.
 */

$(function () {

  $.get('/api/student/viewAll', function (response) {
    if (response.success) {
      let students = response.data;

      let studentsList = $('#studentsList');

      for (let i = 0; i < students.length; i++) {

        studentsList.append(`
      <li class="list-group-item">
        <div class="row text-center">
          <div class="col-3">${students[i].rollno}</div>
          <div class="col-6">${students[i].name}</div>
          <div class="col-3">E/X</div>
        </div>
      </li>`)
      }
    }
  })

  $('#submitstudentBtn').click(function () {

    $.post('/api/student/add',
      {
        name: $('#name').val(),
        rollno: $('#rollno').val()
      },
      function (response) {
        if (response.success) {
          $('#addstudentModal').modal('hide');
          window.location.reload();
        }
        else {
          console.log("could not add the student right now")
        }
      })

  })

  // $('#viewAllstudents').click(function () {
  //   $.get('/api/student/viewAll', function (data) {
  //     $('#liststudents').empty()
  //
  //     data.forEach((student) => {
  //       console.log(student);
  //       $('#liststudents').append(`<li>Name: ${student.name} | RollNo: ${student.rollno}</li>`)
  //     })
  //   })
  // })

})
