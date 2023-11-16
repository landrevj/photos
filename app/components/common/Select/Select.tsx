import { Children, Fragment, isValidElement, type ReactElement } from 'react';

/** external components */
import { Listbox, type ListboxProps, Transition } from '@headlessui/react';
import { MdUnfoldLess, MdUnfoldMore } from '@/lib/icons';

/** components */

/** state */

/** helpers */

/** types */
import type { OptionProps } from './Option';

interface SelectProps<T> extends ListboxProps<'select', T, T> {
  children: ReactElement<OptionProps<T>> | Array<ReactElement<OptionProps<T>>>;
  label?: string;
}

export const Select = <T extends unknown>({
  children,
  label,
  value,
  ...otherProps
}: SelectProps<T>) => {
  const selectedOption = Children.toArray(children).find((child) => {
    if (isValidElement<OptionProps<T>>(child) && child.props.value === value)
      return true;
    return false;
  }) as ReactElement<OptionProps<T>> | undefined;

  return (
    <Listbox value={value} {...otherProps}>
      {({ open }) => (
        <div className='relative'>
          <Listbox.Button className='relative w-full cursor-default rounded-xl bg-white py-[.375rem] pl-3 pr-10 text-left text-sm drop-shadow'>
            {label && (
              <Listbox.Label className='text-xs text-gray-500'>
                {label}
              </Listbox.Label>
            )}
            <span className='block truncate'>
              {selectedOption?.props.children}
            </span>
            <span className='pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2'>
              {open ? (
                <MdUnfoldLess
                  className='h-5 w-5 text-gray-400'
                  aria-hidden='true'
                />
              ) : (
                <MdUnfoldMore
                  className='h-5 w-5 text-gray-400'
                  aria-hidden='true'
                />
              )}
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <Listbox.Options className='absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm'>
              {children}
            </Listbox.Options>
          </Transition>
        </div>
      )}
    </Listbox>
  );
};

export default Select;
