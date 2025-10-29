import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";

const app = express();
const port = 3000;
app.use(express.json());
app.use(
  session({
    secret: "mySecretKey123", // change to something secure
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 60 * 60 * 1000 }, // 1 hour
  })
);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use((req, res, next) => {
  console.log(`[${req.method}] ${req.url}`);
  next();
});

// -----------------------------
// Existing user list (public info, no passwords)
let users = [
  { id: 1, name: "Mock User 1" },
  { id: 2, name: "Mock User 2" },
];

const userPasswords = {
  admin: "password",
  Alice: "alice123",
  Bob: "bob123",
  Charlie: "charlie123",
};

app.get("/api/users", (req, res) => {
  res.json({ users });
});

app.get("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (user) res.json(user);
  else res.status(404).json({ error: "User not found" });
});

app.post("/api/users", (req, res) => {
  const { name } = req.body;
  if (!name) return res.status(400).json({ error: "Name is required" });
  const newUser = { id: users.length + 1, name };
  users.push(newUser);
  res.status(201).json(newUser);
});

app.put("/api/users/:id", (req, res) => {
  const user = users.find((u) => u.id === parseInt(req.params.id));
  if (!user) return res.status(404).json({ error: "User not found" });
  user.name = req.body.name || user.name;
  res.json(user);
});

app.delete("/api/users/:id", (req, res) => {
  const index = users.findIndex((u) => u.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "User not found" });
  const deleted = users.splice(index, 1)[0];
  res.json(deleted);
});

// -----------------------------
// New: login endpoint
app.post("/api/login", (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res
      .status(400)
      .json({ error: "Username and password are required" });
  }

  const storedPassword = userPasswords[username];
  if (storedPassword && storedPassword === password) {
    // Store login info in session
    req.session.user = username;
    return res.json({ message: "Login successful", user: username });
  }

  return res.status(401).json({ error: "Invalid credentials" });
});

app.get("/api/check-auth", (req, res) => {
  if (req.session.user) {
    return res.json({ authenticated: true, user: req.session.user });
  }
  res.status(401).json({ authenticated: false });
});

// -----------------------------
// 🔹 Logout endpoint
app.post("/api/logout", (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ error: "Logout failed" });
      }
      res.clearCookie("connect.sid"); // default cookie name
      return res.json({ message: "Logged out successfully" });
    });
  } else {
    res.json({ message: "No active session" });
  }
});

// -----------------------------
app.get("/api/delay", (req, res) => {
  setTimeout(() => {
    res.json({ status: "Delayed response" });
  }, 2000);
});

app.get("/api/error", (req, res) => {
  res.status(500).json({ error: "Internal server error" });
});

app.get("/api/search", (req, res) => {
  const { name } = req.query;
  const result = users.filter((u) =>
    u.name.toLowerCase().includes(name.toLowerCase())
  );
  res.json({ users: result });
});

// Block HTML pages if not logged in (except login page)
app.use("/ProjectTSApp", (req, res, next) => {
  const isLoginPage = req.path === "/TS1_Login.html";
  if (isLoginPage || req.session.user) {
    return next();
  }
  return res.redirect("/ProjectTSApp/TS1_Login.html");
});

app.use("/ProjectTSApp", express.static(path.join(__dirname, "ProjectTSApp")));

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
