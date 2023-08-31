[![readme_header](https://github.com/muhammad-avicena/profile/assets/49929404/b7b89034-8e25-4f25-a1a2-5665aa66448c)](https://avicena.dev/)

<h1 align="center">Fancy to see you here <img src="https://raw.githubusercontent.com/muhammad-avicena/profile/master/wave.gif" width="30px" height="30px" /> </h1>

hi, I'm Muhammad Avicena. In this repo, I build a Real Time Chat application implemented role-based access using Vanila.js, Node.js, Express.js, Socket.io, MongoDB, Jest and Swagger. It's designed to interact with each other like group chat.

I am committed to staying up-to-date with industry trends and using the latest tools to develop innovative solutions that surpass expectations.
Interested to have collaboration ? Find me on:

[![Linkedin Badge](https://img.shields.io/badge/-Muhammad_Avicena-blue?style=flat-square&logo=Linkedin&logoColor=white)](https://www.linkedin.com/in/muhammad-avicena/)
[![Youtube Badge](https://img.shields.io/badge/-Muhammad_Avicena-darkred?style=flat-square&logo=youtube&logoColor=white)](https://www.youtube.com/@MuhammadAvicena)
[![Instagram Badge](https://img.shields.io/badge/-ryuhideaki.dev-purple?style=flat-square&logo=instagram&logoColor=white)](https://www.instagram.com/ryuhideaki.dev/)
[![Gmail Badge](https://img.shields.io/badge/-cenarahmant.dev@gmail.com-c14438?style=flat-square&logo=Gmail&logoColor=white)](mailto:cenarahmant.dev@gmail.com)

## INGREDIENTS I USE 📜

- WebClient
  - Vanila JS
  - Tailwind CSS
- WebServer
  - Node.js
  - Express.js
  - JWT for Role-Based Access Controll
  - WebSocket/Socket.io for Real Time Connection
  - MongoDB
- Unit Testing
  - Jest
- API Documentation
  - Swagger UI

## KEY FEATURES 🌟

- Auth
  - Login (JWT Auth) -> return a token for authorization
  - Register
    - Member -> default role
    - Admin
    - Manager
- Room
  - Join a room -> require user authentication
  - Create a room -> require user authentication
  - Get list user join by RoomName -> require user authentication
  - Get list rooms -> require user authentication
  - Delete a room -> require admin/manager role
- User
  - Get list users -> require admin/manager role
  - Get user by ID -> require admin/manager role
  - Patch/Update user role -> require manager role

## AVAILABLE API 📰

**Back-end endpoint:** [https://transfer-api.avicena.dev](https://transfer-api.avicena.dev)

| Name                          | HTTP Method | Endpoint                                                     | Requirements                                              |
| ----------------------------- | ----------- | ------------------------------------------------------------ | --------------------------------------------------------- |
| **Login User**                | `POST`      | [/api/v1/auth/login](https://transfer-api.avicena.dev/)      | Request Body: `username: string, password: string`        |
| **Register User**             | `POST`      | [/api/v1/auth/register](https://transfer-api.avicena.dev/)   | Request Body: `username: string, password: string`        |
| **List All User**             | `GET`       | [/api/v1/users](https://transfer-api.avicena.dev/)           |
| **List User by ID**           | `GET`       | [/api/v1/users/:id](https://transfer-api.avicena.dev/)       | Request Params: `id: number`                              |
| **Update User role**          | `PATCH`     | [/api/v1/users/role/:id](https://transfer-api.avicena.dev/)  | Request Params: `id: number` Request Body: `role: string` |
| **List All Rooms**            | `GET`       | [/api/v1/rooms/list](https://transfer-api.avicena.dev/)      |                                                           |
| **Create a room**             | `POST`      | [/api/v1/rooms](https://transfer-api.avicena.dev/)           | Request Body: `roomName: string, username: string`        |
| **Join user**                 | `POST`      | [/api/v1/rooms/join](https://transfer-api.avicena.dev/)      | Request Body: `roomName: string, username: string`        |
| **Get User Join by RoomName** | `GET`       | [/api/v1/rooms?roomName=](https://transfer-api.avicena.dev/) | Request Query: `roomName: string`                         |
| **Delete Room by ID**         | `DELETE`    | [/api/v1/rooms/:id](https://transfer-api.avicena.dev/)       | Request Params: `id: number`                              |

## DEPLOYMENT ⚙️

![Deploy](./assets/deployRailway.png)

The project has been successfully deployed using Railway. You can access the production version of the website by following this link: [https://transfer-api.avicena.dev](https://transfer-api.avicena.dev).

Feel free to explore the website and try out the different features. I appreciate any feedback and suggestions to further improve the user experience.
