import { useCallback } from 'react';

export default function useImageOnError(defaultImageSrc?: string) {
  return useCallback(
    (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
      const currentTarget = event.currentTarget;
      if (defaultImageSrc) currentTarget.src = defaultImageSrc;
      else currentTarget.style.backgroundColor = '#d9d9d9';
    },
    [defaultImageSrc],
  );
}
