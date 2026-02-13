module.exports = app => {
  const attendance = require("../controllers/attendance.controller.js");
  const authJwt = require("../middleware/auth");
  const multer = require('multer');
  const path = require('path');

  // Multer storage configuration
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + path.extname(file.originalname));
    }
  });

  const upload = multer({ storage: storage });

  var router = require("express").Router();

  // Protect all routes
  router.use(authJwt.verifyToken);

  // Create a new Attendance with photo upload
  router.post("/", upload.single('photo'), attendance.create);

  // Retrieve all Attendance
  router.get("/", attendance.findAll);

  // Retrieve a single Attendance with id
  router.get("/:id", attendance.findOne);

  // Update a Attendance with id and photo upload
  router.put("/:id", upload.single('photo'), attendance.update);

  // Delete a Attendance with id
  router.delete("/:id", attendance.delete);

  app.use('/api/attendance', router);
};
