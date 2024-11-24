const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const cities = sequelize.define(
    'cities',
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

  cities.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.cities.hasMany(db.zip_codes, {
      as: 'zip_codes_city',
      foreignKey: {
        name: 'cityId',
      },
      constraints: false,
    });

    //end loop

    db.cities.belongsTo(db.countries, {
      as: 'country',
      foreignKey: {
        name: 'countryId',
      },
      constraints: false,
    });

    db.cities.belongsTo(db.states, {
      as: 'state',
      foreignKey: {
        name: 'stateId',
      },
      constraints: false,
    });

    db.cities.belongsTo(db.counties, {
      as: 'county',
      foreignKey: {
        name: 'countyId',
      },
      constraints: false,
    });

    db.cities.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.cities.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return cities;
};
