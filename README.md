# 🚀 Blog App (Next.js + MongoDB + JWT)

A full-stack modern blog application built using **Next.js App Router**, **MongoDB**, and **JWT authentication**.  
This project includes an **admin dashboard**, **post management**, **reviews system**, and **image uploads** — all in a single unified codebase.

---

## ✨ Features

### 🔐 Authentication
- Admin Registration & Login
- JWT-based authentication
- Protected API routes
- Admin-only access control

### 📝 Blog System
- Create, edit, delete posts
- Upload images with posts
- View all posts (public)
- Single post page with full content

### 👨‍💼 Admin Dashboard
- View total posts, reviews, admins
- Pagination support
- Manage posts easily

### ⭐ Reviews System
- Users can add reviews on posts
- Rating system (1–5 stars)
- Display average rating

### 📬 Contact System
- Contact form with email support (Nodemailer)

### 🔔 UI/UX
- Bootstrap UI
- React Hot Toast notifications
- Modal confirmations (no browser alerts)

---

## 🛠 Tech Stack

| Technology | Usage |
|----------|------|
| Next.js (App Router) | Frontend + Backend |
| MongoDB + Mongoose | Database |
| JWT | Authentication |
| Axios | API calls |
| Bootstrap | UI |
| React Hot Toast | Notifications |
| Nodemailer | Email service |

---

## 📂 Project Structure

```
app/
 ├── api/
 │    ├── posts/
 │    ├── admin/
 │    ├── reviews/
 │    ├── contact/
 │    └── dashboard/
 │
 ├── admin/
 │    ├── dashboard/
 │    ├── posts/
 │    ├── edit-post/
 │    ├── login/
 │    └── register/
 │
 ├── post/[id]/
 └── page.js

components/
 ├── Navbar
 ├── Footer
 ├── AdminProtected

lib/
 ├── db.js
 ├── auth.js

models/
 ├── Post.js
 ├── Admin.js
 ├── Review.js

public/uploads/
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone the repository

```bash
git clone https://github.com/your-username/blog-app.git
cd blog-app
```

---

### 2️⃣ Install dependencies

```bash
npm install
```

---

### 3️⃣ Setup environment variables

Create a `.env.local` file in root:

```env
MONGODB_URI=your_mongodb_connection
JWT_SECRET=your_secret_key

EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_email_password
```

---

### 4️⃣ Run the project

```bash
npm run dev
```

App will run at:
```
http://localhost:3000
```

---

## 🔐 Admin Access

- Register a new admin:
```
/admin/register
```

- Login:
```
/admin/login
```

---

## 📌 API Routes Overview

### Posts
```
GET    /api/posts
POST   /api/posts
GET    /api/posts/:id
PUT    /api/posts/:id
DELETE /api/posts/:id
```

### Admin
```
POST /api/admin/register
POST /api/admin/login
```

### Reviews
```
POST /api/reviews
GET  /api/reviews/:postId
```

### Dashboard
```
GET /api/dashboard/stats
```

### Contact
```
POST /api/contact
```

---

## 🧠 Key Concepts Implemented

- Next.js App Router APIs
- JWT Middleware Protection
- File Upload using `formData`
- MongoDB relations (Post ↔ Admin ↔ Review)
- Dynamic routes (`[id]`)
- Client & Server component separation

---

## ⚠️ Common Issues & Fixes

### ❌ Images not loading
✔ Ensure:
```
public/uploads/
```

### ❌ MONGODB_URI missing
✔ Add `.env.local`

### ❌ JWT not working
✔ Check:
```
Authorization: Bearer <token>
```

### ❌ Model overwrite error
✔ Use:
```js
export default mongoose.models.ModelName || mongoose.model(...)
```

---

## 🚀 Future Improvements

- User authentication (not just admin)
- Like system ❤️
- Comments threading
- Image optimization
- Dark mode 🌙
- SEO optimization

---

## 👨‍💻 Author

**Shivam Maurya**  
GitHub: https://github.com/shri1906

---

---

## ⭐ Support

If you like this project, give it a ⭐ on GitHub!