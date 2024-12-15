import express from "express";
import morgan from "morgan";  // logging requests <logs>

const app = express();
const port = 3000;

app.use(morgan("combined")) //::1 - - [06/Jul/2024:07:17:40 +0000] "GET / HTTP/1.1" 200 5 "-" "PostmanRuntime/7.39.0"
app.use(morgan("dev")) // GET / 200 3.767 ms - 5
app.use(morgan("common")) // ::1 - - [06/Jul/2024:07:17:15 +0000] "GET / HTTP/1.1" 200 5
app.use(morgan("short")) // ::1 - GET / HTTP/1.1 200 5 - 3.767 ms
app.use(morgan("tiny")) // GET / 200 5 - 3.767 ms


app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
