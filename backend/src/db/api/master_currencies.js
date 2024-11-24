const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Master_currenciesDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const master_currencies = await db.master_currencies.create(
      {
        id: data.id || undefined,

        name: data.name || null,
        ticker: data.ticker || null,
        icon: data.icon || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return master_currencies;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const master_currenciesData = data.map((item, index) => ({
      id: item.id || undefined,

      name: item.name || null,
      ticker: item.ticker || null,
      icon: item.icon || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const master_currencies = await db.master_currencies.bulkCreate(
      master_currenciesData,
      { transaction },
    );

    // For each item created, replace relation files

    return master_currencies;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const master_currencies = await db.master_currencies.findByPk(
      id,
      {},
      { transaction },
    );

    await master_currencies.update(
      {
        name: data.name || null,
        ticker: data.ticker || null,
        icon: data.icon || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return master_currencies;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const master_currencies = await db.master_currencies.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of master_currencies) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of master_currencies) {
        await record.destroy({ transaction });
      }
    });

    return master_currencies;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const master_currencies = await db.master_currencies.findByPk(id, options);

    await master_currencies.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await master_currencies.destroy({
      transaction,
    });

    return master_currencies;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const master_currencies = await db.master_currencies.findOne(
      { where },
      { transaction },
    );

    if (!master_currencies) {
      return master_currencies;
    }

    const output = master_currencies.get({ plain: true });

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
          [Op.and]: Utils.ilike('master_currencies', 'name', filter.name),
        };
      }

      if (filter.ticker) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('master_currencies', 'ticker', filter.ticker),
        };
      }

      if (filter.icon) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('master_currencies', 'icon', filter.icon),
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
          count: await db.master_currencies.count({
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
      : await db.master_currencies.findAndCountAll({
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
          Utils.ilike('master_currencies', 'name', query),
        ],
      };
    }

    const records = await db.master_currencies.findAll({
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
