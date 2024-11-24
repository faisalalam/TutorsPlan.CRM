const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const zip_codes = sequelize.define(
    'zip_codes',
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

  zip_codes.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.zip_codes.belongsTo(db.countries, {
      as: 'country',
      foreignKey: {
        name: 'countryId',
      },
      constraints: false,
    });

    db.zip_codes.belongsTo(db.states, {
      as: 'state',
      foreignKey: {
        name: 'stateId',
      },
      constraints: false,
    });

    db.zip_codes.belongsTo(db.counties, {
      as: 'county',
      foreignKey: {
        name: 'countyId',
      },
      constraints: false,
    });

    db.zip_codes.belongsTo(db.cities, {
      as: 'city',
      foreignKey: {
        name: 'cityId',
      },
      constraints: false,
    });

    db.zip_codes.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.zip_codes.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return zip_codes;
};
