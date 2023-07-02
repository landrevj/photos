/** external components */

/** components */
import Option from '@/components/common/Select/Option';
import Select from '@/components/common/Select/Select';

/** state */

/** helpers */

/** types */
import type { Dispatch, SetStateAction } from 'react';
import type { ImageQueryParams } from '@/app/api/images/images.types';

interface QueryFormProps {
  formValues: ImageQueryParams;
  setQuery: Dispatch<SetStateAction<ImageQueryParams>>;
}

export const QueryForm = ({ formValues, setQuery }: QueryFormProps) => {
  return (
    <div className='flex flex-wrap gap-2'>
      <Select
        label='Group by'
        value={formValues.groupBy}
        onChange={(value) => setQuery((prev) => ({ ...prev, groupBy: value }))}
        className='w-36'
      >
        <Option value='day'>day</Option>
        <Option value='month'>month</Option>
        <Option value='year'>year</Option>
      </Select>
      <Select
        label='Sort'
        value={formValues.order}
        onChange={(value) => setQuery((prev) => ({ ...prev, order: value }))}
        className='w-40'
      >
        <Option value='asc'>ascending</Option>
        <Option value='desc'>descending</Option>
      </Select>
    </div>
  );
};

export default QueryForm;
