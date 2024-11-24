const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Master_tagsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const master_tags = await db.master_tags.create(
      {
        id: data.id || undefined,

        name: data.name || null,
        description: data.description || null,
        synonyms: data.synonyms || null,
        sequence: data.sequence || null,
        picture_url: data.picture_url || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await master_tags.setMaster_tag_category(data.master_tag_category || null, {
      transaction,
    });

    return master_tags;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const master_tagsData = data.map((item, index) => ({
      id: item.id || undefined,

      name: item.name || null,
      description: item.description || null,
      synonyms: item.synonyms || null,
      sequence: item.sequence || null,
      picture_url: item.picture_url || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const master_tags = await db.master_tags.bulkCreate(master_tagsData, {
      transaction,
    });

    // For each item created, replace relation files

    return master_tags;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const master_tags = await db.master_tags.findByPk(id, {}, { transaction });

    await master_tags.update(
      {
        name: data.name || null,
        description: data.description || null,
        synonyms: data.synonyms || null,
        sequence: data.sequence || null,
        picture_url: data.picture_url || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await master_tags.setMaster_tag_category(data.master_tag_category || null, {
      transaction,
    });

    return master_tags;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const master_tags = await db.master_tags.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of master_tags) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of master_tags) {
        await record.destroy({ transaction });
      }
    });

    return master_tags;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const master_tags = await db.master_tags.findByPk(id, options);

    await master_tags.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await master_tags.destroy({
      transaction,
    });

    return master_tags;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const master_tags = await db.master_tags.findOne(
      { where },
      { transaction },
    );

    if (!master_tags) {
      return master_tags;
    }

    const output = master_tags.get({ plain: true });

    output.master_tag_category = await master_tags.getMaster_tag_category({
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
        model: db.master_tag_categories,
        as: 'master_tag_category',
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
          [Op.and]: Utils.ilike('master_tags', 'name', filter.name),
        };
      }

      if (filter.description) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'master_tags',
            'description',
            filter.description,
          ),
        };
      }

      if (filter.synonyms) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('master_tags', 'synonyms', filter.synonyms),
        };
      }

      if (filter.picture_url) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'master_tags',
            'picture_url',
            filter.picture_url,
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

      if (filter.master_tag_category) {
        const listItems = filter.master_tag_category.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          master_tag_categoryId: { [Op.or]: listItems },
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
          count: await db.master_tags.count({
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
      : await db.master_tags.findAndCountAll({
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
          Utils.ilike('master_tags', 'name', query),
        ],
      };
    }

    const records = await db.master_tags.findAll({
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
