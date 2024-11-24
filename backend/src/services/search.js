const db = require('../db/models');
const ValidationError = require('./notifications/errors/validation');

const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

/**
 * @param {string} permission
 * @param {object} currentUser
 */
async function checkPermissions(permission, currentUser) {
  if (!currentUser) {
    throw new ValidationError('auth.unauthorized');
  }

  const userPermission = currentUser.custom_permissions.find(
    (cp) => cp.name === permission,
  );

  if (userPermission) {
    return true;
  }

  try {
    if (!currentUser.app_role) {
      throw new ValidationError('auth.forbidden');
    }

    const permissions = await currentUser.app_role.getPermissions();

    return !!permissions.find((p) => p.name === permission);
  } catch (e) {
    throw e;
  }
}

module.exports = class SearchService {
  static async search(searchQuery, currentUser) {
    try {
      if (!searchQuery) {
        throw new ValidationError('iam.errors.searchQueryRequired');
      }
      const tableColumns = {
        users: ['firstName', 'lastName', 'phoneNumber', 'email'],

        cities: ['name'],

        company_types: ['name'],

        connect_channels: ['name'],

        connect_message_libraries: ['title', 'tag', 'message_body', 'subject'],

        contact_types: ['name'],

        counties: ['name'],

        countries: ['name', 'ticker', 'flag_icon', 'phone_code'],

        course_categories: ['name', 'description', 'icon_url'],

        course_lesson_types: ['name'],

        course_level_types: ['name'],

        course_statuses: ['name'],

        course_types: ['name'],

        exam_difficulty_level_types: ['name', 'description'],

        exam_grade_type: ['name', 'description'],

        exam_question_answer_types: ['name', 'description'],

        institute_types: ['name'],

        master_ai_prompt_libraries: ['title', 'tags', 'prompt'],

        master_currencies: ['name', 'ticker', 'icon'],

        master_languages: ['name'],

        master_rating_scores: ['name', 'icon'],

        master_tag_categories: [
          'name',

          'description',

          'picture_url',

          'recommendation_tag',
        ],

        master_tags: ['name', 'description', 'synonyms', 'picture_url'],

        memberships: [
          'name',

          'features',

          'support_level',

          'tools_access',

          'extended_services',
        ],

        order_channels: ['name', 'description'],

        order_payment_types: ['name'],

        order_status_types: ['name'],

        scholarship_application_statuses: ['name', 'description'],

        states: ['name', 'ticker'],

        zip_codes: ['name'],

        zone_types: ['name'],
      };
      const columnsInt = {
        course_categories: [
          'display_sequence',

          'bootcamp_course',

          'regular_course',

          'total_course',

          'student_number',

          'tutor_number',
        ],

        course_level_types: ['display_sequence'],

        master_rating_scores: ['score'],

        master_tag_categories: ['sequence'],

        master_tags: ['sequence'],

        memberships: [
          'price',

          'number_of_courses',

          'number_of_tutoring_sessions',
        ],
      };

      let allFoundRecords = [];

      for (const tableName in tableColumns) {
        if (tableColumns.hasOwnProperty(tableName)) {
          const attributesToSearch = tableColumns[tableName];
          const attributesIntToSearch = columnsInt[tableName] || [];
          const whereCondition = {
            [Op.or]: [
              ...attributesToSearch.map((attribute) => ({
                [attribute]: {
                  [Op.iLike]: `%${searchQuery}%`,
                },
              })),
              ...attributesIntToSearch.map((attribute) =>
                Sequelize.where(
                  Sequelize.cast(
                    Sequelize.col(`${tableName}.${attribute}`),
                    'varchar',
                  ),
                  { [Op.iLike]: `%${searchQuery}%` },
                ),
              ),
            ],
          };

          const hasPermission = await checkPermissions(
            `READ_${tableName.toUpperCase()}`,
            currentUser,
          );
          if (!hasPermission) {
            continue;
          }

          const foundRecords = await db[tableName].findAll({
            where: whereCondition,
            attributes: [
              ...tableColumns[tableName],
              'id',
              ...attributesIntToSearch,
            ],
          });

          const modifiedRecords = foundRecords.map((record) => {
            const matchAttribute = [];

            for (const attribute of attributesToSearch) {
              if (
                record[attribute]
                  ?.toLowerCase()
                  ?.includes(searchQuery.toLowerCase())
              ) {
                matchAttribute.push(attribute);
              }
            }

            for (const attribute of attributesIntToSearch) {
              const castedValue = String(record[attribute]);
              if (
                castedValue &&
                castedValue.toLowerCase().includes(searchQuery.toLowerCase())
              ) {
                matchAttribute.push(attribute);
              }
            }

            return {
              ...record.get(),
              matchAttribute,
              tableName,
            };
          });

          allFoundRecords = allFoundRecords.concat(modifiedRecords);
        }
      }

      return allFoundRecords;
    } catch (error) {
      throw error;
    }
  }
};
