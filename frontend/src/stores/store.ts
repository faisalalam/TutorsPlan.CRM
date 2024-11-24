import { configureStore } from '@reduxjs/toolkit';
import styleReducer from './styleSlice';
import mainReducer from './mainSlice';
import authSlice from './authSlice';
import openAiSlice from './openAiSlice';

import usersSlice from './users/usersSlice';
import citiesSlice from './cities/citiesSlice';
import company_typesSlice from './company_types/company_typesSlice';
import connect_channelsSlice from './connect_channels/connect_channelsSlice';
import connect_message_librariesSlice from './connect_message_libraries/connect_message_librariesSlice';
import contact_typesSlice from './contact_types/contact_typesSlice';
import countiesSlice from './counties/countiesSlice';
import countriesSlice from './countries/countriesSlice';
import course_categoriesSlice from './course_categories/course_categoriesSlice';
import course_lesson_typesSlice from './course_lesson_types/course_lesson_typesSlice';
import course_level_typesSlice from './course_level_types/course_level_typesSlice';
import course_statusesSlice from './course_statuses/course_statusesSlice';
import course_typesSlice from './course_types/course_typesSlice';
import exam_difficulty_level_typesSlice from './exam_difficulty_level_types/exam_difficulty_level_typesSlice';
import exam_grade_typeSlice from './exam_grade_type/exam_grade_typeSlice';
import exam_question_answer_typesSlice from './exam_question_answer_types/exam_question_answer_typesSlice';
import institute_typesSlice from './institute_types/institute_typesSlice';
import master_ai_prompt_librariesSlice from './master_ai_prompt_libraries/master_ai_prompt_librariesSlice';
import master_currenciesSlice from './master_currencies/master_currenciesSlice';
import master_languagesSlice from './master_languages/master_languagesSlice';
import master_rating_scoresSlice from './master_rating_scores/master_rating_scoresSlice';
import master_tag_categoriesSlice from './master_tag_categories/master_tag_categoriesSlice';
import master_tagsSlice from './master_tags/master_tagsSlice';
import membershipsSlice from './memberships/membershipsSlice';
import order_channelsSlice from './order_channels/order_channelsSlice';
import order_payment_typesSlice from './order_payment_types/order_payment_typesSlice';
import order_status_typesSlice from './order_status_types/order_status_typesSlice';
import scholarship_application_statusesSlice from './scholarship_application_statuses/scholarship_application_statusesSlice';
import statesSlice from './states/statesSlice';
import zip_codesSlice from './zip_codes/zip_codesSlice';
import zone_typesSlice from './zone_types/zone_typesSlice';
import rolesSlice from './roles/rolesSlice';
import permissionsSlice from './permissions/permissionsSlice';

export const store = configureStore({
  reducer: {
    style: styleReducer,
    main: mainReducer,
    auth: authSlice,
    openAi: openAiSlice,

    users: usersSlice,
    cities: citiesSlice,
    company_types: company_typesSlice,
    connect_channels: connect_channelsSlice,
    connect_message_libraries: connect_message_librariesSlice,
    contact_types: contact_typesSlice,
    counties: countiesSlice,
    countries: countriesSlice,
    course_categories: course_categoriesSlice,
    course_lesson_types: course_lesson_typesSlice,
    course_level_types: course_level_typesSlice,
    course_statuses: course_statusesSlice,
    course_types: course_typesSlice,
    exam_difficulty_level_types: exam_difficulty_level_typesSlice,
    exam_grade_type: exam_grade_typeSlice,
    exam_question_answer_types: exam_question_answer_typesSlice,
    institute_types: institute_typesSlice,
    master_ai_prompt_libraries: master_ai_prompt_librariesSlice,
    master_currencies: master_currenciesSlice,
    master_languages: master_languagesSlice,
    master_rating_scores: master_rating_scoresSlice,
    master_tag_categories: master_tag_categoriesSlice,
    master_tags: master_tagsSlice,
    memberships: membershipsSlice,
    order_channels: order_channelsSlice,
    order_payment_types: order_payment_typesSlice,
    order_status_types: order_status_typesSlice,
    scholarship_application_statuses: scholarship_application_statusesSlice,
    states: statesSlice,
    zip_codes: zip_codesSlice,
    zone_types: zone_typesSlice,
    roles: rolesSlice,
    permissions: permissionsSlice,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
