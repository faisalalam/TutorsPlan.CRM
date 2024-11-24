import * as icon from '@mdi/js';
import { MenuAsideItem } from './interfaces';

const menuAside: MenuAsideItem[] = [
  {
    href: '/dashboard',
    icon: icon.mdiViewDashboardOutline,
    label: 'Dashboard',
  },

  {
    href: '/users/users-list',
    label: 'Users',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiAccountGroup ? icon.mdiAccountGroup : icon.mdiTable,
    permissions: 'READ_USERS',
  },
  {
    href: '/cities/cities-list',
    label: 'Cities',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiCity ? icon.mdiCity : icon.mdiTable,
    permissions: 'READ_CITIES',
  },
  {
    href: '/company_types/company_types-list',
    label: 'Company types',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiDomain ? icon.mdiDomain : icon.mdiTable,
    permissions: 'READ_COMPANY_TYPES',
  },
  {
    href: '/connect_channels/connect_channels-list',
    label: 'Connect channels',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiMessage ? icon.mdiMessage : icon.mdiTable,
    permissions: 'READ_CONNECT_CHANNELS',
  },
  {
    href: '/connect_message_libraries/connect_message_libraries-list',
    label: 'Connect message libraries',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiMessageText ? icon.mdiMessageText : icon.mdiTable,
    permissions: 'READ_CONNECT_MESSAGE_LIBRARIES',
  },
  {
    href: '/contact_types/contact_types-list',
    label: 'Contact types',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiContactMail ? icon.mdiContactMail : icon.mdiTable,
    permissions: 'READ_CONTACT_TYPES',
  },
  {
    href: '/counties/counties-list',
    label: 'Counties',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiMapMarker ? icon.mdiMapMarker : icon.mdiTable,
    permissions: 'READ_COUNTIES',
  },
  {
    href: '/countries/countries-list',
    label: 'Countries',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiEarth ? icon.mdiEarth : icon.mdiTable,
    permissions: 'READ_COUNTRIES',
  },
  {
    href: '/course_categories/course_categories-list',
    label: 'Course categories',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiBookOpenPageVariant
      ? icon.mdiBookOpenPageVariant
      : icon.mdiTable,
    permissions: 'READ_COURSE_CATEGORIES',
  },
  {
    href: '/course_lesson_types/course_lesson_types-list',
    label: 'Course lesson types',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiNotebook ? icon.mdiNotebook : icon.mdiTable,
    permissions: 'READ_COURSE_LESSON_TYPES',
  },
  {
    href: '/course_level_types/course_level_types-list',
    label: 'Course level types',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiSchool ? icon.mdiSchool : icon.mdiTable,
    permissions: 'READ_COURSE_LEVEL_TYPES',
  },
  {
    href: '/course_statuses/course_statuses-list',
    label: 'Course statuses',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiCheckCircle ? icon.mdiCheckCircle : icon.mdiTable,
    permissions: 'READ_COURSE_STATUSES',
  },
  {
    href: '/course_types/course_types-list',
    label: 'Course types',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiBook ? icon.mdiBook : icon.mdiTable,
    permissions: 'READ_COURSE_TYPES',
  },
  {
    href: '/exam_difficulty_level_types/exam_difficulty_level_types-list',
    label: 'Exam difficulty level types',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiChartLine ? icon.mdiChartLine : icon.mdiTable,
    permissions: 'READ_EXAM_DIFFICULTY_LEVEL_TYPES',
  },
  {
    href: '/exam_grade_type/exam_grade_type-list',
    label: 'Exam grade type',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiSchool ? icon.mdiSchool : icon.mdiTable,
    permissions: 'READ_EXAM_GRADE_TYPE',
  },
  {
    href: '/exam_question_answer_types/exam_question_answer_types-list',
    label: 'Exam question answer types',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiCommentQuestion ? icon.mdiCommentQuestion : icon.mdiTable,
    permissions: 'READ_EXAM_QUESTION_ANSWER_TYPES',
  },
  {
    href: '/institute_types/institute_types-list',
    label: 'Institute types',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiSchoolOutline ? icon.mdiSchoolOutline : icon.mdiTable,
    permissions: 'READ_INSTITUTE_TYPES',
  },
  {
    href: '/master_ai_prompt_libraries/master_ai_prompt_libraries-list',
    label: 'Master ai prompt libraries',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiLibraryBooks ? icon.mdiLibraryBooks : icon.mdiTable,
    permissions: 'READ_MASTER_AI_PROMPT_LIBRARIES',
  },
  {
    href: '/master_currencies/master_currencies-list',
    label: 'Master currencies',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiCurrencyUsd ? icon.mdiCurrencyUsd : icon.mdiTable,
    permissions: 'READ_MASTER_CURRENCIES',
  },
  {
    href: '/master_languages/master_languages-list',
    label: 'Master languages',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiTranslate ? icon.mdiTranslate : icon.mdiTable,
    permissions: 'READ_MASTER_LANGUAGES',
  },
  {
    href: '/master_rating_scores/master_rating_scores-list',
    label: 'Master rating scores',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiStar ? icon.mdiStar : icon.mdiTable,
    permissions: 'READ_MASTER_RATING_SCORES',
  },
  {
    href: '/master_tag_categories/master_tag_categories-list',
    label: 'Master tag categories',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiTag ? icon.mdiTag : icon.mdiTable,
    permissions: 'READ_MASTER_TAG_CATEGORIES',
  },
  {
    href: '/master_tags/master_tags-list',
    label: 'Master tags',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiTagMultiple ? icon.mdiTagMultiple : icon.mdiTable,
    permissions: 'READ_MASTER_TAGS',
  },
  {
    href: '/memberships/memberships-list',
    label: 'Memberships',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiCardMembership ? icon.mdiCardMembership : icon.mdiTable,
    permissions: 'READ_MEMBERSHIPS',
  },
  {
    href: '/order_channels/order_channels-list',
    label: 'Order channels',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiCart ? icon.mdiCart : icon.mdiTable,
    permissions: 'READ_ORDER_CHANNELS',
  },
  {
    href: '/order_payment_types/order_payment_types-list',
    label: 'Order payment types',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiCreditCard ? icon.mdiCreditCard : icon.mdiTable,
    permissions: 'READ_ORDER_PAYMENT_TYPES',
  },
  {
    href: '/order_status_types/order_status_types-list',
    label: 'Order status types',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiClipboardCheck ? icon.mdiClipboardCheck : icon.mdiTable,
    permissions: 'READ_ORDER_STATUS_TYPES',
  },
  {
    href: '/scholarship_application_statuses/scholarship_application_statuses-list',
    label: 'Scholarship application statuses',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiFileDocument ? icon.mdiFileDocument : icon.mdiTable,
    permissions: 'READ_SCHOLARSHIP_APPLICATION_STATUSES',
  },
  {
    href: '/states/states-list',
    label: 'States',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiMap ? icon.mdiMap : icon.mdiTable,
    permissions: 'READ_STATES',
  },
  {
    href: '/zip_codes/zip_codes-list',
    label: 'Zip codes',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiMapMarkerRadius ? icon.mdiMapMarkerRadius : icon.mdiTable,
    permissions: 'READ_ZIP_CODES',
  },
  {
    href: '/zone_types/zone_types-list',
    label: 'Zone types',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiMapOutline ? icon.mdiMapOutline : icon.mdiTable,
    permissions: 'READ_ZONE_TYPES',
  },
  {
    href: '/roles/roles-list',
    label: 'Roles',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiShieldAccountVariantOutline
      ? icon.mdiShieldAccountVariantOutline
      : icon.mdiTable,
    permissions: 'READ_ROLES',
  },
  {
    href: '/permissions/permissions-list',
    label: 'Permissions',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    icon: icon.mdiShieldAccountOutline
      ? icon.mdiShieldAccountOutline
      : icon.mdiTable,
    permissions: 'READ_PERMISSIONS',
  },
  {
    href: '/profile',
    label: 'Profile',
    icon: icon.mdiAccountCircle,
  },

  {
    href: '/home',
    label: 'Home page',
    icon: icon.mdiHome,
    withDevider: true,
  },
  {
    href: '/api-docs',
    target: '_blank',
    label: 'Swagger API',
    icon: icon.mdiFileCode,
    permissions: 'READ_API_DOCS',
  },
];

export default menuAside;
