import { ChangeEventHandler, useEffect, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

/** external components */

/** components */

/** state */

/** helpers */

/** types */
interface ClickToEditTextInputProps {
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  className?: string;
}

export const ClickToEditTextInput = ({
  className,
  value,
  onChange,
}: ClickToEditTextInputProps) => {
  const widthRef = useRef<HTMLSpanElement | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    setWidth(widthRef.current?.clientWidth ?? 0);
  }, [value]);

  return (
    <div className={twMerge('relative', className)}>
      <span
        ref={widthRef}
        className='invisible absolute max-w-full overflow-hidden text-ellipsis whitespace-nowrap'
      >
        {value}
      </span>
      {isEditMode ? (
        <input
          className='inline-block bg-transparent outline-none'
          style={{ width }}
          // eslint-disable-next-line jsx-a11y/no-autofocus
          autoFocus
          value={value}
          onChange={onChange}
          onBlur={() => setIsEditMode(false)}
        />
      ) : (
        <button
          className='max-w-full overflow-hidden text-ellipsis whitespace-nowrap'
          type='button'
          onClick={() => setIsEditMode(true)}
        >
          {value}
        </button>
      )}
    </div>
  );
};

export default ClickToEditTextInput;
