const express = require('express');
const cors = require('cors');
const app = express();
const passport = require('passport');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const db = require('./db/models');
const config = require('./config');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const authRoutes = require('./routes/auth');
const fileRoutes = require('./routes/file');
const searchRoutes = require('./routes/search');
const pexelsRoutes = require('./routes/pexels');

const openaiRoutes = require('./routes/openai');

const contactFormRoutes = require('./routes/contactForm');

const usersRoutes = require('./routes/users');

const citiesRoutes = require('./routes/cities');

const company_typesRoutes = require('./routes/company_types');

const connect_channelsRoutes = require('./routes/connect_channels');

const connect_message_librariesRoutes = require('./routes/connect_message_libraries');

const contact_typesRoutes = require('./routes/contact_types');

const countiesRoutes = require('./routes/counties');

const countriesRoutes = require('./routes/countries');

const course_categoriesRoutes = require('./routes/course_categories');

const course_lesson_typesRoutes = require('./routes/course_lesson_types');

const course_level_typesRoutes = require('./routes/course_level_types');

const course_statusesRoutes = require('./routes/course_statuses');

const course_typesRoutes = require('./routes/course_types');

const exam_difficulty_level_typesRoutes = require('./routes/exam_difficulty_level_types');

const exam_grade_typeRoutes = require('./routes/exam_grade_type');

const exam_question_answer_typesRoutes = require('./routes/exam_question_answer_types');

const institute_typesRoutes = require('./routes/institute_types');

const master_ai_prompt_librariesRoutes = require('./routes/master_ai_prompt_libraries');

const master_currenciesRoutes = require('./routes/master_currencies');

const master_languagesRoutes = require('./routes/master_languages');

const master_rating_scoresRoutes = require('./routes/master_rating_scores');

const master_tag_categoriesRoutes = require('./routes/master_tag_categories');

const master_tagsRoutes = require('./routes/master_tags');

const membershipsRoutes = require('./routes/memberships');

const order_channelsRoutes = require('./routes/order_channels');

const order_payment_typesRoutes = require('./routes/order_payment_types');

const order_status_typesRoutes = require('./routes/order_status_types');

const scholarship_application_statusesRoutes = require('./routes/scholarship_application_statuses');

const statesRoutes = require('./routes/states');

const zip_codesRoutes = require('./routes/zip_codes');

const zone_typesRoutes = require('./routes/zone_types');

const rolesRoutes = require('./routes/roles');

