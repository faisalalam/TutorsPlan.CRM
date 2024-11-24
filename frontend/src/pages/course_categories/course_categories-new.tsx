import {
  mdiAccount,
  mdiChartTimelineVariant,
  mdiMail,
  mdiUpload,
} from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';

import { Field, Form, Formik } from 'formik';
import FormField from '../../components/FormField';
import BaseDivider from '../../components/BaseDivider';
import BaseButtons from '../../components/BaseButtons';
import BaseButton from '../../components/BaseButton';
import FormCheckRadio from '../../components/FormCheckRadio';
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup';
import FormFilePicker from '../../components/FormFilePicker';
import FormImagePicker from '../../components/FormImagePicker';
import { SwitchField } from '../../components/SwitchField';

import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { RichTextField } from '../../components/RichTextField';

import { create } from '../../stores/course_categories/course_categoriesSlice';
import { useAppDispatch } from '../../stores/hooks';
import { useRouter } from 'next/router';
import moment from 'moment';

const initialValues = {
  name: '',

  description: '',

  icon_url: '',

  published_on_public_site: false,

  display_sequence: '',

  bootcamp_course: '',

  regular_course: '',

  total_course: '',

  student_number: '',

  tutor_number: '',
};

const Course_categoriesNew = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (data) => {
    await dispatch(create(data));
    await router.push('/course_categories/course_categories-list');
  };
  return (
    <>
      <Head>
        <title>{getPageTitle('New Item')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title='New Item'
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='Name'>
                <Field name='name' placeholder='Name' />
              </FormField>

              <FormField label='Description' hasTextareaHeight>
                <Field
                  name='description'
                  as='textarea'
                  placeholder='Description'
                />
              </FormField>

              <FormField label='IconURL'>
                <Field name='icon_url' placeholder='IconURL' />
              </FormField>

              <FormField
                label='PublishedonPublicSite'
                labelFor='published_on_public_site'
              >
                <Field
                  name='published_on_public_site'
                  id='published_on_public_site'
                  component={SwitchField}
                ></Field>
              </FormField>

              <FormField label='DisplaySequence'>
                <Field
                  type='number'
                  name='display_sequence'
                  placeholder='DisplaySequence'
                />
              </FormField>

              <FormField label='BootcampCourse'>
                <Field
                  type='number'
                  name='bootcamp_course'
                  placeholder='BootcampCourse'
                />
              </FormField>

              <FormField label='RegularCourse'>
                <Field
                  type='number'
                  name='regular_course'
                  placeholder='RegularCourse'
                />
              </FormField>

              <FormField label='TotalCourse'>
                <Field
                  type='number'
                  name='total_course'
                  placeholder='TotalCourse'
                />
              </FormField>

              <FormField label='StudentNumber'>
                <Field
                  type='number'
                  name='student_number'
                  placeholder='StudentNumber'
                />
              </FormField>

              <FormField label='TutorNumber'>
                <Field
                  type='number'
                  name='tutor_number'
                  placeholder='TutorNumber'
                />
              </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type='submit' color='info' label='Submit' />
                <BaseButton type='reset' color='info' outline label='Reset' />
                <BaseButton
                  type='reset'
                  color='danger'
                  outline
                  label='Cancel'
                  onClick={() =>
                    router.push('/course_categories/course_categories-list')
                  }
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

Course_categoriesNew.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'CREATE_COURSE_CATEGORIES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default Course_categoriesNew;
