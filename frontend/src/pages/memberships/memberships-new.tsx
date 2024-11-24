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

import { create } from '../../stores/memberships/membershipsSlice';
import { useAppDispatch } from '../../stores/hooks';
import { useRouter } from 'next/router';
import moment from 'moment';

const initialValues = {
  name: '',

  price: '',

  features: '',

  number_of_courses: '',

  number_of_tutoring_sessions: '',

  support_level: '',

  tools_access: '',

  extended_services: '',
};

const MembershipsNew = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (data) => {
    await dispatch(create(data));
    await router.push('/memberships/memberships-list');
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

              <FormField label='Price'>
                <Field type='number' name='price' placeholder='Price' />
              </FormField>

              <FormField label='Features' hasTextareaHeight>
                <Field name='features' as='textarea' placeholder='Features' />
              </FormField>

              <FormField label='NumberofCourses'>
                <Field
                  type='number'
                  name='number_of_courses'
                  placeholder='NumberofCourses'
                />
              </FormField>

              <FormField label='NumberofTutoringSessions'>
                <Field
                  type='number'
                  name='number_of_tutoring_sessions'
                  placeholder='NumberofTutoringSessions'
                />
              </FormField>

              <FormField label='SupportLevel'>
                <Field name='support_level' placeholder='SupportLevel' />
              </FormField>

              <FormField label='ToolsAccess' hasTextareaHeight>
                <Field
                  name='tools_access'
                  as='textarea'
                  placeholder='ToolsAccess'
                />
              </FormField>

              <FormField label='ExtendedServices' hasTextareaHeight>
                <Field
                  name='extended_services'
                  as='textarea'
                  placeholder='ExtendedServices'
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
                  onClick={() => router.push('/memberships/memberships-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

MembershipsNew.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'CREATE_MEMBERSHIPS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default MembershipsNew;
