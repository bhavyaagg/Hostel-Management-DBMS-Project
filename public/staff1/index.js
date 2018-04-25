/**
 * Created by bhavyaagg on 01/04/18.
 */

$(function () {

  $.get('/api/staff1/viewAll', function (response) {
    if (response.success) {
      let staffs = response.data;

      let staffsList = $('#staffsList');

      for (let i = 0; i < staffs.length; i++) {

        staffsList.append(`
      <li class="list-group-item">
        <div class="row text-center">
          <div class="col-3">${staffs[i].name}</div>
          <div class="col-3">${staffs[i].salary}</div>
          <div class="col-3">${staffs[i].hid}</div>
          <div class="col-3">E/X</div>
        </div>
      </li>`)
      }
    }
  })

  $('#submitStaffBtn').click(function () {
    
    $.post('/api/staff1/add', {
        hid: $('#selectHostelsList').val(),
        salary: $('#salary').val(),
        name: $('#name').val()
      },
      function (response) {
        if (response.success) {
          $('#addStaffModal').modal('hide');
          window.location.reload();
        }
        else {
          console.log("could not add the staff1 right now")
        }
      })

  })

  // $('#viewAllStaffs').click(function () {
  //   $.get('/api/staff1/viewAll', function (data) {
  //     $('#listStaffs').empty()
  //
  //     data.forEach((staff1) => {
  //       console.log(staff1);
  //       $('#listStaffs').append(`<li>
  //         Staff ID: ${staff1.sid} |
  //         Name: ${staff1.name} |
  //         Salary: ${staff1.salary} |
  //         Hostel ID: ${staff1.hid}
  //       </li>`)
  //     })
  //   })
  //
  // })
});