const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const connect_message_libraries = sequelize.define(
    'connect_message_libraries',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      title: {
        type: DataTypes.TEXT,
      },

      tag: {
        type: DataTypes.TEXT,
      },

      message_body: {
        type: DataTypes.TEXT,
      },

      subject: {
        type: DataTypes.TEXT,
      },

      published: {
        type: DataTypes.BOOLEAN,

        allowNull: false,
        defaultValue: false,
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

  connect_message_libraries.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.connect_message_libraries.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.connect_message_libraries.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return connect_message_libraries;
};
