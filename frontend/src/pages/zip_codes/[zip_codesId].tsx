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

import { update, fetch } from '../../stores/zip_codes/zip_codesSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditZip_codes = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    name: '',

    country: '',

    state: '',

    county: '',

    city: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { zip_codes } = useAppSelector((state) => state.zip_codes);

  const { zip_codesId } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: zip_codesId }));
  }, [zip_codesId]);

  useEffect(() => {
    if (typeof zip_codes === 'object') {
      setInitialValues(zip_codes);
    }
  }, [zip_codes]);

  useEffect(() => {
    if (typeof zip_codes === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = zip_codes[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [zip_codes]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: zip_codesId, data }));
    await router.push('/zip_codes/zip_codes-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit zip_codes')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit zip_codes'}
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

              <FormField label='City' labelFor='city'>
                <Field
                  name='city'
                  id='city'
                  component={SelectField}
                  options={initialValues.city}
                  itemRef={'cities'}
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
                  onClick={() => router.push('/zip_codes/zip_codes-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditZip_codes.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_ZIP_CODES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditZip_codes;
