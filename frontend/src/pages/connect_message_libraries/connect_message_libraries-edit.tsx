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
} from '../../stores/connect_message_libraries/connect_message_librariesSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditConnect_message_librariesPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    title: '',

    tag: '',

    message_body: '',

    subject: '',

    published: false,
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { connect_message_libraries } = useAppSelector(
    (state) => state.connect_message_libraries,
  );

  const { id } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: id }));
  }, [id]);

  useEffect(() => {
    if (typeof connect_message_libraries === 'object') {
      setInitialValues(connect_message_libraries);
    }
  }, [connect_message_libraries]);

  useEffect(() => {
    if (typeof connect_message_libraries === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = connect_message_libraries[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [connect_message_libraries]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: id, data }));
    await router.push(
      '/connect_message_libraries/connect_message_libraries-list',
    );
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit connect_message_libraries')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit connect_message_libraries'}
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
              <FormField label='Title'>
                <Field name='title' placeholder='Title' />
              </FormField>

              <FormField label='Tag' hasTextareaHeight>
                <Field name='tag' as='textarea' placeholder='Tag' />
              </FormField>

              <FormField label='MessageBody' hasTextareaHeight>
                <Field
                  name='message_body'
                  as='textarea'
                  placeholder='MessageBody'
                />
              </FormField>

              <FormField label='Subject'>
                <Field name='subject' placeholder='Subject' />
              </FormField>

              <FormField label='Published' labelFor='published'>
                <Field
                  name='published'
                  id='published'
                  component={SwitchField}
                ></Field>
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
                    router.push(
                      '/connect_message_libraries/connect_message_libraries-list',
                    )
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

EditConnect_message_librariesPage.getLayout = function getLayout(
  page: ReactElement,
) {
  return (
    <LayoutAuthenticated permission={'UPDATE_CONNECT_MESSAGE_LIBRARIES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditConnect_message_librariesPage;
