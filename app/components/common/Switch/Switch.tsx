import clsx from 'clsx';

/** external components */
import { Switch as HeadlessSwitch } from '@headlessui/react';

/** components */

/** state */

/** helpers */

/** types */
interface SwitchProps {
  enabled?: boolean;
  onChange?: (enabled: boolean) => void;
  label?: string;
  labelPosition?: 'before' | 'after';
}

export const Switch = ({
  enabled,
  label,
  labelPosition = 'after',
  onChange,
}: SwitchProps) => {
  return (
    <HeadlessSwitch.Group>
      <div className='flex items-center gap-2'>
        {label && labelPosition === 'before' && (
          <HeadlessSwitch.Label className='mr-4'>{label}</HeadlessSwitch.Label>
        )}
        <HeadlessSwitch
          checked={enabled}
          onChange={onChange}
          className={clsx(
            'relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none',
            enabled ? 'bg-blue-600' : 'bg-gray-400'
          )}
        >
          <span
            className={clsx(
              'inline-block h-4 w-4 transform rounded-full bg-white transition-transform',
              enabled ? 'translate-x-6' : 'translate-x-1'
            )}
          />
        </HeadlessSwitch>
        {label && labelPosition === 'after' && (
          <HeadlessSwitch.Label className='mr-4 cursor-pointer'>
            {label}
          </HeadlessSwitch.Label>
        )}
      </div>
    </HeadlessSwitch.Group>
  );
};

export default Switch;
