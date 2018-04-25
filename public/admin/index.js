/**
 * Created by bhavyaagg on 25/04/18.
 */
$(document).ready(() => {
  $('#addHostel').click(() => {
    $('#noticeBoard').empty().css('display', 'block').append(`
      <div class="form-group">
        <input id="name" required type="text" class="form-control input"
                         placeholder="Name">
      </div>
      <div class="form-group">
        <input id="capacity" required type="number" class="form-control input"
                         placeholder="Capacity">
      </div>
      <div id="errorAddHostel" class="text-danger text-capitalize">
        
      </div>
      <button id="submitHostelBtn" class="btn btn-success">Submit</button>
    `);


    $('#submitHostelBtn').click(() => {
      let name = $('#name').val();
      let capacity = $('#capacity').val();


      if (!name || name.length === 0 || name[0].toLowerCase() === name[0].toUpperCase()) {
        $('#errorAddHostel').text("Please Enter Valid Name");
        return;
      }

      if (!capacity || capacity <= 0) {
        $('#errorAddHostel').text("Please Enter Valid Capacity(Capacity>0)");
        return;
      }

      $.post("/api/hostel/add", {
        name,
        capacity
      }).done(function (hostel) {
        if (hostel.success) {
          $('#errorAddHostel').removeClass('text-danger').addClass('text-success').text("Hostel Added");
        } else {
          console.log(2)
          console.log(hostel.error);
          $('#errorAddHostel').addClass("text-danger").removeClass('text-success').text("Some Error Add Hostel")
        }
      }).fail(function (hostel) {
        console.log(hostel.responseJSON)
        if (hostel.responseJSON.error.name === 'SequelizeUniqueConstraintError') {
          $('#errorAddHostel').text(`${hostel.responseJSON.error.errors[0].type}! ${hostel.responseJSON.error.errors[0].message}`)
        } else {
          $('#errorAddHostel').addClass("text-danger").removeClass('text-success').text("Some Error Add Hostel2")
        }
      });
    })
  })

  $('#viewHostelDetails').click(() => {
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
                        <button data-id="${hostel.hid}" data-name="${hostel.name}" data-capacity="${hostel.capacity}" class="btn btn-sm btn-info updateHostelBtn">
                          Update
                        </button>
                        <button data-id="${hostel.hid}" data-name="${hostel.name}" data-capacity="${hostel.capacity}" class="btn btn-sm btn-info viewDetails">
                          View
                        </button>
                      </div> 
                    </div>
              </li>
            `)
          })

          $('.updateHostelBtn').click((e) => {
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
                  console.log(data.wardenData)
                  let rooms = data.data;

                  $('#noticeBoard').css('display', 'block').empty().append(
                    `
              <div class="row no-gutters">
                <div class="col">
                  <ul class="list-group">
                    <li class="list-group-item">Name</li>
                    <li class="list-group-item">Capacity</li>
                    <li class="list-group-item">Number of Vacant Rooms</li>
                    <li class="list-group-item">Warden</li>
                  </ul>
                </div>
                <div class="col">
                  <ul id="listDetails" class="list-group">
                  <li class="list-group-item">${name}</li>
                  <li class="list-group-item">${capacity}</li>
                  <li id="noOfVacantRooms" class="list-group-item"></li>
                  <li class="list-group-item">${data.wardenData[0].username}</li>                                   
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


  $('#addHostelStaff').click(() => {
    $('#errorRegister').text("");
    $.get('/api/hostel/viewAll').done((data) => {
      if (data.success && data.data.length !== 0) {
        let hostels = data.data;
        $('#noticeBoard').empty().css('display', 'block').append(`
                <div class="form-group">
                  <input id="registerName" required type="text" class="form-control input"
                         placeholder="Full Name">
                </div>
                <div class="form-group">
                  <input id="registerUsername" required type="text" class="form-control input"
                         placeholder="Username">
                </div>
                <div class="form-group">
                  <input id="registerPassword" required type="password" class="form-control input"
                         placeholder="Password">
                </div>
                
                <select id="hid" class="custom-select">
                </select>
                
                <div id="errorRegister" class="text-danger text-capitalize">
                </div>
                <div class="form-group mt-3">
                  <button id="addStaffBtn" class="btn btn-lg btn-block btn-info btn-style">
                    Add
                  </button>
                </div>            
    `)

        hostels.sort((a, b) => {
          return a.hid - b.hid;
        })

        hostels.forEach((hostel) => {
          $('#hid').append(`
            <option value="${hostel.hid}">${hostel.name}</option>
          `)
        })

        $('#addStaffBtn').click(() => {

          let name = $('#registerName').val();
          let username = $('#registerUsername').val();
          let password = $('#registerPassword').val();
          let hid = $('#hid').val();

          if (!name || name.length === 0 || name[0].toLowerCase() === name[0].toUpperCase()) {
            $('#errorRegister').removeClass('text-success').addClass('text-danger').text("Please Enter Valid Name");
            return;
          }

          if (!username || username.length === 0 || username[0].toLowerCase() === username[0].toUpperCase()) {
            $('#errorRegister').removeClass('text-success').addClass('text-danger').text("Incorrect Username");
            return;
          }

          if (!password || password.length < 6) {
            $('#errorRegister').removeClass('text-success').addClass('text-danger').text("Password should have a minimum of 6 characters");
            return;
          }

          if (!hid) {
            $('#errorRegister').removeClass('text-success').addClass('text-danger').text("Please Select The Hostel Option");
            return;
          }

          $.post("/api/warden/add", {
            name,
            username,
            password,
            hid
          }).done(function (warden) {
            if (warden.success) {
              $('#errorRegister').removeClass('text-danger').addClass('text-success').text("Registration Successful. Warden Added");
            } else {
              console.log(2)
              console.log(student.error);
              $('#errorRegister').text("")
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
      } else {
        $('#noticeBoard').empty().css('display', 'block').append(`
          <div class="text-danger">
            No Hostels
          </div>
        `)
      }
    })


  })
})
