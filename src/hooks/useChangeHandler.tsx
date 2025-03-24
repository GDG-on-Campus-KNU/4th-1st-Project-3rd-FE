import { ChangeEvent, Dispatch, useCallback } from 'react';

export default function useChangeHandler(
  setter: Dispatch<React.SetStateAction<string>>,
) {
  return useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setter(e.currentTarget.value);
    },
    [setter],
  );
}
