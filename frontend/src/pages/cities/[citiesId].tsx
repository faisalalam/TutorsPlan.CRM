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

import { update, fetch } from '../../stores/cities/citiesSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditCities = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    name: '',

    country: '',

    state: '',

    county: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { cities } = useAppSelector((state) => state.cities);

  const { citiesId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: citiesId }));
  }, [citiesId]);

  useEffect(() => {
    if (typeof cities === 'object') {
      setInitialValues(cities);
    }
  }, [cities]);

  useEffect(() => {
    if (typeof cities === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = cities[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [cities]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: citiesId, data }));
    await router.push('/cities/cities-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit cities')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit cities'}
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

              <FormField label='Country' labelFor='country'>
                <Field
                  name='country'
                  id='country'
                  component={SelectField}
                  options={initialValues.country}
                  itemRef={'countries'}
                  showField={'name'}
                ></Field>
              </FormField>

              <FormField label='State' labelFor='state'>
                <Field
                  name='state'
                  id='state'
                  component={SelectField}
                  options={initialValues.state}
                  itemRef={'states'}
                  showField={'name'}
                ></Field>
              </FormField>

              <FormField label='County' labelFor='county'>
                <Field
                  name='county'
                  id='county'
                  component={SelectField}
                  options={initialValues.county}
                  itemRef={'counties'}
                  showField={'name'}
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
                  onClick={() => router.push('/cities/cities-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditCities.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_CITIES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditCities;
