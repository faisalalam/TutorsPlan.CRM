const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Master_ai_prompt_librariesDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const master_ai_prompt_libraries =
      await db.master_ai_prompt_libraries.create(
        {
          id: data.id || undefined,

          title: data.title || null,
          tags: data.tags || null,
          prompt: data.prompt || null,
          save_as_library: data.save_as_library || false,

          importHash: data.importHash || null,
          createdById: currentUser.id,
          updatedById: currentUser.id,
        },
        { transaction },
      );

    return master_ai_prompt_libraries;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const master_ai_prompt_librariesData = data.map((item, index) => ({
      id: item.id || undefined,

      title: item.title || null,
      tags: item.tags || null,
      prompt: item.prompt || null,
      save_as_library: item.save_as_library || false,

      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const master_ai_prompt_libraries =
      await db.master_ai_prompt_libraries.bulkCreate(
        master_ai_prompt_librariesData,
        { transaction },
      );

    // For each item created, replace relation files

    return master_ai_prompt_libraries;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const master_ai_prompt_libraries =
      await db.master_ai_prompt_libraries.findByPk(id, {}, { transaction });

    await master_ai_prompt_libraries.update(
      {
        title: data.title || null,
        tags: data.tags || null,
        prompt: data.prompt || null,
        save_as_library: data.save_as_library || false,

        updatedById: currentUser.id,
      },
      { transaction },
    );

    return master_ai_prompt_libraries;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const master_ai_prompt_libraries =
      await db.master_ai_prompt_libraries.findAll({
        where: {
          id: {
            [Op.in]: ids,
          },
        },
        transaction,
      });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of master_ai_prompt_libraries) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of master_ai_prompt_libraries) {
        await record.destroy({ transaction });
      }
    });

    return master_ai_prompt_libraries;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const master_ai_prompt_libraries =
      await db.master_ai_prompt_libraries.findByPk(id, options);

    await master_ai_prompt_libraries.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await master_ai_prompt_libraries.destroy({
      transaction,
    });

    return master_ai_prompt_libraries;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const master_ai_prompt_libraries =
      await db.master_ai_prompt_libraries.findOne({ where }, { transaction });

    if (!master_ai_prompt_libraries) {
      return master_ai_prompt_libraries;
    }

    const output = master_ai_prompt_libraries.get({ plain: true });

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
            'master_ai_prompt_libraries',
            'title',
            filter.title,
          ),
        };
      }

      if (filter.tags) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'master_ai_prompt_libraries',
            'tags',
            filter.tags,
          ),
        };
      }

      if (filter.prompt) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'master_ai_prompt_libraries',
            'prompt',
            filter.prompt,
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

      if (filter.save_as_library) {
        where = {
          ...where,
          save_as_library: filter.save_as_library,
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
          count: await db.master_ai_prompt_libraries.count({
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
      : await db.master_ai_prompt_libraries.findAndCountAll({
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
          Utils.ilike('master_ai_prompt_libraries', 'title', query),
        ],
      };
    }

    const records = await db.master_ai_prompt_libraries.findAll({
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
