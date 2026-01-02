# namaste-node

# DAY-01

=> create the namaste node project with help of npm init or npm init -y to skip the default setup.
=>in the folder structure, we can see the package.json file. as we can see only name, version, scripts as of now. if you use npm init , manually we need to respond to these questions./
=> we are using express as a server, to include it in our project , first we need to install the express package. to install it, use npm i express or npm install express.
=> if you observe the folder structure now, you can see the nodemodules folder and package_lock.json file.

# we installed only express as of now, but why we see lot of packages in the node modules folder?

=> it's because of if we open the express package folder in the node modules, you see lot of other packages also. so by default, it creates other packages also.

# what is package.json?

=> when we install the express package, if you open the package.json file, you see the express: version in the dependency. whatever the packages we installed we see those packages here.
=>these versions are start with either carat(^) or tilde(~). in the most cases you only see the (^) symbol. because if we use this, it automatically updates the new patches that were updated.
=> our versions are segragted into three points, MAJOR, MINOR, PATCH. like express: ^14.2.1.
=>if the express team released any patch or minor updates, this ^ will automatically updates, if you really want to see which version you are using,you need to open the package-lock.json file. and search for the express, and here u can see the exact version we are using.

# create a server?

=>now it's time to create a server, we already installed the express server in our project with the help of npm i express .
=> to use this express, we need to import this package.
=>import express from 'express'
cosnt app= express(); express is a fucntion we are calling and with the help of app variable name we can use it.
=>now we created the server, it's time to listen the requests. for this we have a method called listen, app.listen(3000,()=>{console.log("server is successfully running on port 3000}))
=>to check whether our server is running or not, we need to use the same command node src/app.js, everytime we need to use this command if we are making any changes. so we need to install
the another package that is nodemon. npm i -g nodemon.
=>now use nodemon src/app.js, wait don't u think it's handy to right this too. so we need to change our scripts in the package.json file.
dev:nodemon src/app.js and use npm run dev to run the project.

# DevTinder Backend 🚀

## 📌 Overview

DevTinder is a **MERN stack** web application designed to help developers **connect and collaborate**, similar to Tinder but specifically for developers. Users can create profiles, explore other developers, send connection requests, and manage their matches.

This repository contains the **backend** of DevTinder, built with **Node.js, Express, and MongoDB**, following a **microservices architecture** for scalability.

> ⚠️ **Note:** The backend is **fully functional** and ready for further scaling and optimizations.

---

## 📖 My Node.js Learning Repository

