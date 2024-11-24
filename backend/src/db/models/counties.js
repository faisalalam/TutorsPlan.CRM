const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const counties = sequelize.define(
    'counties',
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

  counties.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.counties.hasMany(db.cities, {
      as: 'cities_county',
      foreignKey: {
        name: 'countyId',
      },
      constraints: false,
    });

    db.counties.hasMany(db.zip_codes, {
      as: 'zip_codes_county',
      foreignKey: {
        name: 'countyId',
      },
      constraints: false,
    });

    //end loop

    db.counties.belongsTo(db.countries, {
      as: 'country',
      foreignKey: {
        name: 'countryId',
      },
      constraints: false,
    });

    db.counties.belongsTo(db.states, {
      as: 'state',
      foreignKey: {
        name: 'stateId',
      },
      constraints: false,
    });

    db.counties.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.counties.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return counties;
};
