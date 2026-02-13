module.exports = app => {
  const auth = require("../controllers/auth.controller.js");
  var router = require("express").Router();

  router.post("/login", auth.login);
  router.post("/setup", auth.createAdmin);

  app.use('/api/auth', router);
};
