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

    $.post("/api/student/add", {
      name,
      email,
      rollno,
      password,
      contact,
      address,
      pincode,
      outsideDelhi,
      pwd
    }).done(function (student) {
      if (student.success) {
        console.log(1)
        $('#loginTabSelect').click();

        $('#error').removeClass('text-danger').addClass('text-success').text("Registration Successful. Please Login");

        //console.log("yo");
        // $.post("/authorize", {
        //   email: userEmail,
        //   password: userPassword
        // }, function (authToken) {
        //   console.log(authToken);
        //   if (authToken.success === 'true') {
        //     window.localStorage.name = authToken.name;
        //
        //     window.localStorage.token = authToken.token;
        //     window.location.replace(authToken.url);
        //
        //   }
        // }).fail(function (err) {
        //   $('#error').text("Wrong Credentials");
        //   console.log("fail");
        //   console.log(err);
        // });
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
  });






  $('#loginButton').click(function () {
    $('#errorLogin').text("");
    let rollno = $('#loginUsername').val();
    let password = $('#loginPassword').val()

    if (!rollno || rollno.length <= 6 || rollno.length > 7) {
      $('#errorLogin').text("Incorrect Roll Number");
      return;
    }

    if (!password || password.length < 6) {
      $('#errorLogin').text("Password should have a minimum of 6 characters");
      return;
    }

    $.post("/login", {
      username: rollno,
      password: password
    }, function (data) {
      if (data.success) {
        window.location.replace(data.url)
      } else {
        $('#errorLogin').text("Incorrect Username/Password");
      }
      // console.log(authToken);
      // if (authToken.success === 'true') {
      //   window.localStorage.token = authToken.token;
      //   window.localStorage.name = authToken.name;
      //   window.location.replace(authToken.url)
      // } else {
      //   $('#error').text(authToken.message);
      //   console.log("fail");
      // }
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
