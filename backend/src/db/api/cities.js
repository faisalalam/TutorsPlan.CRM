const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class CitiesDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const cities = await db.cities.create(
      {
        id: data.id || undefined,

        name: data.name || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await cities.setCountry(data.country || null, {
      transaction,
    });

    await cities.setState(data.state || null, {
      transaction,
    });

    await cities.setCounty(data.county || null, {
      transaction,
    });

    return cities;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const citiesData = data.map((item, index) => ({
      id: item.id || undefined,

      name: item.name || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const cities = await db.cities.bulkCreate(citiesData, { transaction });

    // For each item created, replace relation files

    return cities;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const cities = await db.cities.findByPk(id, {}, { transaction });

    await cities.update(
      {
        name: data.name || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await cities.setCountry(data.country || null, {
      transaction,
    });

    await cities.setState(data.state || null, {
      transaction,
    });

    await cities.setCounty(data.county || null, {
      transaction,
    });

    return cities;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const cities = await db.cities.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of cities) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of cities) {
        await record.destroy({ transaction });
      }
    });

    return cities;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const cities = await db.cities.findByPk(id, options);

    await cities.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await cities.destroy({
      transaction,
    });

    return cities;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const cities = await db.cities.findOne({ where }, { transaction });

    if (!cities) {
      return cities;
    }

    const output = cities.get({ plain: true });

    output.zip_codes_city = await cities.getZip_codes_city({
      transaction,
    });

    output.country = await cities.getCountry({
      transaction,
    });

    output.state = await cities.getState({
      transaction,
    });

    output.county = await cities.getCounty({
      transaction,
    });

    return output;
  }

  static async findAll(filter, options) {
    const limit = filter.limit || 0;
    let offset = 0;
    const currentPage = +filter.page;

    offset = currentPage * limit;

    const orderBy = null;

    const transaction = (options && options.transaction) || undefined;
    let where = {};
    let include = [
      {
        model: db.countries,
        as: 'country',
      },

      {
        model: db.states,
        as: 'state',
      },

      {
        model: db.counties,
        as: 'county',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('cities', 'name', filter.name),
        };
      }

      if (
        filter.active === true ||
        filter.active === 'true' ||
        filter.active === false ||
        filter.active === 'false'
      ) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.country) {
        const listItems = filter.country.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          countryId: { [Op.or]: listItems },
        };
      }

      if (filter.state) {
        const listItems = filter.state.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          stateId: { [Op.or]: listItems },
        };
      }

      if (filter.county) {
        const listItems = filter.county.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          countyId: { [Op.or]: listItems },
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }
    }

    let { rows, count } = options?.countOnly
      ? {
          rows: [],
          count: await db.cities.count({
            where,
            include,
            distinct: true,
            limit: limit ? Number(limit) : undefined,
            offset: offset ? Number(offset) : undefined,
            order:
              filter.field && filter.sort
                ? [[filter.field, filter.sort]]
                : [['createdAt', 'desc']],
            transaction,
          }),
        }
      : await db.cities.findAndCountAll({
          where,
          include,
          distinct: true,
          limit: limit ? Number(limit) : undefined,
          offset: offset ? Number(offset) : undefined,
          order:
            filter.field && filter.sort
              ? [[filter.field, filter.sort]]
              : [['createdAt', 'desc']],
          transaction,
        });

    //    rows = await this._fillWithRelationsAndFilesForRows(
    //      rows,
    //      options,
    //    );

    return { rows, count };
  }

  static async findAllAutocomplete(query, limit) {
    let where = {};

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('cities', 'name', query),
        ],
      };
    }

    const records = await db.cities.findAll({
      attributes: ['id', 'name'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['name', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.name,
    }));
  }
};
