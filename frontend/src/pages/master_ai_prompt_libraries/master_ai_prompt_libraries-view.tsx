import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/master_ai_prompt_libraries/master_ai_prompt_librariesSlice';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';
import LayoutAuthenticated from '../../layouts/Authenticated';
import { getPageTitle } from '../../config';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import SectionMain from '../../components/SectionMain';
import CardBox from '../../components/CardBox';
import BaseButton from '../../components/BaseButton';
import BaseDivider from '../../components/BaseDivider';
import { mdiChartTimelineVariant } from '@mdi/js';
import { SwitchField } from '../../components/SwitchField';
import FormField from '../../components/FormField';

const Master_ai_prompt_librariesView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { master_ai_prompt_libraries } = useAppSelector(
    (state) => state.master_ai_prompt_libraries,
  );

  const { id } = router.query;

  function removeLastCharacter(str) {
    console.log(str, `str`);
    return str.slice(0, -1);
  }

  useEffect(() => {
    dispatch(fetch({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>{getPageTitle('View master_ai_prompt_libraries')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View master_ai_prompt_libraries')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Title</p>
            <p>{master_ai_prompt_libraries?.title}</p>
          </div>

          <FormField label='Multi Text' hasTextareaHeight>
            <textarea
              className={'w-full'}
              disabled
              value={master_ai_prompt_libraries?.tags}
            />
          </FormField>

          <FormField label='Multi Text' hasTextareaHeight>
            <textarea
              className={'w-full'}
              disabled
              value={master_ai_prompt_libraries?.prompt}
            />
          </FormField>

          <FormField label='SaveasLibrary'>
            <SwitchField
              field={{
                name: 'save_as_library',
                value: master_ai_prompt_libraries?.save_as_library,
              }}
              form={{ setFieldValue: () => null }}
              disabled
            />
          </FormField>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() =>
              router.push(
                '/master_ai_prompt_libraries/master_ai_prompt_libraries-list',
              )
            }
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

Master_ai_prompt_librariesView.getLayout = function getLayout(
  page: ReactElement,
) {
  return (
    <LayoutAuthenticated permission={'READ_MASTER_AI_PROMPT_LIBRARIES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default Master_ai_prompt_librariesView;
