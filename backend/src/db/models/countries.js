const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const countries = sequelize.define(
    'countries',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
      },

      ticker: {
        type: DataTypes.TEXT,
      },

      flag_icon: {
        type: DataTypes.TEXT,
      },

      phone_code: {
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

  countries.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.countries.hasMany(db.cities, {
      as: 'cities_country',
      foreignKey: {
        name: 'countryId',
      },
      constraints: false,
    });

    db.countries.hasMany(db.counties, {
      as: 'counties_country',
      foreignKey: {
        name: 'countryId',
      },
      constraints: false,
    });

    db.countries.hasMany(db.states, {
      as: 'states_country',
      foreignKey: {
        name: 'countryId',
      },
      constraints: false,
    });

    db.countries.hasMany(db.zip_codes, {
      as: 'zip_codes_country',
      foreignKey: {
        name: 'countryId',
      },
      constraints: false,
    });

    //end loop

    db.countries.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.countries.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return countries;
};
