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

import { update, fetch } from '../../stores/master_tags/master_tagsSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditMaster_tagsPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    name: '',

    description: '',

    synonyms: '',

    sequence: '',

    picture_url: '',

    master_tag_category: '',
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { master_tags } = useAppSelector((state) => state.master_tags);

  const { id } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: id }));
  }, [id]);

  useEffect(() => {
    if (typeof master_tags === 'object') {
      setInitialValues(master_tags);
    }
  }, [master_tags]);

  useEffect(() => {
    if (typeof master_tags === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = master_tags[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [master_tags]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: id, data }));
    await router.push('/master_tags/master_tags-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit master_tags')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit master_tags'}
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

              <FormField label='Synonyms' hasTextareaHeight>
                <Field name='synonyms' as='textarea' placeholder='Synonyms' />
              </FormField>

              <FormField label='Sequence'>
                <Field type='number' name='sequence' placeholder='Sequence' />
              </FormField>

              <FormField label='PictureURL'>
                <Field name='picture_url' placeholder='PictureURL' />
              </FormField>

              <FormField
                label='MasterTagCategory'
                labelFor='master_tag_category'
              >
                <Field
                  name='master_tag_category'
                  id='master_tag_category'
                  component={SelectField}
                  options={initialValues.master_tag_category}
                  itemRef={'master_tag_categories'}
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
                  onClick={() => router.push('/master_tags/master_tags-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

EditMaster_tagsPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_MASTER_TAGS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditMaster_tagsPage;
