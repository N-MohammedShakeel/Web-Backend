import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
// import util from "util";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "world",
  password: "mspostgres",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let countries = [];
async function checkVisited() {
  countries = []; // Reset array
  const result = await db.query("SELECT country_code FROM visited_countries");
  result.rows.forEach((country) => {
    countries.push(country.country_code);
  });
  return countries;
}

app.get("/", async (req, res) => {
  await checkVisited();
  res.render("index.ejs", {
    error: null,
    countries: countries,
    total: countries.length,
  });
});

app.post("/add", async (req, res) => {
  const input = req.body["country"];

  try {
    const result = await db.query(
      "SELECT country_code FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    if (result.rows.length === 0) {
      let error = "No country found with the given name.";
      await checkVisited();
      res.render("index.ejs", {
        error: error,
        countries: countries,
        total: countries.length,
      });
    } else {
      const data = result.rows[0];
      const countryCode = data.country_code;

      try {
        const visitedResult = await db.query(
          "SELECT * FROM visited_countries WHERE country_code = $1;",
          [countryCode]
        );
        if (visitedResult.rows.length > 0) {
          let error = "Already visited this country";
          await checkVisited();
          res.render("index.ejs", {
            error: error,
            countries: countries,
            total: countries.length,
          });
        } else {
          await db.query(
            "INSERT INTO visited_countries (country_code) VALUES ($1);",
            [countryCode]
          );
          res.redirect("/");
        }
      } catch (error) {
        console.error("Error executing query:", error);
        res.render("index.ejs", {
          error: "Error adding country",
          countries: countries,
          total: countries.length,
        });
      }
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.render("index.ejs", {
      error: "Error executing query",
      countries: countries,
      total: countries.length,
    });
  }
});

app.post("/delete", async (req, res) => {
  const input = req.body["country"];

  try {
    const result = await db.query(
      "SELECT * FROM countries WHERE LOWER(country_name) LIKE '%' || $1 || '%';",
      [input.toLowerCase()]
    );

    if (result.rows.length === 0) {
      let error = "Country not found in the visited list";
      await checkVisited();
      res.render("index.ejs", {
        error: error,
        countries: countries,
        total: countries.length,
      });
    } else {
      const data = result.rows[0];
      const countryCode = data.country_code;

      try {
        await db.query("DELETE FROM visited_countries WHERE country_code = $1;", [countryCode]);
        res.redirect("/");
      } catch (error) {
        console.error("Error executing query:", error);
        let deletingerror = "Error deleting country";
        await checkVisited();
        res.render("index.ejs", {
          error: deletingerror,
          countries: countries,
          total: countries.length,
        });
      }
    }
  } catch (error) {
    console.error("Error executing query:", error);
    res.render("index.ejs", {
      error: "Error executing query",
      countries: countries,
      total: countries.length,
    });
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
