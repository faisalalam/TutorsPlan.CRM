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
} from '../../stores/master_rating_scores/master_rating_scoresSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditMaster_rating_scores = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    name: '',

    score: '',

    icon: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { master_rating_scores } = useAppSelector(
    (state) => state.master_rating_scores,
  );

  const { master_rating_scoresId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: master_rating_scoresId }));
  }, [master_rating_scoresId]);

  useEffect(() => {
    if (typeof master_rating_scores === 'object') {
      setInitialValues(master_rating_scores);
    }
  }, [master_rating_scores]);

  useEffect(() => {
    if (typeof master_rating_scores === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = master_rating_scores[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [master_rating_scores]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: master_rating_scoresId, data }));
    await router.push('/master_rating_scores/master_rating_scores-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit master_rating_scores')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit master_rating_scores'}
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

              <FormField label='Score'>
                <Field type='number' name='score' placeholder='Score' />
              </FormField>

              <FormField label='Icon'>
                <Field name='icon' placeholder='Icon' />
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
                      '/master_rating_scores/master_rating_scores-list',
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

EditMaster_rating_scores.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_MASTER_RATING_SCORES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditMaster_rating_scores;