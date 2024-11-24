const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class StatesDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const states = await db.states.create(
      {
        id: data.id || undefined,

        name: data.name || null,
        ticker: data.ticker || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await states.setCountry(data.country || null, {
      transaction,
    });

    return states;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const statesData = data.map((item, index) => ({
      id: item.id || undefined,

      name: item.name || null,
      ticker: item.ticker || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const states = await db.states.bulkCreate(statesData, { transaction });

    // For each item created, replace relation files

    return states;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const states = await db.states.findByPk(id, {}, { transaction });

    await states.update(
      {
        name: data.name || null,
        ticker: data.ticker || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await states.setCountry(data.country || null, {
      transaction,
    });

    return states;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const states = await db.states.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of states) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of states) {
        await record.destroy({ transaction });
      }
    });

    return states;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const states = await db.states.findByPk(id, options);

    await states.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await states.destroy({
      transaction,
    });

    return states;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const states = await db.states.findOne({ where }, { transaction });

    if (!states) {
      return states;
    }

    const output = states.get({ plain: true });

    output.cities_state = await states.getCities_state({
      transaction,
    });

    output.counties_state = await states.getCounties_state({
      transaction,
    });

    output.zip_codes_state = await states.getZip_codes_state({
      transaction,
    });

    output.country = await states.getCountry({
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
          [Op.and]: Utils.ilike('states', 'name', filter.name),
        };
      }

      if (filter.ticker) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('states', 'ticker', filter.ticker),
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
          count: await db.states.count({
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
      : await db.states.findAndCountAll({
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
          Utils.ilike('states', 'name', query),
        ],
      };
    }

    const records = await db.states.findAll({
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
