const express = require("express");
const app = express();

// ✅ MUST BE HERE
app.use(express.json());

let users = [];
let idCounter = 1;

// ✅ GET
app.get("/users", (req, res) => {
  let result = [...users];

  // search
  if (req.query.search) {
    result = result.filter(user =>
      user.name.toLowerCase().includes(req.query.search.toLowerCase())
    );
  }

  // sort
  if (req.query.sort === "name") {
    result.sort((a, b) => {
      return req.query.order === "desc"
        ? b.name.localeCompare(a.name)
        : a.name.localeCompare(b.name);
    });
  }

  res.json(result);
});

// ✅ POST
app.post("/users", (req, res) => {
  console.log("POST USERS");

  const { name, email } = req.body;

  const newUser = {
    id: idCounter,
    name,
    email
  };

  idCounter++;
  users.push(newUser);

  res.json(newUser);
});

// GET user by ID
app.get("/users/:id", (req, res) => {
  const user = users.find(u => u.id == req.params.id);

  if (!user) {
    return res.json({ message: "User not found" });
  }

  res.json(user);
});

// UPDATE user
app.put("/users/:id", (req, res) => {
  const user = users.find(u => u.id == req.params.id);

  if (!user) {
    return res.json({ message: "User not found" });
  }

  const { name, email } = req.body;

  if (name) user.name = name;
  if (email) user.email = email;

  res.json(user);
});

// DELETE user
app.delete("/users/:id", (req, res) => {
  const index = users.findIndex(u => u.id == req.params.id);

  if (index === -1) {
    return res.json({ message: "User not found" });
  }

  users.splice(index, 1);

  res.json({ message: "User deleted" });
});

// ✅ SERVER LAST
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
