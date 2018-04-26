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
    $.get('/api/application/exists')
      .done((data) => {
        console.log(data)
        if (data.data && data.data.length > 1) {
          data.data[0] = data.data[data.data.length - 1];
        }
        if (data.success && data.data[0].status !== "REJECTED") {
          $.get(`/api/hostel/details/${data.data[0].hid}`)
            .done((hostelData) => {
              console.log(hostelData)
              if (data.data[0].status === "ALLOTTED") {
                $.get('/api/rooms/getAllottedRoom').done((allottedData) => {
                  if (allottedData.success) {
                    $('#noticeBoard').css('display', 'block').empty().append(`
                      <div class="row">
                        <div class="col">
                          Your previous application for hostel ${hostelData.hostelData[0].name} has been accepted.<br/>
                          Allotted Room: ${allottedData.data[0].roomno}
                        </div>
                      </div>
                    `)
                  }
                })
              } else {
                $('#noticeBoard').css('display', 'block').empty().append(`
                  <div class="row">
                    <div class="col">
                      You have already applied for the Hostel ${hostelData.hostelData[0].name}
                    </div>
                  </div>
                    `)
              }
            })
        } else {
            console.log(data.data);
          if (data.data && data.data[0] && data.data[0].status === "REJECTED") {
            console.log("nbsdkjasn")
            $('#noticeBoard').prepend(`
              <div class="row mb-3">
              <div class="col-12 text-danger">
                Your previous application was rejected.
              </div>
              </div>
            `)
          }
          $.get('/api/hostel/viewAll')
            .done((data) => {
              if (data.success) {
                let hostels = data.data;
                $('#noticeBoard').css('display', 'block').append(`
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
                        <!--<button data-id="${hostel.hid}" data-name="${hostel.name}" data-capacity="${hostel.capacity}" class="btn btn-sm btn-info applyHostelBtn">
                          Apply
                        </button>-->
                        <button data-id="${hostel.hid}" data-name="${hostel.name}" data-capacity="${hostel.capacity}" class="btn btn-sm btn-info viewDetails">
                          View
                        </button>
                      </div> 
                    </div>
              </li>
            `)
                })

                $('.viewDetails').click((e) => {
                  let name = e.currentTarget.getAttribute('data-name')
                  let capacity = e.currentTarget.getAttribute('data-capacity')
                  let hid = e.currentTarget.getAttribute('data-id')
                  $.get(`/api/hostel/details/${hid}`)
                    .done((data) => {
                      if (data.success) {
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
                <div class="col-12">
                  <ul id="viewHostelRooms" class="list-group">
                    <li class="list-group-item">
                    <div class="row">
                      <div class="col-3">
                        <b>Room Number</b>
                      </div>
                      <div class="col-2">
                        <b>Floor</b>
                      </div> 
                      <div class="col-3">
                        <b>Vacancy</b>
                      </div> 
                      <div class="col-4">
                        <b>Preference(Max 3)</b>
                      </div> 
                    </div>
                    </li>
                  </ul>
                </div>
                <div class="col-12 text-center mt-3">
                  <button id="applyForHostelButton" class="btn btn-success">
                    Apply
                  </button>
                </div>
                <div id="errorApply" class="text-center text-danger text-capitalize"></div>
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
                      <div class="col-3">
                        ${room.roomno}
                      </div>
                      <div class="col-2">
                        ${room.floor}
                      </div> 
                      <div class="col-3">
                        ${room.vacant}
                      </div> 
                      <div  data-id="${room.roomno}" class="form-group col-4">
                        <input ${!room.vacant ? "disabled='true'" : ""} placeholder="Eg 1, 2 or 3" class="form-control input roomPreference">
                      </div>
                    </div>
              </li>
            `)
                        })

                        $('#noOfVacantRooms').append(`
                    ${capacity - notVacantRooms}
                  `);

                        $('#applyForHostelButton').click(() => {
                          let $preferences = $('.roomPreference');
                          let noOfPreferencesFilled = 0;
                          let finalPreferences = {
                            "1": 0,
                            "2": 0,
                            "3": 0
                          };
                          $preferences.each((i, preference) => {
                            let value = $(preference).val();
                            if (+value === 1) {
                              finalPreferences[1] = $(preference).parent().attr('data-id')
                              noOfPreferencesFilled++;
                            }
                            if (+value === 2) {
                              finalPreferences[2] = $(preference).parent().attr('data-id')
                              noOfPreferencesFilled++;
                            }
                            if (+value === 3) {
                              finalPreferences[3] = $(preference).parent().attr('data-id')
                              noOfPreferencesFilled++;
                            }
                          })
                          if (noOfPreferencesFilled < 1 || noOfPreferencesFilled > 3) {
                            $('#errorApply').text("Please select Your Preferences");
                            console.log(1)
                            return;
                          }
                          console.log(finalPreferences)
                          $.post('/api/application/add', {
                            date: (new Date()).toJSON().split("T")[0],
                            hid: hid,
                            room1: finalPreferences[1],
                            room2: finalPreferences[2],
                            room3: finalPreferences[3]
                          }).done((data) => {
                            console.log(data)
                            if (data.success) {
                              $('#noticeBoard').css('display', 'block').empty().append(
                                `
              <div class="row no-gutters">
                <div class="col text-success">
                  Application Successfully Submitted                 
                </div>
              </div>
            `)
                            } else {
                              console.log("Some error Apply")
                            }
                          }).fail((err) => {
                            console.log(err);
                          })
                        })


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
        }
      }).fail(() => {

    })

  })


  $('#viewInventory').click(() => {
    $.get('/api/inventory/viewAll')
      .done((data) => {
        if (data.success && data.data.length !== 0) {
          let inventory = data.data;
          $('#noticeBoard').empty().css('display', 'block').append(`
              <div class="row no-gutters">
                <div class="col">
                  <ul id="viewAllHostels" class="list-group">
                    <li class="list-group-item">
                    <div class="row">
                      <div class="col">
                        <b>EMID</b>
                      </div>
                      <div class="col">
                      <b>HOSTEL NAME</b>
                      </div> 
                      
                      <div class="col">
                      <b>ITEM NAME</b>
                      </div> 
                      <div class="col">
                      <b>QUANTITY</b>
                      </div> 
                      
                      
                    </div>
                    </li>
                  </ul>
                </div>
              </div>
            `)
          inventory.forEach((inventory) => {
            $('#noticeBoard').append(`
              <li class="list-group-item">
              <div class="row">
                      <div class="col">
                        ${inventory.emid}
                      </div>
                      <div class="col">
                        ${inventory.hname}
                      </div>
                      
                      <div class="col">
                        ${inventory.name}
                      </div> 
                      <div class="col">
                        ${inventory.qty}
                      </div> 
                    </div>
              </li>
                        
                      `)
          })
        } else {
          $('#noticeBoard').empty().css('display', 'block').append(`
              <div class="row no-gutters">
                <div class="col text-capitalize text-danger">
                  No Inventory
                </div>
              </div>
            `)
        }
      })
      .fail((err) => {
        console.log(2)
        console.log(err)
      })
  })

  $('#showAttendance').click(() => {
    $.get('/api/attendance/viewOne')
      .done((data) => {
        if (data.success && data.data.length !== 0) {
          let attendance = data.data;
          console.log(attendance)
          $('#noticeBoard').empty().css('display', 'block').append(`
              <div class="row no-gutters">
                <div class="col">
                  <ul id="viewAllHostels" class="list-group">
                    <li class="list-group-item">
                    <div class="row">
                      <div class="col">
                        <b>PRESENT</b>
                      </div>
                      <div class="col">
                      <b>DAY COUNT</b>
                      </div>                      
                    </div>
                    </li>
                  </ul>
                </div>
              </div>
            `)

          $('#noticeBoard').append(`
              <li class="list-group-item">
              <div class="row">
                      <div class="col">
                        ${attendance[0].totalpresent}
                      </div>
                      <div class="col">
                        ${attendance[0].totaldays}
                      </div>               
                    </div>
              </li>
                        
                      `)

        } else {
          $('#noticeBoard').empty().css('display', 'block').append(`
              <div class="row no-gutters">
                <div class="col text-capitalize text-danger">
                  No Attendance Details
                </div>
              </div>
            `)
        }
      })
      .fail((err) => {
        console.log(2)
        console.log(err)
      })
  })

  $('#viewFines').click(() => {

    $.get('/api/fines/viewSelect')
      .done((data) => {
        if (data.success) {
          let fines = data.data;
          console.log(fines)
          $('#noticeBoard').empty().css('display', 'block').append(`
              <div class="row no-gutters">
                <div class="col">
                  <ul id="viewAllHostels" class="list-group">
                    <li class="list-group-item">
                    <div class="row">
                      <div class="col">
                        <b>FID</b>
                      </div>
                      <div class="col">
                      <b>Roll Number</b>
                      </div>

                      <div class="col">
                      <b>Remark</b>
                      </div>
                      <div class="col">
                      <b>Amount</b>
                      </div>
                      <div class="col">
                      <b>Paid</b>
                      </div>

                    </div>
                    </li>
                  </ul>
                </div>
              </div>
            `)
          fines.forEach((fines) => {
            $('#noticeBoard').append(`
              <li class="list-group-item">
              <div class="row">
                      <div class="col">
                        ${fines.fid}
                      </div>
                      <div class="col">
                        ${fines.rollno}
                      </div>

                      <div class="col">
                        ${fines.remark}
                      </div>
                      <div class="col">
                        ${fines.amount}
                      </div>
                      <div class="col">
                        ${fines.paid ? 'Yes' : 'No'}
                      </div>
                    </div>
              </li>

                      `)
          })
        } else {
          console.log("Some error view inventory")
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


