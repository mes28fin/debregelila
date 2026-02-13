const db = require('../models');
const Attendance = db.attendance;
const Op = db.Sequelize.Op;

// Create and Save a new Attendance record
exports.create = async (data) => {
  try {
    const attendance = await Attendance.create(data);
    return attendance;
  } catch (error) {
    throw error;
  }
};

// Retrieve all Attendance records from the database.
exports.findAll = async (condition) => {
  try {
    const data = await Attendance.findAll({ where: condition });
    return data;
  } catch (error) {
    throw error;
  }
};

// Find a single Attendance with an id
exports.findOne = async (id) => {
  try {
    const data = await Attendance.findByPk(id);
    if (!data) {
        throw new Error(`Attendance with id=${id} not found`);
    }
    return data;
  } catch (error) {
    throw error;
  }
};

// Update an Attendance by the id in the request
exports.update = async (id, data) => {
    try {
        const [nums] = await Attendance.update(data, {
            where: { id: id }
        });
        if (nums == 1) {
            return { message: "Attendance was updated successfully." };
        } else {
            throw new Error(`Cannot update Attendance with id=${id}. Maybe Attendance was not found or req.body is empty!`);
        }
    } catch (error) {
        throw error;
    }
};

// Delete an Attendance with the specified id in the request
exports.delete = async (id) => {
    try {
        const nums = await Attendance.destroy({
            where: { id: id }
        });
        if (nums == 1) {
            return { message: "Attendance was deleted successfully!" };
        } else {
            throw new Error(`Cannot delete Attendance with id=${id}. Maybe Attendance was not found!`);
        }
    } catch (error) {
        throw error;
    }
};
