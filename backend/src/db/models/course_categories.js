const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const course_categories = sequelize.define(
    'course_categories',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
      },

      description: {
        type: DataTypes.TEXT,
      },

      icon_url: {
        type: DataTypes.TEXT,
      },

      published_on_public_site: {
        type: DataTypes.BOOLEAN,

        allowNull: false,
        defaultValue: false,
      },

      display_sequence: {
        type: DataTypes.INTEGER,
      },

      bootcamp_course: {
        type: DataTypes.INTEGER,
      },

      regular_course: {
        type: DataTypes.INTEGER,
      },

      total_course: {
        type: DataTypes.INTEGER,
      },

      student_number: {
        type: DataTypes.INTEGER,
      },

      tutor_number: {
        type: DataTypes.INTEGER,
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  course_categories.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.course_categories.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.course_categories.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return course_categories;
};
