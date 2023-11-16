/** external components */
import { ParentSize } from '@visx/responsive';

/** components */
import Card from '@/components/common/Card/Card';
import Histogram from '@/components/common/Histogram/Histogram';
import Slider from '@/components/common/Slider/Slider';

/** state */

/** helpers */

/** types */
import type { ChangeEventHandler } from 'react';
import type { Image } from '@/types/images';

interface HistogramInputProps {
  formValues: Partial<Image>;
  onChange: ChangeEventHandler<HTMLInputElement>;
  max: number;
}

export const HistogramInput = ({
  formValues,
  onChange,
  max,
}: HistogramInputProps) => {
  return (
    <div className='flex flex-col gap-2'>
      <h4>Histogram</h4>
      <Card className='h-32 overflow-hidden bg-neutral-800 p-0'>
        <ParentSize>
          {({ width }) =>
            formValues.histogram && (
              <Histogram
                data={formValues.histogram}
                width={width}
                height={128}
              />
            )
          }
        </ParentSize>
        <div className='absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 px-24 opacity-0 transition-opacity hover:opacity-100'>
          <Slider
            value={formValues.histogram?.yMax ?? 0}
            className='w-full'
            min={0}
            max={max}
            step={max * 0.05}
            onChange={onChange}
          />
        </div>
      </Card>
    </div>
  );
};

export default HistogramInput;
