# 🔗 Simple URL Shortener

A lightweight and fully functional URL shortener built with **Node.js**, **Express**, **MongoDB**, and a minimal **HTML/CSS frontend**.

Users can input a long URL and receive a unique short URL, which redirects to the original when accessed.

This project was developed as a hands-on exercise in Express.js, MongoDB, and full-stack fundamentals.

---

## 🚀 Features

- Shortens long URLs to unique 6-character codes
- Stores and retrieves URLs from MongoDB
- Redirects users when short links are visited
- Simple frontend to input URLs and view results
- Real-time server logging of operations
- Error handling for missing or duplicate entries

---

## 🛠️ Tech Stack

| Layer         | Technology         |
|---------------|--------------------|
| Backend       | Node.js, Express   |
| Database      | MongoDB, Mongoose  |
| Frontend      | HTML, CSS, JavaScript |
| Dev Tools     | Nodemon, dotenv    |

---

## 📁 Folder Structure
Simple-URL-Shortener/
├── public/
│ ├── index.html # Frontend UI
│ └── style.css # Basic styling
├── models/
│ └── Url.js # Mongoose URL schema
├── server.js # Main Express server
├── .env # Environment variables
├── package.json # Project config and dependencies
└── README.md # Project documentation


---

## ⚙️ Installation & Setup

### 1. Clone the repo

```bash
git clone https://github.com/your-username/Simple-URL-Shortener.git

cd Simple-URL-Shortener

npm install

Visit: http://localhost:3000
