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

import { update, fetch } from '../../stores/memberships/membershipsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditMemberships = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    name: '',

    price: '',

    features: '',

    number_of_courses: '',

    number_of_tutoring_sessions: '',

    support_level: '',

    tools_access: '',

    extended_services: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { memberships } = useAppSelector((state) => state.memberships);

  const { membershipsId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: membershipsId }));
  }, [membershipsId]);

  useEffect(() => {
    if (typeof memberships === 'object') {
      setInitialValues(memberships);
    }
  }, [memberships]);

  useEffect(() => {
    if (typeof memberships === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = memberships[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [memberships]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: membershipsId, data }));
    await router.push('/memberships/memberships-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit memberships')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit memberships'}
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

EditMemberships.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_MEMBERSHIPS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditMemberships;
