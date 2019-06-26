const express = require("express");
const app = express();

const port = process.env.PORT || 5000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send({ express: "Hello from your serverrrrrr" });
});

app.listen(port, () => console.log(`Listening to port ${port}`));
