# Backend Implementation Guide for Portfolio Website

## 🎯 Overview

Hiện tại website đang sử dụng **localStorage** để lưu trữ dữ liệu. Dưới đây là các tùy chọn backend bạn có thể implement:

---

## 📊 So sánh các Backend Options

| Backend           | Difficulty  | Real-time | Free Tier     | Best For                |
| ----------------- | ----------- | --------- | ------------- | ----------------------- |
| **Firebase**      | ⭐ Easy     | ✅ Yes    | ✅ 1GB        | Quick setup, real-time  |
| **Supabase**      | ⭐⭐ Medium | ✅ Yes    | ✅ 500MB      | PostgreSQL, open source |
| **Express.js**    | ⭐⭐⭐ Hard | ❌ No     | N/A           | Full control, custom    |
| **MongoDB Atlas** | ⭐⭐ Medium | ❌ No     | ✅ 512MB      | Document database       |
| **Appwrite**      | ⭐ Easy     | ✅ Yes    | ✅ 75K req/mo | Self-hosted option      |

---

## 🔥 Option 1: Firebase (Recommended for beginners)

### Setup:

```bash
npm install firebase
```

### Create `src/firebase/config.js`:

```javascript
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
```

### Usage:

```javascript
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/config";

// Add blog post
const addPost = async (post) => {
  await addDoc(collection(db, "posts"), post);
};

// Get all posts
const getPosts = async () => {
  const snapshot = await getDocs(collection(db, "posts"));
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
};

// Update post
const updatePost = async (id, data) => {
  await updateDoc(doc(db, "posts", id), data);
};

// Delete post
const deletePost = async (id) => {
  await deleteDoc(doc(db, "posts", id));
};
```

---

## 🐘 Option 2: Supabase (Recommended for production)

### Setup:

```bash
npm install @supabase/supabase-js
```

### Create `src/supabase/config.js`:

```javascript
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "YOUR_SUPABASE_URL";
const supabaseKey = "YOUR_SUPABASE_ANON_KEY";

export const supabase = createClient(supabaseUrl, supabaseKey);
```

### Database Schema:

```sql
-- Posts table
CREATE TABLE posts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    title TEXT NOT NULL,
    excerpt TEXT,
    content TEXT,
    image TEXT,
    category TEXT,
    author TEXT,
    read_time TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Subscribers table
CREATE TABLE subscribers (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- Users table
CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    role TEXT DEFAULT 'guest',
    created_at TIMESTAMP DEFAULT NOW()
);
```

### Usage:

```javascript
import { supabase } from "../supabase/config";

// Add post
const addPost = async (post) => {
  const { data, error } = await supabase.from("posts").insert([post]);
  return data;
};

// Get all posts
const getPosts = async () => {
  const { data, error } = await supabase
    .from("posts")
    .select("*")
    .order("created_at", { ascending: false });
  return data;
};

// Real-time subscription
supabase
  .channel("posts")
  .on(
    "postgres_changes",
    { event: "*", schema: "public", table: "posts" },
    (payload) => {
      console.log("Change received!", payload);
      // Update your state here
    },
  )
  .subscribe();
```

---

## 🚀 Option 3: Express.js + MongoDB

### Backend Setup:

```bash
mkdir backend
cd backend
npm init -y
npm install express mongoose cors dotenv
```

### Backend Structure:

```
backend/
├── server.js
├── models/
│   ├── Post.js
│   ├── User.js
│   └── Subscriber.js
├── routes/
│   ├── posts.js
│   ├── auth.js
│   └── subscribers.js
└── middleware/
    └── auth.js
```

### Server (`backend/server.js`):

```javascript
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// Routes
app.use("/api/posts", require("./routes/posts"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/subscribers", require("./routes/subscribers"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
```

### Post Model (`backend/models/Post.js`):

```javascript
const mongoose = require("mongoose");

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  excerpt: String,
  content: String,
  image: String,
  category: String,
  author: String,
  readTime: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Post", postSchema);
```

### Posts Route (`backend/routes/posts.js`):

```javascript
const router = require("express").Router();
const Post = require("../models/Post");

// Get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get single post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.json(post);
  } catch (err) {
    res.status(404).json({ message: "Post not found" });
  }
});

// Create post
router.post("/", async (req, res) => {
  const post = new Post(req.body);
  try {
    const newPost = await post.save();
    res.status(201).json(newPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { ...req.body, updatedAt: Date.now() },
      { new: true },
    );
    res.json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete post
router.delete("/:id", async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.json({ message: "Post deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
```

### Frontend API Service (`src/services/api.js`):

```javascript
const API_URL = "http://localhost:5000/api";

export const api = {
  // Posts
  getPosts: async () => {
    const res = await fetch(`${API_URL}/posts`);
    return res.json();
  },

  getPost: async (id) => {
    const res = await fetch(`${API_URL}/posts/${id}`);
    return res.json();
  },

  createPost: async (post) => {
    const res = await fetch(`${API_URL}/posts`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });
    return res.json();
  },

  updatePost: async (id, post) => {
    const res = await fetch(`${API_URL}/posts/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    });
    return res.json();
  },

  deletePost: async (id) => {
    const res = await fetch(`${API_URL}/posts/${id}`, {
      method: "DELETE",
    });
    return res.json();
  },
};
```

---

## 📝 Implementation Checklist

### For Firebase/Supabase:

- [ ] Create account & project
- [ ] Install SDK
- [ ] Configure credentials
- [ ] Create database tables/collections
- [ ] Update BlogPage.jsx
- [ ] Update BlogAdmin.jsx
- [ ] Test CRUD operations

### For Express.js + MongoDB:

- [ ] Set up MongoDB Atlas cluster
- [ ] Create backend folder
- [ ] Install dependencies
- [ ] Create models & routes
- [ ] Set up environment variables
- [ ] Deploy backend (Heroku/Railway)
- [ ] Update frontend API calls
- [ ] Test all endpoints

---

## 🔐 Security Notes

1. **Never commit API keys** to Git
2. Use **environment variables** (.env file)
3. Implement **authentication** for admin routes
4. Add **rate limiting** to prevent abuse
5. Validate **input data** on both frontend & backend
6. Use **HTTPS** in production

---

## 💡 Recommendation

For this portfolio website, I recommend:

1. **Quick Start**: Use **Firebase** - easy setup, free tier, real-time
2. **Production**: Use **Supabase** - PostgreSQL, open source, scalable
3. **Full Control**: Use **Express.js + MongoDB** - custom logic, your rules

Choose based on your needs and technical expertise!
