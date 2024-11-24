const db = require('../models');
const Users = db.users;

const Cities = db.cities;

const CompanyTypes = db.company_types;

const ConnectChannels = db.connect_channels;

const ConnectMessageLibraries = db.connect_message_libraries;

const ContactTypes = db.contact_types;

const Counties = db.counties;

const Countries = db.countries;

const CourseCategories = db.course_categories;

const CourseLessonTypes = db.course_lesson_types;

const CourseLevelTypes = db.course_level_types;

const CourseStatuses = db.course_statuses;

const CourseTypes = db.course_types;

const ExamDifficultyLevelTypes = db.exam_difficulty_level_types;

const ExamGradeType = db.exam_grade_type;

const ExamQuestionAnswerTypes = db.exam_question_answer_types;

const InstituteTypes = db.institute_types;

const MasterAiPromptLibraries = db.master_ai_prompt_libraries;

const MasterCurrencies = db.master_currencies;

const MasterLanguages = db.master_languages;

const MasterRatingScores = db.master_rating_scores;

const MasterTagCategories = db.master_tag_categories;

const MasterTags = db.master_tags;

const Memberships = db.memberships;

const OrderChannels = db.order_channels;

const OrderPaymentTypes = db.order_payment_types;

const OrderStatusTypes = db.order_status_types;

const ScholarshipApplicationStatuses = db.scholarship_application_statuses;

const States = db.states;

const ZipCodes = db.zip_codes;

const ZoneTypes = db.zone_types;

