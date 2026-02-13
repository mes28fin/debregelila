const attendanceService = require('../services/attendance.service');

// Create and Save a new Attendance
exports.create = async (req, res) => {
  if (!req.body.student_name) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  const attendance = {
    custom_id: req.body.custom_id,
    student_name: req.body.student_name,
    class_level: req.body.class_level,
    date: req.body.date,
    status: req.body.status,
    topic_taught: req.body.topic_taught,
    educational_status: req.body.educational_status,
    address: req.body.address,
    city: req.body.city,
    woreda: req.body.woreda,
    marital_status: req.body.marital_status,
    photo_url: req.file ? `/uploads/${req.file.filename}` : null
  };

  try {
    console.log("Creating attendance with:", attendance);
    const data = await attendanceService.create(attendance);
    console.log("Attendance created:", data);
    res.send(data);
  } catch (err) {
    console.error("Error creating attendance:", err);
    res.status(500).send({
      message: err.message || "Some error occurred while creating the Attendance."
    });
  }
};

const db = require("../models");
const Op = db.Sequelize.Op;

// Retrieve all Attendances from the database.
exports.findAll = async (req, res) => {
  const student_name = req.query.student_name;
  var condition = student_name ? { student_name: { [Op.like]: `%${student_name}%` } } : null;

  try {
    const data = await attendanceService.findAll(condition);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Some error occurred while retrieving attendance."
    });
  }
};

// Find a single Attendance with an id
exports.findOne = async (req, res) => {
  const id = req.params.id;

  try {
    const data = await attendanceService.findOne(id);
    res.send(data);
  } catch (err) {
    res.status(500).send({
      message: "Error retrieving Attendance with id=" + id
    });
  }
};

// Update an Attendance by the id in the request
exports.update = async (req, res) => {
  const id = req.params.id;

  try {
    const updateData = { ...req.body };
    if (req.file) {
      updateData.photo_url = `/uploads/${req.file.filename}`;
    }
    const message = await attendanceService.update(id, updateData);
    res.send(message);
  } catch (err) {
    res.status(500).send({
      message: "Error updating Attendance with id=" + id
    });
  }
};

// Delete an Attendance with the specified id in the request
exports.delete = async (req, res) => {
  const id = req.params.id;

  try {
    const message = await attendanceService.delete(id);
    res.send(message);
  } catch (err) {
    res.status(500).send({
      message: "Could not delete Attendance with id=" + id
    });
  }
};
