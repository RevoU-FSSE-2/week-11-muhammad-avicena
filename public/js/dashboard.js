async function populateRooms() {
  const selectElement = document.getElementById("roomName");
  const apiEndpoint = `/api/v1/rooms`;

  const loadingSwal = Swal.fire({
    title: "Fetching data. Please wait...",
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: false,
    onBeforeOpen: () => {
      Swal.showLoading();
    },
  });

  try {
    const response = await fetch(apiEndpoint);
    const { data } = await response.json();

    selectElement.innerHTML = "";

    data.forEach((room) => {
      console.log(room);
      const option = document.createElement("option");
      option.value = room.roomName;
      option.textContent = room.roomName;
      selectElement.appendChild(option);
    });

    loadingSwal.close();
  } catch (error) {
    console.error("Error:", error.message);

    loadingSwal.close();
    Swal.fire({
      title: "Internal Server Error",
      text: `${error.message}. Please contact the admin.`,
      icon: "error",
      confirmButtonText: "OK",
    });
  }
}

populateRooms();

$("#joinChat").on("click", async function (e) {
  e.preventDefault();
  const username = document.getElementById("username").value;
  const selectElement = document.getElementById("roomName");
  const selectedIndex = selectElement.selectedIndex;
  if (selectedIndex !== -1) {
    const selectedOption = selectElement.options[selectedIndex];
    const roomName = selectedOption.value;

    const loginData = {
      username: username,
      roomName: roomName,
    };

    const loadingSwal = Swal.fire({
      title: "Joining Room...",
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });

    try {
      console.log("Login data", loginData);
      const response = await fetch("/api/v1/participants", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();
      console.log("isi data", data);

      if (data.success === true) {
        sessionStorage.setItem("username", username);

        loadingSwal.close();

        Swal.fire({
          title: "Welcome to DeezChat!",
          icon: "success",
          text: "Successfully joined the room. You will be redirected in 3 seconds...",
          confirmButtonText: "OK",
        });

        setTimeout(() => {
          window.location.href = `chatRoom.html?joinRoom=${roomName}`;
        }, 3000);
      } else {
        loadingSwal.close();

        Swal.fire({
          title: "Failed Join",
          text: data.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      loadingSwal.close();

      console.error("Error:", error.message);
      Swal.fire({
        title: "Internal Server Error",
        text: `${error.message}. Please contact the admin.`,
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  } else {
    Swal.fire({
      title: "Failed Join",
      text: "No room option selected",
      icon: "error",
      confirmButtonText: "OK",
    });
  }
});

document.addEventListener("DOMContentLoaded", async function () {
  const logoutButton = document.getElementById("logout");

  logoutButton.addEventListener("click", async function () {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, log me out",
      cancelButtonText: "No, I still want to chat",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "../index.html";
        localStorage.removeItem("userToken");
      }
    });
  });
});
