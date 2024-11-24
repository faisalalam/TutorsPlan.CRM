const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class MembershipsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const memberships = await db.memberships.create(
      {
        id: data.id || undefined,

        name: data.name || null,
        price: data.price || null,
        features: data.features || null,
        number_of_courses: data.number_of_courses || null,
        number_of_tutoring_sessions: data.number_of_tutoring_sessions || null,
        support_level: data.support_level || null,
        tools_access: data.tools_access || null,
        extended_services: data.extended_services || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return memberships;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const membershipsData = data.map((item, index) => ({
      id: item.id || undefined,

      name: item.name || null,
      price: item.price || null,
      features: item.features || null,
      number_of_courses: item.number_of_courses || null,
      number_of_tutoring_sessions: item.number_of_tutoring_sessions || null,
      support_level: item.support_level || null,
      tools_access: item.tools_access || null,
      extended_services: item.extended_services || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const memberships = await db.memberships.bulkCreate(membershipsData, {
      transaction,
    });

    // For each item created, replace relation files

    return memberships;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const memberships = await db.memberships.findByPk(id, {}, { transaction });

    await memberships.update(
      {
        name: data.name || null,
        price: data.price || null,
        features: data.features || null,
        number_of_courses: data.number_of_courses || null,
        number_of_tutoring_sessions: data.number_of_tutoring_sessions || null,
        support_level: data.support_level || null,
        tools_access: data.tools_access || null,
        extended_services: data.extended_services || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return memberships;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const memberships = await db.memberships.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of memberships) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of memberships) {
        await record.destroy({ transaction });
      }
    });

    return memberships;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const memberships = await db.memberships.findByPk(id, options);

    await memberships.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await memberships.destroy({
      transaction,
    });

    return memberships;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const memberships = await db.memberships.findOne(
      { where },
      { transaction },
    );

    if (!memberships) {
      return memberships;
    }

    const output = memberships.get({ plain: true });

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
          [Op.and]: Utils.ilike('memberships', 'name', filter.name),
        };
      }

      if (filter.features) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('memberships', 'features', filter.features),
        };
      }

      if (filter.support_level) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'memberships',
            'support_level',
            filter.support_level,
          ),
        };
      }

      if (filter.tools_access) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'memberships',
            'tools_access',
            filter.tools_access,
          ),
        };
      }

      if (filter.extended_services) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'memberships',
            'extended_services',
            filter.extended_services,
          ),
        };
      }

      if (filter.priceRange) {
        const [start, end] = filter.priceRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            price: {
              ...where.price,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            price: {
              ...where.price,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.number_of_coursesRange) {
        const [start, end] = filter.number_of_coursesRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            number_of_courses: {
              ...where.number_of_courses,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            number_of_courses: {
              ...where.number_of_courses,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.number_of_tutoring_sessionsRange) {
        const [start, end] = filter.number_of_tutoring_sessionsRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            number_of_tutoring_sessions: {
              ...where.number_of_tutoring_sessions,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            number_of_tutoring_sessions: {
              ...where.number_of_tutoring_sessions,
              [Op.lte]: end,
            },
          };
        }
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
          count: await db.memberships.count({
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
      : await db.memberships.findAndCountAll({
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
          Utils.ilike('memberships', 'name', query),
        ],
      };
    }

    const records = await db.memberships.findAll({
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
