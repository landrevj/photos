'use client';

import { usePathname, useRouter } from 'next/navigation';

/** external components */

/** components */
import Option from '@/components/common/Select/Option';
import Select from '@/components/common/Select/Select';

/** state */

/** helpers */

/** types */
import type { ImageQueryParams } from '@/types/images';

interface QueryFormProps {
  formValues: ImageQueryParams;
}

export const QueryForm = ({ formValues }: QueryFormProps) => {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className='flex flex-wrap gap-2'>
      <Select
        label='Group by'
        className='w-36'
        value={formValues.groupBy}
        onChange={(value) =>
          router.push(
            `${pathname}?${new URLSearchParams({
              ...formValues,
              groupBy: value,
            })}`
          )
        }
      >
        <Option value='day'>day</Option>
        <Option value='month'>month</Option>
        <Option value='year'>year</Option>
      </Select>
      <Select
        label='Sort'
        className='w-40'
        value={formValues.order}
        onChange={(value) =>
          router.push(
            `${pathname}?${new URLSearchParams({
              ...formValues,
              order: value,
            })}`
          )
        }
      >
        <Option value='asc'>ascending</Option>
        <Option value='desc'>descending</Option>
      </Select>
    </div>
  );
};

export default QueryForm;
