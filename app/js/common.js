$(function () {
  var usersObj = [];
  // show signIn form main
  $("#header-sign-in").click(function () {
    $("#header").css("zIndex", 50);
    $(".sign-in-tab-left").addClass("active-tab");
    $("#bg-mask, .form-1").removeClass("hidden");
    $("#bg-mask").fadeTo(1000, 0.8);
  });

  // show signUp form main
  $("#header-sign-up").click(function () {
    $("#header").css("zIndex", 50);
    $(".sign-in-tab-right").addClass("active-tab");
    $("#bg-mask, .form-2").removeClass("hidden");
    $("#bg-mask").fadeTo(1000, 0.8);
  });

  // show signIn form tab
  $(".control-btn-group__button--left").click(function () {
    $(".inner").addClass("hidden");
    $(".form-1").removeClass("hidden");
    $(".sign-in-tab-left").addClass("active-tab");
    $(".sign-in-tab-right").removeClass("active-tab");
    $(".error-block").text("");
    $("#new-pass, #old-pass").prop("type", "password");
  });

  // show signUp form tab
  $(".control-btn-group__button--right").click(function () {
    $(".inner").addClass("hidden");
    $(".form-2").removeClass("hidden");
    $(".sign-in-tab-right").addClass("active-tab");
    $(".sign-in-tab-left").removeClass("active-tab");
    $(".error-block").text("");
    $("#new-pass, #old-pass").prop("type", "password");
  });

  // show forgot password form tab
  $("#forgot-pass").click(function () {
    $(".inner").addClass("hidden");
    $(".form-3").removeClass("hidden");
    $(".sign-in-tab-left").addClass("active-tab");
    $(".error-block").text("");
  });

  //Back to login
  $("#back-login").click(function () {
    $(".inner").addClass("hidden");
    $(".form-1").removeClass("hidden");
    $(".sign-in-tab-left").addClass("active-tab");
    $(".sign-in-tab-right").removeClass("active-tab");
    $(".error-block").text("");
    $("#email-prompt").val("");
  });

  // close forms
  $("#bg-mask").click(function () {
    $("#bg-mask").fadeTo(600, 0);
    setTimeout(function () {
      $("#header").css("zIndex", 200);
      $("#bg-mask, .inner").addClass("hidden");
      $(".control-btn-group__button").removeClass("active-tab");
      $("input[type=text], input[type=password]").val("");
      $("#new-pass, #old-pass").prop("type", "password");
      $(".error-block").text("");
    }, 500);
  });
//close forms ESC
  $(function closeModalEsc() {
		$('body').keydown(function (e) {
			if (e.keyCode == 27) {
        $("#bg-mask").fadeTo(600, 0);
        setTimeout(function () {
          $("#header").css("zIndex", 200);
          $("#bg-mask, .inner").addClass("hidden");
          $(".control-btn-group__button").removeClass("active-tab");
          $("input[type=text], input[type=password]").val("");
          $("#new-pass, #old-pass").prop("type", "password");
          $(".error-block").text("");
        }, 500);
			}
		});

		var e = $.Event("keydown", {
			keyCode: 27
		});

		$('#escape').click(function () {
			$("body").trigger(e);
		});
	});

  //hide show pass
  $(".hide-button").click(function () {
    if ($("#new-pass, #old-pass").prop("type") == "text") {
      $("#new-pass, #old-pass").prop("type", "password");
      $(".hide-button").text("Show");
    } else {
      $("#new-pass, #old-pass").prop("type", "text");
      $(".hide-button").text("Hide");
    }
  });

  //check string how number
  function isNumber(str) {
    return !isNaN(str - 0) && str !== null && str !== "" && str !== false;
  }

  //serch number in string
  function isNumberSingle(str) {
    for (var i = 0; i < str.length; i++) {
      if (!isNaN(str[i])) {
        return true;
      }
    }
    return false;
  }

  function userValidate(sUser) {
    $(".error-block").text("");
    var filter = /^([\w\.]+)$/;
    if (sUser === "") {
      $(".error-block").text("The Username field does not must be empty...");
    } else if (sUser.length < 3) {
      $(".error-block").text("Username must be at least 3 characters long ...");
    } else {
      if (filter.test(sUser)) {
        return true;
      } else {
        $(".error-block").text(
          "Incorrect username!  Check the correctness of the entered data!"
        );
        return false;
      }
    }
  }

  //main email validate
  function emailValidate(sEmail) {
    $(".error-block").text("");
    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (sEmail === "") {
      $(".error-block").text("The E-mail field does not must be empty...");
    } else if (sEmail.length < 3) {
      $(".error-block").text("Email must be at least 3 characters long ...");
    } else {
      if (filter.test(sEmail)) {
        return true;
      } else {
        $(".error-block").text(
          "Incorrect email!  Check the correctness of the entered data!"
        );
        return false;
      }
    }
  }

  //main pass validate
  function passValidate(sPass) {
    var filter = /^([\w\.]+)$/;
    if (sPass === "") {
      $(".error-block").text("Enter password...!");
    } else if (sPass.length < 3) {
      $(".error-block").text("Password must be at least 3 characters long ...");
    } else {
      if (filter.test(sPass)) {
        if (isNumber(sPass) == false && isNumberSingle(sPass) == true) {
          return true;
        } else {
          $(".error-block").text(
            "Incorrect Password!  Password must contain at least one letter and number!"
          );
          return false;
        }
      } else {
        $(".error-block").text(
          "Incorrect Password!  Check the correctness of the entered data!"
        );
        return false;
      }
    }
  }

  //check email how ID
  function identicalEmail(array, value) {
    for (var i = 0; i < array.length; i++) {
      if (array[i]["email"] === value) {
        return true;
      }
    }

    return false;
  }

  //main Sign Up Function
  $("#log-up").click(function () {
    if (userValidate($("#new-username").val()) === true) {
      if (isNumber($("#new-username").val()[0]) !== true) {
        if (emailValidate($("#new-email").val()) === true) {
          if (identicalEmail(usersObj, $("#new-email").val()) === false) {
            if (passValidate($("#new-pass").val()) === true) {
              if ($('#check-aggry').prop("checked")) {
                alert("The account whith username " + $("#new-username").val() + " is created");
                usersObj.push({
                  username: $("#new-username").val(),
                  email: $("#new-email").val(),
                  pass: $("#new-pass").val()
                });
                $("#new-username").val("");
                $("#new-email").val("");
                $("#new-pass").val("");


                console.log(usersObj);
              } else {
                $(".error-block").text(
                  "You must agree to the terms of use ..."
                );
              }
            }
          } else {
            $(".error-block").text(
              "A user with this email address already exists ..."
            );
          }
        }
      } else {
        $(".error-block").text("Username must start with a letter ...");
      }
    }
  });
//main Sign In Function
  $("#log-in").click(function () {
    if (emailValidate($("#old-login").val()) === true) {
      if (passValidate($("#old-pass").val()) === true) {
        for (var i = 0; i < usersObj.length; i++) {          
          if (usersObj[i]['email'] === $("#old-login").val()&&usersObj[i]['pass'] === $("#old-pass").val()) {
            $("#old-login").val('');
            $("#old-pass").val('');
            return alert('Hello '+usersObj[i]['username']);
          }
        }
        $("#old-login").val('');
        $("#old-pass").val('');
        return $(".error-block").text("This user does not exist or you entered incorrect data ...");
      }
    }
  });
//main prompt email Function
  $("#prompt-pass").click(function () {
    if (emailValidate($("#email-prompt").val()) === true) {
      for (var i = 0; i < usersObj.length; i++) {          
        if (usersObj[i]['email'] === $("#email-prompt").val()) {
          $("#email-prompt").val('');
          return alert('Your password is '+usersObj[i]['pass']);
        }
      }
      $("#email-prompt").val('');
      return $(".error-block").text("This user does not exist or you entered incorrect data ...");
    }
    
  });

  // Custom JS
});