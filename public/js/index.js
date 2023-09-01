$("#signInButton").on("click", function (e) {
  e.preventDefault();
  const email = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  const loginData = {
    username: email,
    password: password,
  };
  fetch("http://localhost:5001/api/v1/auth/login", {
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
        Swal.fire({
          title: "Success Login",
          text: "Successfully logged in, you will be redirected to dashboard in 3 seconds..",
          icon: "success",
          confirmButtonText: "OK",
        });
        localStorage.setItem("userToken", JSON.stringify(data.data));
        setTimeout(() => {
          window.location.href = "dashboard.html";
        }, 3000);
      } else {
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
      Swal.fire({
        title: "Internal Server Error",
        text: `${error.message}. Please contact the admin.`,
        icon: "error",
        confirmButtonText: "OK",
      });
    });
});
