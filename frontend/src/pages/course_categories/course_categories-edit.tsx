import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

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
import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { SwitchField } from '../../components/SwitchField';
import { RichTextField } from '../../components/RichTextField';

import {
  update,
  fetch,
} from '../../stores/course_categories/course_categoriesSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditCourse_categoriesPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
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
  const [initialValues, setInitialValues] = useState(initVals);

  const { course_categories } = useAppSelector(
    (state) => state.course_categories,
  );

  const { id } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: id }));
  }, [id]);

  useEffect(() => {
    if (typeof course_categories === 'object') {
      setInitialValues(course_categories);
    }
  }, [course_categories]);

  useEffect(() => {
    if (typeof course_categories === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = course_categories[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [course_categories]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: id, data }));
    await router.push('/course_categories/course_categories-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit course_categories')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit course_categories'}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
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

EditCourse_categoriesPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_COURSE_CATEGORIES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditCourse_categoriesPage;
