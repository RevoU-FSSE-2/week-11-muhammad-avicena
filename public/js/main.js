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

    const response = await fetch(
      `/api/v1/rooms/find?roomName=${joinRoom}&username=${usernameData}`
    );
    const { data } = await response.json();

    console.log("isi data", data);

    const roomNameElement = document.getElementById("room-name");
    roomNameElement.textContent = data.roomName;

    const usersList = data;
    const usersListElement = document.getElementById("users");
    usersListElement.innerHTML = "";

    const userItem = document.createElement("li");
    userItem.textContent = usersList.username;
    usersListElement.appendChild(userItem);

    const socket = io();

    const { username, roomName } = data;
    console.log(username, "isi username");
    console.log(roomName, "isi roomName");

    socket.emit("joinRoom", { username, roomName });

    socket.on("roomUsers", ({ roomName, users }) => {
      console.log(roomName);
      outputRoomName(roomName);
      outputUsers(users);
    });

    // Message from server
    socket.on("message", (message) => {
      outputMessage(message);

      // Scroll down
      chatMessages.scrollTop = chatMessages.scrollHeight;
    });

    socket.on("welcomeMessage", (message) => {
      outputWelcomeMessage(message);

      // Scroll down
      chatMessages.scrollTop = chatMessages.scrollHeight;
    });

    // Message submit
    chatForm.addEventListener("submit", (e) => {
      e.preventDefault();

      // Get message text
      let msg = e.target.elements.msg.value;

      msg = msg.trim();

      if (!msg) {
        return false;
      }

      // Emit message to server
      socket.emit("chatMessage", msg);

      // Clear input
      e.target.elements.msg.value = "";
      e.target.elements.msg.focus();
    });

    // Output message to DOM
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
    // Add room name to DOM
    function outputRoomName(roomName) {
      // console.log(roomName);
      room.innerText = roomName;
    }

    // Add users to DOM
    function outputUsers(users) {
      userList.innerHTML = "";
      users.forEach((user) => {
        const li = document.createElement("li");
        li.innerText = user.username;
        userList.appendChild(li);
      });
    }

    //Prompt the user before leave chat room
    document.getElementById("leave-btn").addEventListener("click", () => {
      const leaveRoom = confirm("Are you sure you want to leave the chatroom?");
      if (leaveRoom) {
        window.location = "../dashboard.html";
      } else {
      }
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

fetchData();
