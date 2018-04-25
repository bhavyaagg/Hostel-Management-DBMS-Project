/**
 * Created by bhavyaagg on 25/04/18.
 */
$(document).ready(() => {

  $('#loginButton').click(() => {

    let username = $('#loginUsername').val();
    let password = $('#loginPassword').val()

    if (!username) {
      $('#errorLogin').text("Incorrect Username Number");
      return;
    }

    if (!password || password.length < 6) {
      $('#errorLogin').text("Password should have a minimum of 6 characters");
      return;
    }

    $.post('/api/warden/authorize', {
      username,
      password
    }).done((data) => {
      if (data.success) {
        localStorage.setItem("hid", data.data[0].hid);
        $('#wardenLoginDiv').css('display', 'none');
        $('#wardenDiv').css('display', 'block');
      } else {
        $('#errorLogin').text(data.error);
      }
    }).fail((err) => {
      console.log("ERROR2")
      console.log(err);
    })
  })
})
