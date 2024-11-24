const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const master_tags = sequelize.define(
    'master_tags',
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

      synonyms: {
        type: DataTypes.TEXT,
      },

      sequence: {
        type: DataTypes.INTEGER,
      },

      picture_url: {
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

  master_tags.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.master_tags.belongsTo(db.master_tag_categories, {
      as: 'master_tag_category',
      foreignKey: {
        name: 'master_tag_categoryId',
      },
      constraints: false,
    });

    db.master_tags.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.master_tags.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return master_tags;
};
