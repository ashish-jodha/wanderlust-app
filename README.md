# 🏡 Wanderlust

A full-stack property rental platform built with Node.js, Express, MongoDB, and Tailwind CSS.

Users can browse listings, create properties, upload images, leave reviews, and manage their own content through a secure authentication system. The application also includes a Sandbox Mode that allows visitors to explore core features without affecting public data.

## 🌐 Live Demo

👉 **https://wanderlust-app-60as.onrender.com**

---

## ✨ Features

* 🔐 User registration and authentication
* 🏠 Create, edit, and manage property listings
* 🖼️ Upload listing images with Cloudinary
* ⭐ Reviews and ratings system
* 🔒 Protected routes and session-based authentication
* 🧪 Sandbox Mode for safe public testing
* ⏳ Automatic cleanup of temporary user-generated content
* 📱 Responsive user interface
* ✅ Server-side validation for secure data handling

---

## 🛠️ Tech Stack

| Technology      | Purpose                    |
| --------------- | -------------------------- |
| Node.js         | Runtime Environment        |
| Express.js      | Backend Framework          |
| MongoDB Atlas   | Database                   |
| Mongoose        | ODM                        |
| Passport.js     | Authentication             |
| express-session | Session Management         |
| connect-mongo   | Persistent Session Storage |
| Cloudinary      | Image Storage              |
| Multer          | File Upload Handling       |
| Joi             | Data Validation            |
| EJS & EJS-Mate  | Server-Side Rendering      |
| Tailwind CSS v4 | Styling                    |
| Render          | Deployment                 |

---

## 🚀 Getting Started

### Prerequisites

Make sure you have **Node.js** and **npm** installed.

### Installation

Clone the repository:

```bash
git clone https://github.com/ashish-jodha/wanderlust-app.git
```

Navigate to the project directory:

```bash
cd wanderlust-app
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the root directory:

```env
ATLASDB_URL=your_mongodb_atlas_connection_string
SECRET=your_express_session_secret
ADMIN_PASSWORD=your_admin_password

CLOUDINARY_CLOUD_NAME=your_cloudinary_name
CLOUDINARY_KEY=your_cloudinary_api_key
CLOUDINARY_SECRET=your_cloudinary_api_secret
```

Initialize the database:

```bash
node init/init.js
```

Start the development server:

```bash
node index.js
```

---

## 📂 Project Structure

```text
wanderlust-app/
├── controllers/      # Application business logic
├── models/           # Database schemas
├── routes/           # Express routes
├── views/            # EJS templates
├── public/           # Static assets
├── init/             # Database initialization scripts
├── utils/            # Utility functions
├── middleware.js     # Custom middleware
├── schema.js         # Joi validation schemas
└── index.js          # Application entry point
```

---

## 👨‍💻 Author

**Ashish Jodha**