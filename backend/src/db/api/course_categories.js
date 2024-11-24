const db = require('../models');
const FileDBApi = require('./file');
const crypto = require('crypto');
const Utils = require('../utils');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Course_categoriesDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const course_categories = await db.course_categories.create(
      {
        id: data.id || undefined,

        name: data.name || null,
        description: data.description || null,
        icon_url: data.icon_url || null,
        published_on_public_site: data.published_on_public_site || false,

        display_sequence: data.display_sequence || null,
        bootcamp_course: data.bootcamp_course || null,
        regular_course: data.regular_course || null,
        total_course: data.total_course || null,
        student_number: data.student_number || null,
        tutor_number: data.tutor_number || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return course_categories;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const course_categoriesData = data.map((item, index) => ({
      id: item.id || undefined,

      name: item.name || null,
      description: item.description || null,
      icon_url: item.icon_url || null,
      published_on_public_site: item.published_on_public_site || false,

      display_sequence: item.display_sequence || null,
      bootcamp_course: item.bootcamp_course || null,
      regular_course: item.regular_course || null,
      total_course: item.total_course || null,
      student_number: item.student_number || null,
      tutor_number: item.tutor_number || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const course_categories = await db.course_categories.bulkCreate(
      course_categoriesData,
      { transaction },
    );

    // For each item created, replace relation files

    return course_categories;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const course_categories = await db.course_categories.findByPk(
      id,
      {},
      { transaction },
    );

    await course_categories.update(
      {
        name: data.name || null,
        description: data.description || null,
        icon_url: data.icon_url || null,
        published_on_public_site: data.published_on_public_site || false,

        display_sequence: data.display_sequence || null,
        bootcamp_course: data.bootcamp_course || null,
        regular_course: data.regular_course || null,
        total_course: data.total_course || null,
        student_number: data.student_number || null,
        tutor_number: data.tutor_number || null,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return course_categories;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const course_categories = await db.course_categories.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of course_categories) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of course_categories) {
        await record.destroy({ transaction });
      }
    });

    return course_categories;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const course_categories = await db.course_categories.findByPk(id, options);

    await course_categories.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await course_categories.destroy({
      transaction,
    });

    return course_categories;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const course_categories = await db.course_categories.findOne(
      { where },
      { transaction },
    );

    if (!course_categories) {
      return course_categories;
    }

    const output = course_categories.get({ plain: true });

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
          [Op.and]: Utils.ilike('course_categories', 'name', filter.name),
        };
      }

      if (filter.description) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'course_categories',
            'description',
            filter.description,
          ),
        };
      }

      if (filter.icon_url) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'course_categories',
            'icon_url',
            filter.icon_url,
          ),
        };
      }

      if (filter.display_sequenceRange) {
        const [start, end] = filter.display_sequenceRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            display_sequence: {
              ...where.display_sequence,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            display_sequence: {
              ...where.display_sequence,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.bootcamp_courseRange) {
        const [start, end] = filter.bootcamp_courseRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            bootcamp_course: {
              ...where.bootcamp_course,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            bootcamp_course: {
              ...where.bootcamp_course,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.regular_courseRange) {
        const [start, end] = filter.regular_courseRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            regular_course: {
              ...where.regular_course,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            regular_course: {
              ...where.regular_course,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.total_courseRange) {
        const [start, end] = filter.total_courseRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            total_course: {
              ...where.total_course,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            total_course: {
              ...where.total_course,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.student_numberRange) {
        const [start, end] = filter.student_numberRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            student_number: {
              ...where.student_number,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            student_number: {
              ...where.student_number,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.tutor_numberRange) {
        const [start, end] = filter.tutor_numberRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            tutor_number: {
              ...where.tutor_number,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            tutor_number: {
              ...where.tutor_number,
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

      if (filter.published_on_public_site) {
        where = {
          ...where,
          published_on_public_site: filter.published_on_public_site,
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
          count: await db.course_categories.count({
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
      : await db.course_categories.findAndCountAll({
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
          Utils.ilike('course_categories', 'name', query),
        ],
      };
    }

    const records = await db.course_categories.findAll({
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
