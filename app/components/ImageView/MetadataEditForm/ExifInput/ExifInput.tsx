import clsx from 'clsx';

/** external components */
import { MdDelete, MdStar } from '@/lib/icons';

/** components */
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from '@/components/common/Table';
import Button from '@/components/common/Button/Button';

/** state */

/** helpers */

/** types */
import type { Image } from '@/types/images';

interface ExifInputProps {
  formValues: Partial<Image>;
}

const IMPORTANT_FIELDS = [
  'ISO',
  'FocalLength',
  'FNumber',
  'ShutterSpeedValue',
  'Model',
  'LensModel',
];

export const ExifInput = ({ formValues }: ExifInputProps) => {
  return (
    <div className='flex flex-1 flex-col gap-4'>
      <div>
        <h4>EXIF</h4>
        <hr className='border-white border-opacity-50 pb-2' />
        <Table className='w-full'>
          <TableBody>
            {Object.entries(formValues.exif || {})
              .sort((a, b) => a[0].localeCompare(b[0]))
              .map(([key, value]) => {
                const isImportantField = IMPORTANT_FIELDS.includes(key);

                return (
                  <TableRow>
                    <TableCell
                      className={clsx(isImportantField && 'text-blue-300')}
                    >
                      {isImportantField && <MdStar className='mr-2' />}
                      {key}
                    </TableCell>
                    <TableCell>{value.toString()}</TableCell>
                    <TableCell>
                      <Button
                        className='rounded-full p-1'
                        color='transparent'
                        icon={<MdDelete className='text-xl' />}
                      />
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default ExifInput;
