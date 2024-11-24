const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Connect_message_librariesDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const connect_message_libraries = await db.connect_message_libraries.create(
      {
        id: data.id || undefined,

        title: data.title || null,
        tag: data.tag || null,
        message_body: data.message_body || null,
        subject: data.subject || null,
        published: data.published || false,

        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return connect_message_libraries;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const connect_message_librariesData = data.map((item, index) => ({
      id: item.id || undefined,

      title: item.title || null,
      tag: item.tag || null,
      message_body: item.message_body || null,
      subject: item.subject || null,
      published: item.published || false,

      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const connect_message_libraries =
      await db.connect_message_libraries.bulkCreate(
        connect_message_librariesData,
        { transaction },
      );

    // For each item created, replace relation files

    return connect_message_libraries;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const connect_message_libraries =
      await db.connect_message_libraries.findByPk(id, {}, { transaction });

    await connect_message_libraries.update(
      {
        title: data.title || null,
        tag: data.tag || null,
        message_body: data.message_body || null,
        subject: data.subject || null,
        published: data.published || false,

        updatedById: currentUser.id,
      },
      { transaction },
    );

    return connect_message_libraries;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const connect_message_libraries =
      await db.connect_message_libraries.findAll({
        where: {
          id: {
            [Op.in]: ids,
          },
        },
        transaction,
      });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of connect_message_libraries) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of connect_message_libraries) {
        await record.destroy({ transaction });
      }
    });

    return connect_message_libraries;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const connect_message_libraries =
      await db.connect_message_libraries.findByPk(id, options);

    await connect_message_libraries.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await connect_message_libraries.destroy({
      transaction,
    });

    return connect_message_libraries;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const connect_message_libraries =
      await db.connect_message_libraries.findOne({ where }, { transaction });

    if (!connect_message_libraries) {
      return connect_message_libraries;
    }

    const output = connect_message_libraries.get({ plain: true });

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

      if (filter.title) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'connect_message_libraries',
            'title',
            filter.title,
          ),
        };
      }

      if (filter.tag) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('connect_message_libraries', 'tag', filter.tag),
        };
      }

      if (filter.message_body) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'connect_message_libraries',
            'message_body',
            filter.message_body,
          ),
        };
      }

      if (filter.subject) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'connect_message_libraries',
            'subject',
            filter.subject,
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

      if (filter.published) {
        where = {
          ...where,
          published: filter.published,
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
          count: await db.connect_message_libraries.count({
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
      : await db.connect_message_libraries.findAndCountAll({
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
          Utils.ilike('connect_message_libraries', 'title', query),
        ],
      };
    }

    const records = await db.connect_message_libraries.findAll({
      attributes: ['id', 'title'],
      where,
      limit: limit ? Number(limit) : undefined,
      orderBy: [['title', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.title,
    }));
  }
};