const CitiesData = [
  {
    name: 'Los Angeles',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    name: 'Chicago',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    name: 'Toronto',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const CompanyTypesData = [
  {
    name: 'Corporation',
  },

  {
    name: 'Non-Profit',
  },

  {
    name: 'Partnership',
  },
];

const ConnectChannelsData = [
  {
    name: 'Email',
  },

  {
    name: 'SMS',
  },

  {
    name: 'Push Notification',
  },
];

const ConnectMessageLibrariesData = [
  {
    title: 'Welcome Message',

    tag: 'welcome',

    message_body: 'Welcome to our platform! We are excited to have you.',

    subject: 'Welcome to Our Platform',

    published: true,
  },

  {
    title: 'Reminder Message',

    tag: 'reminder',

    message_body: 'This is a friendly reminder about your upcoming event.',

    subject: 'Event Reminder',

    published: true,
  },

  {
    title: 'Thank You Message',

    tag: 'thank_you',

    message_body: 'Thank you for your purchase! We appreciate your business.',

    subject: 'Thank You for Your Purchase',

    published: true,
  },
];

const ContactTypesData = [
  {
    name: 'Email',
  },

  {
    name: 'Phone',
  },

  {
    name: 'Fax',
  },
];

const CountiesData = [
  {
    name: 'Los Angeles County',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    name: 'Cook County',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    name: 'York County',

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const CountriesData = [
  {
    name: 'United States',

    ticker: 'US',

    flag_icon: 'us_flag.png',

    phone_code: '+1',
  },

  {
    name: 'Canada',

    ticker: 'CA',

    flag_icon: 'ca_flag.png',

    phone_code: '+1',
  },

  {
    name: 'United Kingdom',

    ticker: 'UK',

    flag_icon: 'uk_flag.png',

    phone_code: '+44',
  },
];

const CourseCategoriesData = [
  {
    name: 'Computer Science',

    description: 'Courses related to computer science',

    icon_url: 'cs_icon.png',

    published_on_public_site: true,

    display_sequence: 1,

    bootcamp_course: 5,

    regular_course: 10,

    total_course: 15,

    student_number: 200,

    tutor_number: 20,
  },

  {
    name: 'Business Management',

    description: 'Courses related to business management',

    icon_url: 'bm_icon.png',

    published_on_public_site: true,

    display_sequence: 2,

    bootcamp_course: 3,

    regular_course: 7,

    total_course: 10,

    student_number: 150,

    tutor_number: 15,
  },

  {
    name: 'Health and Wellness',

    description: 'Courses related to health and wellness',

    icon_url: 'hw_icon.png',

    published_on_public_site: true,

    display_sequence: 3,

    bootcamp_course: 2,

    regular_course: 5,

    total_course: 7,

    student_number: 100,

    tutor_number: 10,
  },
];

const CourseLessonTypesData = [
  {
    name: 'Lecture',
  },

  {
    name: 'Workshop',
  },

  {
    name: 'Seminar',
  },
];

const CourseLevelTypesData = [
  {
    name: 'Beginner',

    display_sequence: 1,
  },

  {
    name: 'Intermediate',

    display_sequence: 2,
  },

  {
    name: 'Advanced',

    display_sequence: 3,
  },
];

const CourseStatusesData = [
  {
    name: 'Draft',
  },

  {
    name: 'Published',
  },

  {
    name: 'Archived',
  },
];

const CourseTypesData = [
  {
    name: 'Online',
  },

  {
    name: 'In-Person',
  },

  {
    name: 'Hybrid',
  },
];

const ExamDifficultyLevelTypesData = [
  {
    name: 'Easy',

    description: 'Basic questions that require minimal effort to answer.',
  },

  {
    name: 'Moderate',

    description: 'Questions that require a moderate level of understanding.',
  },

  {
    name: 'Challenging',

    description: 'Questions that require a higher level of understanding.',
  },
];

const ExamGradeTypeData = [
  {
    name: 'A',

    description: 'Excellent performance',
  },

  {
    name: 'B',

    description: 'Good performance',
  },

  {
    name: 'C',

    description: 'Average performance',
  },
];

const ExamQuestionAnswerTypesData = [
  {
    name: 'Multiple Choice',

    description: 'Select one or more correct answers from a list of options.',
  },

  {
    name: 'True or False',

    description: 'Determine whether a statement is true or false.',
  },

  {
    name: 'Short Answer',

    description: 'Provide a brief response to a question.',
  },
];

const InstituteTypesData = [
  {
    name: 'University',
  },

  {
    name: 'College',
  },

  {
    name: 'Vocational School',
  },
];

const MasterAiPromptLibrariesData = [
  {
    title: 'AI for Beginners',

    tags: 'AI, Machine Learning',

    prompt: 'Introduction to AI concepts',

    save_as_library: true,
  },

  {
    title: 'Advanced Marketing Strategies',

    tags: 'Marketing, Business',

    prompt: 'Exploring advanced marketing techniques',

    save_as_library: true,
  },

  {
    title: 'Healthy Living Tips',

    tags: 'Health, Wellness',

    prompt: 'Guidelines for a healthy lifestyle',

    save_as_library: false,
  },
];

const MasterCurrenciesData = [
  {
    name: 'US Dollar',

    ticker: 'USD',

    icon: 'usd_icon.png',
  },

  {
    name: 'Euro',

    ticker: 'EUR',

    icon: 'eur_icon.png',
  },

  {
    name: 'British Pound',

    ticker: 'GBP',

    icon: 'gbp_icon.png',
  },
];

const MasterLanguagesData = [
  {
    name: 'English',
  },

  {
    name: 'Spanish',
  },

  {
    name: 'French',
  },
];

const MasterRatingScoresData = [
  {
    name: 'Excellent',

    score: 5,

    icon: 'star5.png',
  },

  {
    name: 'Very Good',

    score: 4,

    icon: 'star4.png',
  },

  {
    name: 'Good',

    score: 3,

    icon: 'star3.png',
  },
];

const MasterTagCategoriesData = [
  {
    name: 'Technology',

    description: 'Tags related to technology and IT',

    picture_url: 'tech.png',

    recommendation_tag: 'tech',

    sequence: 1,
  },

  {
    name: 'Business',

    description: 'Tags related to business and management',

    picture_url: 'business.png',

    recommendation_tag: 'business',

    sequence: 2,
  },

  {
    name: 'Health',

    description: 'Tags related to health and wellness',

    picture_url: 'health.png',

    recommendation_tag: 'health',

    sequence: 3,
  },
];

const MasterTagsData = [
  {
    name: 'AI',

    description: 'Artificial Intelligence',

    synonyms: 'Machine Learning, Deep Learning',

    sequence: 1,

    picture_url: 'ai.png',

    // type code here for "relation_one" field
  },

  {
    name: 'Marketing',

    description: 'Marketing strategies and tools',

    synonyms: 'Advertising, Promotion',

    sequence: 2,

    picture_url: 'marketing.png',

    // type code here for "relation_one" field
  },

  {
    name: 'Nutrition',

    description: 'Nutrition and diet',

    synonyms: 'Diet, Food',

    sequence: 3,

    picture_url: 'nutrition.png',

    // type code here for "relation_one" field
  },
];

const MembershipsData = [
  {
    name: 'Basic Plan',

    price: 19.99,

    features: 'Access to basic courses',

    number_of_courses: 5,

    number_of_tutoring_sessions: 2,

    support_level: 'Email support',

    tools_access: 'Basic tools',

    extended_services: 'None',
  },

  {
    name: 'Standard Plan',

    price: 49.99,

    features: 'Access to all courses',

    number_of_courses: 10,

    number_of_tutoring_sessions: 5,

    support_level: 'Phone support',

    tools_access: 'Standard tools',

    extended_services: 'Monthly webinars',
  },

  {
    name: 'Premium Plan',

    price: 99.99,

    features: 'Access to all courses and premium content',

    number_of_courses: 20,

    number_of_tutoring_sessions: 10,

    support_level: '24/7 support',

    tools_access: 'Premium tools',

    extended_services: 'Weekly coaching sessions',
  },
];

const OrderChannelsData = [
  {
    name: 'Online',

    description: 'Orders placed through the website.',
  },

  {
    name: 'Phone',

    description: 'Orders placed via phone call.',
  },

  {
    name: 'In-Store',

    description: 'Orders placed in physical stores.',
  },
];

const OrderPaymentTypesData = [
  {
    name: 'Credit Card',
  },

  {
    name: 'PayPal',
  },

  {
    name: 'Bank Transfer',
  },
];

const OrderStatusTypesData = [
  {
    name: 'Pending',
  },

  {
    name: 'Processing',
  },

  {
    name: 'Shipped',
  },
];

const ScholarshipApplicationStatusesData = [
  {
    name: 'Submitted',

    description: 'Application has been submitted.',
  },

  {
    name: 'Under Review',

    description: 'Application is currently being reviewed.',
  },

  {
    name: 'Approved',

    description: 'Application has been approved.',
  },
];

const StatesData = [
  {
    name: 'California',

    ticker: 'CA',

    // type code here for "relation_one" field
  },

  {
    name: 'Ontario',

    ticker: 'ON',

    // type code here for "relation_one" field
  },

  {
    name: 'New South Wales',

    ticker: 'NSW',

    // type code here for "relation_one" field
  },
];

const ZipCodesData = [
  {
    name: '90001',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    name: '60601',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },

  {
    name: 'M5H',

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field

    // type code here for "relation_one" field
  },
];

const ZoneTypesData = [
  {
    name: 'Urban',
  },

  {
    name: 'Suburban',
  },

  {
    name: 'Rural',
  },
];

// Similar logic for "relation_many"

async function associateCityWithCountry() {
  const relatedCountry0 = await Countries.findOne({
    offset: Math.floor(Math.random() * (await Countries.count())),
  });
  const City0 = await Cities.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (City0?.setCountry) {
    await City0.setCountry(relatedCountry0);
  }

  const relatedCountry1 = await Countries.findOne({
    offset: Math.floor(Math.random() * (await Countries.count())),
  });
  const City1 = await Cities.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (City1?.setCountry) {
    await City1.setCountry(relatedCountry1);
  }

  const relatedCountry2 = await Countries.findOne({
    offset: Math.floor(Math.random() * (await Countries.count())),
  });
  const City2 = await Cities.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (City2?.setCountry) {
    await City2.setCountry(relatedCountry2);
  }
}

async function associateCityWithState() {
  const relatedState0 = await States.findOne({
    offset: Math.floor(Math.random() * (await States.count())),
  });
  const City0 = await Cities.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (City0?.setState) {
    await City0.setState(relatedState0);
  }

  const relatedState1 = await States.findOne({
    offset: Math.floor(Math.random() * (await States.count())),
  });
  const City1 = await Cities.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (City1?.setState) {
    await City1.setState(relatedState1);
  }

  const relatedState2 = await States.findOne({
    offset: Math.floor(Math.random() * (await States.count())),
  });
  const City2 = await Cities.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (City2?.setState) {
    await City2.setState(relatedState2);
  }
}

async function associateCityWithCounty() {
  const relatedCounty0 = await Counties.findOne({
    offset: Math.floor(Math.random() * (await Counties.count())),
  });
  const City0 = await Cities.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (City0?.setCounty) {
    await City0.setCounty(relatedCounty0);
  }

  const relatedCounty1 = await Counties.findOne({
    offset: Math.floor(Math.random() * (await Counties.count())),
  });
  const City1 = await Cities.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (City1?.setCounty) {
    await City1.setCounty(relatedCounty1);
  }

  const relatedCounty2 = await Counties.findOne({
    offset: Math.floor(Math.random() * (await Counties.count())),
  });
  const City2 = await Cities.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (City2?.setCounty) {
    await City2.setCounty(relatedCounty2);
  }
}

async function associateCountyWithCountry() {
  const relatedCountry0 = await Countries.findOne({
    offset: Math.floor(Math.random() * (await Countries.count())),
  });
  const County0 = await Counties.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (County0?.setCountry) {
    await County0.setCountry(relatedCountry0);
  }

  const relatedCountry1 = await Countries.findOne({
    offset: Math.floor(Math.random() * (await Countries.count())),
  });
  const County1 = await Counties.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (County1?.setCountry) {
    await County1.setCountry(relatedCountry1);
  }

  const relatedCountry2 = await Countries.findOne({
    offset: Math.floor(Math.random() * (await Countries.count())),
  });
  const County2 = await Counties.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (County2?.setCountry) {
    await County2.setCountry(relatedCountry2);
  }
}

async function associateCountyWithState() {
  const relatedState0 = await States.findOne({
    offset: Math.floor(Math.random() * (await States.count())),
  });
  const County0 = await Counties.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (County0?.setState) {
    await County0.setState(relatedState0);
  }

  const relatedState1 = await States.findOne({
    offset: Math.floor(Math.random() * (await States.count())),
  });
  const County1 = await Counties.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (County1?.setState) {
    await County1.setState(relatedState1);
  }

  const relatedState2 = await States.findOne({
    offset: Math.floor(Math.random() * (await States.count())),
  });
  const County2 = await Counties.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (County2?.setState) {
    await County2.setState(relatedState2);
  }
}

async function associateMasterTagWithMaster_tag_category() {
  const relatedMaster_tag_category0 = await MasterTagCategories.findOne({
    offset: Math.floor(Math.random() * (await MasterTagCategories.count())),
  });
  const MasterTag0 = await MasterTags.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (MasterTag0?.setMaster_tag_category) {
    await MasterTag0.setMaster_tag_category(relatedMaster_tag_category0);
  }

  const relatedMaster_tag_category1 = await MasterTagCategories.findOne({
    offset: Math.floor(Math.random() * (await MasterTagCategories.count())),
  });
  const MasterTag1 = await MasterTags.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (MasterTag1?.setMaster_tag_category) {
    await MasterTag1.setMaster_tag_category(relatedMaster_tag_category1);
  }

  const relatedMaster_tag_category2 = await MasterTagCategories.findOne({
    offset: Math.floor(Math.random() * (await MasterTagCategories.count())),
  });
  const MasterTag2 = await MasterTags.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (MasterTag2?.setMaster_tag_category) {
    await MasterTag2.setMaster_tag_category(relatedMaster_tag_category2);
  }
}

async function associateStateWithCountry() {
  const relatedCountry0 = await Countries.findOne({
    offset: Math.floor(Math.random() * (await Countries.count())),
  });
  const State0 = await States.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (State0?.setCountry) {
    await State0.setCountry(relatedCountry0);
  }

  const relatedCountry1 = await Countries.findOne({
    offset: Math.floor(Math.random() * (await Countries.count())),
  });
  const State1 = await States.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (State1?.setCountry) {
    await State1.setCountry(relatedCountry1);
  }

  const relatedCountry2 = await Countries.findOne({
    offset: Math.floor(Math.random() * (await Countries.count())),
  });
  const State2 = await States.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (State2?.setCountry) {
    await State2.setCountry(relatedCountry2);
  }
}

async function associateZipCodeWithCountry() {
  const relatedCountry0 = await Countries.findOne({
    offset: Math.floor(Math.random() * (await Countries.count())),
  });
  const ZipCode0 = await ZipCodes.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (ZipCode0?.setCountry) {
    await ZipCode0.setCountry(relatedCountry0);
  }

  const relatedCountry1 = await Countries.findOne({
    offset: Math.floor(Math.random() * (await Countries.count())),
  });
  const ZipCode1 = await ZipCodes.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (ZipCode1?.setCountry) {
    await ZipCode1.setCountry(relatedCountry1);
  }

  const relatedCountry2 = await Countries.findOne({
    offset: Math.floor(Math.random() * (await Countries.count())),
  });
  const ZipCode2 = await ZipCodes.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (ZipCode2?.setCountry) {
    await ZipCode2.setCountry(relatedCountry2);
  }
}

async function associateZipCodeWithState() {
  const relatedState0 = await States.findOne({
    offset: Math.floor(Math.random() * (await States.count())),
  });
  const ZipCode0 = await ZipCodes.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (ZipCode0?.setState) {
    await ZipCode0.setState(relatedState0);
  }

  const relatedState1 = await States.findOne({
    offset: Math.floor(Math.random() * (await States.count())),
  });
  const ZipCode1 = await ZipCodes.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (ZipCode1?.setState) {
    await ZipCode1.setState(relatedState1);
  }

  const relatedState2 = await States.findOne({
    offset: Math.floor(Math.random() * (await States.count())),
  });
  const ZipCode2 = await ZipCodes.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (ZipCode2?.setState) {
    await ZipCode2.setState(relatedState2);
  }
}

async function associateZipCodeWithCounty() {
  const relatedCounty0 = await Counties.findOne({
    offset: Math.floor(Math.random() * (await Counties.count())),
  });
  const ZipCode0 = await ZipCodes.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (ZipCode0?.setCounty) {
    await ZipCode0.setCounty(relatedCounty0);
  }

  const relatedCounty1 = await Counties.findOne({
    offset: Math.floor(Math.random() * (await Counties.count())),
  });
  const ZipCode1 = await ZipCodes.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (ZipCode1?.setCounty) {
    await ZipCode1.setCounty(relatedCounty1);
  }

  const relatedCounty2 = await Counties.findOne({
    offset: Math.floor(Math.random() * (await Counties.count())),
  });
  const ZipCode2 = await ZipCodes.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (ZipCode2?.setCounty) {
    await ZipCode2.setCounty(relatedCounty2);
  }
}

async function associateZipCodeWithCity() {
  const relatedCity0 = await Cities.findOne({
    offset: Math.floor(Math.random() * (await Cities.count())),
  });
  const ZipCode0 = await ZipCodes.findOne({
    order: [['id', 'ASC']],
    offset: 0,
  });
  if (ZipCode0?.setCity) {
    await ZipCode0.setCity(relatedCity0);
  }

  const relatedCity1 = await Cities.findOne({
    offset: Math.floor(Math.random() * (await Cities.count())),
  });
  const ZipCode1 = await ZipCodes.findOne({
    order: [['id', 'ASC']],
    offset: 1,
  });
  if (ZipCode1?.setCity) {
    await ZipCode1.setCity(relatedCity1);
  }

  const relatedCity2 = await Cities.findOne({
    offset: Math.floor(Math.random() * (await Cities.count())),
  });
  const ZipCode2 = await ZipCodes.findOne({
    order: [['id', 'ASC']],
    offset: 2,
  });
  if (ZipCode2?.setCity) {
    await ZipCode2.setCity(relatedCity2);
  }
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await Cities.bulkCreate(CitiesData);

    await CompanyTypes.bulkCreate(CompanyTypesData);

    await ConnectChannels.bulkCreate(ConnectChannelsData);

    await ConnectMessageLibraries.bulkCreate(ConnectMessageLibrariesData);

    await ContactTypes.bulkCreate(ContactTypesData);

    await Counties.bulkCreate(CountiesData);

    await Countries.bulkCreate(CountriesData);

    await CourseCategories.bulkCreate(CourseCategoriesData);

    await CourseLessonTypes.bulkCreate(CourseLessonTypesData);

    await CourseLevelTypes.bulkCreate(CourseLevelTypesData);

    await CourseStatuses.bulkCreate(CourseStatusesData);

    await CourseTypes.bulkCreate(CourseTypesData);

    await ExamDifficultyLevelTypes.bulkCreate(ExamDifficultyLevelTypesData);

    await ExamGradeType.bulkCreate(ExamGradeTypeData);

    await ExamQuestionAnswerTypes.bulkCreate(ExamQuestionAnswerTypesData);

    await InstituteTypes.bulkCreate(InstituteTypesData);

    await MasterAiPromptLibraries.bulkCreate(MasterAiPromptLibrariesData);

    await MasterCurrencies.bulkCreate(MasterCurrenciesData);

    await MasterLanguages.bulkCreate(MasterLanguagesData);

    await MasterRatingScores.bulkCreate(MasterRatingScoresData);

    await MasterTagCategories.bulkCreate(MasterTagCategoriesData);

    await MasterTags.bulkCreate(MasterTagsData);

    await Memberships.bulkCreate(MembershipsData);

    await OrderChannels.bulkCreate(OrderChannelsData);

    await OrderPaymentTypes.bulkCreate(OrderPaymentTypesData);

    await OrderStatusTypes.bulkCreate(OrderStatusTypesData);

    await ScholarshipApplicationStatuses.bulkCreate(
      ScholarshipApplicationStatusesData,
    );

    await States.bulkCreate(StatesData);

    await ZipCodes.bulkCreate(ZipCodesData);

    await ZoneTypes.bulkCreate(ZoneTypesData);

    await Promise.all([
      // Similar logic for "relation_many"

      await associateCityWithCountry(),

      await associateCityWithState(),

      await associateCityWithCounty(),

      await associateCountyWithCountry(),

      await associateCountyWithState(),

      await associateMasterTagWithMaster_tag_category(),

      await associateStateWithCountry(),

      await associateZipCodeWithCountry(),

      await associateZipCodeWithState(),

      await associateZipCodeWithCounty(),

      await associateZipCodeWithCity(),
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('cities', null, {});

    await queryInterface.bulkDelete('company_types', null, {});

    await queryInterface.bulkDelete('connect_channels', null, {});

    await queryInterface.bulkDelete('connect_message_libraries', null, {});

    await queryInterface.bulkDelete('contact_types', null, {});

    await queryInterface.bulkDelete('counties', null, {});

    await queryInterface.bulkDelete('countries', null, {});

    await queryInterface.bulkDelete('course_categories', null, {});

    await queryInterface.bulkDelete('course_lesson_types', null, {});

    await queryInterface.bulkDelete('course_level_types', null, {});

    await queryInterface.bulkDelete('course_statuses', null, {});

    await queryInterface.bulkDelete('course_types', null, {});

    await queryInterface.bulkDelete('exam_difficulty_level_types', null, {});

    await queryInterface.bulkDelete('exam_grade_type', null, {});

    await queryInterface.bulkDelete('exam_question_answer_types', null, {});

    await queryInterface.bulkDelete('institute_types', null, {});

    await queryInterface.bulkDelete('master_ai_prompt_libraries', null, {});

    await queryInterface.bulkDelete('master_currencies', null, {});

    await queryInterface.bulkDelete('master_languages', null, {});

    await queryInterface.bulkDelete('master_rating_scores', null, {});

    await queryInterface.bulkDelete('master_tag_categories', null, {});

    await queryInterface.bulkDelete('master_tags', null, {});

    await queryInterface.bulkDelete('memberships', null, {});

    await queryInterface.bulkDelete('order_channels', null, {});

    await queryInterface.bulkDelete('order_payment_types', null, {});

    await queryInterface.bulkDelete('order_status_types', null, {});

    await queryInterface.bulkDelete(
      'scholarship_application_statuses',
      null,
      {},
    );

    await queryInterface.bulkDelete('states', null, {});

    await queryInterface.bulkDelete('zip_codes', null, {});

    await queryInterface.bulkDelete('zone_types', null, {});
  },
};
