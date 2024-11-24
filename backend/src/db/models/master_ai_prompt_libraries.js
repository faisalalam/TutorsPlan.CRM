const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const master_ai_prompt_libraries = sequelize.define(
    'master_ai_prompt_libraries',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      title: {
        type: DataTypes.TEXT,
      },

      tags: {
        type: DataTypes.TEXT,
      },

      prompt: {
        type: DataTypes.TEXT,
      },

      save_as_library: {
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

  master_ai_prompt_libraries.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.master_ai_prompt_libraries.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.master_ai_prompt_libraries.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return master_ai_prompt_libraries;
};
