/** external components */

/** components */

/** state */

/** helpers */
import { getFormatOptions } from './GroupHeading.helpers';

/** types */
interface GroupHeadingProps {
  groupBy?: 'day' | 'month' | 'year';
  date: string;
}

export const GroupHeading = ({ date, groupBy }: GroupHeadingProps) => {
  const parsedDate = new Date(date);

  return (
    <h1 className='mb-2 text-lg text-gray-600'>
      {parsedDate.toLocaleDateString([], getFormatOptions(parsedDate, groupBy))}
    </h1>
  );
};

export default GroupHeading;
