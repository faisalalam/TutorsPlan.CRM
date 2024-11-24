const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class CountriesDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const countries = await db.countries.create(
      {
        id: data.id || undefined,

        name: data.name || null,
        ticker: data.ticker || null,
        flag_icon: data.flag_icon || null,
        phone_code: data.phone_code || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return countries;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const countriesData = data.map((item, index) => ({
      id: item.id || undefined,

      name: item.name || null,
      ticker: item.ticker || null,
      flag_icon: item.flag_icon || null,
      phone_code: item.phone_code || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const countries = await db.countries.bulkCreate(countriesData, {
      transaction,
    });

    // For each item created, replace relation files

    return countries;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const countries = await db.countries.findByPk(id, {}, { transaction });

    await countries.update(
      {
        name: data.name || null,
        ticker: data.ticker || null,
        flag_icon: data.flag_icon || null,
        phone_code: data.phone_code || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return countries;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const countries = await db.countries.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of countries) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of countries) {
        await record.destroy({ transaction });
      }
    });

    return countries;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const countries = await db.countries.findByPk(id, options);

    await countries.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await countries.destroy({
      transaction,
    });

    return countries;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const countries = await db.countries.findOne({ where }, { transaction });

    if (!countries) {
      return countries;
    }

    const output = countries.get({ plain: true });

    output.cities_country = await countries.getCities_country({
      transaction,
    });

    output.counties_country = await countries.getCounties_country({
      transaction,
    });

    output.states_country = await countries.getStates_country({
      transaction,
    });

    output.zip_codes_country = await countries.getZip_codes_country({
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
    let include = [];

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
          [Op.and]: Utils.ilike('countries', 'name', filter.name),
        };
      }

      if (filter.ticker) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('countries', 'ticker', filter.ticker),
        };
      }

      if (filter.flag_icon) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('countries', 'flag_icon', filter.flag_icon),
        };
      }

      if (filter.phone_code) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('countries', 'phone_code', filter.phone_code),
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
          count: await db.countries.count({
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
      : await db.countries.findAndCountAll({
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
          Utils.ilike('countries', 'name', query),
        ],
      };
    }

    const records = await db.countries.findAll({
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
