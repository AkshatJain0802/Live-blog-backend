# Live Blog Backend 

A RESTful API for a live blog, built with **Node.js + Express + MongoDB Atlas**.

---

## Project Structure

```
live-blog-backend/
├── models/
│   └── Post.js        # Mongoose schema & model
├── routes/
│   └── posts.js       # All /posts CRUD routes
├── .env.example       # Template for environment variables
├── .gitignore         # Ignores node_modules and .env
├── db.js              # MongoDB connection logic
├── server.js          # App entry point
├── Prompts.md         # AI prompts log (for submission)
└── package.json
```

---

## Setup Instructions

### Step 1 — Clone and Install
```bash
git clone <your-repo-url>
cd live-blog-backend
npm install
```

### Step 2 — Set Up MongoDB Atlas
1. Go to [https://www.mongodb.com/atlas](https://www.mongodb.com/atlas) and create a free account
2. Create a **free cluster** (M0)
3. Under **Database Access**, create a user with a username and password
4. Under **Network Access**, click **Add IP Address → Allow Access from Anywhere** (0.0.0.0/0)
5. Click **Connect → Drivers**, copy your connection string

It will look like:
```
mongodb+srv://youruser:yourpassword@cluster0.abc123.mongodb.net/?retryWrites=true&w=majority
```

### Step 3 — Configure Environment Variables
```bash
cp .env.example .env
```
Open `.env` and replace the placeholder with your real connection string:
```
MONGO_URI=mongodb+srv://youruser:yourpassword@cluster0.abc123.mongodb.net/liveblog?retryWrites=true&w=majority
PORT=3000
```
> ⚠️ Note the `/liveblog` before the `?` — this names your database "liveblog"

### Step 4 — Run the Server
```bash
# Development (auto-restarts on file changes)
npm run dev

# OR production
npm start
```

You should see:
```
Server running on http://localhost:5000
MongoDB Connected: cluster0.abc123.mongodb.net
```

---

## API Endpoints

### Health Check
```
GET http://localhost:5000/
```

### Create a Post
```
POST http://localhost:5000/posts
Content-Type: application/json

{
  "title": "My First Post",
  "content": "Hello from MongoDB Atlas!"
}
```

### Get All Posts
```
GET http://localhost:5000/posts
```

### Get One Post
```
GET http://localhost:5000/posts/<id>
```

### Delete a Post
```
DELETE http://localhost:5000/posts/<id>
```

---

## Testing with Postman

1. Open Postman and create a new request
2. **Create a post**: Set method to `POST`, URL to `http://localhost:5000/posts`, go to **Body → raw → JSON** and paste:
   ```json
   { "title": "Test Post", "content": "This is stored in MongoDB!" }
   ```
3. Hit Send — you'll get back the saved document with its `_id`
4. **Verify in Atlas**: Go to your Atlas dashboard → Browse Collections — you'll see the post!
5. **Get all posts**: Change method to `GET`, same URL, hit Send
6. **Delete**: Change method to `DELETE`, add the `_id` to the URL: `.../posts/<id>`
