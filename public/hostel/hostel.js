/**
 * Created by bhavyaagg on 01/04/18.
 */

$(function () {

  $('#addhostel').click(function () {

    console.log($('#hid').val())
    console.log($('#name').val())
    console.log($('#capacity').val())

    $.post('/api/hostel/add',
      {
        hid: $('#hid').val(),
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