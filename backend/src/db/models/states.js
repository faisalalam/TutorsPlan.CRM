const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');
const moment = require('moment');

module.exports = function (sequelize, DataTypes) {
  const states = sequelize.define(
    'states',
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

  states.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.states.hasMany(db.cities, {
      as: 'cities_state',
      foreignKey: {
        name: 'stateId',
      },
      constraints: false,
    });

    db.states.hasMany(db.counties, {
      as: 'counties_state',
      foreignKey: {
        name: 'stateId',
      },
      constraints: false,
    });

    db.states.hasMany(db.zip_codes, {
      as: 'zip_codes_state',
      foreignKey: {
        name: 'stateId',
      },
      constraints: false,
    });

    //end loop

    db.states.belongsTo(db.countries, {
      as: 'country',
      foreignKey: {
        name: 'countryId',
      },
      constraints: false,
    });

    db.states.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.states.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return states;
};