const permissionsRoutes = require('./routes/permissions');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'TutorsPlan.CRM',
      description:
        'TutorsPlan.CRM Online REST API for Testing and Prototyping application. You can perform all major operations with your entities - create, delete and etc.',
    },
    servers: [
      {
        url: config.swaggerUrl,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      responses: {
        UnauthorizedError: {
          description: 'Access token is missing or invalid',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsDoc(options);
app.use(
  '/api-docs',
  function (req, res, next) {
    swaggerUI.host = req.get('host');
    next();
  },
  swaggerUI.serve,
  swaggerUI.setup(specs),
);

app.use(cors({ origin: true }));
require('./auth/auth');

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/file', fileRoutes);
app.use('/api/pexels', pexelsRoutes);
app.enable('trust proxy');

app.use(
  '/api/users',
  passport.authenticate('jwt', { session: false }),
  usersRoutes,
);

app.use(
  '/api/cities',
  passport.authenticate('jwt', { session: false }),
  citiesRoutes,
);

app.use(
  '/api/company_types',
  passport.authenticate('jwt', { session: false }),
  company_typesRoutes,
);

app.use(
  '/api/connect_channels',
  passport.authenticate('jwt', { session: false }),
  connect_channelsRoutes,
);

app.use(
  '/api/connect_message_libraries',
  passport.authenticate('jwt', { session: false }),
  connect_message_librariesRoutes,
);

app.use(
  '/api/contact_types',
  passport.authenticate('jwt', { session: false }),
  contact_typesRoutes,
);

app.use(
  '/api/counties',
  passport.authenticate('jwt', { session: false }),
  countiesRoutes,
);

app.use(
  '/api/countries',
  passport.authenticate('jwt', { session: false }),
  countriesRoutes,
);

app.use(
  '/api/course_categories',
  passport.authenticate('jwt', { session: false }),
  course_categoriesRoutes,
);

app.use(
  '/api/course_lesson_types',
  passport.authenticate('jwt', { session: false }),
  course_lesson_typesRoutes,
);

app.use(
  '/api/course_level_types',
  passport.authenticate('jwt', { session: false }),
  course_level_typesRoutes,
);

app.use(
  '/api/course_statuses',
  passport.authenticate('jwt', { session: false }),
  course_statusesRoutes,
);

app.use(
  '/api/course_types',
  passport.authenticate('jwt', { session: false }),
  course_typesRoutes,
);

app.use(
  '/api/exam_difficulty_level_types',
  passport.authenticate('jwt', { session: false }),
  exam_difficulty_level_typesRoutes,
);

app.use(
  '/api/exam_grade_type',
  passport.authenticate('jwt', { session: false }),
  exam_grade_typeRoutes,
);

app.use(
  '/api/exam_question_answer_types',
  passport.authenticate('jwt', { session: false }),
  exam_question_answer_typesRoutes,
);

app.use(
  '/api/institute_types',
  passport.authenticate('jwt', { session: false }),
  institute_typesRoutes,
);

app.use(
  '/api/master_ai_prompt_libraries',
  passport.authenticate('jwt', { session: false }),
  master_ai_prompt_librariesRoutes,
);

app.use(
  '/api/master_currencies',
  passport.authenticate('jwt', { session: false }),
  master_currenciesRoutes,
);

app.use(
  '/api/master_languages',
  passport.authenticate('jwt', { session: false }),
  master_languagesRoutes,
);

app.use(
  '/api/master_rating_scores',
  passport.authenticate('jwt', { session: false }),
  master_rating_scoresRoutes,
);

app.use(
  '/api/master_tag_categories',
  passport.authenticate('jwt', { session: false }),
  master_tag_categoriesRoutes,
);

app.use(
  '/api/master_tags',
  passport.authenticate('jwt', { session: false }),
  master_tagsRoutes,
);

app.use(
  '/api/memberships',
  passport.authenticate('jwt', { session: false }),
  membershipsRoutes,
);

app.use(
  '/api/order_channels',
  passport.authenticate('jwt', { session: false }),
  order_channelsRoutes,
);

app.use(
  '/api/order_payment_types',
  passport.authenticate('jwt', { session: false }),
  order_payment_typesRoutes,
);

app.use(
  '/api/order_status_types',
  passport.authenticate('jwt', { session: false }),
  order_status_typesRoutes,
);

app.use(
  '/api/scholarship_application_statuses',
  passport.authenticate('jwt', { session: false }),
  scholarship_application_statusesRoutes,
);

app.use(
  '/api/states',
  passport.authenticate('jwt', { session: false }),
  statesRoutes,
);

app.use(
  '/api/zip_codes',
  passport.authenticate('jwt', { session: false }),
  zip_codesRoutes,
);

app.use(
  '/api/zone_types',
  passport.authenticate('jwt', { session: false }),
  zone_typesRoutes,
);

app.use(
  '/api/roles',
  passport.authenticate('jwt', { session: false }),
  rolesRoutes,
);

app.use(
  '/api/permissions',
  passport.authenticate('jwt', { session: false }),
  permissionsRoutes,
);

app.use(
  '/api/openai',
  passport.authenticate('jwt', { session: false }),
  openaiRoutes,
);

app.use('/api/contact-form', contactFormRoutes);

app.use(
  '/api/search',
  passport.authenticate('jwt', { session: false }),
  searchRoutes,
);

const publicDir = path.join(__dirname, '../public');

if (fs.existsSync(publicDir)) {
  app.use('/', express.static(publicDir));

  app.get('*', function (request, response) {
    response.sendFile(path.resolve(publicDir, 'index.html'));
  });
}

const PORT = process.env.NODE_ENV === 'dev_stage' ? 3000 : 8080;

db.sequelize.sync().then(function () {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});

module.exports = app;
