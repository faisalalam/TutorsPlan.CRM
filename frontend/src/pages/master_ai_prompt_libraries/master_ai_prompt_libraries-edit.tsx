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
} from '../../stores/master_ai_prompt_libraries/master_ai_prompt_librariesSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditMaster_ai_prompt_librariesPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    title: '',

    tags: '',

    prompt: '',

    save_as_library: false,
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { master_ai_prompt_libraries } = useAppSelector(
    (state) => state.master_ai_prompt_libraries,
  );

  const { id } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: id }));
  }, [id]);

  useEffect(() => {
    if (typeof master_ai_prompt_libraries === 'object') {
      setInitialValues(master_ai_prompt_libraries);
    }
  }, [master_ai_prompt_libraries]);

  useEffect(() => {
    if (typeof master_ai_prompt_libraries === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = master_ai_prompt_libraries[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [master_ai_prompt_libraries]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: id, data }));
    await router.push(
      '/master_ai_prompt_libraries/master_ai_prompt_libraries-list',
    );
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit master_ai_prompt_libraries')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit master_ai_prompt_libraries'}
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

              <FormField label='Tags' hasTextareaHeight>
                <Field name='tags' as='textarea' placeholder='Tags' />
              </FormField>

              <FormField label='Prompt' hasTextareaHeight>
                <Field name='prompt' as='textarea' placeholder='Prompt' />
              </FormField>

              <FormField label='SaveasLibrary' labelFor='save_as_library'>
                <Field
                  name='save_as_library'
                  id='save_as_library'
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
                      '/master_ai_prompt_libraries/master_ai_prompt_libraries-list',
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

EditMaster_ai_prompt_librariesPage.getLayout = function getLayout(
  page: ReactElement,
) {
  return (
    <LayoutAuthenticated permission={'UPDATE_MASTER_AI_PROMPT_LIBRARIES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditMaster_ai_prompt_librariesPage;