I learned and maintained all my Node.js knowledge in one place:
[**Namsate Nodejs**](https://github.com/akshadjaiswal/Namaste-Nodejs)

## 🛠️ Tech Stack

- **Backend Framework**: [Node.js](https://nodejs.org/en) + [Express.js](https://expressjs.com/)
- **Database**: [MongoDB](https://www.mongodb.com/) + [Mongoose](https://mongoosejs.com/)
- **Authentication**: [JWT (JSON Web Tokens)](https://jwt.io/) + Cookies
- **Encryption**: [bcryptjs](https://www.npmjs.com/package/bcryptjs) for password hashing
- **API Testing**: Postman
- **Environment Variables Management**: dotenv
- **Package Manager**: npm

---

## 🔑 Features Implemented

### **1. Authentication System**

✅ User Signup, Login, and Logout  
✅ JWT-based authentication with secure cookies  
✅ Password encryption using **bcryptjs**  
✅ Authentication middleware to protect routes

### **2. User Profile Management**

✅ View user profile  
✅ Edit profile details (restricted fields for security)  
✅ Update password with validation

### **3. Connection Request System**

✅ Send connection requests (`Interested` or `Ignored`)  
✅ Accept or reject received requests  
✅ Prevent duplicate requests using MongoDB validation  
✅ Prevent self-requests using Mongoose `.pre` middleware

### **4. Feed API & Pagination**

✅ Fetch suggested developers while excluding:

- Logged-in user
- Existing connections
- Ignored users
- Users with pending requests  
  ✅ Implemented **pagination** using `skip` & `limit`  
  ✅ Optimized query using **MongoDB $nin and $ne operators**

### **5. Database Design**

✅ **User Schema**:

- Sanitized input fields (`trim`, `lowercase`, validation)
- Unique constraints on email and username

✅ **ConnectionRequest Schema**:

- `fromUserId`, `toUserId`, `status` with **enum validation**
- Indexed fields for optimized queries
- Prevents multiple requests between the same users

### **6. Advanced Query Optimization**

✅ **Indexes & Compound Indexes**:

- Used `index: true` for faster queries
- Implemented compound indexes to optimize search

### **7. Middleware Implementation**

✅ **Authentication Middleware**: Protects private routes  
✅ **Error Handling Middleware**: Centralized error response  
✅ **Mongoose `.pre` Middleware**: Prevents self-requests

### **8. Express Router Structure**

✅ Modular route organization for maintainability  
✅ APIs structured into separate routers (`auth`, `profile`, `connections`, `users`)

---

## 🚀 API Endpoints

### **1️⃣ Authentication Routes**

| Method | Endpoint       | Description                        | Auth Required |
| ------ | -------------- | ---------------------------------- | ------------- |
| POST   | `/auth/signup` | Register a new user                | ❌            |
| POST   | `/auth/login`  | Authenticate user & issue JWT      | ❌            |
| POST   | `/auth/logout` | Logout user by clearing JWT cookie | ✅            |

---

### **2️⃣ User Profile Routes**

| Method | Endpoint            | Description                   | Auth Required |
| ------ | ------------------- | ----------------------------- | ------------- |
| GET    | `/profile/view`     | Get logged-in user profile    | ✅            |
| PATCH  | `/profile/edit`     | Update allowed profile fields | ✅            |
| PATCH  | `/profile/password` | Update user password          | ✅            |

---

### **3️⃣ Connection Request Routes**

| Method | Endpoint                             | Description                                    | Auth Required |
| ------ | ------------------------------------ | ---------------------------------------------- | ------------- |
| POST   | `/request/send/:status/:toUserId`    | Send a connection request (Interested/Ignored) | ✅            |
| POST   | `/request/review/:status/:requestId` | Accept/Reject a request                        | ✅            |
| GET    | `/user/requests/received`            | Fetch pending connection requests              | ✅            |
| GET    | `/user/connections`                  | Fetch accepted connections                     | ✅            |

---

### **4️⃣ Feed API & Pagination**

| Method | Endpoint                     | Description                                      | Auth Required |
| ------ | ---------------------------- | ------------------------------------------------ | ------------- |
| GET    | `/user/feed?page=1&limit=10` | Get suggested developer profiles with pagination | ✅            |

---

## 🏗️ Setup & Running the Server

### **1️⃣ Clone the Repository**

```bash
git clone https://github.com/akshadjaiswal/devTinder-backend.git
cd devTinder-backend
```

### **2️⃣ Set Up Environment Variables**

Create a `.env` file and add:

```ini
DATABASE_URL=mongodb+srv://<username>:<password>@cluster0.mongodb.net/devTinder
JWT_SECRET=your_jwt_secret
PORT=3000
```

### **3️⃣ Start the Backend Server**

```bash
npm start
```

Server runs at: `http://localhost:3000/`

---

## 🔗 Frontend Integration

The frontend for DevTinder is available at:
🔗 **[DevTinder Frontend Repository](https://github.com/akshadjaiswal/devTinder-frontend)**

Make sure the backend is running before accessing the frontend.

---

## Learning Resources

Explore my additional repositories to deepen your understanding of related topics in the JavaScript ecosystem:

- [Namaste Javascript](https://github.com/akshadjaiswal/Namaste-Javascript): A repository focused on learning Javascript concepts, from basics to advanced programming.
- [Namaste React](https://github.com/akshadjaiswal/Namaste-React): A repository dedicated to mastering React.js, covering foundational and advanced aspects of building interactive UIs.

---

## 📢 Contribution Guidelines

Since the project is now fully functional, improvements are still welcome!
✅ Feel free to open issues for bugs or feature requests.  
✅ Fork the repository and submit a pull request.

---

## 📌 Future Enhancements

🔹 Real-time notifications using WebSockets  
🔹 Messaging System for better user interaction  
🔹 Profile Search & Filtering  
🔹 Unit Testing for API reliability

---

## 📜 License

This project is open-source and available under the **MIT License**.

---
