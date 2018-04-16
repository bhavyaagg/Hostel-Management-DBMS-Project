/**
 * Created by bhavyaagg on 01/04/18.
 */

$(function () {

  $('#addHostelBtn').click(() => {
    $('#addHostelDiv').css("display", "block");
  })

  $('#submitHostelBtn').click(function () {

    $.post('/api/hostel/add',
      {
        name: $('#name').val(),
        capacity: $('#capacity').val()
      },
      function (data) {
        console.log(data);
      })

  })

  $('#viewAllHostels').click(function () {
    $.get('/api/hostel/viewAll', function (data) {
      $('#listHostels').empty()

      data.forEach((hostel) => {
        console.log(hostel);
        $('#listHostels').append(`<li>hid: ${hostel.hid} | name: ${hostel.name} | capacity: ${hostel.capacity}</li>`)
      })
    })
  })

});