/**
 * Created by bhavyaagg on 01/04/18.
 */

$(function () {

  $.get('/api/hostel/viewAll', function (response) {
    if (response.success) {
      let hostels = response.data;

      let hostelsList = $('#hostelsList');

      for (let i = 0; i < hostels.length; i++) {

        hostelsList.append(`<li class="list-group-item">
        <div class="row text-center">
        <div class="col-3">${hostels[i].name}</div>
        <div class="col-6">${hostels[i].capacity}</div>
      <div class="col-3">
        E/X
        </div>
        </div>
        </li>`)
      }
    }
  })

  // $('#addHostelBtn').click(() => {
  //   $('#listHostels').empty()
  //   $('#addHostelDiv').css("display", "block");
  // })

  $('#submitHostelBtn').click(function () {

    $.post('/api/hostel/add',
      {
        name: $('#name').val(),
        capacity: $('#capacity').val()
      },
      function (response) {
        if (response.success) {
          $('#addHostelModal').modal('hide');
          window.location.reload();
        }
        else {
          console.log("could not add the hostel right now")
        }
      })

  })

  // $('#viewAllHostelsBtn').click(function () {
  //   $('#addHostelDiv').css("display", "none");
  //   $.get('/api/hostel/viewAll', function (data) {
  //     $('#listHostels').empty()
  //
  //     data.forEach((hostel) => {
  //       console.log(hostel);
  //       $('#listHostels').append(`<li>hid: ${hostel.hid} | name: ${hostel.name} | capacity: ${hostel.capacity}</li>`)
  //     })
  //   })
  // })

});