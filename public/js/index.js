$("#signInButton").on("click", function (e) {
  e.preventDefault();
  const email = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const loginData = {
    username: email,
    password: password,
  };

  $(this).prop("disabled", true);

  const loadingSwal = Swal.fire({
    title: "Please wait...",
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: false,
    onBeforeOpen: () => {
      Swal.showLoading();
    },
  });

  fetch("/api/v1/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(loginData),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log("isi data", data);
      if (data.success === true) {
        loadingSwal.close();

        Swal.fire({
          title: "Success Login",
          text: "Successfully logged in, you will be redirected to the dashboard in 3 seconds..",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed || result.isDismissed) {
            localStorage.setItem("userToken", JSON.stringify(data.data));
            setTimeout(() => {
              window.location.href = "dashboard.html";
            }, 3000);
          }
        });
      } else {
        loadingSwal.close();

        Swal.fire({
          title: "Failed Login",
          text: data.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    })
    .catch((error) => {
      console.error("Error:", error.message);
      loadingSwal.close();

      Swal.fire({
        title: "Internal Server Error",
        text: `${error.message}. Please contact the admin.`,
        icon: "error",
        confirmButtonText: "OK",
      });
    })
    .finally(() => {
      $(this).prop("disabled", false);
    });
});

$("#registerButton").on("click", function (e) {
  e.preventDefault();
  $(this).prop("disabled", true);

  const loadingSwal = Swal.fire({
    title: "Please wait...",
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: false,
    onBeforeOpen: () => {
      Swal.showLoading();
    },
  });

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const gender = document.getElementById("gender").value;

  const registerData = {
    username: username,
    password: password,
    gender: gender,
  };

  fetch("/api/v1/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(registerData),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      console.log("isi data", data);
      if (data.success === true) {
        loadingSwal.close();

        Swal.fire({
          title: "Success Register",
          text: "Successfully created an account. You may now log in to the application.",
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed || result.isDismissed) {
            window.location.href = "index.html";
          }
        });
      } else {
        loadingSwal.close();

        Swal.fire({
          title: "Failed Register",
          text: data.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      loadingSwal.close();

      Swal.fire({
        title: "Internal Server Error",
        text: `${error.message}. Please contact the admin.`,
        icon: "error",
        confirmButtonText: "OK",
      });
    })
    .finally(() => {
      $(this).prop("disabled", false);
    });
});
