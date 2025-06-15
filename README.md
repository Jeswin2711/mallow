# User Management App

A simple user management interface with login and full CRUD operations, built using [ReqRes API](https://reqres.in/).

---

## 🔧 Tech Stack

- ⚛️ React  
- ⚙️ Redux Toolkit  
- 🎨 Ant Design (antd)  
- 📬 Sonner (toast notifications)  
- 🧠 TypeScript  
- 🎨 SCSS (modular styles)

---

## ✨ Features

- 🔐 User Authentication (via fake API)
- 🧑‍💼 Create, Read, Update, Delete (CRUD) users
- ⚡ API integration using ReqRes
- 🎛️ Clean UI with Ant Design components
- 🛎️ Toast Notifications with Sonner

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd <project-directory>
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run in development mode

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
```

---

## 🔐 Login Credentials

Use the following credentials to log in:

```json
{
  "email": "eve.holt@reqres.in",
  "password": "cityslicka"
}
```

> ✅ These are official test credentials provided by ReqRes.

---

## 📂 Project Structure

```
src/
├── apis/               # Reusable api calls 
├── components/         # Reusable UI components
├── pages/
│   ├── login/          # Login page
│   └── user-list/      # User list and CRUD operations
├── redux/              # Redux Toolkit slices and store
├── route.tsx           # Route configuration
├── utils/              # Utlities
└── main.tsx            # Entry point
```

---

## ⚠️ API Reference

This project uses the public [ReqRes API](https://reqres.in/) for simulating backend CRUD operations.

---

## 📝 License

This project was created as part of a task and is not intended for commercial use.
