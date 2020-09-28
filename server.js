const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const data = require("./db/data.json");
const cors = require("cors");
const { getIncludes, defaultValue, sortValue } = require("./mw/search");

const app = express();

app.use(morgan("dev"));

// middewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/status/", (req, res) => {
  console.log(req.query);
  const { show, sort } = req.query;
  let status = show ? show.split(",") : ["error", "failure"];
  let sort_by = sort ? sort.split(",") : ["status", "asc"];
  let default_dict = {
    status: "Error",
    reason: "Server Error",
  };

  let output = getIncludes(data, status, (v) =>
    defaultValue(v, default_dict, (v) => sortValue(v, sort_by))
  );

  res.json(output);
});

const PORT = 5000;
app.listen(PORT, (err) => {
  if (err) throw console.log(err);
  console.log("listening on port %s", PORT);
});
