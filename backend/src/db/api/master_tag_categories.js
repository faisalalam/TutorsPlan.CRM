const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Master_tag_categoriesDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const master_tag_categories = await db.master_tag_categories.create(
      {
        id: data.id || undefined,

        name: data.name || null,
        description: data.description || null,
        picture_url: data.picture_url || null,
        recommendation_tag: data.recommendation_tag || null,
        sequence: data.sequence || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return master_tag_categories;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const master_tag_categoriesData = data.map((item, index) => ({
      id: item.id || undefined,

      name: item.name || null,
      description: item.description || null,
      picture_url: item.picture_url || null,
      recommendation_tag: item.recommendation_tag || null,
      sequence: item.sequence || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const master_tag_categories = await db.master_tag_categories.bulkCreate(
      master_tag_categoriesData,
      { transaction },
    );

    // For each item created, replace relation files

    return master_tag_categories;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const master_tag_categories = await db.master_tag_categories.findByPk(
      id,
      {},
      { transaction },
    );

    await master_tag_categories.update(
      {
        name: data.name || null,
        description: data.description || null,
        picture_url: data.picture_url || null,
        recommendation_tag: data.recommendation_tag || null,
        sequence: data.sequence || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return master_tag_categories;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const master_tag_categories = await db.master_tag_categories.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of master_tag_categories) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of master_tag_categories) {
        await record.destroy({ transaction });
      }
    });

    return master_tag_categories;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const master_tag_categories = await db.master_tag_categories.findByPk(
      id,
      options,
    );

    await master_tag_categories.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await master_tag_categories.destroy({
      transaction,
    });

    return master_tag_categories;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const master_tag_categories = await db.master_tag_categories.findOne(
      { where },
      { transaction },
    );

    if (!master_tag_categories) {
      return master_tag_categories;
    }

    const output = master_tag_categories.get({ plain: true });

    output.master_tags_master_tag_category =
      await master_tag_categories.getMaster_tags_master_tag_category({
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
          [Op.and]: Utils.ilike('master_tag_categories', 'name', filter.name),
        };
      }

      if (filter.description) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'master_tag_categories',
            'description',
            filter.description,
          ),
        };
      }

      if (filter.picture_url) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'master_tag_categories',
            'picture_url',
            filter.picture_url,
          ),
        };
      }

      if (filter.recommendation_tag) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'master_tag_categories',
            'recommendation_tag',
            filter.recommendation_tag,
          ),
        };
      }

      if (filter.sequenceRange) {
        const [start, end] = filter.sequenceRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            sequence: {
              ...where.sequence,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            sequence: {
              ...where.sequence,
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
          count: await db.master_tag_categories.count({
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
      : await db.master_tag_categories.findAndCountAll({
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
          Utils.ilike('master_tag_categories', 'name', query),
        ],
      };
    }

    const records = await db.master_tag_categories.findAll({
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
