const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Scholarship_application_statusesDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const scholarship_application_statuses =
      await db.scholarship_application_statuses.create(
        {
          id: data.id || undefined,

          name: data.name || null,
          description: data.description || null,
          importHash: data.importHash || null,
          createdById: currentUser.id,
          updatedById: currentUser.id,
        },
        { transaction },
      );

    return scholarship_application_statuses;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const scholarship_application_statusesData = data.map((item, index) => ({
      id: item.id || undefined,

      name: item.name || null,
      description: item.description || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const scholarship_application_statuses =
      await db.scholarship_application_statuses.bulkCreate(
        scholarship_application_statusesData,
        { transaction },
      );

    // For each item created, replace relation files

    return scholarship_application_statuses;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const scholarship_application_statuses =
      await db.scholarship_application_statuses.findByPk(
        id,
        {},
        { transaction },
      );

    await scholarship_application_statuses.update(
      {
        name: data.name || null,
        description: data.description || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return scholarship_application_statuses;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const scholarship_application_statuses =
      await db.scholarship_application_statuses.findAll({
        where: {
          id: {
            [Op.in]: ids,
          },
        },
        transaction,
      });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of scholarship_application_statuses) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of scholarship_application_statuses) {
        await record.destroy({ transaction });
      }
    });

    return scholarship_application_statuses;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const scholarship_application_statuses =
      await db.scholarship_application_statuses.findByPk(id, options);

    await scholarship_application_statuses.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await scholarship_application_statuses.destroy({
      transaction,
    });

    return scholarship_application_statuses;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const scholarship_application_statuses =
      await db.scholarship_application_statuses.findOne(
        { where },
        { transaction },
      );

    if (!scholarship_application_statuses) {
      return scholarship_application_statuses;
    }

    const output = scholarship_application_statuses.get({ plain: true });

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
          [Op.and]: Utils.ilike(
            'scholarship_application_statuses',
            'name',
            filter.name,
          ),
        };
      }

      if (filter.description) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'scholarship_application_statuses',
            'description',
            filter.description,
          ),
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
          count: await db.scholarship_application_statuses.count({
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
      : await db.scholarship_application_statuses.findAndCountAll({
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
          Utils.ilike('scholarship_application_statuses', 'name', query),
        ],
      };
    }

    const records = await db.scholarship_application_statuses.findAll({
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
