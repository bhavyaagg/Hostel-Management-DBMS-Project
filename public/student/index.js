/**
 * Created by bhavyaagg on 01/04/18.
 */

$(function () {


  $('#showStudentDetails').click(() => {
    $.get('/api/student/mydetails')
      .done((data) => {
        if (data.success) {
          let student = data.data;
          let $noticeBoard = $('#noticeBoard');

          $noticeBoard.css('display', 'block').empty().append(
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
              <li id="rollno" class="list-group-item item">${student.rollno}</li>
              <li id="name" class="list-group-item item">${student.name}</li>
              <li id="email" class="list-group-item item">${student.email}</li>
              <li id="contact" class="list-group-item item">${student.contact}</li>
              <li id="address" class="list-group-item item">${student.address}</li>
              <li id="pincode" class="list-group-item item">${student.pincode}</li>
              <li id="outsidedelhi" class="list-group-item item">${student.outsidedelhi ? "Yes" : "No"}</li>
              <li id="pwd" class="list-group-item">${student.pwd ? "Yes" : "No"}</li>
          `)


          $noticeBoard.append(`
            <div id="updateStudentDiv" class="col text-center mt-3">
              <button id="updateStudentDetails" class="btn btn-info">Update</button>
              <div id="msgEditStudent"></div>
            </div>
          `)


          $('#updateStudentDetails').click(() => {
            $(".item").attr('contentEditable', 'true');
            $('#updateStudentDiv').empty().append(`
            <div id="updateStudentDiv" class="col text-center mt-3">
              <button id="submitUpdateStudentDetails" class="btn btn-info">Submit</button>
              <div id="msgEditStudent"></div>
            </div>              
            `)
            $('#msgEditStudent').removeClass('text-danger').addClass('text-success').text("You can edit the fields")
            $('#submitUpdateStudentDetails').click(() => {

              let name = $('#name')[0].innerText;
              let email = $('#email')[0].innerText;
              let rollno = $('#rollno')[0].innerText;
              let contact = $('#contact')[0].innerText;
              let address = $('#address')[0].innerText;
              let pincode = $('#pincode')[0].innerText;
              let outsideDelhi = $('#outsidedelhi')[0].innerText;
              let pwd = $('#pwd')[0].innerText
              let $msg = $('#msgEditStudent').removeClass('text-success').addClass('text-success');
              if (!name || name.length === 0 || name[0].toLowerCase() === name[0].toUpperCase()) {
                console.log(name)
                $msg.text("Please Enter Valid Name");
                return;
              }

              if (!email || email.length === 0 || !validateEmail(email)) {
                $msg.text("Please Enter Valid Email");
                return;
              }

              if (!rollno || rollno.length <= 6 || rollno.length > 7) {
                $msg.text("Incorrect Roll Number");
                return;
              }

              if (!contact || contact.length < 10 || contact.length > 10) {
                $msg.text("Please enter correct Mobile Number");
                return;
              }

              if (!address || address.length === 0) {
                $msg.text("Please Enter correct Address");
                return;
              }

              if (!pincode || pincode.length < 6 || pincode.length > 6) {
                $msg.text("Please Enter correct Pincode");
                return;
              }

              if (!outsideDelhi || !(outsideDelhi.toLowerCase() === 'no' || outsideDelhi.toLowerCase() === 'yes')) {
                $msg.text("Please Select The Outside Delhi Option(Yes/No)");
                return;
              }

              if (!pwd || !(pwd.toLowerCase() === 'no' || pwd.toLowerCase() === 'yes')) {
                $msg.text("Please Select The PWD Option(Yes/No)");
                return;
              }

              $.post("/api/student/update", {
                name,
                email,
                rollno,
                contact,
                address,
                pincode,
                outsideDelhi,
                pwd
              }).done(function (student) {
                if (student.success) {
                  window.location.reload();

                } else {
                  console.log(2)
                  console.log(student.error);
                  $('#errorRegister').text("Eroorr")
                }
              }).fail(function (student) {
                console.log(student.responseJSON)
                if (student.responseJSON.error.name === 'SequelizeUniqueConstraintError') {
                  $('#errorRegister').text(`${student.responseJSON.error.errors[0].type}! ${student.responseJSON.error.errors[0].message}`)
                } else {
                  $('#errorRegister').text('Other Error');
                }
              });


            })
          })
        } else {
          console.log("Some errrorrr")
        }
      })
      .fail((err) => {
        console.log(2)
        console.log(err)
      })
  })

  $('#apply').click(() => {
    $.get('/api/hostel/viewAll')
      .done((data) => {
        if (data.success) {
          let hostels = data.data;
          $('#noticeBoard').empty().css('display', 'block').append(`
              <div class="row no-gutters">
                <div class="col">
                  <ul id="viewAllHostels" class="list-group">
                    <li class="list-group-item">
                    <div class="row">
                      <div class="col">
                        <b>Name</b>
                      </div>
                      <div class="col">
                        <b>Capacity</b>
                      </div> 
                      <div class="col">
                        <b>Details</b>
                      </div> 
                    </div>
                    </li>
                  </ul>
                </div>
              </div>
            `)

          hostels.sort((a, b) => {
            return a.hid - b.hid;
          })
          hostels.forEach((hostel) => {
            $('#viewAllHostels').append(`
              <li class="list-group-item">
              <div class="row">
                      <div class="col">
                        ${hostel.name}
                      </div>
                      <div class="col">
                        ${hostel.capacity}
                      </div> 
                      <div class="col">
                        <button data-id="${hostel.hid}" data-name="${hostel.name}" data-capacity="${hostel.capacity}" class="btn btn-sm btn-info applyHostelBtn">
                          Apply
                        </button>
                        <button data-id="${hostel.hid}" data-name="${hostel.name}" data-capacity="${hostel.capacity}" class="btn btn-sm btn-info viewDetails">
                          View
                        </button>
                      </div> 
                    </div>
              </li>
            `)
          })

          $('.applyHostelBtn').click((e) => {
            // TODO: Write logic
            let name = e.currentTarget.getAttribute('data-name')
            let capacity = e.currentTarget.getAttribute('data-capacity')
            let hid = e.currentTarget.getAttribute('data-id')
            $('#editName').val(name)
            $('#editCapacity').val(capacity)

            $('#modal').modal('show');

            $('#editSubmitHostelBtn').off().click(() => {
              let name = $('#editName').val();
              let capacity = $('#editCapacity').val();


              if (!name || name.length === 0 || name[0].toLowerCase() === name[0].toUpperCase()) {
                $('#errorAddHostel').text("Please Enter Valid Name");
                return;
              }

              if (!capacity || capacity <= 0) {
                $('#errorAddHostel').text("Please Enter Valid Capacity(Capacity>0)");
                return;
              }

              $.post(`/api/hostel/update/${hid}`, {
                name,
                capacity
              }).done(function (hostel) {
                if (hostel.success) {
                  $('#errorEditHostel').removeClass('text-danger').addClass('text-success').text("Hostel Updated");
                } else {
                  console.log(2)
                  console.log(hostel.error);
                  $('#errorEditHostel').addClass("text-danger").removeClass('text-success').text("Some Error Update Hostel")
                }
              }).fail(function (hostel) {
                console.log(hostel.responseJSON)
                if (hostel.responseJSON.error.name === 'SequelizeUniqueConstraintError') {
                  $('#errorEditHostel').text(`${hostel.responseJSON.error.errors[0].type}! ${hostel.responseJSON.error.errors[0].message}`)
                } else {
                  $('#errorEditHostel').addClass("text-danger").removeClass('text-success').text("Some Error Update Hostel2")
                }
              });
            })


          })

          $('.viewDetails').click((e) => {
            let name = e.currentTarget.getAttribute('data-name')
            let capacity = e.currentTarget.getAttribute('data-capacity')
            let hid = e.currentTarget.getAttribute('data-id')
            $.get(`/api/hostel/details/${hid}`)
              .done((data) => {
                if (data.success) {
                  console.log(data.data)
                  let rooms = data.data;


                  $('#noticeBoard').css('display', 'block').empty().append(
                    `
              <div class="row no-gutters">
                <div class="col">
                  <ul class="list-group">
                    <li class="list-group-item">Name</li>
                    <li class="list-group-item">Capacity</li>
                    <li class="list-group-item">Number of Vacant Rooms</li>
                  </ul>
                </div>
                <div class="col">
                  <ul id="listDetails" class="list-group">
                  <li class="list-group-item">${name}</li>
                  <li class="list-group-item">${capacity}</li>
                  <li id="noOfVacantRooms" class="list-group-item"></li>                  
                  </ul>
                </div>
              </div>
            `).append(`
              <div class="row no-gutters">
                <div class="col">
                  <ul id="viewHostelRooms" class="list-group">
                    <li class="list-group-item">
                    <div class="row">
                      <div class="col">
                        <b>Room Number</b>
                      </div>
                      <div class="col">
                        <b>Floor</b>
                      </div> 
                      <div class="col">
                        <b>Vacancy</b>
                      </div> 
                    </div>
                    </li>
                  </ul>
                </div>
              </div>
            `)
                  let notVacantRooms = 0;
                  rooms.forEach((room) => {
                    if (!room.vacant) {
                      notVacantRooms++;
                    }
                    $('#viewHostelRooms').append(`
                      <li class="list-group-item">
                        <div class="row">
                      <div class="col">
                        ${room.roomno}
                      </div>
                      <div class="col">
                        ${room.floor}
                      </div> 
                      <div class="col">
                        ${room.vacant}
                      </div> 
                    </div>
              </li>
            `)
                  })

                  $('#noOfVacantRooms').append(`
                    ${capacity - notVacantRooms}
                  `);
                } else {
                  console.log(12)
                  console.log(err)
                }
              })
              .fail(() => {
                console.log(21)
                console.log(err)
              })
          })
        } else {
          console.log("Some error View Hostel")
        }
      })
      .fail((err) => {
        console.log(2)
        console.log(err)
      })
  })


})

function validateEmail(email) {
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}


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


