module.exports = (sequelize, Sequelize) => {
  const Attendance = sequelize.define("attendance", {
    custom_id: {
      type: Sequelize.STRING,
      allowNull: true
    },
    student_name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    class_level: {
      type: Sequelize.STRING, // e.g., "Grade 1", "Yemari"
      allowNull: true
    },
    date: {
      type: Sequelize.DATEONLY,
      allowNull: false,
      defaultValue: Sequelize.NOW
    },
    status: {
      type: Sequelize.ENUM('Present', 'Absent', 'Late', 'Excused'),
      defaultValue: 'Present'
    },
    topic_taught: {
        type: Sequelize.STRING,
        allowNull: true
    },
    marital_status: {
        type: Sequelize.ENUM('Unmarried', 'Married'),
        defaultValue: 'Unmarried'
    },
    spouse_name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    christian_name: {
        type: Sequelize.STRING,
        allowNull: true
    },
    educational_status: {
        type: Sequelize.ENUM('10th', '12th', 'Diploma', 'BSC', 'MSC', 'PHD'),
        allowNull: true
    },
    course_level: {
        type: Sequelize.ENUM('Graduated', '1st Year', '2nd Year', '3rd Year'),
        allowNull: true
    },
    neseha: {
        type: Sequelize.ENUM('Yes', 'No'),
        defaultValue: 'No'
    },
    photo_url: {
        type: Sequelize.STRING,
        allowNull: true
    },
    address: {
        type: Sequelize.STRING,
        allowNull: true
    },
    city: {
        type: Sequelize.STRING,
        allowNull: true
    },
    woreda: {
        type: Sequelize.STRING,
        allowNull: true
    }
  });

  return Attendance;
};
