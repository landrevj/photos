/** external components */
import { MdCheck } from '@/lib/icons';

/** components */
import { Listbox, type ListboxOptionProps } from '@headlessui/react';

/** state */

/** helpers */

/** types */
import type { ReactNode } from 'react';

export interface OptionProps<T> extends ListboxOptionProps<'li', T> {
  children: ReactNode;
}

export const Option = <T extends unknown>({
  children,
  ...otherProps
}: OptionProps<T>) => {
  return (
    <Listbox.Option
      {...otherProps}
      className={({ active }) =>
        `relative cursor-default select-none py-2 pl-10 pr-4 ${
          active ? 'bg-blue-100 text-blue-900' : 'text-gray-900'
        }`
      }
    >
      {({ selected }) => (
        <>
          <span
            className={`block truncate ${
              selected ? 'font-medium' : 'font-normal'
            }`}
          >
            {children}
          </span>
          {selected ? (
            <span className='absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600'>
              <MdCheck className='h-5 w-5' aria-hidden='true' />
            </span>
          ) : null}
        </>
      )}
    </Listbox.Option>
  );
};

export default Option;
