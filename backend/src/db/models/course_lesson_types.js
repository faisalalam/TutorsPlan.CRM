const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const course_lesson_types = sequelize.define(
    'course_lesson_types',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
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

  course_lesson_types.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.course_lesson_types.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.course_lesson_types.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return course_lesson_types;
};