const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const router = express.Router();
const adminPanel = require("./admin");

router.use(express.static(path.join(__dirname, "../static")));
router.use(bodyParser.urlencoded({ extended: true }));

router.get("/", (req, res) => {
  res.redirect("/main");
});

router.get("/main", (req, res) => {
  res.sendFile(path.join(__dirname, "../static/pages/main.html"));
});

router.get("/admin", (req, res) => {
  if (adminPanel.getLogin())
    res.sendFile(path.join(__dirname, "../static/pages/admin.html"));
  else res.sendFile(path.join(__dirname, "../static/pages/admin_denied.html"));
  //   res.sendFile(path.join(__dirname, "../static/pages/admin.html"));
});

router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../static/pages/login.html"));
});
router.post("/login", (req, res) => {
  if (adminPanel.validateLogin(req.body)) res.redirect("/admin");
  else res.redirect("login");
});

router.get("/register", (req, res) => {
  res.sendFile(path.join(__dirname, "../static/pages/register.html"));
});

router.post("/register", (req, res) => {
  if (!req.body.hasOwnProperty("student")) req.body.student = "no";
  req.body.id = adminPanel.getNextId();
  req.body.age = parseInt(req.body.age);
  adminPanel.users.push(req.body);
  res.redirect("/login");
  console.log(adminPanel.users);
});

router.get("/show", (req, res) => {
  if (adminPanel.getLogin()) res.send(adminPanel.getShow());
  else res.sendFile(path.join(__dirname, "../static/pages/admin_denied.html"));
});
router.get("/gender", (req, res) => {
  if (adminPanel.getLogin()) res.send(adminPanel.getGender());
  else res.sendFile(path.join(__dirname, "../static/pages/admin_denied.html"));
});
router.get("/sort", (req, res) => {
  if (adminPanel.getLogin()) res.send(adminPanel.getSort());
  else res.sendFile(path.join(__dirname, "../static/pages/admin_denied.html"));
});

router.post("/sort", (req, res) => {
  console.log(req.body.asc);
  adminPanel.setAsc(req.body.asc == "asc" ? true : false);
  console.log(adminPanel.getAsc());
  res.send(adminPanel.getSort());
});

router.get("/logout", (req, res) => {
  adminPanel.setLogin(false);
  res.redirect("/login");
});
module.exports = router;
