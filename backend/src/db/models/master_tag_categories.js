const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const master_tag_categories = sequelize.define(
    'master_tag_categories',
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

      picture_url: {
        type: DataTypes.TEXT,
      },

      recommendation_tag: {
        type: DataTypes.TEXT,
      },

      sequence: {
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

  master_tag_categories.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.master_tag_categories.hasMany(db.master_tags, {
      as: 'master_tags_master_tag_category',
      foreignKey: {
        name: 'master_tag_categoryId',
      },
      constraints: false,
    });

    //end loop

    db.master_tag_categories.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.master_tag_categories.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return master_tag_categories;
};
