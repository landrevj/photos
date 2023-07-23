import { useEffect, useState } from 'react';

export const useFileAsObjectUrl = (file?: File) => {
  const [objectUrl, setObjectUrl] = useState<string | undefined>();

  useEffect(() => {
    let obj = '';

    if (file) {
      obj = URL.createObjectURL(file);
      setObjectUrl(obj);
    }

    return () => {
      URL.revokeObjectURL(obj);
    };
  }, [file]);

  return objectUrl;
};
