import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/master_tag_categories/master_tag_categoriesSlice';
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

const Master_tag_categoriesView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { master_tag_categories } = useAppSelector(
    (state) => state.master_tag_categories,
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
        <title>{getPageTitle('View master_tag_categories')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View master_tag_categories')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Name</p>
            <p>{master_tag_categories?.name}</p>
          </div>

          <FormField label='Multi Text' hasTextareaHeight>
            <textarea
              className={'w-full'}
              disabled
              value={master_tag_categories?.description}
            />
          </FormField>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>PictureURL</p>
            <p>{master_tag_categories?.picture_url}</p>
          </div>

          <FormField label='Multi Text' hasTextareaHeight>
            <textarea
              className={'w-full'}
              disabled
              value={master_tag_categories?.recommendation_tag}
            />
          </FormField>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Sequence</p>
            <p>{master_tag_categories?.sequence || 'No data'}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>
              Master_tags MasterTagCategory
            </p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>

                      <th>Description</th>

                      <th>Synonyms</th>

                      <th>Sequence</th>

                      <th>PictureURL</th>
                    </tr>
                  </thead>
                  <tbody>
                    {master_tag_categories.master_tags_master_tag_category &&
                      Array.isArray(
                        master_tag_categories.master_tags_master_tag_category,
                      ) &&
                      master_tag_categories.master_tags_master_tag_category.map(
                        (item: any) => (
                          <tr
                            key={item.id}
                            onClick={() =>
                              router.push(
                                `/master_tags/master_tags-view/?id=${item.id}`,
                              )
                            }
                          >
                            <td data-label='name'>{item.name}</td>

                            <td data-label='description'>{item.description}</td>

                            <td data-label='synonyms'>{item.synonyms}</td>

                            <td data-label='sequence'>{item.sequence}</td>

                            <td data-label='picture_url'>{item.picture_url}</td>
                          </tr>
                        ),
                      )}
                  </tbody>
                </table>
              </div>
              {!master_tag_categories?.master_tags_master_tag_category
                ?.length && <div className={'text-center py-4'}>No data</div>}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() =>
              router.push('/master_tag_categories/master_tag_categories-list')
            }
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

Master_tag_categoriesView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_MASTER_TAG_CATEGORIES'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default Master_tag_categoriesView;
