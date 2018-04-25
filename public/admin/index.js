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
                      </div> 
                    </div>
                    </li>
                  </ul>
                </div>
              </div>
            `)
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
                        <button data-id="${hostel.hid}" class="btn btn-sm btn-info viewDetails">
                          View Details
                        </button>
                      </div> 
                    </div>
              </li>
            `)
          })

          $('.viewDetails').click((e) => {
            let hid = e.currentTarget.getAttribute('data-id')
            $.get(`/api/hostel/details/${hid}`)
              .done(() => {

              })
              .fail(() => {

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
