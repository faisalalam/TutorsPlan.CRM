const { v4: uuid } = require('uuid');

module.exports = {
  /**
   * @param{import("sequelize").QueryInterface} queryInterface
   * @return {Promise<void>}
   */
  async up(queryInterface) {
    const createdAt = new Date();
    const updatedAt = new Date();

    /** @type {Map<string, string>} */
    const idMap = new Map();

    /**
     * @param {string} key
     * @return {string}
     */
    function getId(key) {
      if (idMap.has(key)) {
        return idMap.get(key);
      }
      const id = uuid();
      idMap.set(key, id);
      return id;
    }

    await queryInterface.bulkInsert('roles', [
      {
        id: getId('Administrator'),
        name: 'Administrator',
        createdAt,
        updatedAt,
      },

      {
        id: getId('SystemManager'),
        name: 'System Manager',
        createdAt,
        updatedAt,
      },

      {
        id: getId('OperationsLead'),
        name: 'Operations Lead',
        createdAt,
        updatedAt,
      },

      {
        id: getId('CourseCoordinator'),
        name: 'Course Coordinator',
        createdAt,
        updatedAt,
      },

      {
        id: getId('SalesExecutive'),
        name: 'Sales Executive',
        createdAt,
        updatedAt,
      },

      {
        id: getId('RegionalManager'),
        name: 'Regional Manager',
        createdAt,
        updatedAt,
      },
    ]);

    /**
     * @param {string} name
     */
    function createPermissions(name) {
      return [
        {
          id: getId(`CREATE_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `CREATE_${name.toUpperCase()}`,
        },
        {
          id: getId(`READ_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `READ_${name.toUpperCase()}`,
        },
        {
          id: getId(`UPDATE_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `UPDATE_${name.toUpperCase()}`,
        },
        {
          id: getId(`DELETE_${name.toUpperCase()}`),
          createdAt,
          updatedAt,
          name: `DELETE_${name.toUpperCase()}`,
        },
      ];
    }

    const entities = [
      'users',
      'cities',
      'company_types',
      'connect_channels',
      'connect_message_libraries',
      'contact_types',
      'counties',
      'countries',
      'course_categories',
      'course_lesson_types',
      'course_level_types',
      'course_statuses',
      'course_types',
      'exam_difficulty_level_types',
      'exam_grade_type',
      'exam_question_answer_types',
      'institute_types',
      'master_ai_prompt_libraries',
      'master_currencies',
      'master_languages',
      'master_rating_scores',
      'master_tag_categories',
      'master_tags',
      'memberships',
      'order_channels',
      'order_payment_types',
      'order_status_types',
      'scholarship_application_statuses',
      'states',
      'zip_codes',
      'zone_types',
      'roles',
      'permissions',
      ,
    ];
    await queryInterface.bulkInsert(
      'permissions',
      entities.flatMap(createPermissions),
    );
    await queryInterface.bulkInsert('permissions', [
      {
        id: getId(`READ_API_DOCS`),
        createdAt,
        updatedAt,
        name: `READ_API_DOCS`,
      },
    ]);
    await queryInterface.bulkInsert('permissions', [
      {
        id: getId(`CREATE_SEARCH`),
        createdAt,
        updatedAt,
        name: `CREATE_SEARCH`,
      },
    ]);

    await queryInterface.sequelize
      .query(`create table "rolesPermissionsPermissions"
(
"createdAt"           timestamp with time zone not null,
"updatedAt"           timestamp with time zone not null,
"roles_permissionsId" uuid                     not null,
"permissionId"        uuid                     not null,
primary key ("roles_permissionsId", "permissionId")
);`);

    await queryInterface.bulkInsert('rolesPermissionsPermissions', [
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('CREATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('UPDATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('DELETE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('CREATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('UPDATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('CREATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('CREATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('RegionalManager'),
        permissionId: getId('CREATE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('RegionalManager'),
        permissionId: getId('READ_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('CREATE_CITIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('READ_CITIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('UPDATE_CITIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('DELETE_CITIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('CREATE_CITIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('READ_CITIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('UPDATE_CITIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('CREATE_CITIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('READ_CITIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('CREATE_CITIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('READ_CITIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('RegionalManager'),
        permissionId: getId('CREATE_CITIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('RegionalManager'),
        permissionId: getId('READ_CITIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('CREATE_COMPANY_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('READ_COMPANY_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('UPDATE_COMPANY_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('DELETE_COMPANY_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('CREATE_COMPANY_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('READ_COMPANY_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('UPDATE_COMPANY_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('CREATE_COMPANY_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('READ_COMPANY_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('CREATE_COMPANY_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('READ_COMPANY_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('RegionalManager'),
        permissionId: getId('CREATE_COMPANY_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('RegionalManager'),
        permissionId: getId('READ_COMPANY_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('CREATE_CONNECT_CHANNELS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('READ_CONNECT_CHANNELS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('UPDATE_CONNECT_CHANNELS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('DELETE_CONNECT_CHANNELS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('CREATE_CONNECT_CHANNELS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('READ_CONNECT_CHANNELS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('UPDATE_CONNECT_CHANNELS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('CREATE_CONNECT_CHANNELS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('READ_CONNECT_CHANNELS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('CREATE_CONNECT_CHANNELS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('READ_CONNECT_CHANNELS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('RegionalManager'),
        permissionId: getId('CREATE_CONNECT_CHANNELS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('RegionalManager'),
        permissionId: getId('READ_CONNECT_CHANNELS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('CREATE_CONNECT_MESSAGE_LIBRARIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('READ_CONNECT_MESSAGE_LIBRARIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('UPDATE_CONNECT_MESSAGE_LIBRARIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('DELETE_CONNECT_MESSAGE_LIBRARIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('CREATE_CONNECT_MESSAGE_LIBRARIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('READ_CONNECT_MESSAGE_LIBRARIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('UPDATE_CONNECT_MESSAGE_LIBRARIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('CREATE_CONNECT_MESSAGE_LIBRARIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('READ_CONNECT_MESSAGE_LIBRARIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('CREATE_CONNECT_MESSAGE_LIBRARIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('READ_CONNECT_MESSAGE_LIBRARIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('RegionalManager'),
        permissionId: getId('CREATE_CONNECT_MESSAGE_LIBRARIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('RegionalManager'),
        permissionId: getId('READ_CONNECT_MESSAGE_LIBRARIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('CREATE_CONTACT_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('READ_CONTACT_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('UPDATE_CONTACT_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('DELETE_CONTACT_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('CREATE_CONTACT_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('READ_CONTACT_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('UPDATE_CONTACT_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('CREATE_CONTACT_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('READ_CONTACT_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('CREATE_CONTACT_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('READ_CONTACT_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('RegionalManager'),
        permissionId: getId('CREATE_CONTACT_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('RegionalManager'),
        permissionId: getId('READ_CONTACT_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('CREATE_COUNTIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('READ_COUNTIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('UPDATE_COUNTIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('DELETE_COUNTIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('CREATE_COUNTIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('READ_COUNTIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('UPDATE_COUNTIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('CREATE_COUNTIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('READ_COUNTIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('CREATE_COUNTIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('READ_COUNTIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('RegionalManager'),
        permissionId: getId('CREATE_COUNTIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('RegionalManager'),
        permissionId: getId('READ_COUNTIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('CREATE_COUNTRIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('READ_COUNTRIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('UPDATE_COUNTRIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('DELETE_COUNTRIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('CREATE_COUNTRIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('READ_COUNTRIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('UPDATE_COUNTRIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('CREATE_COUNTRIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('READ_COUNTRIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('CREATE_COUNTRIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('READ_COUNTRIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('RegionalManager'),
        permissionId: getId('CREATE_COUNTRIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('RegionalManager'),
        permissionId: getId('READ_COUNTRIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('CREATE_COURSE_CATEGORIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('READ_COURSE_CATEGORIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('UPDATE_COURSE_CATEGORIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('DELETE_COURSE_CATEGORIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('CREATE_COURSE_CATEGORIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('READ_COURSE_CATEGORIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('UPDATE_COURSE_CATEGORIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('CREATE_COURSE_CATEGORIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('READ_COURSE_CATEGORIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('UPDATE_COURSE_CATEGORIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('CREATE_COURSE_CATEGORIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('READ_COURSE_CATEGORIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('RegionalManager'),
        permissionId: getId('CREATE_COURSE_CATEGORIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('RegionalManager'),
        permissionId: getId('READ_COURSE_CATEGORIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('CREATE_COURSE_LESSON_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('READ_COURSE_LESSON_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('UPDATE_COURSE_LESSON_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('DELETE_COURSE_LESSON_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('CREATE_COURSE_LESSON_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('READ_COURSE_LESSON_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('UPDATE_COURSE_LESSON_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('CREATE_COURSE_LESSON_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('READ_COURSE_LESSON_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('UPDATE_COURSE_LESSON_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('CREATE_COURSE_LESSON_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('READ_COURSE_LESSON_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('RegionalManager'),
        permissionId: getId('CREATE_COURSE_LESSON_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('RegionalManager'),
        permissionId: getId('READ_COURSE_LESSON_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('CREATE_COURSE_LEVEL_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('READ_COURSE_LEVEL_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('UPDATE_COURSE_LEVEL_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('DELETE_COURSE_LEVEL_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('CREATE_COURSE_LEVEL_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('READ_COURSE_LEVEL_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('UPDATE_COURSE_LEVEL_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('CREATE_COURSE_LEVEL_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('READ_COURSE_LEVEL_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('UPDATE_COURSE_LEVEL_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('CREATE_COURSE_LEVEL_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('READ_COURSE_LEVEL_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('RegionalManager'),
        permissionId: getId('CREATE_COURSE_LEVEL_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('RegionalManager'),
        permissionId: getId('READ_COURSE_LEVEL_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('CREATE_COURSE_STATUSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('READ_COURSE_STATUSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('UPDATE_COURSE_STATUSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('DELETE_COURSE_STATUSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('CREATE_COURSE_STATUSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('READ_COURSE_STATUSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('UPDATE_COURSE_STATUSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('CREATE_COURSE_STATUSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('READ_COURSE_STATUSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('UPDATE_COURSE_STATUSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('CREATE_COURSE_STATUSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('READ_COURSE_STATUSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('RegionalManager'),
        permissionId: getId('CREATE_COURSE_STATUSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('RegionalManager'),
        permissionId: getId('READ_COURSE_STATUSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('CREATE_COURSE_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('READ_COURSE_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('UPDATE_COURSE_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('DELETE_COURSE_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('CREATE_COURSE_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('READ_COURSE_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('UPDATE_COURSE_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('CREATE_COURSE_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('READ_COURSE_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('UPDATE_COURSE_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('CREATE_COURSE_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('READ_COURSE_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('RegionalManager'),
        permissionId: getId('CREATE_COURSE_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('RegionalManager'),
        permissionId: getId('READ_COURSE_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('CREATE_EXAM_DIFFICULTY_LEVEL_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('READ_EXAM_DIFFICULTY_LEVEL_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('UPDATE_EXAM_DIFFICULTY_LEVEL_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('DELETE_EXAM_DIFFICULTY_LEVEL_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('CREATE_EXAM_DIFFICULTY_LEVEL_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('READ_EXAM_DIFFICULTY_LEVEL_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('UPDATE_EXAM_DIFFICULTY_LEVEL_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('CREATE_EXAM_DIFFICULTY_LEVEL_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('READ_EXAM_DIFFICULTY_LEVEL_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('CREATE_EXAM_DIFFICULTY_LEVEL_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('READ_EXAM_DIFFICULTY_LEVEL_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('RegionalManager'),
        permissionId: getId('CREATE_EXAM_DIFFICULTY_LEVEL_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('RegionalManager'),
        permissionId: getId('READ_EXAM_DIFFICULTY_LEVEL_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('CREATE_EXAM_GRADE_TYPE'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('READ_EXAM_GRADE_TYPE'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('UPDATE_EXAM_GRADE_TYPE'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('DELETE_EXAM_GRADE_TYPE'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('CREATE_EXAM_GRADE_TYPE'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('READ_EXAM_GRADE_TYPE'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('UPDATE_EXAM_GRADE_TYPE'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('CREATE_EXAM_GRADE_TYPE'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('READ_EXAM_GRADE_TYPE'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('CREATE_EXAM_GRADE_TYPE'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('READ_EXAM_GRADE_TYPE'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('RegionalManager'),
        permissionId: getId('CREATE_EXAM_GRADE_TYPE'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('RegionalManager'),
        permissionId: getId('READ_EXAM_GRADE_TYPE'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('CREATE_EXAM_QUESTION_ANSWER_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('READ_EXAM_QUESTION_ANSWER_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('UPDATE_EXAM_QUESTION_ANSWER_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('DELETE_EXAM_QUESTION_ANSWER_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('CREATE_EXAM_QUESTION_ANSWER_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('READ_EXAM_QUESTION_ANSWER_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('UPDATE_EXAM_QUESTION_ANSWER_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('CREATE_EXAM_QUESTION_ANSWER_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('READ_EXAM_QUESTION_ANSWER_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('CREATE_EXAM_QUESTION_ANSWER_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('READ_EXAM_QUESTION_ANSWER_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('RegionalManager'),
        permissionId: getId('CREATE_EXAM_QUESTION_ANSWER_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('RegionalManager'),
        permissionId: getId('READ_EXAM_QUESTION_ANSWER_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('CREATE_INSTITUTE_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('READ_INSTITUTE_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('UPDATE_INSTITUTE_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('DELETE_INSTITUTE_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('CREATE_INSTITUTE_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('READ_INSTITUTE_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('UPDATE_INSTITUTE_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('CREATE_INSTITUTE_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('READ_INSTITUTE_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('CREATE_INSTITUTE_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('READ_INSTITUTE_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('RegionalManager'),
        permissionId: getId('CREATE_INSTITUTE_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('RegionalManager'),
        permissionId: getId('READ_INSTITUTE_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('CREATE_MASTER_AI_PROMPT_LIBRARIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('READ_MASTER_AI_PROMPT_LIBRARIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('UPDATE_MASTER_AI_PROMPT_LIBRARIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('DELETE_MASTER_AI_PROMPT_LIBRARIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('CREATE_MASTER_AI_PROMPT_LIBRARIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('READ_MASTER_AI_PROMPT_LIBRARIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('UPDATE_MASTER_AI_PROMPT_LIBRARIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('CREATE_MASTER_AI_PROMPT_LIBRARIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('READ_MASTER_AI_PROMPT_LIBRARIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('CREATE_MASTER_AI_PROMPT_LIBRARIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('READ_MASTER_AI_PROMPT_LIBRARIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('RegionalManager'),
        permissionId: getId('CREATE_MASTER_AI_PROMPT_LIBRARIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('RegionalManager'),
        permissionId: getId('READ_MASTER_AI_PROMPT_LIBRARIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('CREATE_MASTER_CURRENCIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('READ_MASTER_CURRENCIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('UPDATE_MASTER_CURRENCIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('DELETE_MASTER_CURRENCIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('CREATE_MASTER_CURRENCIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('READ_MASTER_CURRENCIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('UPDATE_MASTER_CURRENCIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('CREATE_MASTER_CURRENCIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('READ_MASTER_CURRENCIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('CREATE_MASTER_CURRENCIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('READ_MASTER_CURRENCIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('RegionalManager'),
        permissionId: getId('CREATE_MASTER_CURRENCIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('RegionalManager'),
        permissionId: getId('READ_MASTER_CURRENCIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('CREATE_MASTER_LANGUAGES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('READ_MASTER_LANGUAGES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('UPDATE_MASTER_LANGUAGES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('DELETE_MASTER_LANGUAGES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('CREATE_MASTER_LANGUAGES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('READ_MASTER_LANGUAGES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('UPDATE_MASTER_LANGUAGES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('CREATE_MASTER_LANGUAGES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('READ_MASTER_LANGUAGES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('CREATE_MASTER_LANGUAGES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('READ_MASTER_LANGUAGES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('RegionalManager'),
        permissionId: getId('CREATE_MASTER_LANGUAGES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('RegionalManager'),
        permissionId: getId('READ_MASTER_LANGUAGES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('CREATE_MASTER_RATING_SCORES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('READ_MASTER_RATING_SCORES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('UPDATE_MASTER_RATING_SCORES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('DELETE_MASTER_RATING_SCORES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('CREATE_MASTER_RATING_SCORES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('READ_MASTER_RATING_SCORES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('UPDATE_MASTER_RATING_SCORES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('CREATE_MASTER_RATING_SCORES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('READ_MASTER_RATING_SCORES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('CREATE_MASTER_RATING_SCORES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('READ_MASTER_RATING_SCORES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('RegionalManager'),
        permissionId: getId('CREATE_MASTER_RATING_SCORES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('RegionalManager'),
        permissionId: getId('READ_MASTER_RATING_SCORES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('CREATE_MASTER_TAG_CATEGORIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('READ_MASTER_TAG_CATEGORIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('UPDATE_MASTER_TAG_CATEGORIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('DELETE_MASTER_TAG_CATEGORIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('CREATE_MASTER_TAG_CATEGORIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('READ_MASTER_TAG_CATEGORIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('UPDATE_MASTER_TAG_CATEGORIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('CREATE_MASTER_TAG_CATEGORIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('READ_MASTER_TAG_CATEGORIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('CREATE_MASTER_TAG_CATEGORIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('READ_MASTER_TAG_CATEGORIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('RegionalManager'),
        permissionId: getId('CREATE_MASTER_TAG_CATEGORIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('RegionalManager'),
        permissionId: getId('READ_MASTER_TAG_CATEGORIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('CREATE_MASTER_TAGS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('READ_MASTER_TAGS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('UPDATE_MASTER_TAGS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('DELETE_MASTER_TAGS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('CREATE_MASTER_TAGS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('READ_MASTER_TAGS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('UPDATE_MASTER_TAGS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('CREATE_MASTER_TAGS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('READ_MASTER_TAGS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('CREATE_MASTER_TAGS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('READ_MASTER_TAGS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('RegionalManager'),
        permissionId: getId('CREATE_MASTER_TAGS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('RegionalManager'),
        permissionId: getId('READ_MASTER_TAGS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('CREATE_MEMBERSHIPS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('READ_MEMBERSHIPS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('UPDATE_MEMBERSHIPS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('DELETE_MEMBERSHIPS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('CREATE_MEMBERSHIPS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('READ_MEMBERSHIPS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('UPDATE_MEMBERSHIPS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('CREATE_MEMBERSHIPS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('READ_MEMBERSHIPS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('CREATE_MEMBERSHIPS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('READ_MEMBERSHIPS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('RegionalManager'),
        permissionId: getId('CREATE_MEMBERSHIPS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('RegionalManager'),
        permissionId: getId('READ_MEMBERSHIPS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('CREATE_ORDER_CHANNELS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('READ_ORDER_CHANNELS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('UPDATE_ORDER_CHANNELS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('DELETE_ORDER_CHANNELS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('CREATE_ORDER_CHANNELS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('READ_ORDER_CHANNELS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('UPDATE_ORDER_CHANNELS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('CREATE_ORDER_CHANNELS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('READ_ORDER_CHANNELS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('CREATE_ORDER_CHANNELS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('READ_ORDER_CHANNELS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('UPDATE_ORDER_CHANNELS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('RegionalManager'),
        permissionId: getId('CREATE_ORDER_CHANNELS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('RegionalManager'),
        permissionId: getId('READ_ORDER_CHANNELS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('CREATE_ORDER_PAYMENT_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('READ_ORDER_PAYMENT_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('UPDATE_ORDER_PAYMENT_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('DELETE_ORDER_PAYMENT_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('CREATE_ORDER_PAYMENT_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('READ_ORDER_PAYMENT_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('UPDATE_ORDER_PAYMENT_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('CREATE_ORDER_PAYMENT_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('READ_ORDER_PAYMENT_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('CREATE_ORDER_PAYMENT_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('READ_ORDER_PAYMENT_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('UPDATE_ORDER_PAYMENT_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('RegionalManager'),
        permissionId: getId('CREATE_ORDER_PAYMENT_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('RegionalManager'),
        permissionId: getId('READ_ORDER_PAYMENT_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('CREATE_ORDER_STATUS_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('READ_ORDER_STATUS_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('UPDATE_ORDER_STATUS_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('DELETE_ORDER_STATUS_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('CREATE_ORDER_STATUS_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('READ_ORDER_STATUS_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('UPDATE_ORDER_STATUS_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('CREATE_ORDER_STATUS_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('READ_ORDER_STATUS_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('CREATE_ORDER_STATUS_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('READ_ORDER_STATUS_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('UPDATE_ORDER_STATUS_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('RegionalManager'),
        permissionId: getId('CREATE_ORDER_STATUS_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('RegionalManager'),
        permissionId: getId('READ_ORDER_STATUS_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('CREATE_SCHOLARSHIP_APPLICATION_STATUSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('READ_SCHOLARSHIP_APPLICATION_STATUSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('UPDATE_SCHOLARSHIP_APPLICATION_STATUSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('DELETE_SCHOLARSHIP_APPLICATION_STATUSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('CREATE_SCHOLARSHIP_APPLICATION_STATUSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('READ_SCHOLARSHIP_APPLICATION_STATUSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('UPDATE_SCHOLARSHIP_APPLICATION_STATUSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('CREATE_SCHOLARSHIP_APPLICATION_STATUSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('READ_SCHOLARSHIP_APPLICATION_STATUSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('CREATE_SCHOLARSHIP_APPLICATION_STATUSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('READ_SCHOLARSHIP_APPLICATION_STATUSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('RegionalManager'),
        permissionId: getId('CREATE_SCHOLARSHIP_APPLICATION_STATUSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('RegionalManager'),
        permissionId: getId('READ_SCHOLARSHIP_APPLICATION_STATUSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('CREATE_STATES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('READ_STATES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('UPDATE_STATES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('DELETE_STATES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('CREATE_STATES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('READ_STATES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('UPDATE_STATES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('CREATE_STATES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('READ_STATES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('CREATE_STATES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('READ_STATES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('RegionalManager'),
        permissionId: getId('CREATE_STATES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('RegionalManager'),
        permissionId: getId('READ_STATES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('CREATE_ZIP_CODES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('READ_ZIP_CODES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('UPDATE_ZIP_CODES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('DELETE_ZIP_CODES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('CREATE_ZIP_CODES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('READ_ZIP_CODES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('UPDATE_ZIP_CODES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('CREATE_ZIP_CODES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('READ_ZIP_CODES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('CREATE_ZIP_CODES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('READ_ZIP_CODES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('RegionalManager'),
        permissionId: getId('CREATE_ZIP_CODES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('RegionalManager'),
        permissionId: getId('READ_ZIP_CODES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('CREATE_ZONE_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('READ_ZONE_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('UPDATE_ZONE_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('DELETE_ZONE_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('CREATE_ZONE_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('READ_ZONE_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('UPDATE_ZONE_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('CREATE_ZONE_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('READ_ZONE_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('CREATE_ZONE_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('READ_ZONE_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('RegionalManager'),
        permissionId: getId('CREATE_ZONE_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('RegionalManager'),
        permissionId: getId('READ_ZONE_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('RegionalManager'),
        permissionId: getId('UPDATE_ZONE_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SystemManager'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('OperationsLead'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('CourseCoordinator'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('SalesExecutive'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('RegionalManager'),
        permissionId: getId('CREATE_SEARCH'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_USERS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_USERS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_CITIES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_CITIES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_CITIES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_CITIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_COMPANY_TYPES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_COMPANY_TYPES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_COMPANY_TYPES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_COMPANY_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_CONNECT_CHANNELS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_CONNECT_CHANNELS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_CONNECT_CHANNELS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_CONNECT_CHANNELS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_CONNECT_MESSAGE_LIBRARIES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_CONNECT_MESSAGE_LIBRARIES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_CONNECT_MESSAGE_LIBRARIES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_CONNECT_MESSAGE_LIBRARIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_CONTACT_TYPES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_CONTACT_TYPES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_CONTACT_TYPES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_CONTACT_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_COUNTIES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_COUNTIES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_COUNTIES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_COUNTIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_COUNTRIES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_COUNTRIES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_COUNTRIES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_COUNTRIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_COURSE_CATEGORIES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_COURSE_CATEGORIES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_COURSE_CATEGORIES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_COURSE_CATEGORIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_COURSE_LESSON_TYPES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_COURSE_LESSON_TYPES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_COURSE_LESSON_TYPES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_COURSE_LESSON_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_COURSE_LEVEL_TYPES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_COURSE_LEVEL_TYPES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_COURSE_LEVEL_TYPES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_COURSE_LEVEL_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_COURSE_STATUSES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_COURSE_STATUSES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_COURSE_STATUSES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_COURSE_STATUSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_COURSE_TYPES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_COURSE_TYPES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_COURSE_TYPES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_COURSE_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_EXAM_DIFFICULTY_LEVEL_TYPES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_EXAM_DIFFICULTY_LEVEL_TYPES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_EXAM_DIFFICULTY_LEVEL_TYPES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_EXAM_DIFFICULTY_LEVEL_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_EXAM_GRADE_TYPE'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_EXAM_GRADE_TYPE'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_EXAM_GRADE_TYPE'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_EXAM_GRADE_TYPE'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_EXAM_QUESTION_ANSWER_TYPES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_EXAM_QUESTION_ANSWER_TYPES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_EXAM_QUESTION_ANSWER_TYPES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_EXAM_QUESTION_ANSWER_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_INSTITUTE_TYPES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_INSTITUTE_TYPES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_INSTITUTE_TYPES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_INSTITUTE_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_MASTER_AI_PROMPT_LIBRARIES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_MASTER_AI_PROMPT_LIBRARIES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_MASTER_AI_PROMPT_LIBRARIES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_MASTER_AI_PROMPT_LIBRARIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_MASTER_CURRENCIES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_MASTER_CURRENCIES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_MASTER_CURRENCIES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_MASTER_CURRENCIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_MASTER_LANGUAGES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_MASTER_LANGUAGES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_MASTER_LANGUAGES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_MASTER_LANGUAGES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_MASTER_RATING_SCORES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_MASTER_RATING_SCORES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_MASTER_RATING_SCORES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_MASTER_RATING_SCORES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_MASTER_TAG_CATEGORIES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_MASTER_TAG_CATEGORIES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_MASTER_TAG_CATEGORIES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_MASTER_TAG_CATEGORIES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_MASTER_TAGS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_MASTER_TAGS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_MASTER_TAGS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_MASTER_TAGS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_MEMBERSHIPS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_MEMBERSHIPS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_MEMBERSHIPS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_MEMBERSHIPS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_ORDER_CHANNELS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_ORDER_CHANNELS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_ORDER_CHANNELS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_ORDER_CHANNELS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_ORDER_PAYMENT_TYPES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_ORDER_PAYMENT_TYPES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_ORDER_PAYMENT_TYPES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_ORDER_PAYMENT_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_ORDER_STATUS_TYPES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_ORDER_STATUS_TYPES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_ORDER_STATUS_TYPES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_ORDER_STATUS_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_SCHOLARSHIP_APPLICATION_STATUSES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_SCHOLARSHIP_APPLICATION_STATUSES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_SCHOLARSHIP_APPLICATION_STATUSES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_SCHOLARSHIP_APPLICATION_STATUSES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_STATES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_STATES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_STATES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_STATES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_ZIP_CODES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_ZIP_CODES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_ZIP_CODES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_ZIP_CODES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_ZONE_TYPES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_ZONE_TYPES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_ZONE_TYPES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_ZONE_TYPES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_ROLES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_ROLES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_ROLES'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_ROLES'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_PERMISSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_PERMISSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('UPDATE_PERMISSIONS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('DELETE_PERMISSIONS'),
      },

      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('READ_API_DOCS'),
      },
      {
        createdAt,
        updatedAt,
        roles_permissionsId: getId('Administrator'),
        permissionId: getId('CREATE_SEARCH'),
      },
    ]);

    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'SuperAdmin',
      )}' WHERE "email"='super_admin@flatlogic.com'`,
    );
    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'Administrator',
      )}' WHERE "email"='admin@flatlogic.com'`,
    );

    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'SystemManager',
      )}' WHERE "email"='client@hello.com'`,
    );
    await queryInterface.sequelize.query(
      `UPDATE "users" SET "app_roleId"='${getId(
        'OperationsLead',
      )}' WHERE "email"='john@doe.com'`,
    );
  },
};
