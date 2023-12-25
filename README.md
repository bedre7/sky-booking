<div style="display:flex; align-items: center; justify-content: center;">
<img src="./mobile/assets/logo.png" style="height: 250px;"/>
</div>

## 📝 About

This project is a mobile app that allows users to make flight reservations easily using their smartphones.

## 🧱 Technologies used

### Tech Stack

- ![React Native](https://img.shields.io/badge/React_Native-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
- ![Typescript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
- ![NestJS](https://img.shields.io/badge/nestjs-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
- ![Postgres](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)
- ![Prisma](https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white)

### Dev Tools

- ![Android Studio](https://img.shields.io/badge/Android_Studio-3DDC84?style=for-the-badge&logo=android-studio&logoColor=white)
- ![Expo](https://img.shields.io/badge/Expo-1B1F23?style=for-the-badge&logo=expo&logoColor=white)

## 👩‍🚒 System Architecture

![System Architecture](./mobile/screenshots/system-architecture.png)

## 📱 Screenshots

1. Signup/Login Screen
<br><br>
<table>
  <tr>
    <td><img src="./mobile/screenshots/Screenshot_1703341323.png"></td>
    <td><img src="./mobile/screenshots/Screenshot_1703341357.png"></td>
    <td><img src="./mobile/screenshots/Screenshot_1703341347.png"></td>
  </tr>
</table>
1. Admin Dashboard
<br><br>
<table>
  <tr>
    <td><img src="./mobile/screenshots/Screenshot_1703341376.png"></td>
    <td><img src="./mobile/screenshots/Screenshot_1703341739.png"></td>
    <td><img src="./mobile/screenshots/Screenshot_1703341746.png"></td>
  </tr>
  <tr>
    <td><img src="./mobile/screenshots/Screenshot_1703341949.png"></td>
    <td><img src="./mobile/screenshots/Screenshot_1703341995.png"></td>
    <td><img src="./mobile/screenshots/Screenshot_1703342034.png"></td>
  </tr>
  <tr>
    <td><img src="./mobile/screenshots/Screenshot_1703342047.png"></td>
    <td><img src="./mobile/screenshots/Screenshot_1703342063.png"></td>
    <td><img src="./mobile/screenshots/Screenshot_1703342070.png"></td>
  </tr>
  <tr>
    <td><img src="./mobile/screenshots/Screenshot_1703342147.png"></td>
    <td><img src="./mobile/screenshots/Screenshot_1703342208.png"></td>
    <td><img src="./mobile/screenshots/Screenshot_1703342233.png"></td>
  </tr>
  <tr>
    <td><img src="./mobile/screenshots/Screenshot_1703342236.png"></td>
    <td><img src="./mobile/screenshots/Screenshot_1703342244.png"></td>
    <td><img src="./mobile/screenshots/Screenshot_1703342248.png"></td>
  </tr>
</table>
1. User Dashboard
<br><br>
<table>
  <tr>
    <td><img src="./mobile/screenshots/Screenshot_1703342281.png"></td>
    <td><img src="./mobile/screenshots/Screenshot_1703342655.png"></td>
    <td><img src="./mobile/screenshots/Screenshot_1703342659.png"></td>
  </tr>
  <tr>
    <td><img src="./mobile/screenshots/Screenshot_1703342668.png"></td>
    <td><img src="./mobile/screenshots/Screenshot_1703342731.png"></td>
    <td><img src="./mobile/screenshots/Screenshot_1703342738.png"></td>
  </tr>
  <tr>
    <td><img src="./mobile/screenshots/Screenshot_1703342744.png"></td>
    <td><img src="./mobile/screenshots/Screenshot_1703343603.png"></td>
    <td><img src="./mobile/screenshots/Screenshot_1703343607.png"></td>
  </tr>
</table>

## 🛠️ Installation and setup instructions

<br>

1. Clone this repo. <br><br>
   ```sh
   git clone https://github.com/bedre7/sky-booking.git
   ```
2. Backend Setup
   1. Navigate to the `backend` directory
   2. Install the dependencies
      <br><br>
      ```sh
      npm install
      ```
   3. Create a `.env` file and add the following environment variables
      <br><br>
      ```sh
      DATABASE_URL="postgresql://<username>:<password>@<host>:<port>/<database-name>?schema=public"
      JWT_ACCESS_TOKEN_SECRET="<your-access-token-secret-key>"
      JWT_ACCESS_TOKEN_EXPIRES_IN="30m"
      JWT_REFRESH_TOKEN_SECRET="<your-refresh-token-secret-key>"
      JWT_REFRESH_TOKEN_EXPIRES_IN="1d"
      ```
   4. Start the server
      <br><br>
      ```sh
      npm run start:dev
      ```
3. Mobile App Setup
   1. Navigate to the `mobile` directory
   2. Install the dependencies
      <br><br>
      ```sh
      npm install
      ```
   3. Create a `.env` file and add the following environment variables
      <br><br>
      ```sh
      LOCAL_API_URL="http://10.0.2.2:3000"
      ```
   4. Start the server
      <br><br>
      ```sh
      npm start
      ```
