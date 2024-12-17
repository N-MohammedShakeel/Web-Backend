import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "secrets",
  password: "password",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.render("home.ejs");
});

app.get("/login", (req, res) => {
  res.render("login.ejs");
});

app.get("/register", (req, res) => {
  res.render("register.ejs");
});

app.post("/register", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const checkResult = await db.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    if (checkResult.rows.length > 0) {
      res.send("Email already exists. Try logging in.");
      
    } else {
      await saveUser(email, password);
      await res.render("login.ejs");
    }
  } catch (err) {
    console.log(err);
  }
  
});

app.post("/login", async (req, res) => {
  const email = req.body.username;
  const password = req.body.password;

  try {
    const result = await db.query("SELECT * FROM users WHERE email = $1", [email]);

    if (result.rows.length > 0) {
      const user = result.rows[0];

      if (password === user.password) {
        res.render("secrets.ejs");
      } else {
        res.status(400).send("Incorrect password.");
      }
    } else {
      res.status(400).send("User not found.");
    }

  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).send("Error during login.");
  }
});

// Function to save the user to the database
const saveUser = async (email, password) => {
  try {
    const query = `
        INSERT INTO users (email, password)
        VALUES ($1, $2);
    `;
    await db.query(query, [email, password]);
    console.log("User saved successfully.");
  } catch (err) {
    console.error("Error saving user:", err);
  }
};

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
