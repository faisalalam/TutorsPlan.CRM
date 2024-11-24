const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Exam_question_answer_typesDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const exam_question_answer_types =
      await db.exam_question_answer_types.create(
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

    return exam_question_answer_types;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const exam_question_answer_typesData = data.map((item, index) => ({
      id: item.id || undefined,

      name: item.name || null,
      description: item.description || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const exam_question_answer_types =
      await db.exam_question_answer_types.bulkCreate(
        exam_question_answer_typesData,
        { transaction },
      );

    // For each item created, replace relation files

    return exam_question_answer_types;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const exam_question_answer_types =
      await db.exam_question_answer_types.findByPk(id, {}, { transaction });

    await exam_question_answer_types.update(
      {
        name: data.name || null,
        description: data.description || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return exam_question_answer_types;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const exam_question_answer_types =
      await db.exam_question_answer_types.findAll({
        where: {
          id: {
            [Op.in]: ids,
          },
        },
        transaction,
      });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of exam_question_answer_types) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of exam_question_answer_types) {
        await record.destroy({ transaction });
      }
    });

    return exam_question_answer_types;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const exam_question_answer_types =
      await db.exam_question_answer_types.findByPk(id, options);

    await exam_question_answer_types.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await exam_question_answer_types.destroy({
      transaction,
    });

    return exam_question_answer_types;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const exam_question_answer_types =
      await db.exam_question_answer_types.findOne({ where }, { transaction });

    if (!exam_question_answer_types) {
      return exam_question_answer_types;
    }

    const output = exam_question_answer_types.get({ plain: true });

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
            'exam_question_answer_types',
            'name',
            filter.name,
          ),
        };
      }

      if (filter.description) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'exam_question_answer_types',
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
          count: await db.exam_question_answer_types.count({
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
      : await db.exam_question_answer_types.findAndCountAll({
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
          Utils.ilike('exam_question_answer_types', 'name', query),
        ],
      };
    }

    const records = await db.exam_question_answer_types.findAll({
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
