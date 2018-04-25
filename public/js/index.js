/**
 * Created by bhavyaagg on 25/04/18.
 */
$(document).ready(() => {
  $('#showFormsBtn').click(() => {
    $('#showForms').css('display', 'none');
    $('#forms').css('display', 'block');
  })

  $('#loginForm').submit(function (e) {
    e.preventDefault();
  });
  $('#registerForm').submit(function (e) {
    e.preventDefault();
  });

  $('#registerButton').click(function () {
    let name = $('#registerName').val();
    let email = $('#registerEmail').val();
    let rollno = $('#registerRollno').val();
    let password = $('#registerPassword').val();
    let contact = $('#registerContact').val();
    let address = $('#registerAddress').val();
    let pincode = $('#registerPincode').val();
    let outsideDelhi = $('input[name="registerOutsideDelhi"]:checked').val()
    let pwd = $('input[name="registerPWD"]:checked').val()

    if (!name || name.length === 0 || name[0].toLowerCase() === name[0].toUpperCase()) {
      $('#errorRegister').text("Please Enter Valid Name");
      return;
    }

    if (!email || email.length === 0 || !validateEmail(email)) {
      $('#errorRegister').text("Please Enter Valid Email");
      return;
    }

    if (!rollno || rollno.length <= 6 || rollno.length > 7) {
      $('#errorRegister').text("Incorrect Roll Number");
      return;
    }

    if (!password || password.length < 6) {
      $('#errorRegister').text("Password should have a minimum of 6 characters");
      return;
    }

    if (!contact || contact.length < 10 || contact.length > 10) {
      $('#errorRegister').text("Please enter correct Mobile Number");
      return;
    }

    if (!address || address.length === 0) {
      $('#errorRegister').text("Please Enter correct Address");
      return;
    }

    if (!pincode || pincode.length < 6 || pincode.length > 6) {
      $('#errorRegister').text("Please Enter correct Pincode");
      return;
    }

    if (!outsideDelhi) {
      $('#errorRegister').text("Please Select The Outside Delhi Option");
      return;
    }

    if (!pwd) {
      $('#errorRegister').text("Please Select The PWD Option");
      return;
    }

    $.post("/signup/student", {
      name: userName,
      email: userEmail,
      password: userPassword,
      contact: userContact,
      class: userClass,
      pincode: userPincode
    }, function (student) {
      console.log(student);
      if (student.success === 'true') {
        //console.log("yo");
        $.post("/authorize", {
          email: userEmail,
          password: userPassword
        }, function (authToken) {
          console.log(authToken);
          if (authToken.success === 'true') {
            window.localStorage.name = authToken.name;

            window.localStorage.token = authToken.token;
            window.location.replace(authToken.url);

          }
        }).fail(function (err) {
          $('#error').text("Wrong Credentials");
          console.log("fail");
          console.log(err);
        });
      }
    });
  });

  $('#loginButton').click(function () {

    $.post("/authorize", {
      email: $('#loginEmail').val(),
      password: $('#loginPassword').val()
    }, function (authToken) {
      console.log(authToken);
      if (authToken.success === 'true') {
        window.localStorage.token = authToken.token;
        window.localStorage.name = authToken.name;
        window.location.replace(authToken.url)
      } else {
        $('#error').text(authToken.message);
        console.log("fail");
      }
    }).fail(function (err) {
      $('#error').text("Wrong Credentials");
      console.log("fail");
      console.log(err);
    });
  })


})

function validateEmail(email) {
  let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
