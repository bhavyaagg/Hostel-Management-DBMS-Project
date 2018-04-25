/**
 * Created by bhavyaagg on 01/04/18.
 */

$(function () {

  // $.get('/api/student/viewAll', function (response) {
  //   if (response.success) {
  //     let students = response.data;
  //
  //     let studentsList = $('#studentsList');
  //
  //     for (let i = 0; i < students.length; i++) {
  //
  //       studentsList.append(`
  //     <li class="list-group-item">
  //       <div class="row text-center">
  //         <div class="col-3">${students[i].rollno}</div>
  //         <div class="col-6">${students[i].name}</div>
  //         <div class="col-3">E/X</div>
  //       </div>
  //     </li>`)
  //     }
  //   }
  // })

  // $('#submitstudentBtn').click(function () {
  //
  //   $.post('/api/student/add',
  //     {
  //       name: $('#name').val(),
  //       rollno: $('#rollno').val()
  //     },
  //     function (response) {
  //       if (response.success) {
  //         $('#addstudentModal').modal('hide');
  //         window.location.reload();
  //       }
  //       else {
  //         console.log("could not add the student right now")
  //       }
  //     })
  //
  // })


  $('#showStudentDetails').click(() => {
    console.log(1)
    $.get('/api/student/mydetails')
      .done((data) => {
        if (data.success) {
          let student = data.data;


          $('#noticeBoard').css('display', 'block').empty().append(
            `
              <div class="row no-gutters">
                <div class="col">
                  <ul class="list-group">
                    <li class="list-group-item">Roll Number</li>
                    <li class="list-group-item">Name</li>
                    <li class="list-group-item">Email</li>
                    <li class="list-group-item">Contact</li>
                    <li class="list-group-item">Address</li>
                    <li class="list-group-item">Pincode</li>
                    <li class="list-group-item">Outside Delhi</li>
                    <li class="list-group-item">PWD</li>
                  </ul>
                </div>
                <div class="col">
                  <ul id="listDetails" class="list-group">
                  </ul>
                </div>
              </div>
            `
          )


          $('#listDetails').append(`
              <li class="list-group-item">${student.rollno}</li>
              <li class="list-group-item">${student.name}</li>
              <li class="list-group-item">${student.email}</li>
              <li class="list-group-item">${student.contact}</li>
              <li class="list-group-item">${student.address}</li>
              <li class="list-group-item">${student.pincode}</li>
              <li class="list-group-item">${student.outsidedelhi ? "Yes" : "No"}</li>
              <li class="list-group-item">${student.pwd ? "Yes" : "No"}</li>
          `)
        } else {
          console.log("Some errrorrr")
        }
      })
      .fail((err) => {
        console.log(2)
        console.log(err)
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
