const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const memberships = sequelize.define(
    'memberships',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
      },

      price: {
        type: DataTypes.DECIMAL,
      },

      features: {
        type: DataTypes.TEXT,
      },

      number_of_courses: {
        type: DataTypes.INTEGER,
      },

      number_of_tutoring_sessions: {
        type: DataTypes.INTEGER,
      },

      support_level: {
        type: DataTypes.TEXT,
      },

      tools_access: {
        type: DataTypes.TEXT,
      },

      extended_services: {
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

  memberships.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.memberships.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.memberships.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return memberships;
};
