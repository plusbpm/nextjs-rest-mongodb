const dotenv = require("dotenv-safe");

const { error } = dotenv.config();
if (error) throw error;

const express = require("express");
const next = require("next");

const mountApi = require("./api");

const port = parseInt(process.env.PORT, 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });

const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => express())
  .then(mountApi)
  .then(server => {
    server.get("*", (req, res) => handle(req, res));

    server.listen(port, err => {
      if (err) throw err;
      // eslint-disable-next-line no-console
      console.log(`Ready on http://localhost:${port}`);
    });
  });
