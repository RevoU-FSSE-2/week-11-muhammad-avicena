async function populateRooms() {
  const selectElement = document.getElementById("roomName");
  const apiEndpoint = `/api/v1/rooms/list`;
  try {
    const response = await fetch(apiEndpoint);
    const { data } = await response.json();
    console.log(data);
    data.forEach((room) => {
      console.log(room);
      const option = document.createElement("option");
      option.value = room.roomName;
      option.textContent = room.roomName;
      selectElement.appendChild(option);
    });
  } catch (error) {
    console.error("Error:", error.message);
    Swal.fire({
      title: "Internal Server Error",
      text: `${error.message}. Please contact the admin.`,
      icon: "error",
      confirmButtonText: "OK",
    });
  }
}

populateRooms();

$("#joinChat").on("click", function (e) {
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

    console.log("Login data", loginData);
    fetch("/api/v1/rooms/join", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(loginData),
    })
      .then((response) => {
        console.log(response);
        return response.json();
      })
      .then((data) => {
        console.log("isi data", data);
        if (data.success === true) {
          sessionStorage.setItem("username", username);
          Swal.fire({
            title: "Success Join",
            text: "Successfully joined in a room, you will be redirected to room in 3 seconds..",
            icon: "success",
            confirmButtonText: "OK",
          });
          setTimeout(() => {
            window.location.href = `chatRoom.html?joinRoom=${roomName}`;
          }, 3000);
        } else {
          Swal.fire({
            title: "Failed Join",
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
  } else {
    Swal.fire({
      title: "Failed Join",
      text: "No option room were selected",
      icon: "error",
      confirmButtonText: "OK",
    });
  }
});
