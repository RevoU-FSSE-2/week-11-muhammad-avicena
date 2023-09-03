const chatForm = document.getElementById("chat-form");
const chatMessages = document.querySelector(".chat-messages");
const room = document.getElementById("room-name");
const userList = document.getElementById("users");

async function fetchData() {
  try {
    const { joinRoom } = Qs.parse(location.search, {
      ignoreQueryPrefix: true,
    });
    const usernameData = sessionStorage.getItem("username");
    const loadingSwal = Swal.fire({
      title: "Please wait...",
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      onBeforeOpen: () => {
        Swal.showLoading();
      },
    });

    const response = await fetch(
      `/api/v1/participants?roomName=${joinRoom}&username=${usernameData}`
    );
    const { data } = await response.json();

    loadingSwal.close();
    console.log("isi data", data);

    const roomNameElement = document.getElementById("room-name");
    roomNameElement.textContent = data.roomName;

    const userProfile = document.getElementById("profile-user");
    userProfile.innerHTML = `${usernameData}` || "Unknown";

    const usersList = data;
    const usersListElement = document.getElementById("users");
    usersListElement.innerHTML = "";

    const userItem = document.createElement("li");
    userItem.textContent = usersList.username;
    usersListElement.appendChild(userItem);

    const socket = io();

    const { username, roomName } = data;

    socket.emit("joinRoom", { username, roomName });

    socket.on("roomUsers", ({ roomName, users }) => {
      console.log(roomName);
      outputRoomName(roomName);
      outputUsers(users);
    });

    socket.on("message", (message) => {
      outputMessage(message);

      chatMessages.scrollTop = chatMessages.scrollHeight;
    });

    socket.on("welcomeMessage", (message) => {
      outputWelcomeMessage(message);

      chatMessages.scrollTop = chatMessages.scrollHeight;
    });

    chatForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      let msg = e.target.elements.msg.value;

      msg = msg.trim();

      if (msg.length <= 100) {
        socket.emit("chatMessage", msg);
        e.target.elements.msg.value = `Cooldown in 3 seconds...`; 
        e.target.elements.msg.disabled = true;
        document.getElementById("submitMsg").disabled = true;

        let countdown = 2; 
        const countdownInterval = setInterval(function () {
          e.target.elements.msg.value = `Cooldown in ${countdown} seconds...`;
          countdown--;
          if (countdown < 0) {
            clearInterval(countdownInterval);
            e.target.elements.msg.value = ""; 
            e.target.elements.msg.disabled = false;
            document.getElementById("submitMsg").disabled = false;
            e.target.elements.msg.focus();
          }
        }, 1000);
      } else {
        Swal.fire({
          icon: "error",
          title: "Message is too long!",
          text: "Maximum 100 characters allowed.",
        });
      }
    });

    function outputMessage(message) {
      const div = document.createElement("div");
      div.classList.add("message");
      const p = document.createElement("p");
      p.classList.add("meta");
      p.innerText = message.username;
      p.innerHTML += `<span>${message.time}</span>`;
      div.appendChild(p);
      const para = document.createElement("p");
      para.classList.add("text");
      para.innerText = message.text;
      div.appendChild(para);
      document.querySelector(".chat-messages").appendChild(div);
    }

    function outputWelcomeMessage(message) {
      const div = document.createElement("div");
      div.classList.add("messageLeave");
      const para = document.createElement("p");
      para.classList.add("textLeave");
      para.innerText = message.text;
      div.appendChild(para);
      document.querySelector(".chat-messages").appendChild(div);
    }
    function outputRoomName(roomName) {
      room.innerText = roomName;
    }

    function outputUsers(users) {
      userList.innerHTML = "";
      users.forEach((user) => {
        const li = document.createElement("li");
        li.innerText = user.username;
        userList.appendChild(li);
      });
    }
  } catch (error) {
    console.log(error.message);
    window.location.href = "../dashboard.html";
  }
}

fetchData();

document.addEventListener("DOMContentLoaded", function () {
  const leaveButton = document.getElementById("leave-btn");
  const usernameData = sessionStorage.getItem("username");

  leaveButton.addEventListener("click", function () {
    const bodyData = {
      username: usernameData,
    };
    Swal.fire({
      title: "Are you sure?",
      text: "You will leave this room chat and probably one of your friend will cry.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, leave this room",
      cancelButtonText: "No, I still want to chat",
    }).then((result) => {
      if (result.isConfirmed) {
        fetch("/api/v1/participants", {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(bodyData),
        })
          .then((response) => {
            console.log(response);
            return response.json();
          })
          .then((data) => {
            console.log("isi data", data);
            if (data.success === true) {
              sessionStorage.removeItem("username");
              window.location.href = "../dashboard.html";
            } else {
              Swal.fire({
                title: "Internal Server Error",
                text: `Please contact the admin.`,
                icon: "error",
                confirmButtonText: "OK",
              });
              window.location.href = "../index.html";
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
            window.location.href = "../index.html";
          });
      }
    });
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const userData = localStorage.getItem("userToken");
  const username = sessionStorage.getItem("username");

  if (!userData) {
    Swal.fire({
      title: "Unauthorized",
      text: "Kindly do a proper login to access this page",
      icon: "error",
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "index.html";
      } else {
        setTimeout(function () {
          window.location.href = "index.html";
        }, 1000);
      }
    });
  } else if (!username) {
    Swal.fire({
      title: "Bad Request",
      text: "Kindly pick a username to access this page",
      icon: "error",
      showCancelButton: false,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "dashboard.html";
      } else {
        window.location.href = "dashboard.html";
      }
    });
  }
});
