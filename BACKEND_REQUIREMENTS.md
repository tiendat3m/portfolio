# Backend Requirements Checklist

## ✅ Tính năng cần Backend (Miễn phí):

### 1. **Blog Management** (CRUD)

- ✅ Create posts
- ✅ Read posts
- ✅ Update posts
- ✅ Delete posts
- ✅ Real-time sync

### 2. **User Authentication**

- ✅ Admin login
- ✅ Guest login
- ✅ Role-based access

### 3. **Newsletter Subscription**

- ✅ Add subscriber
- ✅ Store emails
- ✅ Check duplicate

### 4. **Image Upload**

- ✅ Upload blog images
- ✅ Store in cloud
- ✅ Get URL for display

### 5. **Contact Form**

- ✅ Submit messages
- ✅ Store inquiries
- ✅ Admin view

### 6. **Comments** (Optional)

- ⬜ Add comments to posts
- ⬜ Reply to comments
- ⬜ Moderation

---

## 🔑 Keys/URLs cần có (FREE):

### Supabase (FREE - 500MB, 50K requests/month)

```
✅ VITE_SUPABASE_URL
✅ VITE_SUPABASE_ANON_KEY
```

**Cách lấy**: https://supabase.com → Tạo project → Settings → API

### Cloudinary (FREE - 25GB storage, 25GB bandwidth/month)

```
⬜ VITE_CLOUDINARY_CLOUD_NAME
⬜ VITE_CLOUDINARY_UPLOAD_PRESET
```

**Cách lấy**: https://cloudinary.com → Tạo account → Dashboard

---

## 📊 So sánh các Backend FREE:

| Service             | Storage    | Bandwidth | Requests | Database   | Auth |
| ------------------- | ---------- | --------- | -------- | ---------- | ---- |
| **Supabase**        | 500MB      | 5GB       | 50K/mo   | PostgreSQL | ✅   |
| **Firebase**        | 1GB        | 10GB      | 50K/day  | NoSQL      | ✅   |
| **Appwrite**        | 75K req/mo | 75K/mo    | 75K/mo   | MariaDB    | ✅   |
| **Vercel Postgres** | 256MB      | -         | 60/mo    | PostgreSQL | ❌   |
| **PlanetScale**     | 5GB        | -         | 1B/mo    | MySQL      | ❌   |

**Recommendation**: Supabase (full-featured, PostgreSQL, real-time)
